import React from "react";
import { useDraggable } from "@dnd-kit/core";
import CharacterCard from "./CharacterCard";

function DraggableCharacter({ character, onGenerateImage }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: character.id,
  });

  const style = transform
    ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      zIndex: 1000,
    }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab active:cursor-grabbing transition-all duration-200 ${
        isDragging ? 'scale-105 shadow-2xl' : 'hover:scale-105'
      }`}
    >
      <CharacterCard
        character={character}
        onGenerateImage={onGenerateImage}
      />
    </div>
  );
}

export default function CharacterGrid({ items, onGenerateImage }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((character) => (
        <DraggableCharacter
          key={character.id}
          character={character}
          onGenerateImage={onGenerateImage}
        />
      ))}
    </div>
  );
}