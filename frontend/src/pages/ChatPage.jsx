import {
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    Bot,
    SendHorizonal,
    User,
    Sparkles,
} from 'lucide-react';

import API from '../api/axios';

import Navbar from '../components/Navbar';


function ChatPage() {

    const [message, setMessage] =
    useState('');

    const [messages, setMessages] =
    useState([]);

    const [loading, setLoading] =
    useState(false);

    const [error, setError] =
    useState('');


    const messagesEndRef =
    useRef(null);


    const scrollToBottom = () => {

        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    };


    useEffect(() => {

        scrollToBottom();

    }, [messages]);


    const sendMessage = async () => {

        if (!message.trim()) return;


        const userMessage = {

            type: 'user',

            content: message,
        };


        setMessages((prev) => [

            ...prev,

            userMessage,
        ]);


        setLoading(true);

        setError('');


        try {

            const { data } =
            await API.post(
                '/ai/chat',
                {
                    message,
                }
            );


            const aiMessage = {

                type: 'ai',

                content: data,
            };


            setMessages((prev) => [

                ...prev,

                aiMessage,
            ]);


            setMessage('');

        } catch (error) {

            console.log(
                error.response?.data
            );

            setError(
                error.response?.data?.message ||
                'Failed to process AI request'
            );

        } finally {

            setLoading(false);
        }
    };


    const handleKeyDown = (e) => {

        if (
            e.key === 'Enter' &&
            !loading
        ) {

            sendMessage();
        }
    };


    return (

        <div className='min-h-screen bg-slate-100'>

            <Navbar />


            <div className='max-w-6xl mx-auto p-4 lg:p-8'>


                <div className='bg-white rounded-[30px] shadow-sm border border-slate-200 overflow-hidden'>


                    <div className='flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600'>

                        <div>

                            <h1 className='text-3xl font-bold text-white'>
                                AI Manufacturing Assistant
                            </h1>

                            <p className='text-blue-100 mt-1'>
                                Conversational workflow automation
                            </p>

                        </div>


                        <div className='bg-white/20 p-4 rounded-2xl backdrop-blur-md'>

                            <Sparkles className='text-white w-7 h-7' />

                        </div>

                    </div>


                    <div className='h-[65vh] overflow-y-auto px-6 py-6 bg-slate-50'>


                        {
                            messages.length === 0 && (

                                <div className='h-full flex flex-col justify-center items-center text-center'>

                                    <div className='bg-blue-100 p-6 rounded-3xl mb-6'>

                                        <Bot className='w-14 h-14 text-blue-600' />

                                    </div>

                                    <h2 className='text-3xl font-bold text-slate-900 mb-3'>
                                        Start AI Manufacturing Chat
                                    </h2>

                                    <p className='text-slate-500 max-w-xl leading-8'>
                                        Create orders, update manufacturing status,
                                        track quality reports, and automate operations
                                        through conversational AI.
                                    </p>

                                </div>
                            )
                        }


                        <div className='space-y-6'>


                            {
                                messages.map(
                                    (msg, index) => (

                                        <div
                                            key={index}
                                            className={`flex ${
                                                msg.type === 'user'
                                                ? 'justify-end'
                                                : 'justify-start'
                                            }`}
                                        >

                                            <div
                                                className={`max-w-[85%] rounded-3xl px-6 py-5 shadow-sm ${
                                                    msg.type === 'user'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white border border-slate-200 text-slate-800'
                                                }`}
                                            >

                                                <div className='flex items-start gap-4'>


                                                    <div
                                                        className={`p-3 rounded-2xl ${
                                                            msg.type === 'user'
                                                            ? 'bg-blue-500'
                                                            : 'bg-slate-100'
                                                        }`}
                                                    >

                                                        {
                                                            msg.type === 'user'
                                                            ? (
                                                                <User className='w-5 h-5' />
                                                            ) : (
                                                                <Bot className='w-5 h-5 text-blue-600' />
                                                            )
                                                        }

                                                    </div>


                                                    <div className='overflow-auto w-full'>


                                                        {
                                                            msg.type === 'ai'
                                                            ? (

                                                                <div className='space-y-4 w-full'>


                                                                    {
                                                                        msg.content.type ===
                                                                        'order_created' && (

                                                                            <div className='space-y-4'>

                                                                                <div className='flex items-center gap-3'>

                                                                                    <div className='w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-2xl'>
                                                                                        ✅
                                                                                    </div>

                                                                                    <div>

                                                                                        <h3 className='text-2xl font-bold text-slate-900'>
                                                                                            Order Created
                                                                                        </h3>

                                                                                        <p className='text-slate-500'>
                                                                                            Manufacturing order successfully generated
                                                                                        </p>

                                                                                    </div>

                                                                                </div>


                                                                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>


                                                                                    <div className='bg-slate-50 rounded-2xl p-4'>

                                                                                        <p className='text-sm text-slate-500 mb-1'>
                                                                                            Part Name
                                                                                        </p>

                                                                                        <h4 className='font-bold text-slate-900'>
                                                                                            {
                                                                                                msg.content.order.partName
                                                                                            }
                                                                                        </h4>

                                                                                    </div>


                                                                                    <div className='bg-slate-50 rounded-2xl p-4'>

                                                                                        <p className='text-sm text-slate-500 mb-1'>
                                                                                            Material
                                                                                        </p>

                                                                                        <h4 className='font-bold text-slate-900'>
                                                                                            {
                                                                                                msg.content.order.material
                                                                                            }
                                                                                        </h4>

                                                                                    </div>


                                                                                    <div className='bg-slate-50 rounded-2xl p-4'>

                                                                                        <p className='text-sm text-slate-500 mb-1'>
                                                                                            Quantity
                                                                                        </p>

                                                                                        <h4 className='font-bold text-slate-900'>
                                                                                            {
                                                                                                msg.content.order.quantity
                                                                                            }
                                                                                        </h4>

                                                                                    </div>


                                                                                    <div className='bg-slate-50 rounded-2xl p-4'>

                                                                                        <p className='text-sm text-slate-500 mb-1'>
                                                                                            Status
                                                                                        </p>

                                                                                        <span className='inline-flex px-4 py-2 rounded-xl bg-yellow-100 text-yellow-700 font-semibold'>
                                                                                            {
                                                                                                msg.content.order.status
                                                                                            }
                                                                                        </span>

                                                                                    </div>

                                                                                </div>

                                                                            </div>
                                                                        )
                                                                    }


                                                                    {
                                                                        msg.content.type ===
                                                                        'status_updated' && (

                                                                            <div className='space-y-4'>

                                                                                <div className='flex items-center gap-3'>

                                                                                    <div className='w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl'>
                                                                                        🔄
                                                                                    </div>

                                                                                    <div>

                                                                                        <h3 className='text-2xl font-bold text-slate-900'>
                                                                                            Status Updated
                                                                                        </h3>

                                                                                        <p className='text-slate-500'>
                                                                                            Manufacturing workflow updated
                                                                                        </p>

                                                                                    </div>

                                                                                </div>


                                                                                <div className='bg-slate-50 rounded-2xl p-5'>

                                                                                    <p className='text-slate-700 text-lg'>
                                                                                        Order status changed to
                                                                                        {' '}
                                                                                        <span className='font-bold text-blue-600'>
                                                                                            {
                                                                                                msg.content.order.status
                                                                                            }
                                                                                        </span>
                                                                                    </p>

                                                                                </div>

                                                                            </div>
                                                                        )
                                                                    }


                                                                    {
                                                                        msg.content.type ===
                                                                        'quality_logged' && (

                                                                            <div className='space-y-4'>

                                                                                <div className='flex items-center gap-3'>

                                                                                    <div className='w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl'>
                                                                                        🛡️
                                                                                    </div>

                                                                                    <div>

                                                                                        <h3 className='text-2xl font-bold text-slate-900'>
                                                                                            Quality Report Logged
                                                                                        </h3>

                                                                                        <p className='text-slate-500'>
                                                                                            Inspection report successfully added
                                                                                        </p>

                                                                                    </div>

                                                                                </div>


                                                                                <div className='bg-slate-50 rounded-2xl p-5'>

                                                                                    <p className='text-slate-700 leading-8'>
                                                                                        {
                                                                                            msg.content.quality.note
                                                                                        }
                                                                                    </p>

                                                                                </div>

                                                                            </div>
                                                                        )
                                                                    }

                                                                </div>

                                                            ) : (

                                                                <p className='leading-7'>
                                                                    {msg.content}
                                                                </p>
                                                            )
                                                        }

                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    )
                                )
                            }


                            {
                                loading && (

                                    <div className='flex justify-start'>

                                        <div className='bg-white border border-slate-200 rounded-3xl px-6 py-5 shadow-sm flex items-center gap-4'>

                                            <div className='bg-slate-100 p-3 rounded-2xl'>
                                                <Bot className='w-5 h-5 text-blue-600' />
                                            </div>

                                            <div className='flex gap-2'>

                                                <span className='w-3 h-3 rounded-full bg-slate-300 animate-bounce'></span>

                                                <span className='w-3 h-3 rounded-full bg-slate-300 animate-bounce [animation-delay:0.2s]'></span>

                                                <span className='w-3 h-3 rounded-full bg-slate-300 animate-bounce [animation-delay:0.4s]'></span>

                                            </div>

                                        </div>

                                    </div>
                                )
                            }


                            {
                                error && (

                                    <div className='bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl text-center'>
                                        {error}
                                    </div>
                                )
                            }


                            <div ref={messagesEndRef}></div>

                        </div>

                    </div>


                    <div className='border-t border-slate-200 bg-white px-6 py-5'>


                        <div className='flex items-center gap-4'>


                            <input
                                type='text'
                                placeholder='Ask AI to create orders, update status, or log quality reports...'
                                value={message}
                                onChange={(e) =>
                                    setMessage(
                                        e.target.value
                                    )
                                }
                                onKeyDown={handleKeyDown}
                                className='flex-1 px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:border-blue-500 bg-slate-50 text-slate-700'
                            />


                            <button
                                onClick={sendMessage}
                                disabled={loading}
                                className='bg-blue-600 hover:bg-blue-700 transition-all px-7 py-4 rounded-2xl text-white font-semibold flex items-center gap-3 disabled:opacity-70'
                            >

                                <SendHorizonal className='w-5 h-5' />

                                Send

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ChatPage;