'use client';

const PreviewWindow = ({ activeScene, isPlaying }) => (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
        <img src={activeScene.imageUrl} alt={`Scene ${activeScene.id}`} className="w-full h-full object-cover" />
        {activeScene.text && activeScene.text.trim() !== '' && (
            <div className="absolute inset-0 flex items-end justify-center p-4 pb-8">
                <span className="bg-black bg-opacity-50 text-white text-3xl font-bold p-4 rounded text-center max-w-full break-words">
                    {activeScene.text}
                </span>
            </div>
        )}
    </div>
);

export default PreviewWindow;
