'use client';

import { useState, useRef, useEffect } from 'react';
import PreviewWindow from './PreviewWindow';
import Timeline from './Timeline';
import EditingPanel from './EditingPanel';
import StoryGallery from './StoryGallery';

const SceneEditorView = ({ story, storyHistory, onLoadStory, onUpdateScene, onReorderScenes }) => {
    const [activeSceneId, setActiveSceneId] = useState(story.scenes[0]?.id || null);
    const [isPlaying, setIsPlaying] = useState(false);
    const playbackTimeoutRef = useRef(null);
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    const activeScene = story.scenes.find(s => s.id === activeSceneId);

    // Effect to handle story playback
    useEffect(() => {
        if (isPlaying && activeScene) {
            const activeIndex = story.scenes.findIndex(s => s.id === activeSceneId);
            const nextIndex = (activeIndex + 1) % story.scenes.length;
            
            playbackTimeoutRef.current = setTimeout(() => {
                setActiveSceneId(story.scenes[nextIndex].id);
            }, activeScene.duration * 1000);
        } else {
            clearTimeout(playbackTimeoutRef.current);
        }
        
        return () => clearTimeout(playbackTimeoutRef.current);
    }, [isPlaying, activeSceneId, story.scenes, activeScene]);

    const handleTextChange = (e) => {
        onUpdateScene(activeSceneId, { text: e.target.value });
    };

    const handleDurationChange = (e) => {
        onUpdateScene(activeSceneId, { duration: parseFloat(e.target.value) || 0 });
    };

    const togglePlayback = () => {
        setIsPlaying(!isPlaying);
    };
    
    const selectScene = (sceneId) => {
        setIsPlaying(false);
        setActiveSceneId(sceneId);
    };

    const handleDragStart = (index) => {
        dragItem.current = index;
    };

    const handleDragEnter = (index) => {
        dragOverItem.current = index;
    };

    const handleDrop = () => {
        const newScenes = [...story.scenes];
        const draggedItemContent = newScenes.splice(dragItem.current, 1)[0];
        newScenes.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        onReorderScenes(newScenes);
    };

    if (!activeScene) {
        return <div className="text-center text-red-500">Error: No scenes found for this story.</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-4">
                    <PreviewWindow activeScene={activeScene} isPlaying={isPlaying} />
                    <Timeline 
                        scenes={story.scenes} 
                        activeSceneId={activeSceneId}
                        onSceneSelect={selectScene}
                        onDragStart={handleDragStart}
                        onDragEnter={handleDragEnter}
                        onDrop={handleDrop}
                    />
                </div>
                <EditingPanel 
                    activeScene={activeScene}
                    onTextChange={handleTextChange}
                    onDurationChange={handleDurationChange}
                    isPlaying={isPlaying}
                    onPlayToggle={togglePlayback}
                />
            </div>
            <StoryGallery storyHistory={storyHistory} onLoadStory={onLoadStory} />
        </div>
    );
};

export default SceneEditorView;
