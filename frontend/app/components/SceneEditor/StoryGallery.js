'use client';

const StoryGallery = ({ storyHistory, onLoadStory }) => (
    <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Creations</h2>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {storyHistory.map(item => (
                <div 
                    key={item.id} 
                    onClick={() => onLoadStory(item.id)} 
                    className="break-inside-avoid mb-6 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                >
                    <div className="relative">
                        <img 
                            src={item.scenes[0]?.imageUrl || 'https://placehold.co/600x400/e2e8f0/334155?text=Story'} 
                            alt="Story thumbnail" 
                            className="w-full h-auto object-cover" 
                        />
                        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs font-bold px-2 py-1 rounded">
                            {item.scenes.length} Scene{item.scenes.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                    <div className="p-4">
                        <p className="text-gray-700 text-sm truncate">{item.prompt}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default StoryGallery;
