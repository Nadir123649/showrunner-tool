import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCharacters, sampleScript } from './utils/scriptParser';
import CharacterGrid from './components/CharacterGrid';
import SceneZone from './components/SceneZone';
import Toolbar from './components/Toolbar';
import HelpModal from './components/HelpModal';
import useReplicate from './hooks/useReplicate';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

const LS_KEY = 'abyss_scene_v1';

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [scene, setScene] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const { generateImage, loading, error } = useReplicate();

  useEffect(() => {
    const detected = parseCharacters(sampleScript);
    setCharacters(detected);
  }, []);

  // Load persisted scene
  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setScene(parsed);
      } catch { }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(scene));
  }, [scene]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && over.id === 'scene-zone') {
      const characterId = active.id;
      const character = characters.find(c => c.id === characterId);

      if (character && !scene.some(c => c.id === characterId)) {
        // Create a new object for the scene to avoid reference issues
        const sceneCharacter = {
          ...character,
          sceneId: `${characterId}-${Date.now()}` // Unique ID for scene instance
        };

        setScene(prev => [...prev, sceneCharacter]);
        toast.success(`${character.name} added to the scene.`);
      }
    }
  };

  const handleRemoveFromScene = (sceneId) => {
    setScene(prev => prev.filter(item => item.sceneId !== sceneId));
    toast.info('Character removed from scene');
  };

  const handleGenerateAll = async () => {
    for (let i = 0; i < characters.length; i++) {
      const c = characters[i];
      if (c.image) continue;

      toast.info(`Generating image for ${c.name}...`);
      const url = await generateImage(c.prompt);

      if (url) {
        setCharacters(prev => prev.map(x =>
          x.id === c.id ? { ...x, image: url } : x
        ));

        // Also update the character in the scene if it exists there
        setScene(prev => prev.map(item =>
          item.id === c.id ? { ...item, image: url } : item
        ));

        toast.success(`Image generated for ${c.name}!`);
      } else if (error) {
        toast.error(`Failed to generate image for ${c.name}`);
        break;
      }
    }
  };

  const handleGenerateSingle = async (characterId) => {
    const character = characters.find(c => c.id === characterId);
    if (!character) return;

    toast.info(`Generating image for ${character.name}...`);
    const url = await generateImage(character.prompt);

    if (url) {
      setCharacters(prev => prev.map(x =>
        x.id === characterId ? { ...x, image: url } : x
      ));

      // Also update the character in the scene if it exists there
      setScene(prev => prev.map(item =>
        item.id === characterId ? { ...item, image: url } : item
      ));

      toast.success(`Image generated for ${character.name}!`);
    } else if (error) {
      toast.error(`Failed to generate image for ${character.name}`);
    }
  };

  const handleClearScene = () => {
    setScene([]);
    toast.info('Scene cleared');
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-[#181818]">
        <div className="container px-4 py-8 mx-auto max-w-7xl">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold text-indigo-400 ">
                  Showrunner Builder
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowHelp(true)}
                className="p-3 transition-all duration-200 bg-white/10 hover:bg-white/20 rounded-xl group"
                title="Help & Instructions"
              >
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="p-5 border bg-white/5 backdrop-blur-sm rounded-2xl border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="flex items-center space-x-2 text-xl font-semibold text-white">
                    <span>Detected Characters</span>
                    <span className="text-sm text-gray-400">({characters.length})</span>
                  </h2>
                  <button
                    onClick={handleGenerateAll}
                    disabled={loading}
                    className="flex items-center px-4 py-2 space-x-2 font-medium text-white transition-all duration-200 bg-indigo-400 rounded-lg hover:to-purple-700 disabled:opacity-50"
                  >
                    {loading ? (
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

                <CharacterGrid
                  items={characters}
                  onGenerateImage={handleGenerateSingle}
                />
              </div>
            </div>

            {/* Scene Zone */}
            <div className="lg:col-span-1">
              <SceneZone
                sceneItems={scene}
                onRemoveFromScene={handleRemoveFromScene}
              />
            </div>
          </div>

          {/* Toolbar */}
          <div className="mt-8">
            <Toolbar
              onGenerateImages={handleGenerateAll}
              generating={loading}
              onClearScene={handleClearScene}
              sceneCount={scene.length}
            />
          </div>
        </div>

        {/* Help Modal */}
        <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          toastClassName="bg-white/10 backdrop-blur-sm border border-white/20"
          bodyClassName="text-white"
        />
      </div>
    </DndContext>
  );
}