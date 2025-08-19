'use client';

const Header = ({ onNewStoryClick, onLogout }) => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    <span className="ml-3 text-xl font-semibold">Story Weaver</span>
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

export default Header;
