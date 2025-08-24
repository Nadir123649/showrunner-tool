import React from 'react';

export default function Toolbar({ onGenerateImages, generating, onClearScene, sceneCount }) {
  return (
    <div className="p-6 border bg-white/5 backdrop-blur-sm rounded-2xl border-white/10">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Left Side - Scene Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
          
            <div>
              <p className="text-lg font-bold text-indigo-400 ">Scene Status</p>
              <p className="text-sm font-semibold text-white">
                {sceneCount === 0 ? 'Empty' : `${sceneCount} Character${sceneCount === 1 ? '' : 's'}`}
              </p>
            </div>
          </div>
          
          {sceneCount > 0 && (
            <div className="hidden w-px h-8 sm:block bg-white/20" />
          )}
          
          {sceneCount > 0 && (
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Scene Active</span>
            </div>
          )}
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-3">
          {sceneCount > 0 && (
            <button
              onClick={onClearScene}
              className="flex items-center px-4 py-2 space-x-2 font-medium text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 hover:shadow-lg hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Clear Scene</span>
            </button>
          )}
          
          <button
            onClick={onGenerateImages}
            disabled={generating}
            className="flex items-center px-6 py-2 space-x-2 font-medium text-white transition-all duration-200 bg-indigo-400 rounded-lg"
          >
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Generate All Images</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar for Generation */}
      {generating && (
        <div className="mt-4">
          <div className="w-full h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse"></div>
          </div>
          <p className="mt-2 text-sm text-center text-gray-400">AI is creating your character portraits...</p>
        </div>
      )}
    </div>
  );
}