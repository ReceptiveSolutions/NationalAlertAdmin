import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { FaRegClock, FaRegNewspaper } from 'react-icons/fa';
// import { format } from 'date-fns';

function PostCard({ title, featuredimage, $id, excerpt, date, category }) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <Link to={`/post/${$id}`} className="block h-full">
                {/* Image Container */}
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    {featuredimage ? (
                        <img
                            src={appwriteService.getFilePreview(featuredimage)}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            <FaRegNewspaper size={48} />
                        </div>
                    )}
                    
                    {/* Category Badge */}
                    {category && (
                        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                            {category}
                        </span>
                    )}
                </div>

                {/* Content Container */}
                <div className="p-4">
                    {/* Date */}
                    {date && (
                        <div className="flex items-center text-gray-500 text-xs mb-2">
                            <FaRegClock className="mr-1" />
                            {format(new Date(date), 'MMM dd, yyyy')}
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {title}
                    </h3>

                    {/* Excerpt */}
                    {excerpt && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {excerpt}
                        </p>
                    )}

                    {/* Read More Link */}
                    <div className="text-blue-600 text-sm font-medium flex items-center">
                        Read Full Story
                        <svg 
                            className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PostCard;