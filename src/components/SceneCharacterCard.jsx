import React from 'react';

export default function SceneCharacterCard({ character, onRemove }) {
    return (
        <div className="relative p-4 overflow-hidden transition-all duration-300 border shadow-lg group bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm border-white/20 rounded-xl hover:shadow-xl hover:border-white/30">
            {/* Background Pattern */}
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 group-hover:opacity-100" />

            <div className="relative z-10 flex items-center space-x-4">
                <div className="flex-shrink-0 w-16 h-16 overflow-hidden border rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border-white/20">
                    {character.image ? (
                        <img
                            src={character.image}
                            alt={character.name}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-400/20 to-purple-500/20">
                            <span className="text-2xl">👤</span>
                        </div>
                    )}
                </div>

                {/* Character Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate transition-colors duration-200 group-hover:text-indigo-300">
                        {character.name}
                    </h3>
                    {character.caption && (
                        <p className="mt-1 text-sm text-gray-300 truncate">
                            {character.caption}
                        </p>
                    )}
                </div>

                {/* Remove Button */}
                <button
                    onClick={onRemove}
                    className="flex-shrink-0 p-2 mt-5 text-red-400 transition-all duration-200 rounded-lg bg-red-500/20 hover:bg-red-500/30 hover:text-red-300 hover:scale-110 group/btn"
                    title="Remove from scene"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            {/* Scene Badge */}
            <div className="absolute top-2 right-2">
                <div className="px-2 py-1 text-xs font-medium text-white rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-indigo-600">
                    Scene
                </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 group-hover:opacity-100" />
        </div>
    );
}