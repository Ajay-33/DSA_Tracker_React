import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();

    const handleSubmission = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        if (cpassword !== password) {
            alert("Passwords do not match");
            return;
        }
        const response = await fetch("http://localhost:8080/api/v1/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.token);
            navigate("/");
            alert("Account created Successfully");
        }
        else {
            alert("Invalid Details");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='flex flex-col justify-center items-center mt-16'>
            <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
                <h2 className='text-center text-3xl font-bold text-gray-800 mb-8'>Create an account</h2>
                <form onSubmit={handleSubmission}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="name" name='name' required minLength={3} onChange={onChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="email" name='email' required onChange={onChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="password" name='password' required minLength={5} onChange={onChange} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="cpassword" name='cpassword' required minLength={5} onChange={onChange} />
                    </div>
                    <div className='flex items-center justify-between'>
                        <button type="submit" className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
