import React from 'react';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">❓</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Help & Instructions</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-200">
          {/* Getting Started */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Getting Started</span>
            </h3>
            <div className="space-y-2 text-sm">
              <p>Welcome to Showrunner Builder! This AI-powered tool helps you create and manage characters for your scripts.</p>
              <p>The app automatically detects characters from your script and allows you to generate AI images for each one.</p>
            </div>
          </section>

          {/* Character Management */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Character Management</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                <div>
                  <p className="font-medium text-white">View Characters</p>
                  <p className="text-gray-400">All detected characters are displayed in the grid with their names and auto-generated captions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                <div>
                  <p className="font-medium text-white">Generate Images</p>
                  <p className="text-gray-400">Click "Generate Image" on individual characters or use "Generate All Images" to create AI-generated portraits.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Drag & Drop */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>Building Your Scene</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">1</div>
                <div>
                  <p className="font-medium text-white">Drag Characters</p>
                  <p className="text-gray-400">Click and drag any character from the grid to the Scene Zone on the right.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">2</div>
                <div>
                  <p className="font-medium text-white">Scene Zone</p>
                  <p className="text-gray-400">Drop characters here to build your scene. Each character can only appear once in the scene.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">3</div>
                <div>
                  <p className="font-medium text-white">Manage Scene</p>
                  <p className="text-gray-400">Remove characters from the scene or clear the entire scene using the toolbar buttons.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>Features</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="font-medium text-white mb-1">🎨 AI Image Generation</p>
                <p className="text-gray-400">Powered by Replicate API for high-quality character portraits</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="font-medium text-white mb-1">💾 Auto-Save</p>
                <p className="text-gray-400">Your scene is automatically saved to localStorage</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="font-medium text-white mb-1">🔔 Smart Notifications</p>
                <p className="text-gray-400">Real-time feedback for all actions</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="font-medium text-white mb-1">📱 Responsive Design</p>
                <p className="text-gray-400">Works perfectly on all devices</p>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Pro Tips</span>
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Generate images for all characters first, then build your scene</p>
              <p>• Use the Scene Zone to visualize character interactions</p>
              <p>• Your scene automatically saves as you work</p>
              <p>• Refresh the page to see your saved scene</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-white font-medium transition-all duration-200"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
