import { useEffect, useRef, useState } from 'react';


interface ImageSelectorProps {
    style?: React.CSSProperties;
    className?: string;
    onChangeImage: (imageBase64: string) => void;
}

export default function ImageSelector({ style, className, onChangeImage }: ImageSelectorProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);


    useEffect(() => {
        onChangeImage(image || '')
    }, [image])

    const handleFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = ev => {
                setImage(ev.target?.result as string);
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
        <div className={`${className}`} style={style}>
            <div
                className={`${image != null ? 'p-0' : 'p-10'} border-2 rounded-2xl cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/50' : image != null ? 'border-none' : 'border-dashed border-secondary'}
                    }`}
                onClick={() => {
                    if (!image) inputRef.current?.click();
                }}
                onDragOver={e => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                {image ? (
                    <div className="flex flex-col items-center gap-4">
                        <img
                            src={image}
                            onClick={(e) => {
                                e.stopPropagation();
                                inputRef.current?.click();
                            }}
                            alt="Preview"
                            className="max-h-20 rounded-lg"
                        />
                        <div className="flex gap-3">
                            <button
                                className="py-1 px-2 text-xs button-primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    inputRef.current?.click();
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="p-1 text-xs button-danger"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setImage(null);

                                    if (inputRef.current) {
                                        inputRef.current.value = ''; //clear file input
                                    }
                                }}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        Select or drop image
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={e => {
                        const file = e.target.files?.[0];
                        console.log(file)
                        if (file) handleFile(file);
                    }}
                />
            </div>
        </div>
    );
}
