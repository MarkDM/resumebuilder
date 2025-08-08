import React, { useEffect, useState } from 'react'
import type { Skill } from '../../../types/Skill'
import EditableText from '../../EditableText'

type Props = {
    skill: Skill,
    className?: string,
    // Optional: let parent persist the change
    onLevelChange?: (newLevel: number) => void
}

function SkillComponent({ skill, onLevelChange, className }: Props) {
    // Assume numeric levels 1..5; adjust as needed
    const [level, setLevel] = useState<number>(
        typeof (skill as any).level === 'number' ? (skill as any).level : 1
    )

    const minLevel = 1
    const maxLevel = 10


    // Keep local slider in sync if prop changes
    useEffect(() => {
        setLevel(typeof (skill as any).level === 'number' ? (skill as any).level : 1)
    }, [(skill as any).level])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLevel = Number(e.target.value)
        setLevel(newLevel)
        onLevelChange?.(newLevel)
    }

    return (
        <div className={`flex w-full flex-col items-start gap-0 ${className}`}>
            <EditableText
                className="resume_text font-semibold w-full mb-1"
                onChange={(newValue) => {

                }}
            >
                {skill.name}
            </EditableText>


            <input
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Skill level"
                data-tooltip-place="bottom"
                style={
                    {
                        background: `linear-gradient(to right, var(--secondary-color) ${Math.min(Math.max(((level - minLevel) / (maxLevel - minLevel)) * 100, 0), 100)}%, #ddd ${Math.min(Math.max(((level - minLevel) / (maxLevel - minLevel)) * 100, 0), 100)}%)`
                    }
                }
                type="range"
                min={minLevel}
                max={maxLevel}
                step={1}
                value={level}
                onChange={handleChange}
                aria-label="Skill level"
                className="w-[80%] h-2 rounded appearance-none cursor-pointer"
            />

            {/* <Tooltip id="my-tooltip" /> */}
        </div>
    )
}

export default SkillComponent
