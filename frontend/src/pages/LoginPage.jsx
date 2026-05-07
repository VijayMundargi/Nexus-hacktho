import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
    Mail,
    Lock,
    ArrowRight,
    Bot,
} from 'lucide-react';

import API from '../api/axios';


function LoginPage() {

    const navigate = useNavigate();

    const [formData, setFormData] =
    useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] =
    useState(false);

    const [error, setError] =
    useState('');


    const changeHandler = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value,
        });
    };


    const loginHandler = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError('');

        try {

            const { data } =
            await API.post(
                '/login',
                {
                    email:
                    formData.email,

                    password:
                    formData.password,
                }
            );


            localStorage.setItem(
                'token',
                data.token
            );


            localStorage.setItem(
                'user',
                JSON.stringify(
                    data.user
                )
            );


            navigate('/dashboard');

        } catch (error) {

            setError(

                error.response?.data
                ?.message ||

                'Login failed'
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className='min-h-screen bg-slate-100 flex items-center justify-center px-6 py-10'>


            <div className='grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full bg-white rounded-[40px] overflow-hidden shadow-2xl'>


                <div className='hidden lg:flex bg-gradient-to-br from-blue-600 to-indigo-700 p-14 flex-col justify-between text-white relative overflow-hidden'>


                    <div className='absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_left,white,transparent_40%)]'></div>


                    <div className='relative z-10'>


                        <div className='bg-white/20 w-20 h-20 rounded-3xl flex items-center justify-center backdrop-blur-md mb-8'>

                            <Bot className='w-10 h-10' />

                        </div>


                        <h1 className='text-5xl font-bold leading-tight mb-6'>
                            AI Manufacturing Platform
                        </h1>


                        <p className='text-blue-100 text-lg leading-9 max-w-lg'>
                            Automate manufacturing workflows with conversational AI,
                            intelligent order management, quality tracking,
                            and real-time operational insights.
                        </p>

                    </div>


                    <div className='relative z-10 flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10'>

                        <div className='w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl'>
                            ⚡
                        </div>

                        <div>

                            <h3 className='font-semibold text-lg'>
                                AI-Powered Operations
                            </h3>

                            <p className='text-blue-100 text-sm mt-1'>
                                Smart manufacturing workflow automation
                            </p>

                        </div>

                    </div>

                </div>



                <div className='p-8 lg:p-14 flex flex-col justify-center'>


                    <div className='mb-10'>

                        <h2 className='text-4xl font-bold text-slate-900 mb-3'>
                            Welcome Back
                        </h2>

                        <p className='text-slate-500 text-lg'>
                            Sign in to access your dashboard
                        </p>

                    </div>



                    <form
                        onSubmit={loginHandler}
                        className='space-y-6'
                    >

                        {
                            error && (

                                <div className='bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 text-sm'>
                                    {error}
                                </div>
                            )
                        }



                        <div>

                            <label className='block text-slate-700 font-semibold mb-3'>
                                Email Address
                            </label>


                            <div className='flex items-center gap-3 border border-slate-200 rounded-2xl px-5 py-4 focus-within:border-blue-500 bg-slate-50'>

                                <Mail className='text-slate-400 w-5 h-5' />

                                <input
                                    type='email'
                                    name='email'
                                    placeholder='Enter your email'
                                    value={formData.email}
                                    onChange={changeHandler}
                                    required
                                    className='bg-transparent outline-none w-full text-slate-700'
                                />

                            </div>

                        </div>



                        <div>

                            <label className='block text-slate-700 font-semibold mb-3'>
                                Password
                            </label>


                            <div className='flex items-center gap-3 border border-slate-200 rounded-2xl px-5 py-4 focus-within:border-blue-500 bg-slate-50'>

                                <Lock className='text-slate-400 w-5 h-5' />

                                <input
                                    type='password'
                                    name='password'
                                    placeholder='Enter your password'
                                    value={formData.password}
                                    onChange={changeHandler}
                                    required
                                    className='bg-transparent outline-none w-full text-slate-700'
                                />

                            </div>

                        </div>



                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 disabled:opacity-70'
                        >

                            {
                                loading
                                ? 'Signing In...'
                                : (
                                    <>
                                        Login
                                        <ArrowRight className='w-5 h-5' />
                                    </>
                                )
                            }

                        </button>



                        <div className='flex justify-center items-center gap-2 text-slate-500 pt-2'>

                            <span>
                                Don’t have an account?
                            </span>

                            <button
                                type='button'
                                onClick={() =>
                                    navigate('/register')
                                }
                                className='text-blue-600 font-semibold hover:text-blue-700'
                            >
                                Register
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default LoginPage;