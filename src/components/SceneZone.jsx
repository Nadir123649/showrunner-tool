import React from "react";
import { useDroppable } from "@dnd-kit/core";
import SceneCharacterCard from "./SceneCharacterCard";

export default function SceneZone({ sceneItems, onRemoveFromScene }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "scene-zone",
  });

  return (
    <div className="h-full">
      <div className="h-full p-6 border bg-white/5 backdrop-blur-sm rounded-2xl border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center space-x-2 text-xl font-semibold text-white">
            <span>Scene Zone</span>
            <span className="text-sm text-gray-400">({sceneItems.length})</span>
          </h2>
        </div>

        <div
          ref={setNodeRef}
          className={`relative p-6 border-2 border-dashed rounded-2xl min-h-[336px] transition-all duration-300 ${isOver
              ? "border-indigo-400 bg-purple-500/10 shadow-lg shadow-purple-500/20"
              : "border-indigo-400/50 bg-white/5"
            }`}
        >
          {/* Drop Zone Indicator */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isOver ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-purple-500/20">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="font-medium text-purple-300">Drop character here</p>
            </div>
          </div>

          {/* Scene Content */}
          <div className="relative z-10">
            {sceneItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-48 mt-4 text-center">
                <p className="text-gray-400 ">Drag characters from the left to build your scene</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {sceneItems.map((character) => (
                  <SceneCharacterCard
                    key={character.sceneId}
                    character={character}
                    onRemove={() => onRemoveFromScene(character.sceneId)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Drop Zone Instructions */}
          {sceneItems.length === 0 && (
            <div className="absolute text-center bottom-4 left-4 right-4">
              <div className="p-2 text-xs text-gray-500 border rounded-lg bg-white/5 border-white/10">
                💡 <span className="font-medium">Tip:</span> Drag characters here to visualize your scene
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 