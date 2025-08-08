import { useResumeStore } from '../../../stores/ResumeStore';
import EditableText from '../../EditableText';
import { FaLink, FaPlusCircle } from 'react-icons/fa';
import { Trash } from 'lucide-react';
import { TbMenuOrder } from 'react-icons/tb';
import SortableList from '../../SortableList';
import LinkComponent from './LinkComponent';

function ResumeLinks({ className }: { className?: string }) {
  const resumeLinks = useResumeStore((state) => state.links);
  const setResumeLinks = useResumeStore((state) => state.setResumeLinks);
  const updateLink = useResumeStore((state) => state.updateResumeLink);
  const removeLink = useResumeStore((state) => state.removeResumeLink);
  const addLink = useResumeStore((state) => state.addResumeLink);

  return (
    <div className={`group/all flex flex-col ${className}`}>
      <div className="flex flex-row items-center gap-2 mb-2">
        {/* <FaLink className="text-center resume_text" size={15} /> */}
        <EditableText
          className="resume_text font-semibold"
          onChange={(newValue) => {
            setResumeLinks({
              ...resumeLinks,
              title: newValue.trim().length === 0 ? 'Links' : newValue,
            });
          }}
        >
          {resumeLinks.title || 'Links'}
        </EditableText>

        <button
          className="text-primary flex hover:underline text-sm opacity-0 group-hover/all:opacity-100 transition-opacity duration-200"
          onClick={() => {
            const newLink = {
              id: String(resumeLinks.links.length + 1),
              url: 'https://example.com',
              description: 'Link description',
            };
            addLink(newLink);
          }}
        >
          <FaPlusCircle size={16} className="text-center inline" />
        </button>
      </div>

      <div className="text-sm -ml-5 text-gray-500">
        {resumeLinks.links.length === 0 ? (
          <div className="ml-5 text-sm text-gray-500">
            No links added yet. Click "Add" to start.
          </div>
        ) : (
          <SortableList>
            {resumeLinks.links.map((link) => (
              <div className="group/item relative" key={link.id}>
                <LinkComponent
                  key={link.id}
                  link={link}
                  className="ml-5"
                  onUpdate={(id, changes) => {
                    const existing = resumeLinks.links.find((l) => l.id === id);
                    if (!existing) return;
                    updateLink({ ...existing, ...changes, id });
                  }}
                />
                <div className="absolute flex -ml-2 left-0 top-0 h-full opacity-0 group-hover/item:opacity-50 transition-opacity duration-200">
                  <div className="flex flex-col h-full items-center justify-evenly">
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => removeLink(link.id)}
                    >
                      <Trash size={16} />
                    </button>
                    {/* <TbMenuOrder className="text-gray-600" size={16} /> */}
                  </div>
                </div>
              </div>
            ))}
          </SortableList>
        )}
      </div>
    </div>
  );
}

export default ResumeLinks;
