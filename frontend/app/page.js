'use client';

import { useState } from 'react';
import Header from './components/Header';
import PromptView from './components/PromptView';
import LoadingView from './components/LoadingView';
import AdminLoginView from './components/AdminLoginView';
import SceneEditorView from './components/SceneEditor';
import { useAuth } from './hooks/useAuth';
import { useStoryManager } from './hooks/useStoryManager';
export default function App() {
    const [view, setView] = useState('adminLogin');
    const { isLoggedIn, login, logout } = useAuth();
    const { 
        currentStory, 
        storyHistory, 
        loadingText, 
        generateStory, 
        updateScene, 
        reorderScenes, 
        loadStory, 
        resetCurrentStory 
    } = useStoryManager();

    const handleGenerate = async (prompt) => {
        setView('loading');
        try {
            await generateStory(prompt);
            setView('editor');
        } catch (error) {
            alert(error.message);
            setView('prompt');
        }
    };

    const handleLoadStory = (storyId) => {
        if (loadStory(storyId)) {
            setView('editor');
        }
    };

    const handleNewStory = () => {
        setView('prompt');
        resetCurrentStory();
    };

    const handleAdminLoginAttempt = async ({ username, password }) => {
        try {
            const result = await login(username, password);
            alert(result.message);
            setView('prompt');
        } catch (error) {
            alert(error.message + '. Please try again.');
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setView('adminLogin');
        } catch (error) {
            alert('Logout failed. Please try again.');
        }
    };

    const renderContent = () => {
        switch (view) {
            case 'loading':
                return <LoadingView text={loadingText} />;
            case 'adminLogin':
                return <AdminLoginView onLoginAttempt={handleAdminLoginAttempt} />;
            case 'prompt':
                return <PromptView onGenerate={handleGenerate} />;
            case 'editor':
                if (!currentStory) {
                    return <div className="text-center">No story selected. <button onClick={handleNewStory} className="text-blue-500 underline">Create one</button>.</div>;
                }
                return <SceneEditorView 
                           story={currentStory} 
                           storyHistory={storyHistory}
                           onLoadStory={handleLoadStory}
                           onUpdateScene={updateScene}
                           onReorderScenes={reorderScenes}
                       />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {isLoggedIn && (
                <Header onNewStoryClick={handleNewStory} onLogout={handleLogout} />
            )}
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {renderContent()}
            </main>
        </div>
    );
}
