"use client";
import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

const LoginSignup: React.FC = () => {
  const {user, error, isLoading} = useUser();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-black">Welcome to the Platform</h1>
      
      <div className="space-x-4">
        <Link href="/api/auth/login?returnTo=/dashboard&prompt=login"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Login
        </Link>
      </div>
    </div>
  );
};

export default LoginSignup;
