'use client';

import { useState } from 'react';
import { storyService } from '../services/storyService';

export const useStoryManager = () => {
    const [currentStory, setCurrentStory] = useState(null);
    const [storyHistory, setStoryHistory] = useState([]);
    const [loadingText, setLoadingText] = useState('');

    const generateStory = async (prompt) => {
        setLoadingText('Crafting your story...');
        try {
            const storyData = await storyService.generateStory(prompt);
            setCurrentStory(storyData);
            setStoryHistory(prev => [storyData, ...prev]);
            return true;
        } catch (error) {
            console.error("Error generating story:", error);
            throw new Error("Failed to generate the story. Please try again.");
        }
    };

    const updateScene = async (sceneId, updatedProperties) => {
        try {
            if (!currentStory) return;

            await storyService.updateScene(currentStory.id, sceneId, updatedProperties);
            
            const updatedScenes = currentStory.scenes.map(scene => 
                scene.id === sceneId ? { ...scene, ...updatedProperties } : scene
            );
            
            const updatedStory = { ...currentStory, scenes: updatedScenes };
            setCurrentStory(updatedStory);
            setStoryHistory(prev => prev.map(s => s.id === updatedStory.id ? updatedStory : s));
        } catch (error) {
            console.error("Failed to save scene:", error);
            throw new Error("Could not save your changes. Please check your connection.");
        }
    };

    const reorderScenes = async (newScenes) => {
        try {
            if (!currentStory) return;

            await storyService.reorderScenes(currentStory.id, newScenes);
            
            const updatedStory = { ...currentStory, scenes: newScenes };
            setCurrentStory(updatedStory);
            setStoryHistory(prev => prev.map(s => s.id === updatedStory.id ? updatedStory : s));
        } catch (error) {
            console.error("Failed to reorder scenes:", error);
            throw new Error("Could not save the new scene order.");
        }
    };

    const loadStory = (storyId) => {
        const storyToLoad = storyHistory.find(s => s.id === storyId);
        if (storyToLoad) {
            setCurrentStory(storyToLoad);
            window.scrollTo(0, 0);
            return true;
        }
        return false;
    };

    const resetCurrentStory = () => {
        setCurrentStory(null);
    };

    return {
        currentStory,
        storyHistory,
        loadingText,
        generateStory,
        updateScene,
        reorderScenes,
        loadStory,
        resetCurrentStory
    };
};
