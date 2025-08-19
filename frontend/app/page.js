// This single file represents a complete Next.js page component.
// In a real Next.js project, you would typically split these components into separate files
// inside a `components` directory for better organization.
// Make sure you have Tailwind CSS set up in your Next.js project.

'use client'; // This directive is necessary for using React hooks like useState, useEffect, and useRef.

import React, { useState, useEffect, useRef } from 'react';

// --- Reusable UI Components ---

// Header Component
const Header = ({ onNewStoryClick, onLogout }) => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    <span className="ml-3 text-xl font-semibold">AI Story Weaver</span>
                </div>
                <div className="flex items-center gap-4">
                     <button onClick={onLogout} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                        Logout
                    </button>
                    <button onClick={onNewStoryClick} className="bg-gray-900 text-white hover:bg-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                        + New Story
                    </button>
                </div>
            </div>
        </div>
    </header>
);

// Prompt View Component
const PromptView = ({ onGenerate }) => {
    const [prompt, setPrompt] = useState('');

    const handleGenerateClick = () => {
        if (prompt.trim()) {
            onGenerate(prompt);
        }
    };

    return (
        <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">Bring your imagination to life.</h1>
            <p className="text-lg text-gray-600 mb-8">Describe the story you want to create. Be as detailed as you wish.</p>
            <div className="bg-white p-2 rounded-xl shadow-md">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-32 p-4 border-2 border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="e.g., A futuristic city at sunset, with flying cars and neon signs..."
                />
            </div>
            <button onClick={handleGenerateClick} className="mt-6 w-full sm:w-auto bg-gray-900 text-white py-3 px-8 text-lg font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors">
                Generate Story
            </button>
        </div>
    );
};

// Loading View Component
const LoadingView = ({ text }) => (
    <div className="text-center max-w-2xl mx-auto">
        <div className="flex justify-center items-center mb-6">
            <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-gray-900 animate-spin"></div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">{text}</h2>
        <p className="text-gray-600 mt-2">This may take a few moments. Please wait.</p>
    </div>
);

