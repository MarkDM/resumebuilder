import { useRef, useState } from 'react';

interface FileSelectorProps {
    style?: React.CSSProperties;
    className?: string;
    accept?: string; // e.g. "image/*", "application/pdf", etc.
    onChangeFile: (fileBase64: string, file: File | null) => void;
}

export default function FileSelector({ style, className, accept = '*', onChangeFile }: FileSelectorProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileBase64, setFileBase64] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = (file: File) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = ev => {
                setFileBase64(ev.target?.result as string);
                setFileName(file.name);
                onChangeFile(ev.target?.result as string, file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <div
            className={`${className} border-2 rounded-2xl cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/50' : fileBase64 ? 'border-none' : 'border-dashed border-primary'}`}
            onClick={() => {
                if (!fileBase64) inputRef.current?.click();
            }}
            onDragOver={e => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
        >
            {fileBase64 ? (
                <div className="flex flex-col items-center gap-4">
                    <div className="text-sm">{fileName}</div>
                    <div className="flex gap-3">
                        <button
                            className="py-1 px-2 text-xs button-primary"
                            onClick={e => {
                                e.stopPropagation();
                                inputRef.current?.click();
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="p-1 text-xs button-danger"
                            onClick={e => {
                                e.stopPropagation();
                                setFileBase64(null);
                                setFileName(null);
                                onChangeFile('', null);
                                if (inputRef.current) {
                                    inputRef.current.value = '';
                                }
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center h-full flex items-center justify-center" style={style}>
                    Select or drop file
                </div>
            )}

            <input
                ref={inputRef}
                type="file"
                style={{ display: 'none' }}
                accept={accept}
                onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                }}
            />
        </div>
    );
}
