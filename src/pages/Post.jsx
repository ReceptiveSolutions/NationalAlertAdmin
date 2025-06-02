import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
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

    return post ? (
        <Container className="py-8">
            <div className="w-full max-w-3xl mx-auto">
                {/* Featured Image with Fixed Aspect Ratio */}
                {post.featuredimage && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                        <div className="w-full aspect-[16/9]">
                            <img
                                src={appwriteService.getFilePreview(post.featuredimage)}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Title */}
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

                {/* Author Actions */}
                {isAuthor && (
                    <div className="flex gap-4 mb-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button className="flex items-center gap-2">
                                ✏️ Edit
                            </Button>
                        </Link>
                        <Button 
                            onClick={deletePost} 
                            className="flex items-center gap-2"
                        >
                            🗑️ Delete
                        </Button>
                    </div>
                )}

                {/* Content */}
                <div className="prose max-w-none">
                    {parse(post.content)}
                </div>
            </div>
        </Container>
    ) : null;
}