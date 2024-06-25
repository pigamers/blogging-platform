import React, { useEffect, useState } from 'react';
import AddNew from './AddNew';
import axios from 'axios';
import EditBlog from './EditBlog';

export default function ListAll() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showAddNewModal, setShowAddNewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editPostId, setEditPostId] = useState(null);

    useEffect(() => {
        axios.get('https://667a802abd627f0dcc8f3e5f.mockapi.io/allblogs')
            .then((res) => {
                setPosts(res.data);
            });
    }, []);

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const handleBackClick = () => {
        setSelectedPost(null);
    };

    const handleDelete = (id) => {
        axios.delete(`https://667a802abd627f0dcc8f3e5f.mockapi.io/allblogs/${id}`)
            .then((res) => {
                setPosts(posts.filter((post) => post.id !== id));
            });
    };

    const truncateSummary = (summary, maxLength) => {
        if (summary.length > maxLength) {
            return summary.substring(0, maxLength) + '...';
        }
        return summary;
    };

    const publicationDate = (date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleOnCloseAddNewModal = () => setShowAddNewModal(false);
    const handleOnCloseEditModal = () => setShowEditModal(false);

    return (
        <div className='py-10 px-5'>
            <div className="flex justify-center mb-8">
                <button
                    type="button"
                    onClick={() => { setShowAddNewModal(true) }}
                    className="rounded bg-blue-500 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-400 w-full md:w-1/2"
                >
                    Add a New Post +
                </button>
                <AddNew onClose={handleOnCloseAddNewModal} visible={showAddNewModal} />
            </div>
            {selectedPost ? (
                <div className="w-full space-y-5 text-xl rounded-md border p-5 text-center shadow-slate-300 shadow-md">
                    <h1 className="font-semibold text-violet-300">Title: {selectedPost.Title}</h1>
                    <h1 className="font-bold text-yellow-200">Author: {selectedPost.Author}</h1>
                    <p className="mt-3 text-white">Summary: {selectedPost.Summary}</p>
                    <h4 className='text-orange-400'>Date: {publicationDate(selectedPost.Publication)}</h4>
                    <button
                        type="button"
                        className="mt-4 rounded bg-blue-500 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-400"
                        onClick={handleBackClick}
                    >
                        Back
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 place-items-center">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="w-full rounded-md border cursor-pointer shadow-slate-300 shadow-md flex flex-col justify-between"
                        >
                            <div className="p-5 space-y-3 text-center">
                                <h1 className="text-xl font-semibold text-violet-300">Title: {post.Title}</h1>
                                <h2 className="font-bold text-yellow-200">Author: {post.Author}</h2>
                                <p className="mt-3 text-lg text-white">
                                    Summary: {truncateSummary(post.Summary, 100)}
                                </p>
                                <h4 className='text-xl text-orange-400'>Date: {publicationDate(post.Publication)}</h4>
                            </div>
                            <div className='flex justify-center items-center gap-2 p-5'>
                                <button
                                    type="button"
                                    onClick={() => handlePostClick(post)}
                                    className="rounded bg-blue-500 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-400 w-full sm:w-auto whitespace-nowrap"
                                >
                                    Know More
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setShowEditModal(true); setEditPostId(post.id); }}
                                    className="rounded bg-blue-500 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-400 w-full sm:w-auto"
                                >
                                    Edit
                                </button>
                                {showEditModal && editPostId === post.id && (
                                    <EditBlog onClose={handleOnCloseEditModal} visible={showEditModal} post={post} />
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDelete(post.id)}
                                    className="rounded bg-blue-500 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-400 w-full sm:w-auto"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
