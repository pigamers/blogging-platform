import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditBlog({ visible, onClose, post }) {
    const [formData, setFormData] = useState({
        Title: '',
        Author: '',
        Summary: '',
        Publication: ''
    });

    useEffect(() => {
        if (post) {
            setFormData({
                Title: post.Title,
                Author: post.Author,
                Summary: post.Summary,
                Publication: new Date(post.Publication).toISOString().split('T')[0]
            });
        }
    }, [post]);

    const handleOnClose = (e) => {
        if (e.target.id === "EditModalContainer") onClose();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = () => {
        axios.put(`https://667a802abd627f0dcc8f3e5f.mockapi.io/allblogs/${post.id}`, formData)
            .then(response => {
                console.log('Post updated successfully:', response.data);
                onClose();
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error updating the post:', error);
            });
    }

    if (!visible) return null;

    return (
        <div id="EditModalContainer" className="fixed font-mono inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center" onClick={handleOnClose}>
            <div className="bg-white p-7 rounded md:w-2/5 w-full mx-6">
                <div className='flex flex-row gap-10 justify-between items-center'>
                    <h1 className="font-semibold text-center text-xl text-gray-700">
                        Update your Blog Here!
                    </h1>
                    <button id='closeButton' onClick={onClose} className="mb-2 text-5xl">×</button>
                </div>
                <br />
                <div className="flex flex-col text-left">
                    <label className="font-semibold mb-3 leading-none">Title -</label>
                    <input
                        type="text"
                        name="Title"
                        className="border border-gray-700 p-2 rounded mb-5"
                        value={formData.Title}
                        onChange={handleChange}
                    />
                    <label className="font-semibold mb-3 leading-none">Author -</label>
                    <input
                        type='text'
                        name="Author"
                        className="border border-gray-700 p-2 rounded mb-5"
                        value={formData.Author}
                        onChange={handleChange}
                    />
                    <label className="font-semibold mb-3 leading-none">Content -</label>
                    <textarea
                        name="Summary"
                        className='border border-gray-700 p-2 rounded mb-5 h-32'
                        value={formData.Summary}
                        onChange={handleChange}
                    />
                    <label className="font-semibold mb-3 leading-none">Publication Date -</label>
                    <input
                        type='date'
                        name="Publication"
                        className="border border-gray-700 p-2 rounded mb-5"
                        value={formData.Publication}
                        onChange={handleChange}
                    />
                </div>
                <div className="text-center">
                    <button
                        onClick={handleSubmit}
                        className="px-5 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div >
    );
}
