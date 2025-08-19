'use client';

import { useState } from 'react';

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
                <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-2">Administrator Login</h2>
                <p className="text-center text-sm text-gray-600 mb-8">Please sign in to continue.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input id="username" name="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"/>
                    </div>
                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
                        <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"/>
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginView;
