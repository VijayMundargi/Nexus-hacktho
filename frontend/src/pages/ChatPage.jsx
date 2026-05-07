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
    ShieldCheck,
    Clock3,
    CheckCircle2,
    Package,
    Activity,
    Workflow,
    AlertTriangle,
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

        <div className='min-h-screen bg-[#f5f7f7]'>

            <Navbar />


            <div className='max-w-7xl mx-auto p-3 sm:p-5 lg:p-8'>


                <div className='overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm'>


                    <div className='relative overflow-hidden border-b border-slate-200 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 sm:px-8 py-7'>


                        <div className='absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl'></div>


                        <div className='relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>


                            <div>

                                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white text-sm font-semibold mb-5'>

                                    <Sparkles className='w-4 h-4' />

                                    AI Manufacturing Workspace

                                </div>


                                <h1 className='text-3xl sm:text-4xl font-black text-white'>
                                    AI Operations Assistant
                                </h1>


                                <p className='text-blue-100 mt-3 leading-8 max-w-2xl text-sm sm:text-base'>
                                    Create manufacturing orders,
                                    update workflow status,
                                    track inspections,
                                    and automate operational tasks
                                    through intelligent AI conversations.
                                </p>

                            </div>




                            <div className='grid grid-cols-2 gap-4'>


                                <div className='bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-4 min-w-[140px]'>

                                    <Workflow className='text-white mb-3 w-6 h-6' />

                                    <p className='text-blue-100 text-sm'>
                                        Workflow
                                    </p>

                                    <h3 className='text-xl font-black text-white mt-1'>
                                        Active
                                    </h3>

                                </div>


                                <div className='bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-4 min-w-[140px]'>

                                    <Activity className='text-white mb-3 w-6 h-6' />

                                    <p className='text-blue-100 text-sm'>
                                        AI Engine
                                    </p>

                                    <h3 className='text-xl font-black text-white mt-1'>
                                        Online
                                    </h3>

                                </div>

                            </div>

                        </div>

                    </div>




                    <div className='h-[65vh] sm:h-[70vh] overflow-y-auto bg-[#f8faf9] px-3 sm:px-6 py-6'>


                        <div className='space-y-6'>


                            {
                                messages.map(
                                    (
                                        msg,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className={`flex ${
                                                msg.type === 'user'
                                                ? 'justify-end'
                                                : 'justify-start'
                                            }`}
                                        >

                                            <div
                                                className={`w-full sm:w-auto max-w-full lg:max-w-[80%] rounded-[28px] p-4 sm:p-6 shadow-sm ${
                                                    msg.type === 'user'
                                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                                                    : 'bg-white border border-slate-200 text-slate-800'
                                                }`}
                                            >


                                                <div className='flex items-start gap-4'>


                                                    <div
                                                        className={`flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 ${
                                                            msg.type === 'user'
                                                            ? 'bg-white/15'
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




                                                    <div className='flex-1 min-w-0 overflow-hidden'>


                                                        {
                                                            msg.type === 'ai'
                                                            ? (

                                                                <div className='space-y-5'>


                                                                    <div className='flex items-center gap-3 mb-4'>

                                                                        <div className='w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center'>

                                                                            <Sparkles className='w-5 h-5 text-blue-600' />

                                                                        </div>


                                                                        <div>

                                                                            <h3 className='font-bold text-slate-900'>
                                                                                AI Assistant
                                                                            </h3>

                                                                            <p className='text-slate-500 text-sm'>
                                                                                Workflow processed successfully
                                                                            </p>

                                                                        </div>

                                                                    </div>




                                                                    {
                                                                        msg.content?.type ===
                                                                        'order_created' && (

                                                                            <div className='overflow-hidden rounded-[28px] border border-emerald-200 bg-emerald-50'>


                                                                                <div className='bg-gradient-to-r from-emerald-500 to-green-600 px-5 sm:px-7 py-6 text-white'>


                                                                                    <div className='flex items-center gap-5'>


                                                                                        <div className='flex items-center justify-center w-14 h-14 rounded-3xl bg-white/15'>

                                                                                            <Package className='w-7 h-7' />

                                                                                        </div>


                                                                                        <div>

                                                                                            <h3 className='text-2xl font-black'>
                                                                                                Manufacturing Order Created
                                                                                            </h3>

                                                                                            <p className='text-emerald-100 mt-2'>
                                                                                                AI successfully generated a manufacturing workflow order.
                                                                                            </p>

                                                                                        </div>

                                                                                    </div>

                                                                                </div>




                                                                                <div className='p-5 sm:p-7 grid grid-cols-1 md:grid-cols-2 gap-5'>


                                                                                    <div className='rounded-3xl bg-white border border-emerald-100 p-5'>

                                                                                        <p className='text-slate-500 text-sm'>
                                                                                            Part Name
                                                                                        </p>

                                                                                        <h3 className='text-xl font-black text-slate-900 mt-3'>
                                                                                            {
                                                                                                msg.content.order?.partName
                                                                                            }
                                                                                        </h3>

                                                                                    </div>




                                                                                    <div className='rounded-3xl bg-white border border-emerald-100 p-5'>

                                                                                        <p className='text-slate-500 text-sm'>
                                                                                            Material
                                                                                        </p>

                                                                                        <h3 className='text-xl font-black text-slate-900 mt-3'>
                                                                                            {
                                                                                                msg.content.order?.material
                                                                                            }
                                                                                        </h3>

                                                                                    </div>




                                                                                    <div className='rounded-3xl bg-white border border-emerald-100 p-5'>

                                                                                        <p className='text-slate-500 text-sm'>
                                                                                            Quantity
                                                                                        </p>

                                                                                        <h3 className='text-xl font-black text-slate-900 mt-3'>
                                                                                            {
                                                                                                msg.content.order?.quantity
                                                                                            }
                                                                                        </h3>

                                                                                    </div>




                                                                                    <div className='rounded-3xl bg-white border border-emerald-100 p-5'>

                                                                                        <p className='text-slate-500 text-sm'>
                                                                                            Deadline
                                                                                        </p>

                                                                                        <h3 className='text-xl font-black text-slate-900 mt-3'>
                                                                                            {
                                                                                                new Date(
                                                                                                    msg.content.order?.deadline
                                                                                                ).toLocaleDateString()
                                                                                            }
                                                                                        </h3>

                                                                                    </div>

                                                                                </div>




                                                                                <div className='px-5 sm:px-7 pb-7 flex flex-wrap gap-3'>


                                                                                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold'>

                                                                                        <Clock3 className='w-4 h-4' />

                                                                                        {
                                                                                            msg.content.order?.status
                                                                                        }

                                                                                    </div>




                                                                                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-orange-50 border border-orange-200 text-orange-700 text-sm font-semibold'>

                                                                                        <Activity className='w-4 h-4' />

                                                                                        {
                                                                                            msg.content.order?.priority
                                                                                        }
                                                                                        {' '}
                                                                                        Priority

                                                                                    </div>




                                                                                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-100 text-emerald-700 text-sm font-semibold'>

                                                                                        <CheckCircle2 className='w-4 h-4' />

                                                                                        AI Processed Successfully

                                                                                    </div>

                                                                                </div>

                                                                            </div>
                                                                        )
                                                                    }




                                                                    {
                                                                        msg.content?.type ===
                                                                        'orders_filtered' && (

                                                                            <div className='overflow-hidden rounded-[28px] border border-slate-200 bg-white'>


                                                                                <div className='bg-[#f8faf9] border-b border-slate-200 px-5 sm:px-7 py-6'>


                                                                                    <h3 className='text-2xl font-black text-slate-900'>
                                                                                        Matching Orders
                                                                                    </h3>


                                                                                    <p className='text-slate-500 mt-2'>
                                                                                        AI identified matching operational workflows.
                                                                                    </p>

                                                                                </div>




                                                                                <div className='divide-y divide-slate-200'>


                                                                                    {
                                                                                        msg.content.orders?.map(
                                                                                            (order) => (

                                                                                                <div
                                                                                                    key={order._id}
                                                                                                    className='p-5 sm:p-7 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5'
                                                                                                >


                                                                                                    <div>

                                                                                                        <h3 className='text-xl font-black text-slate-900'>
                                                                                                            {order.partName}
                                                                                                        </h3>

                                                                                                        <p className='text-slate-500 mt-2'>
                                                                                                            {order.material}
                                                                                                        </p>

                                                                                                    </div>




                                                                                                    <div className='flex flex-wrap gap-3'>


                                                                                                        <div className='px-4 py-2 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold'>

                                                                                                            Qty:
                                                                                                            {' '}
                                                                                                            {order.quantity}

                                                                                                        </div>




                                                                                                        <div className='px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold'>

                                                                                                            {order.status}

                                                                                                        </div>

                                                                                                    </div>

                                                                                                </div>
                                                                                            )
                                                                                        )
                                                                                    }

                                                                                </div>

                                                                            </div>
                                                                        )
                                                                    }




                                                                    {
                                                                        !msg.content?.type && (

                                                                            <div className='rounded-3xl border border-slate-200 bg-[#f8faf9] p-5'>

                                                                                <p className='text-slate-700 leading-8 whitespace-pre-wrap break-words'>

                                                                                    {
                                                                                        typeof msg.content === 'string'
                                                                                        ? msg.content
                                                                                        : JSON.stringify(
                                                                                            msg.content,
                                                                                            null,
                                                                                            2
                                                                                        )
                                                                                    }

                                                                                </p>

                                                                            </div>
                                                                        )
                                                                    }

                                                                </div>

                                                            ) : (

                                                                <p className='leading-8 break-words text-sm sm:text-base'>
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


                                        <div className='bg-white border border-slate-200 rounded-[28px] px-6 py-5 shadow-sm flex items-center gap-5'>


                                            <div className='w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center'>

                                                <Bot className='w-5 h-5 text-blue-600' />

                                            </div>


                                            <div>

                                                <p className='text-sm font-semibold text-slate-700 mb-3'>
                                                    AI Processing Request
                                                </p>


                                                <div className='flex gap-2'>

                                                    <span className='w-3 h-3 rounded-full bg-slate-300 animate-bounce'></span>

                                                    <span className='w-3 h-3 rounded-full bg-slate-300 animate-bounce [animation-delay:0.2s]'></span>

                                                    <span className='w-3 h-3 rounded-full bg-slate-300 animate-bounce [animation-delay:0.4s]'></span>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                )
                            }




                            {
                                error && (

                                    <div className='rounded-3xl border border-red-200 bg-red-50 p-5 text-red-600 text-center font-medium flex items-center justify-center gap-3'>

                                        <AlertTriangle className='w-5 h-5' />

                                        {error}

                                    </div>
                                )
                            }


                            <div ref={messagesEndRef}></div>

                        </div>

                    </div>




                    <div className='border-t border-slate-200 bg-white px-3 sm:px-6 py-5'>


                        <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4'>


                            <div className='flex-1 relative'>


                                <input
                                    type='text'
                                    placeholder='Ask AI to create orders, update workflow status, or track quality reports...'
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(
                                            e.target.value
                                        )
                                    }
                                    onKeyDown={handleKeyDown}
                                    className='w-full px-6 py-4 rounded-3xl border border-slate-200 bg-[#f8faf9] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-slate-700'
                                />

                            </div>




                            <button
                                onClick={sendMessage}
                                disabled={loading}
                                className='inline-flex items-center justify-center gap-3 px-7 py-4 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white font-semibold transition-all disabled:opacity-70 shadow-lg shadow-blue-100'
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