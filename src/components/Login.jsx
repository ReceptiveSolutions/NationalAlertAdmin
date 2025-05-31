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
        <div className="flex items-center justify-center min-h-screen  text-gray-100">
            <div className="mx-auto w-full max-w-lg bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-10 border border-gray-700 shadow-2xl">
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight tracking-wide text-white mb-2">
                    🔐 Sign in to News Admin
                </h2>

                <p className="mt-2 text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-400 font-medium hover:text-blue-300 hover:underline transition-colors"
                    >
                        Create one
                    </Link>
                </p>

                {error && (
                    <div className="mt-6 p-3 bg-red-900/50 border border-red-700 rounded-lg">
                        <p className="text-red-300 text-center text-sm font-medium">
                            {error}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-6">
                        <Input
                            label="📧 Email:"
                            placeholder="e.g. johndoe@example.com"
                            type="email"
                            className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be valid",
                                },
                            })}
                        />

                        <Input
                            label="🔒 Password:"
                            type="password"
                            placeholder="••••••••"
                            className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg border border-blue-500"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>

               
            </div>
        </div>
    );
}

export default Login;