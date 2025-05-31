import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaSpinner } from 'react-icons/fa';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const create = async (data) => {
        setError("");
        setIsLoading(true);
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userInfo = await authService.getCurrentUser();
                if (userInfo) dispatch(login(userInfo));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Header Section */}
                <div className="text-center mb-8">
                    
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Create Your Account
                    </h2>
                    
                </div>

                {/* Main Form Card */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl shadow-xl p-8 border border-gray-700">
                    {/* Login Link */}
                    <div className="text-center mb-6">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
                            <p className="text-red-300 text-sm text-center font-medium">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit(create)} className="space-y-6">
                        {/* Full Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                                <FaUser className="mr-2 text-blue-400" />
                                Full Name
                            </label>
                            <Input
                                placeholder="Enter your full name"
                                className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                {...register("name", { 
                                    required: "Full name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must be at least 2 characters"
                                    }
                                })}
                            />
                            {errors.name && (
                                <p className="mt-1 text-red-400 text-xs">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                                <FaEnvelope className="mr-2 text-green-400" />
                                Email Address
                            </label>
                            <Input
                                placeholder="Enter your email address"
                                type="email"
                                className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                {...register("email", {
                                    required: "Email is required",
                                    validate: {
                                        matchPattern: (value) =>
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Please enter a valid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="mt-1 text-red-400 text-xs">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                                <FaLock className="mr-2 text-purple-400" />
                                Password
                            </label>
                            <Input
                                type="password"
                                placeholder="Create a secure password"
                                className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                {...register("password", { 
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className="mt-1 text-red-400 text-xs">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            {isLoading ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <FaUserPlus />
                                    <span>Create Account</span>
                                </>
                            )}
                        </Button>
                    </form>

                    
                </div>

                
            </div>
        </div>
    );
}

export default Signup;