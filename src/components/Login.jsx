import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen  px-4 py-6 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
                    {/* Header Section */}
                    <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
                        {/* Logo */}
                        <div className="flex justify-center mb-4 sm:mb-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                                <Logo width="100%" />
                            </div>
                        </div>

                        {/* Title */}
                        <div className="text-center mb-6 sm:mb-8">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 tracking-tight">
                                <span className="text-2xl sm:text-3xl">🔐</span>
                                <br className="sm:hidden" />
                                <span className="sm:ml-2">Sign in to News Admin</span>
                            </h1>
                            
                            <p className="text-sm sm:text-base text-gray-400 mt-3 sm:mt-4">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-blue-400 font-semibold hover:text-blue-300 hover:underline transition-colors duration-200"
                                >
                                    Create one
                                </Link>
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-900/40 border border-red-700/50 rounded-xl backdrop-blur-sm">
                                <p className="text-red-300 text-center text-xs sm:text-sm font-medium leading-relaxed">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit(login)} className="space-y-4 sm:space-y-6">
                            {/* Email Input */}
                            <div>
                                <Input
                                    label="📧 Email"
                                    placeholder="johndoe@example.com"
                                    type="email"
                                    className="w-full bg-gray-700/50 border border-gray-600 text-gray-100 placeholder-gray-400 rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 backdrop-blur-sm"
                                    {...register("email", {
                                        required: "Email is required",
                                        validate: {
                                            matchPattern: (value) =>
                                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                "Please enter a valid email address",
                                        },
                                    })}
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <Input
                                    label="🔒 Password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full bg-gray-700/50 border border-gray-600 text-gray-100 placeholder-gray-400 rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 backdrop-blur-sm"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2 sm:pt-4">
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 text-white font-semibold py-3 sm:py-3.5 lg:py-4 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 border border-blue-500/50 text-sm sm:text-base focus:ring-2 focus:ring-blue-500/50 focus:outline-none transform active:scale-95"
                                >
                                    <span className="flex items-center justify-center">
                                        Sign in
                                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-4 sm:px-6 bg-gray-800/50 border-t border-gray-700/50">
                        <p className="text-center text-xs sm:text-sm text-gray-500">
                            Secure login powered by advanced encryption
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;