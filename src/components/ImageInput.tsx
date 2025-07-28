import { useEffect, useRef, useState } from 'react';


interface ImageSelectorProps {
    style?: React.CSSProperties;
    className?: string;
    onChangeImage: (imageBase64: string) => void;
}

function ImageInput({ style, className, onChangeImage }: ImageSelectorProps) {

    const inputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);

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
    return (
        <div
            className={`relative bg-gray-400 rounded-lg aspect-square h-[100%] shrink-0 overflow-hidden ${className || ''}`}
            style={style}
        >
            {image && (
                <img
                    src={image}
                    alt="Selected"
                    className="object-cover w-full h-full rounded-lg"
                />
            )}
            <input
                ref={inputRef}
                type="file"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                }}
            />
            <div className="flex flex-col absolute inset-0 opacity-0 hover:opacity-80 bg-black items-center justify-center transition-opacity">
                <button
                    type="button"
                    className="px-4 py-2 text-sm font-bold "
                    onClick={(e) => {
                        e.stopPropagation();
                        inputRef.current?.click()
                    }}
                >
                    Edit
                </button>

                {
                    image && <button
                        type="button"
                        className="px-4 py-2 text-sm text-red-500 font-bold"
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
                }

            </div>
        </div>
    )
}

export default ImageInput
