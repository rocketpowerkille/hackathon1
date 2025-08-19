'use client';

const Timeline = ({ scenes, activeSceneId, onSceneSelect, onDragStart, onDragEnter, onDrop }) => (
    <div className="w-full overflow-x-auto pb-2" onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
        <div className="flex items-center gap-3">
            {scenes.map((scene, index) => (
                <div 
                    key={scene.id} 
                    draggable
                    onDragStart={() => onDragStart(index)}
                    onDragEnter={() => onDragEnter(index)}
                    onDragEnd={onDrop}
                    onClick={() => onSceneSelect(scene.id)} 
                    className={`relative shrink-0 w-32 h-20 rounded-md overflow-hidden cursor-grab border-4 ${scene.id === activeSceneId ? 'border-blue-500' : 'border-transparent'}`}
                >
                    <img src={scene.imageUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover pointer-events-none" />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <span className="absolute bottom-1 left-2 text-white font-bold text-sm">Scene {index + 1}</span>
                </div>
            ))}
        </div>
    </div>
);

export default Timeline;
