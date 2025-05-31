import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaImage, FaFileAlt, FaTag, FaToggleOn, FaToggleOff, FaSave, FaPlus } from "react-icons/fa";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async (data) => {
        setIsSubmitting(true);
        try {
            if (!userData || !userData.$id) {
                throw new Error("User data is missing. Please login again.");
            }
    
            if (post) {
                // Update existing post
                const file = data.featuredImage[0] ? await appwriteService.uploadFile(data.featuredImage[0]) : null;
    
                if (file) {
                    await appwriteService.deleteFile(post.featuredimage);
                }
    
                const dbPost = await appwriteService.updatePost(post.$id, {
                    title: data.title,
                    content: data.content,
                    status: data.status,
                    featuredimage: file ? file.$id : post.featuredimage
                });
    
                if (dbPost) {
                    toast.success("Post updated successfully");
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // Create new post
                if (!data.featuredImage[0]) {
                    throw new Error("Featured image is required");
                }
    
                const file = await appwriteService.uploadFile(data.featuredImage[0]);
    
                const dbPost = await appwriteService.createPost({ 
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status,
                    featuredimage: file.$id,
                    userId: userData.$id
                });
    
                if (dbPost) {
                    toast.success("Post created successfully");
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(error.message || "Failed to save post");
        } finally {
            setIsSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                        <FaFileAlt className="mr-3 text-blue-400" />
                        {post ? "Edit News Article" : "Create New Article"}
                    </h1>
                    <p className="text-gray-400">
                        {post ? "Update your existing news article" : "Share breaking news with your audience"}
                    </p>
                </div>

                <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title Input Card */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                            <div className="flex items-center mb-4">
                                <FaFileAlt className="text-blue-400 mr-2" />
                                <h3 className="text-lg font-semibold text-white">Article Details</h3>
                            </div>
                            <div className="space-y-4">
                                <Input
                                    label="Title"
                                    placeholder="Enter article title..."
                                    {...register("title", { required: "Title is required" })}
                                    error={errors.title?.message}
                                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                                />
                                <Input
                                    label="Slug"
                                    placeholder="article-url-slug"
                                    {...register("slug", { required: "Slug is required" })}
                                    error={errors.slug?.message}
                                    onInput={(e) => {
                                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                    }}
                                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Content Editor Card */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                            <div className="flex items-center mb-4">
                                <FaFileAlt className="text-green-400 mr-2" />
                                <h3 className="text-lg font-semibold text-white">Article Content</h3>
                            </div>
                            <RTE 
                                label="Content" 
                                name="content" 
                                control={control} 
                                defaultValue={getValues("content")}
                                error={errors.content?.message}
                            />
                        </div>
                    </div>

                    {/* Right Column - Media & Settings */}
                    <div className="space-y-6">
                        {/* Featured Image Card */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                            <div className="flex items-center mb-4">
                                <FaImage className="text-purple-400 mr-2" />
                                <h3 className="text-lg font-semibold text-white">Featured Image</h3>
                            </div>
                            
                            <Input
                                label="Upload Image"
                                type="file"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("featuredImage", { 
                                    required: !post ? "Featured image is required" : false 
                                })}
                                error={errors.featuredImage?.message}
                                className="bg-gray-700 border-gray-600 text-white file:bg-blue-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:file:bg-blue-700"
                            />

                            {post && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-400 mb-2">Current Image:</p>
                                    <div className="relative group">
                                        <img
                                            src={appwriteService.getFilePreview(post.featuredimage)}
                                            alt={post.title}
                                            className="rounded-lg w-full object-cover max-h-48 border border-gray-600 transition-transform group-hover:scale-105"
                                        />
                                        {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-opacity"></div> */}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Publishing Settings Card */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                            <div className="flex items-center mb-4">
                                <FaTag className="text-yellow-400 mr-2" />
                                <h3 className="text-lg font-semibold text-white">Publishing Settings</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <Select
                                    options={["active", "inactive"]}
                                    label="Status"
                                    {...register("status", { required: "Status is required" })}
                                    error={errors.status?.message}
                                    className="bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                                />
                                
                                {/* Status Indicator */}
                                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                                    <span className="text-gray-300 text-sm">Article Status:</span>
                                    <div className="flex items-center">
                                        {watch("status") === "active" ? (
                                            <>
                                                <FaToggleOn className="text-green-500 mr-2 text-xl" />
                                                <span className="text-green-400 font-medium">Published</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaToggleOff className="text-gray-500 mr-2 text-xl" />
                                                <span className="text-gray-400 font-medium">Draft</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Button Card */}
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
                            <Button 
                                type="submit" 
                                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center ${
                                    post 
                                        ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' 
                                        : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                                } ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'} focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        {post ? (
                                            <>
                                                <FaSave className="mr-2" />
                                                Update Article
                                            </>
                                        ) : (
                                            <>
                                                <FaPlus className="mr-2" />
                                                Publish Article
                                            </>
                                        )}
                                    </>
                                )}
                            </Button>

                            {/* Additional Info */}
                            <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                                <p className="text-xs text-gray-400 text-center">
                                    {post ? "Changes will be saved immediately" : "Article will be published instantly"}
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}