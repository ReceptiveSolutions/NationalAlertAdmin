import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { FaRegClock, FaRegNewspaper } from 'react-icons/fa';
// import { format } from 'date-fns';

function PostCard({ title, featuredimage, $id, excerpt, date, category }) {
    return (
        <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 h-full flex flex-col">
            <Link to={`/post/${$id}`} className="block h-full flex flex-col">
                {/* Image Container - Responsive heights */}
                <div className="relative h-40 sm:h-48 md:h-52 lg:h-48 w-full bg-gray-50 overflow-hidden">
                    {featuredimage ? (
                        <img
                            src={appwriteService.getFilePreview(featuredimage)}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-gray-300">
                            <FaRegNewspaper size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12" />
                        </div>
                    )}
                    
                    {/* Category Badge - Responsive positioning and sizing */}
                    {category && (
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                            <span className="bg-blue-500 text-white text-xs sm:text-sm px-2 py-1 rounded-lg font-medium shadow-sm">
                                {category}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Container - Flexible layout */}
                <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
                    {/* Date - Responsive text and spacing */}
                    {date && (
                        <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
                            <FaRegClock className="mr-1.5 w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="font-medium">
                                {/* {format(new Date(date), 'MMM dd, yyyy')} */}
                                {new Date(date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                })}
                            </span>
                        </div>
                    )}

                    {/* Title - Responsive typography */}
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                        <span className="line-clamp-2">
                            {title}
                        </span>
                    </h3>

                    {/* Excerpt - Responsive and flexible */}
                    {excerpt && (
                        <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 flex-1 leading-relaxed">
                            <span className="line-clamp-2 sm:line-clamp-3">
                                {excerpt}
                            </span>
                        </p>
                    )}

                    {/* Read More Link - Always at bottom */}
                    <div className="mt-auto pt-2">
                        <span className="inline-flex items-center text-blue-600 text-sm sm:text-base font-semibold group-hover:text-blue-700 transition-colors">
                            Read More
                            <svg 
                                className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                                />
                            </svg>
                        </span>
                    </div>
                </div>
            </Link>

            {/* Custom CSS for line-clamp support */}
            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                @media (max-width: 640px) {
                    .line-clamp-3 {
                        -webkit-line-clamp: 2;
                    }
                }
            `}</style>
        </article>
    );
}

export default PostCard;