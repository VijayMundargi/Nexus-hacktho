import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Bot } from 'lucide-react';
import API from '../api/axios';

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await API.post('/login', {
                email: formData.email,
                password: formData.password,
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        // Main Container - MongoDB Atlas uses a very light off-white/gray background
        <div className='min-h-screen bg-[#001E2B] flex items-center justify-center font-sans'>
            
            {/* Login Card */}
            <div className='flex w-full max-w-[1000px] min-h-[600px] bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden m-4'>
                
                {/* Left Side: Brand Panel (The Atlas "Dark" look) */}
                <div className='hidden lg:flex w-1/2 bg-[#001E2B] p-12 flex-col justify-between text-white relative'>
                    {/* Subtle Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('https://www.mongodb.com/docs/assets/grid.png')`, backgroundSize: '40px 40px' }}></div>
                    
                    <div className='relative z-10'>
                        <div className='flex items-center gap-2 mb-12'>
                            <div className='bg-[#00ED64] p-2 rounded-md'>
                                <Bot className='w-6 h-6 text-[#001E2B]' />
                            </div>
                            <span className='font-bold text-xl tracking-tight'>AI Manufacturing</span>
                        </div>

                        <h1 className='text-4xl font-medium leading-tight mb-6'>
                            Build and scale your <span className='text-[#00ED64]'>smart operations</span> on the world's most versatile platform.
                        </h1>

                        <ul className='space-y-4 mt-10 text-slate-300'>
                            <li className='flex items-start gap-3'>
                                <div className='mt-1 text-[#00ED64]'>✓</div>
                                <p>Real-time operational insights via conversational AI.</p>
                            </li>
                            <li className='flex items-start gap-3'>
                                <div className='mt-1 text-[#00ED64]'>✓</div>
                                <p>Enterprise-grade security and quality tracking.</p>
                            </li>
                        </ul>
                    </div>

                    <div className='relative z-10 text-sm text-slate-400'>
                        © 2026 SMVR SmartCart . 
                    </div>
                </div>

                {/* Right Side: Form Panel */}
                <div className='w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center'>
                    <div className='mb-8'>
                        <h2 className='text-2xl font-bold text-[#001E2B]'>Log In</h2>
                        <p className='text-slate-600 mt-1'>Access your manufacturing dashboard</p>
                    </div>

                    <form onSubmit={loginHandler} className='space-y-5'>
                        {error && (
                            <div className='bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded text-sm'>
                                {error}
                            </div>
                        )}

                        <div>
                            <label className='block text-xs font-bold uppercase tracking-wider text-[#001E2B] mb-2'>
                                Email Address
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Mail className='h-4 w-4 text-slate-400' />
                                </div>
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='email@company.com'
                                    value={formData.email}
                                    onChange={changeHandler}
                                    required
                                    className='block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00ED64] focus:border-[#00ED64] bg-white text-sm transition-all'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='flex justify-between mb-2'>
                                <label className='block text-xs font-bold uppercase tracking-wider text-[#001E2B]'>
                                    Password
                                </label>
                                <button type="button" className='text-xs text-blue-600 hover:underline'>Forgot password?</button>
                            </div>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-4 w-4 text-slate-400' />
                                </div>
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='••••••••'
                                    value={formData.password}
                                    onChange={changeHandler}
                                    required
                                    className='block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00ED64] focus:border-[#00ED64] bg-white text-sm transition-all'
                                />
                            </div>
                        </div>

                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full mt-4 bg-[#00684A] hover:bg-[#00593f] text-white py-3 px-4 rounded-md font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50'
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                <>
                                    Log In
                                    <ArrowRight className='w-4 h-4' />
                                </>
                            )}
                        </button>

                        <div className='relative py-4'>
                            <div className='absolute inset-0 flex items-center'><div className='w-full border-t border-slate-200'></div></div>
                            <div className='relative flex justify-center text-xs uppercase'><span className='bg-white px-2 text-slate-500'>New to our platform?</span></div>
                        </div>

                        <button
                            type='button'
                            onClick={() => navigate('/register')}
                            className='w-full border border-slate-300 hover:bg-slate-50 text-[#001E2B] py-3 px-4 rounded-md font-bold text-sm transition-colors'
                        >
                            Create an account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;