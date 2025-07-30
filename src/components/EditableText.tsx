import { useState, useRef, useEffect, type ReactNode } from 'react';
import { Pencil } from 'lucide-react';

type EditableTextProps = {
    children: ReactNode;
    className?: string;
    onChange?: (newValue: string) => void;
};

export default function EditableText({ children, className, onChange }: EditableTextProps) {
    const initialText = typeof children === 'string' ? children : 'xxxx';
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialText);
    const inputRef = useRef<HTMLInputElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const [inputWidth, setInputWidth] = useState(0);

    useEffect(() => {
        setValue(initialText)
    }, [children])

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        if (spanRef.current) {
            setInputWidth(spanRef.current.offsetWidth + 2); // add a bit of padding
        }
    }, [value, isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        onChange?.(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            onChange?.(value);
        }
    };

    return (
        <div className={`inline-block group ${className}`}>
            {/* Hidden span for measuring input width */}
            <span
                ref={spanRef}
                className="invisible absolute whitespace-pre font-inherit px-1"
            >
                {value || ' '}
            </span>

            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    style={{ width: inputWidth }}
                    className='border px-1 focus:border-secondary focus:outline-1 rounded'
                />
            ) : (
                <div
                    onClick={() => setIsEditing(true)}
                    className="cursor-pointer inline-flex items-center gap-1"
                >
                    <span>{value}</span>
                    <Pencil
                        size={14}
                        className="opacity-0 text-lg group-hover:opacity-100 transition-opacity"
                    />
                </div>
            )}
        </div>
    );
}
