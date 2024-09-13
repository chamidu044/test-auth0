"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const { user, error, isLoading } = useUser();
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserRoles = async () => {                
      if (user) {                       
        try {
          const response = await axios.post('/api/roles', { userId: user.sub });
          response.data.roles.map((role: any) => role.id);
          setRoles(response.data.roles.map((role: any) => role.name));
        } catch (err) { 
          console.error('Error fetching user roles:', err);
        }
      }
    };
    fetchUserRoles();
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  
  const logout = () => {
    const logoutUrl = "http://localhost:3002/api/auth/logout";
    window.location.href = logoutUrl;
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        {user ? (
          <>
            <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
            <p className="mt-4">Here is your Auth0 user data:</p>
            <table className="bg-gray-100 p-4 rounded mt-4 text-left w-full">    
                <tbody>
                    <tr>
                    <td className="font-bold">Name:</td>
                    <td>{user.name}</td>
                    </tr>
                    <tr>
                    <td className="font-bold">Email:</td>
                    <td>{user.email}</td>
                    </tr>
                    <tr>
                    <td className="font-bold">Nickname:</td>
                    <td>{user.nickname}</td>
                    </tr>
                    <tr>
                    <td className="font-bold">Picture:</td>
                    <td><img src={user.picture ?? ''} alt="User Picture" className="rounded-full w-16 h-16" /></td>
                    </tr>
                    <tr>
                    <td className="font-bold">Auth0 ID:</td>
                    <td>{user.sub}</td>
                    </tr>
                    <tr>
                    <td className="font-bold">Roles:</td>
                    <td>{roles.length > 0 ? roles.join(', ') : 'No roles assigned'}</td>
                    </tr>
                </tbody>
            </table>
            {roles.includes('Admin') && (
                <button className="mt-6 bg-blue-500 text-white rounded p-2">Admin Settings</button>
            )}
            <button onClick={logout} className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <p>Please log in to view your dashboard.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
