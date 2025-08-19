// Mock data generation (remove when implementing real backend)
const generateMockStory = (prompt) => ({
    id: `story_${Date.now()}`,
    prompt: prompt,
    scenes: [
        { id: 1, imageUrl: 'https://placehold.co/1280x720/a2d2ff/ffffff?text=Scene+1', text: 'In a world of vibrant colors...', duration: 4 },
        { id: 2, imageUrl: 'https://placehold.co/1280x720/bde0fe/ffffff?text=Scene+2', text: 'a new adventure began.', duration: 5 },
        { id: 3, imageUrl: 'https://placehold.co/1280x720/ffafcc/ffffff?text=Scene+3', text: 'Anything was possible.', duration: 4 },
    ]
});

export const storyService = {
    generateStory: async (prompt) => {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/stories', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ prompt }),
        // });
        // if (!response.ok) throw new Error('Story generation failed');
        // return await response.json();

        await new Promise(resolve => setTimeout(resolve, 2000));
        return generateMockStory(prompt);
    },

    updateScene: async (storyId, sceneId, updatedProperties) => {
        // TODO: Implement actual API call
        // const response = await fetch(`/api/stories/${storyId}/scenes/${sceneId}`, {
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(updatedProperties),
        // });
        // if (!response.ok) throw new Error('Failed to update scene');
        // return await response.json();
        
        return Promise.resolve({ success: true });
    },

    reorderScenes: async (storyId, scenes) => {
        // TODO: Implement actual API call
        // const response = await fetch(`/api/stories/${storyId}/scenes/reorder`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ scenes }),
        // });
        // if (!response.ok) throw new Error('Failed to reorder scenes');
        // return await response.json();

        return Promise.resolve({ success: true });
    }
};
