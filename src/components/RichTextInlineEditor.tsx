import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

type RichTextInlineEditorProps = {
  children?: ReactNode;
  className?: string;
  onChange?: (newValue: string) => void;
};

function isString(child: ReactNode): child is string {
  return typeof child === 'string';
}

export default function RichTextInlineEditor({
  children,
  className,
  onChange,
}: RichTextInlineEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const initialContent = isString(children)
    ? children.trim().startsWith('<')
      ? children
      : `<p>${children}</p>`
    : '<p>Click to edit</p>';

  //const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');


  const [content, setContent] = useState<string>(initialContent);
  const [isEditing, setIsEditing] = useState(false);


  // Click outside to save
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (isEditing) {
          const html = '';

        }
        setIsEditing(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEditing, onChange]);

  return (
    <div ref={containerRef} className={className}>
      {isEditing ? (
        <ReactQuill theme="snow" value={content} onChange={setContent} />
      ) : (

        <div
          className="prose max-w-none rounded p-2 hover:shadow cursor-pointer"
          onClick={() => setIsEditing(true)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
