import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageError, setImageError] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return post ? (
        <Container className="py-4 px-4 sm:py-6 md:py-8">
            <div className="w-full max-w-4xl mx-auto">
                {/* Featured Image with Responsive Design */}
                {post.featuredimage && !imageError && (
                    <div className="mb-4 sm:mb-6 rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full relative">
                            <img
                                src={appwriteService.getFilePreview(post.featuredimage)}
                                alt={post.title}
                                className="w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px] object-contain bg-gray-50"
                                onError={handleImageError}
                                loading="lazy"
                            />
                        </div>
                    </div>
                )}

                {/* Title - Responsive Typography */}
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900 leading-tight">
                    {post.title}
                </h1>

                {/* Author Actions - Responsive Layout */}
                {isAuthor && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
                        <Link to={`/edit-post/${post.$id}`} className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base">
                                <span>✏️</span>
                                <span>Edit</span>
                            </Button>
                        </Link>
                        <Button 
                            onClick={deletePost} 
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base bg-red-600 hover:bg-red-700"
                        >
                            <span>🗑️</span>
                            <span>Delete</span>
                        </Button>
                    </div>
                )}

                {/* Content - Enhanced Responsive Typography */}
                <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed">
                    <div className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-800 break-words">
                        {parse(post.content)}
                    </div>
                </div>
            </div>

           
        </Container>
    ) : null;
}