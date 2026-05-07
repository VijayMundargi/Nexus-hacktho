import {
    Link,
    useLocation,
    useNavigate,
} from 'react-router-dom';

import {
    LayoutDashboard,
    MessageSquareText,
    ClipboardList,
    BarChart3,
    LogOut,
    Bot,
    Menu,
    X,
    ShieldCheck,
} from 'lucide-react';

import {
    useState,
} from 'react';


function Navbar() {

    const location =
    useLocation();

    const navigate =
    useNavigate();

    const [mobileMenu, setMobileMenu] =
    useState(false);


    const user =
    JSON.parse(
        localStorage.getItem('user')
    );


    const logoutHandler = () => {

        localStorage.removeItem('user');

        localStorage.removeItem('token');

        navigate('/login');
    };


    const navLinks = [

        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: (
                <LayoutDashboard className='w-5 h-5' />
            ),
        },

        {
            name: 'AI Chat',
            path: '/chat',
            icon: (
                <MessageSquareText className='w-5 h-5' />
            ),
        },

        {
            name: 'Orders',
            path: '/orders',
            icon: (
                <ClipboardList className='w-5 h-5' />
            ),
        },

        {
            name: 'Analytics',
            path: '/analytics',
            icon: (
                <BarChart3 className='w-5 h-5' />
            ),
        },
    ];


    return (

        <nav className='sticky top-0 z-50 border-b border-emerald-100 bg-white/90 backdrop-blur-xl'>


            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-10'>


                <div className='h-20 flex items-center justify-between'>


                    <div className='flex items-center gap-4'>


                        <div className='relative flex items-center justify-center w-14 h-14 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-200'>

                            <Bot className='text-white w-7 h-7' />


                            <div className='absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white animate-pulse'></div>

                        </div>


                        <div>

                            <h1 className='text-2xl font-black tracking-tight text-slate-900'>
                                AI Manufacturing
                            </h1>

                            <p className='text-sm text-slate-500 flex items-center gap-2'>

                                <span className='w-2 h-2 rounded-full bg-emerald-500'></span>

                                Enterprise Workflow Platform

                            </p>

                        </div>

                    </div>



                    <div className='hidden lg:flex items-center gap-3'>


                        {
                            navLinks.map((link) => (

                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 font-semibold text-sm ${
                                        location.pathname ===
                                        link.path
                                        ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-100'
                                        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                                    }`}
                                >

                                    {link.icon}

                                    {link.name}

                                </Link>
                            ))
                        }

                    </div>



                    <div className='hidden lg:flex items-center gap-4'>


                        <div className='flex items-center gap-3 bg-[#f8faf9] border border-slate-200 px-4 py-3 rounded-2xl'>


                            <div className='w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-md'>

                                {
                                    user?.name?.charAt(0)
                                    || 'A'
                                }

                            </div>


                            <div className='leading-tight'>

                                <h3 className='font-bold text-slate-900 text-sm'>
                                    {
                                        user?.name ||
                                        'Admin User'
                                    }
                                </h3>


                                <p className='text-xs text-slate-500 capitalize flex items-center gap-1 mt-1'>

                                    <ShieldCheck className='w-3 h-3 text-emerald-600' />

                                    {
                                        user?.role ||
                                        'Administrator'
                                    }

                                </p>

                            </div>

                        </div>



                        <button
                            onClick={logoutHandler}
                            className='flex items-center gap-3 px-5 py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-300 font-semibold'
                        >

                            <LogOut className='w-5 h-5' />

                            Logout

                        </button>

                    </div>



                    <button
                        onClick={() =>
                            setMobileMenu(
                                !mobileMenu
                            )
                        }
                        className='lg:hidden flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700'
                    >

                        {
                            mobileMenu
                            ? (
                                <X className='w-6 h-6' />
                            ) : (
                                <Menu className='w-6 h-6' />
                            )
                        }

                    </button>

                </div>

            </div>



            {
                mobileMenu && (

                    <div className='lg:hidden border-t border-slate-200 bg-white px-4 py-5 shadow-lg'>


                        <div className='space-y-3'>


                            {
                                navLinks.map((link) => (

                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() =>
                                            setMobileMenu(
                                                false
                                            )
                                        }
                                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-semibold ${
                                            location.pathname ===
                                            link.path
                                            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md'
                                            : 'bg-[#f8faf9] text-slate-700 hover:bg-emerald-50'
                                        }`}
                                    >

                                        {link.icon}

                                        {link.name}

                                    </Link>
                                ))
                            }



                            <div className='flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#f8faf9] border border-slate-200 mt-5'>


                                <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold'>

                                    {
                                        user?.name?.charAt(0)
                                        || 'A'
                                    }

                                </div>


                                <div>

                                    <h3 className='font-bold text-slate-900'>
                                        {
                                            user?.name ||
                                            'Admin User'
                                        }
                                    </h3>

                                    <p className='text-sm text-slate-500 capitalize'>
                                        {
                                            user?.role ||
                                            'Administrator'
                                        }
                                    </p>

                                </div>

                            </div>



                            <button
                                onClick={logoutHandler}
                                className='w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-300 font-semibold mt-3'
                            >

                                <LogOut className='w-5 h-5' />

                                Logout

                            </button>

                        </div>

                    </div>
                )
            }

        </nav>
    );
}

export default Navbar;