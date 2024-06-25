import React, { useState } from 'react';
import axios from 'axios';

export default function AddNew({ visible, onClose }) {
    const [newData, setNewData] = useState({
        id: Math.floor(Math.random() * 1000),
        Title: '',
        Author: '',
        Summary: '',
        Publication: new Date().toISOString().split('T')[0]
    });

    const handleOnClose = (e) => {
        if (e.target.id === "modalContainer" || e.target.id === "closeButton") {
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData({
            ...newData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        axios.post('https://667a802abd627f0dcc8f3e5f.mockapi.io/allblogs', newData)
            .then((res) => {
                onClose();
            })
            .catch((err) => {
                console.error("Error adding new post:", err);
            });
    };

    if (!visible) return null;
    return (
        <div className="fixed font-mono inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center" id="modalContainer" onClick={handleOnClose}>
            <div className="bg-white p-7 rounded md:w-2/5 w-full mx-6" onClick={(e) => e.stopPropagation()}>
                <div className='flex flex-row gap-10 justify-between items-center'>
                    <h1 className="font-semibold text-center text-xl text-gray-700">
                        Add a New Blog Here!
                    </h1>
                    <button id="closeButton" onClick={onClose} className="mb-2 text-5xl">×</button>
                </div>
                <br />
                <div className="flex flex-col">
                    <label className="font-semibold mb-3 leading-none">Title -</label>
                    <input
                        type="text"
                        name="Title"
                        className="border border-gray-700 p-2 rounded mb-5"
                        value={newData.Title}
                        onChange={handleChange}
                    />
                    <label className="font-semibold mb-3 leading-none">Author -</label>
                    <input
                        type='text'
                        name="Author"
                        className="border border-gray-700 p-2 rounded mb-5"
                        value={newData.Author}
                        onChange={handleChange}
                    />
                    <label className="font-semibold mb-3 leading-none">Content -</label>
                    <textarea
                        name="Summary"
                        className='border border-gray-700 p-2 rounded mb-5'
                        value={newData.Summary}
                        onChange={handleChange}
                    />
                    <label className="font-semibold mb-3 leading-none">Publication Date -</label>
                    <input
                        type='date'
                        name="Publication"
                        className="border border-gray-700 p-2 rounded mb-5"
                        value={new Date(newData.Publication).toISOString().split('T')[0]} // Format date for input
                        onChange={handleChange}
                    />
                </div>
                <div className="text-center">
                    <button
                        onClick={handleSubmit}
                        className="px-5 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                    >
                        Add New
                    </button>
                </div>
            </div>
        </div>
    );
}
