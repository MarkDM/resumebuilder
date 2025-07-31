import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { type ReactNode, useEffect, useState } from 'react';

// Wrapper component to make each child sortable
function SortableItem({ id, children }: { id: string; children: ReactNode }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        const target = e.target as HTMLElement;
        if (
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable
        ) {
            e.stopPropagation(); // Prevent drag start
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onPointerDownCapture={handlePointerDown}
        >
            {children}
        </div>
    );
}


type SortableListProps = {
    children: ReactNode[];
};

export default function SortableList({ children }: SortableListProps) {
    const [order, setOrder] = useState(
        children.map((_, index) => index.toString())
    );


    useEffect(() => {
        setOrder(children.map((_, index) => index.toString()));

    }, [children]);


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5, },

        })
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
                if (over && active.id !== over.id) {
                    const oldIndex = order.indexOf(active.id as string);
                    const newIndex = order.indexOf(over.id as string);
                    setOrder((order) => arrayMove(order, oldIndex, newIndex));
                }
            }}
        >
            <SortableContext items={order} strategy={verticalListSortingStrategy}>
                {order.map((key, i) => (
                    <SortableItem key={key} id={key}>
                        {children[parseInt(key)]}
                    </SortableItem>
                ))}
            </SortableContext>
        </DndContext>
    );
}
