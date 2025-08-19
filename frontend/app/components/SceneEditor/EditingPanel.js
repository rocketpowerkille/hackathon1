'use client';

const EditingPanel = ({ activeScene, onTextChange, onDurationChange, isPlaying, onPlayToggle }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4">Edit Scene</h3>
        <div className="space-y-6">
            <div>
                <label htmlFor="scene-text" className="block text-sm font-medium text-gray-700 mb-1">Text</label>
                <textarea 
                    id="scene-text" 
                    value={activeScene.text} 
                    onChange={onTextChange} 
                    rows="4" 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="scene-duration" className="block text-sm font-medium text-gray-700 mb-1">Duration (seconds)</label>
                <input 
                    id="scene-duration" 
                    type="number" 
                    step="0.5" 
                    value={activeScene.duration} 
                    onChange={onDurationChange} 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button 
                onClick={onPlayToggle} 
                className="w-full bg-gray-900 text-white py-3 px-6 font-semibold rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
                {isPlaying ? (
                    <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"></path>
                        </svg>
                        Pause
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4z"></path>
                        </svg>
                        Play Story
                    </>
                )}
            </button>
        </div>
    </div>
);

export default EditingPanel;
