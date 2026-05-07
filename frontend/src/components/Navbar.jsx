import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
    LayoutDashboard,
    MessageSquareText,
    ClipboardList,
    BarChart3,
    LogOut,
    Bot,
} from 'lucide-react';


function Navbar() {

    const location = useLocation();

    const navigate = useNavigate();


    const logoutHandler = () => {

        localStorage.removeItem('user');

        navigate('/');
    };


    const navLinks = [

        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: <LayoutDashboard className='w-5 h-5' />,
        },

        {
            name: 'AI Chat',
            path: '/chat',
            icon: <MessageSquareText className='w-5 h-5' />,
        },

        {
            name: 'Orders',
            path: '/orders',
            icon: <ClipboardList className='w-5 h-5' />,
        },

        {
            name: 'Analytics',
            path: '/analytics',
            icon: <BarChart3 className='w-5 h-5' />,
        },
    ];


    return (

        <nav className='sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl'>


            <div className='max-w-7xl mx-auto px-6 lg:px-10'>


                <div className='flex items-center justify-between h-20'>


                    <div className='flex items-center gap-4'>


                        <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg'>

                            <Bot className='text-white w-7 h-7' />

                        </div>


                        <div>

                            <h1 className='text-2xl font-bold text-slate-900'>
                                AI Manufacturing
                            </h1>

                            <p className='text-sm text-slate-500'>
                                Smart Workflow Platform
                            </p>

                        </div>

                    </div>



                    <div className='hidden lg:flex items-center gap-3'>


                        {
                            navLinks.map((link) => (

                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 font-medium ${
                                        location.pathname === link.path
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                                >

                                    {link.icon}

                                    {link.name}

                                </Link>
                            ))
                        }


                        <button
                            onClick={logoutHandler}
                            className='ml-4 flex items-center gap-3 bg-red-50 hover:bg-red-100 text-red-600 px-5 py-3 rounded-2xl transition-all duration-300 font-medium'
                        >

                            <LogOut className='w-5 h-5' />

                            Logout

                        </button>

                    </div>



                    <div className='lg:hidden'>

                        <button className='w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center'>

                            ☰

                        </button>

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;