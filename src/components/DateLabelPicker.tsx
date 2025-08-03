import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format as formatDateFn } from 'date-fns';

type DateLabelPickerProps = {
  date: Date | null;
  format?: string;
  className?: string;
  onChange?: (newValue: Date) => void;
};

export default function DateLabelPicker({
  date,
  format = 'MM/yyyy',
  className,
  onChange,
}: DateLabelPickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(date);
  const [showCalendar, setShowCalendar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  useEffect(() => {
    if (!showCalendar) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

  const displayDate = selectedDate ? formatDateFn(selectedDate, format) : 'Click to pick a date';

  return (
    <div ref={containerRef} className={`${className} relative inline-block`}>
      <div
        onClick={() => setShowCalendar(true)}
        className="cursor-pointer transition-colors"
      >
        {displayDate}
      </div>

      {showCalendar && (
        <div className="absolute mt-2 z-10 shadow-lg border border-gray-200 rounded bg-white">
          <DatePicker
            selected={selectedDate}
            locale={'pt-BR'}
            showMonthYearPicker
            onChange={(date) => {
              if (date) {
                setSelectedDate(date);
                setShowCalendar(false);
                onChange?.(date);
              }
            }}
            inline
          />
        </div>
      )}
    </div>
  );
}
