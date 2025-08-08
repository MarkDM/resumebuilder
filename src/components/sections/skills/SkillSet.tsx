import { useResumeStore } from "../../../stores/ResumeStore";
import EditableText from "../../EditableText";
import { FaPlusCircle } from "react-icons/fa";
import { Trash } from "lucide-react";
import SortableList from "../../SortableList";
import SkillComponent from "./SkillComponent";

function SkillSet({ className }: { className?: string }) {
    const skillSet = useResumeStore((state) => state.skillSet);
    const setSkillSet = useResumeStore((state) => state.setSkillSet);
    const updateSkill = useResumeStore((state) => state.updateSkill);
    const addSkill = useResumeStore((state) => state.addSkill);
    const removeSkill = useResumeStore((state) => state.removeSkill);

    return (
        <div className={`group/all flex flex-col ${className}`}>
            <div className="flex flex-row items-start  gap-2">
                <EditableText
                    className="resume_text h-full  font-semibold mb-2"
                    onChange={(newValue) => {
                        setSkillSet({
                            ...skillSet,
                            title: newValue.trim().length === 0 ? "Skills" : newValue,
                        });
                    }}
                >
                    {skillSet.title || "Skills"}
                </EditableText>

                <button
                    className="text-primary flex hover:underline text-sm opacity-0 group-hover/all:opacity-100 transition-opacity duration-200"
                    onClick={() => {
                        const newSkill = {
                            id: String(skillSet.skills.length + 1),
                            name: "New skill",
                            level: 9,
                        };
                        addSkill(newSkill);
                    }}
                >
                    <FaPlusCircle size={16} className="text-center inline" />
                </button>
            </div>

            <div className="text-sm -ml-5 text-gray-500">
                {skillSet.skills.length === 0 ? (
                    <div className="ml-5 text-sm text-gray-500">
                        No skills added yet. Click "Add" to start.
                    </div>
                ) : (
                    <SortableList>
                        {skillSet.skills.map((skill) => (
                            <div className="group/item relative" key={skill.id}>
                                <SkillComponent
                                    className="ml-5 mt-2"
                                    key={skill.id}
                                    skill={skill}
                                    onLevelChange={(newLevel) => {
                                        updateSkill({ ...skill, level: newLevel });
                                    }}
                                />
                                <div className="absolute flex -ml-2 left-0 top-0 h-full opacity-0 group-hover/item:opacity-50 transition-opacity duration-200">
                                    <div className="flex flex-col h-full items-center justify-evenly">
                                        <button
                                            className="text-red-500 text-sm"
                                            onClick={() => removeSkill(skill.id)}
                                        >
                                            <Trash size={16} />
                                        </button>
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

export default SkillSet;
