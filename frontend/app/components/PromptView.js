'use client';

import { useState } from 'react';

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

export default PromptView;
