import React, { useState, useRef, useEffect, use } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format as formatDateFn } from 'date-fns';

type DateLabelPickerProps = {
  date: Date | null;
  className?: string;
  showMonthYearPicker?: boolean;
  onChange?: (newValue: Date) => void;
};

export default function DateLabelPicker({
  date,
  className,
  showMonthYearPicker = true,
  onChange,
}: DateLabelPickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(date);
  const [showCalendar, setShowCalendar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);


  useEffect(() => {

    if (showCalendar && calendarRef.current && containerRef.current) {
      const calEl = calendarRef.current;
      const parentEl = containerRef.current.parentElement;
      if (parentEl) {
        const parentRect = parentEl.getBoundingClientRect();
        const calRect = calEl.getBoundingClientRect();

        // How far the calendar overflows the parent's right edge
        const overflow = calRect.right - parentRect.right;

        if (overflow > 0) {
          const currentML =
            parseFloat(getComputedStyle(calEl).marginLeft || '0') || 0;
          // Shift left by the overflow amount
          calEl.style.marginLeft = `${currentML - overflow}px`;
        }
      }
    }

  }, [showCalendar]);

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  const locale =
    (typeof navigator !== 'undefined' &&
      (navigator.languages?.[0] || navigator.language)) ||
    'en-US';

  const format = 'MM/dd/yyyy'; // en-US format: month/day/year

  const effectiveDisplay = selectedDate
    ? showMonthYearPicker
      ? new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(selectedDate)
      : formatDateFn(selectedDate, format)
    : 'Click to pick a date';

  const datePickerFormat = showMonthYearPicker ? 'MMMM yyyy' : format;

  return (

    <div ref={containerRef} className={`${className ?? ''} relative inline-block`}>
      <div
        onClick={() => setShowCalendar(true)}
        className="cursor-pointer transition-colors"
      >
        {effectiveDisplay}
      </div>

      {showCalendar && (
        <div ref={calendarRef} className="absolute mt-2 z-1000 shadow-lg border border-gray-200 rounded bg-white">
          <DatePicker
            dropdownMode='select'
            selected={selectedDate}
            locale={locale}
            onClickOutside={() => setShowCalendar(false)}
            showMonthYearPicker={showMonthYearPicker}
            dateFormat={datePickerFormat}
            // scrollableYearDropdown
            // yearDropdownItemNumber={100} // Show 100 years to scroll easily
            onChange={(d) => {
              if (d) {
                setSelectedDate(d);
                setShowCalendar(false);
                onChange?.(d);
              }
            }}
            inline
          />
        </div>
      )}
    </div>
  );
}