// Player and Editor View Component
const PlayerView = ({ story, onAddSubtitle, storyHistory, onLoadStory, onDeleteSubtitle, onVideoReady }) => {
    const videoRef = useRef(null);
    const [activeSubtitle, setActiveSubtitle] = useState('');
    
    const [subtitleText, setSubtitleText] = useState('');
    const [startTime, setStartTime] = useState('0');
    const [endTime, setEndTime] = useState('5');

    // Effect to notify parent component when video is ready to play
    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const handleCanPlay = () => onVideoReady();
            videoElement.addEventListener('canplay', handleCanPlay);
            return () => videoElement.removeEventListener('canplay', handleCanPlay);
        }
    }, [story.videoSrc, onVideoReady]);


    const handleTimeUpdate = () => {
        if (!videoRef.current || !story.subtitles) return;
        const currentTime = videoRef.current.currentTime;
        const currentSubtitle = story.subtitles.find(
            sub => currentTime >= sub.startTime && currentTime <= sub.endTime
        );
        setActiveSubtitle(currentSubtitle ? currentSubtitle.text : '');
    };
    
    const handleAddSubtitleClick = () => {
        const start = parseFloat(startTime);
        const end = parseFloat(endTime);
        if (subtitleText.trim() && !isNaN(start) && !isNaN(end) && start < end) {
            onAddSubtitle({
                id: Date.now(),
                text: subtitleText,
                startTime: start,
                endTime: end,
            });
            setSubtitleText('');
        } else {
            alert("Please check your inputs. Subtitle text cannot be empty and start time must be less than end time.");
        }
    };

    const handleCaptureTime = () => {
        if (videoRef.current) {
            setStartTime(videoRef.current.currentTime.toFixed(2));
        }
    };

    const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative bg-black">
                    <video
                        ref={videoRef}
                        key={story.videoSrc}
                        className="w-full"
                        controls
                        poster={story.poster}
                        onTimeUpdate={handleTimeUpdate}
                    >
                        <source src={story.videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {activeSubtitle && (
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full px-4 text-center">
                           <span className="bg-black bg-opacity-60 text-white text-2xl font-bold p-2 rounded">
                               {activeSubtitle}
                           </span>
                        </div>
                    )}
                </div>
                
                <div className="p-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Add Subtitle</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                        <div className="md:col-span-2">
                            <label htmlFor="subtitle-text" className="block text-sm font-medium text-gray-700">Text</label>
                            <input
                                id="subtitle-text"
                                type="text"
                                value={subtitleText}
                                onChange={(e) => setSubtitleText(e.target.value)}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Enter subtitle text..."
                            />
                        </div>
                        <div>
                            <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">Start Time (s)</label>
                            <div className="flex items-center gap-2">
                                <input
                                    id="start-time"
                                    type="number"
                                    step="0.1"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                                />
                                <button onClick={handleCaptureTime} title="Use current video time" className="p-2 mt-1 bg-gray-200 hover:bg-gray-300 rounded-lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">End Time (s)</label>
                            <input
                                id="end-time"
                                type="number"
                                step="0.1"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="md:col-span-2">
                             <button onClick={handleAddSubtitleClick} className="w-full bg-gray-900 text-white py-2 px-6 font-semibold rounded-lg hover:bg-gray-700 transition-colors">
                                Add Subtitle
                            </button>
                        </div>
                    </div>
                </div>

                {story.subtitles && story.subtitles.length > 0 && (
                     <div className="p-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">Subtitles</h3>
                        <ul className="space-y-2">
                            {story.subtitles.sort((a,b) => a.startTime - b.startTime).map(sub => (
                                <li key={sub.id} className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
                                    <div>
                                        <p className="font-medium">"{sub.text}"</p>
                                        <p className="text-sm text-gray-600">{formatTime(sub.startTime)} - {formatTime(sub.endTime)}</p>
                                    </div>
                                    <button onClick={() => onDeleteSubtitle(sub.id)} className="text-red-500 hover:text-red-700 p-1">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd"></path></svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Your Creations</h2>
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                    {storyHistory.map(item => (
                        <div key={item.id} onClick={() => onLoadStory(item.id)} className="break-inside-avoid mb-6 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
                            <div className="relative">
                                <img src={item.poster} alt="Video thumbnail" className="w-full h-auto object-cover" onError={(e) => e.target.src='https://placehold.co/600x400/e2e8f0/334155?text=Error'} />
                                {item.subtitles.length > 0 && (
                                     <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs font-bold px-2 py-1 rounded">
                                        {item.subtitles.length} Subtitle{item.subtitles.length > 1 ? 's' : ''}
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <p className="text-gray-700 text-sm truncate">{item.prompt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Admin Login View Component
const AdminLoginView = ({ onLoginAttempt }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLoginAttempt({ username, password });
    };

    return (
        <div className="flex flex-col items-center justify-center pt-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-2">
                    Administrator Login
                </h2>
                <p className="text-center text-sm text-gray-600 mb-8">
                    Please sign in to continue.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <div className="mt-1">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Main App Component (e.g., app/page.js) ---

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [view, setView] = useState('adminLogin'); // Start with the login page
    const [loadingText, setLoadingText] = useState('');
    const [storyHistory, setStoryHistory] = useState([]);
    const [currentStory, setCurrentStory] = useState(null);
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    // --- BACKEND INTEGRATION POINT ---
    const handleGenerate = async (prompt) => {
        setLoadingText('Crafting your story...');
        setView('loading');
        
        try {
            // TODO: Replace with your actual backend API call
            // const response = await fetch('/api/generate-story', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ prompt }),
            // });
            // if (!response.ok) throw new Error('Story generation failed');
            // const storyData = await response.json();

            // --- MOCK DATA (Remove after implementing backend call) ---
            await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate network delay
            const storyData = {
                id: Date.now(),
                prompt: prompt,
                videoSrc: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                poster: `https://placehold.co/600x400/e2e8f0/334155?text=Story+for+${encodeURIComponent(prompt.substring(0,10))}`,
                subtitles: []
            };
            // --- END MOCK DATA ---

            setCurrentStory(storyData);
            setStoryHistory(prev => [storyData, ...prev]);
            setView('player'); 
            setIsVideoLoading(true);
        } catch (error) {
            console.error("Error generating story:", error);
            alert("Failed to generate the story. Please try again.");
            setView('prompt'); // Go back to prompt on error
        }
    };

    // --- BACKEND INTEGRATION POINT ---
    const handleAddSubtitle = async (newSubtitle) => {
        const updatedSubtitles = [...currentStory.subtitles, newSubtitle];
        
        // TODO: Add a backend call here to save the new subtitle
        // try {
        //     await fetch(`/api/stories/${currentStory.id}/subtitles`, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(newSubtitle),
        //     });
        // } catch (error) {
        //     console.error("Failed to save subtitle:", error);
        //     alert("Could not save your subtitle. Please check your connection.");
        //     return; // Don't update UI if backend call fails
        // }

        const updatedStory = { ...currentStory, subtitles: updatedSubtitles };
        setCurrentStory(updatedStory);
        setStoryHistory(prev => prev.map(s => s.id === updatedStory.id ? updatedStory : s));
    };
    
    // --- BACKEND INTEGRATION POINT ---
    const handleDeleteSubtitle = async (subtitleId) => {
        const updatedSubtitles = currentStory.subtitles.filter(sub => sub.id !== subtitleId);

        // TODO: Add a backend call here to delete the subtitle
        // try {
        //     await fetch(`/api/stories/${currentStory.id}/subtitles/${subtitleId}`, {
        //         method: 'DELETE',
        //     });
        // } catch (error) {
        //     console.error("Failed to delete subtitle:", error);
        //     alert("Could not delete your subtitle. Please check your connection.");
        //     return; // Don't update UI if backend call fails
        // }

        const updatedStory = { ...currentStory, subtitles: updatedSubtitles };
        setCurrentStory(updatedStory);
        setStoryHistory(prev => prev.map(s => s.id === updatedStory.id ? updatedStory : s));
    };
    
    const handleLoadStory = (storyId) => {
        // In a real app, this might fetch the full story data from the backend
        const storyToLoad = storyHistory.find(s => s.id === storyId);
        if (storyToLoad) {
            setCurrentStory(storyToLoad);
            setView('player');
            setIsVideoLoading(true);
            window.scrollTo(0, 0);
        }
    };

    const handleNewStory = () => {
        setView('prompt');
        setCurrentStory(null);
    };
    
    // --- BACKEND INTEGRATION POINT ---
    const handleAdminLoginAttempt = async ({ username, password }) => {
        try {
            // TODO: Replace with your actual backend API call for authentication
            // const response = await fetch('/api/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ username, password }),
            // });
            // if (!response.ok) throw new Error('Invalid credentials');
            // const { token } = await response.json(); // Assuming backend returns a token
            
            // For now, we'll use the mock logic
            if (username === 'admin' && password === 'admin') {
                // In a real app, you would save the auth token (e.g., in localStorage or a cookie)
                setIsLoggedIn(true);
                setView('prompt');
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            alert(error.message + '. Please try again.');
        }
    };
    
    const handleLogout = () => {
        // TODO: Add a backend call here to invalidate the session/token if needed
        setIsLoggedIn(false);
        setView('adminLogin');
    };

    const handleVideoReady = () => {
        setIsVideoLoading(false);
    };

    const renderContent = () => {
        // This is the corrected rendering logic
        switch (view) {
            case 'loading':
                return <LoadingView text={loadingText} />;
            case 'adminLogin':
                return <AdminLoginView onLoginAttempt={handleAdminLoginAttempt} />;
            case 'prompt':
                return <PromptView onGenerate={handleGenerate} />;
            case 'player':
                return (
                    <>
                        {isVideoLoading && <LoadingView text="Preparing video..." />}
                        <div style={{ visibility: isVideoLoading ? 'hidden' : 'visible' }}>
                            <PlayerView 
                                story={currentStory} 
                                onAddSubtitle={handleAddSubtitle}
                                onDeleteSubtitle={handleDeleteSubtitle}
                                storyHistory={storyHistory}
                                onLoadStory={handleLoadStory}
                                onVideoReady={handleVideoReady}
                           />
                        </div>
                    </>
                );
            default:
                return null; // Default case
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {isLoggedIn && (
                <Header onNewStoryClick={handleNewStory} onLogout={handleLogout} />
            )}
            <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                {renderContent()}
            </main>
        </div>
    );
}
