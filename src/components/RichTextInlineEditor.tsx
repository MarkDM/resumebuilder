import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import ReactQuill from 'react-quill-new';

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


  const [content, setContent] = useState<string>(initialContent);
  const [isEditing, setIsEditing] = useState(false);


  // Click outside to save
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onChange?.(content);
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
          style={{
            padding: '0px',

          }}
          className="p-0 ql-editor max-w-none rounded cursor-pointer"
          onClick={() => setIsEditing(true)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
