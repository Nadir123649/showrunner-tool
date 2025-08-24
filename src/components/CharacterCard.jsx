import React from 'react';

export default function CharacterCard({ character, onGenerateImage }) {
  return (
    <div className="relative p-4 overflow-hidden transition-all duration-300 border shadow-lg rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border-white/20 ">
      {/* Image Container */}
      <div className="relative w-full mb-4 overflow-hidden transition-all duration-300 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl aspect-square ">
        {character.image ? (
          <img
            src={character.image}
            alt={character.name}
            className="object-cover w-full h-full transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-indigo-500/20 to-purple-500/20 ">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="mb-3 text-sm text-gray-400">No image generated yet</div>
            <button
              onClick={() => onGenerateImage(character.id)}
              className="px-4 py-2 text-xs font-medium text-white transition-all duration-200 bg-indigo-400 rounded-lg hover:bg-indigo-500"
            >
              Generate Image
            </button>
          </div>
        )}

        {/* Character Status Badge */}
        <div className="absolute top-3 left-3">
          <div className="px-2 py-1 text-xs font-medium text-white rounded-full bg-black/50 backdrop-blur-sm">
            {character.image ? '🖼️' : '📝'}
          </div>
        </div>
      </div>

      {/* Character Info */}
      <div className="mt-auto space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white transition-colors duration-200 group-hover:text-indigo-300">
            {character.name}
          </h3>
        </div>

        {character.caption && (
          <div className="text-xs leading-relaxed text-gray-300">
            {character.caption}
          </div>
        )}
      </div>
    </div>
  );
}