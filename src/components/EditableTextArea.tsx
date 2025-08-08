import React, {
    useEffect,
    useRef,
    useState,
    type TextareaHTMLAttributes,
    type ForwardedRef,
    forwardRef,
} from 'react';

interface EditableTextAreaProps
    extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
}

const EditableTextArea = forwardRef(function EditableTextArea(
    { value, onChange, placeholder, ...rest }: EditableTextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
) {
    const taRef = useRef<HTMLTextAreaElement | null>(null);

    // Pass external ref if needed
    useEffect(() => {
        if (ref && taRef.current) {
            if (typeof ref === 'function') {
                ref(taRef.current);
            } else {
                ref.current = taRef.current;
            }
        }
    }, [ref]);

    const resize = () => {
        const ta = taRef.current;
        if (!ta) return;

        ta.rows = 1;
        const cs = window.getComputedStyle(ta);
        const lineHeight =
            parseFloat(cs.lineHeight) || (parseFloat(cs.fontSize) || 16) * 1.2;
        const padding =
            parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        const contentHeight = ta.scrollHeight - padding;
        ta.rows = Math.max(1, Math.ceil(contentHeight / lineHeight));
    };

    useEffect(() => {
        resize();
    }, [value]);

    return (
        <textarea
            ref={taRef}
            value={value}
            onChange={(e) => {
                onChange(e.target.value);
                resize();
            }}
            placeholder={placeholder}
            rows={1}
            style={{
                overflow: 'hidden',
                resize: 'none',
                width: '100%',
            }}
            {...rest}
        />
    );
});

export default EditableTextArea;
