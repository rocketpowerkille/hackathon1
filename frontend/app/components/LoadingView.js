'use client';

const LoadingView = ({ text }) => (
    <div className="text-center max-w-2xl mx-auto">
        <div className="flex justify-center items-center mb-6">
            <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-gray-900 animate-spin"></div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">{text}</h2>
        <p className="text-gray-600 mt-2">This may take a few moments. Please wait.</p>
    </div>
);

export default LoadingView;
