import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Check network connection first
                if (!navigator.onLine) {
                    throw new Error('No internet connection');
                }

                const postsData = await appwriteService.getPosts([]);
                if (postsData) {
                    setPosts(postsData.documents);
                }
            } catch (err) {
                console.error("Failed to fetch posts:", err);
                setError(err.message || "Failed to load posts. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();

        // Add network event listeners
        const handleOnline = () => fetchPosts();
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    if (loading) {
        return (
            <div className='w-full py-12'>
                <Container>
                    <div className="flex items-center justify-center min-h-[500px]">
                        <div className="flex flex-col items-center space-y-6 p-8">
                            <div className="relative">
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600"></div>
                                <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-pulse"></div>
                            </div>
                            <div className="text-center">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading News</h2>
                                <p className="text-gray-500">Fetching the latest articles...</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className='w-full py-12'>
                <Container>
                    <div className="flex items-center justify-center min-h-[500px]">
                        <div className="text-center max-w-lg mx-auto p-8">
                            <div className="mb-8">
                                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center mb-6 shadow-lg">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                                    Access Required
                                </h1>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Please sign in to your account to access the latest news articles and exclusive content.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-700 hover:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Try Again
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-12'>
            <Container>
                {posts.length === 0 ? (
                    <div className="flex items-center justify-center min-h-[500px]">
                        <div className="text-center max-w-md mx-auto p-8">
                            <div className="mb-8">
                                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">No Articles Yet</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We're working on bringing you the latest news. Check back soon for fresh content!
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                       
                        
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                            {posts.map((post) => (
                                <div key={post.$id} className="group">
                                    <PostCard 
                                        title={post.title}
                                        content={post.content.replace(/<[^>]*>/g, '')} // Clean HTML tags
                                        featuredimage={post.featuredimage}
                                        $id={post.$id}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </Container>
        </div>
    );
}

export default Home