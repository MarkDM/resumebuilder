import { useEffect, useRef, useState } from 'react';
import EditableText from '../../EditableText';
import type { Link } from '../../../types/Link';
import EditableTextArea from '../../EditableTextArea';

type LinkComponentProps = {
  link: Link;
  className?: string;
  onUpdate: (id: string, changes: Partial<Link>) => void;
};

function LinkComponent({ link, className, onUpdate }: LinkComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [url, setUrl] = useState(link.url);
  const [description, setDescription] = useState(link.description || '');


  useEffect(() => {

    if (!isEditing) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (editorRef.current && !editorRef.current.contains(e.target as Node)) {
        setIsEditing(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsEditing(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditing]);

  return (
    <div ref={containerRef} className={`relative ${className || ''}`}>
      <div
        className="cursor-pointer"
        onClick={() => setIsEditing(true)}
        aria-label="Open link editor"
      >
        <a href={link.url} className="text-primary pointer-events-none">{link.description}</a>
      </div>

      {isEditing && (
        <div
          ref={editorRef}
          className={`bg-gray-200 absolute mt-0 z-50 rounded-md border  p-3 shadow-lg`}
          style={{
            //width: '200px',
            //left: '-30px'
          }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Edit link"
        >
          <div className="space-x-2 flex flex-col">
            
            <EditableTextArea
              className="border border-gray-500 focus-within:ring-2 focus-within:ring-primary rounded p-1 text-primary text-sm"
              value={url}
              rows={1}
              placeholder="Link URL"
              onChange={(val: string) => {
                setUrl(val);
                onUpdate(link.id, { url: val });
              }}
            />

            <EditableTextArea
              className="border border-gray-500 focus-within:ring-2 focus-within:ring-primary rounded p-1 mt-2 text-sm"
              value={description}
              rows={1}
              placeholder="Link description"
              onChange={(val: string) => {
                setDescription(val);
                onUpdate(link.id, { description: val });
              }}
            />
          </div>

        </div>
      )}
    </div>
  );
}

export default LinkComponent;
