import {
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    Bot,
    SendHorizonal,
    User,
    CheckCircle2,
    Package,
    Activity,
    AlertTriangle,
    BarChart3,
    PackageCheck,
    Sparkles,
} from 'lucide-react';

import {
    motion,
} from 'framer-motion';

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

            console.log(error);

            setError(

                error.response?.data?.description ||

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




    const renderAIResponse = (
        content
    ) => {

        const {
            action,
            title,
            description,
            data,
        } = content;




        // =========================================
        // CREATE ORDER
        // =========================================

        if (
            action ===
            'create_order'
        ) {

            return (

                <div className='overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-[0_10px_40px_rgba(16,185,129,0.06)]'>


                    {/* HEADER */}

                    <div className='relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 px-5 sm:px-8 py-7 text-white'>


                        <div className='absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl'></div>




                        <div className='relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6'>


                            <div className='flex items-center gap-5'>


                                <div className='flex items-center justify-center w-16 h-16 rounded-[30px] bg-white/15 backdrop-blur-md shrink-0 shadow-lg'>

                                    <Package className='w-8 h-8' />

                                </div>




                                <div>

                                    <h3 className='text-3xl font-black tracking-tight'>
                                        {title}
                                    </h3>

                                    <p className='text-emerald-100 mt-2 leading-7'>
                                        {description}
                                    </p>

                                </div>

                            </div>




                            <div className='flex flex-wrap gap-3'>


                                <div className='inline-flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/15 border border-white/10 backdrop-blur-md'>


                                    <CheckCircle2 className='w-6 h-6 text-white' />

                                    <div>

                                        <p className='text-xs uppercase tracking-wider text-emerald-100'>
                                            Status
                                        </p>

                                        <h4 className='font-bold text-lg'>
                                            {data?.status}
                                        </h4>

                                    </div>

                                </div>




                                <div className='inline-flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/15 border border-white/10 backdrop-blur-md'>


                                    <Activity className='w-6 h-6 text-white' />

                                    <div>

                                        <p className='text-xs uppercase tracking-wider text-emerald-100'>
                                            Priority
                                        </p>

                                        <h4 className='font-bold text-lg'>
                                            {data?.priority}
                                        </h4>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>




                    {/* CONTENT */}

                    <div className='p-5 sm:p-8 space-y-7'>


                        {/* TOP INFO */}

                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>


                            <InfoCard
                                title='Order Number'
                                value={data?.orderNumber}
                            />

                            <InfoCard
                                title='Product Code'
                                value={data?.productCode}
                            />

                            <InfoCard
                                title='Workflow Stage'
                                value={
                                    data?.workflow
                                    ?.currentStage
                                }
                                highlight='text-blue-600'
                            />

                            <InfoCard
                                title='Workflow Progress'
                                value={`${
                                    data?.workflow
                                    ?.progress
                                }%`}
                                highlight='text-emerald-600'
                            />

                        </div>




                        {/* PRODUCT DETAILS */}

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>


                            <InfoCard
                                title='Part Name'
                                value={data?.partName}
                            />

                            <InfoCard
                                title='Material'
                                value={data?.material}
                            />

                            <InfoCard
                                title='Quantity'
                                value={data?.quantity}
                            />

                            <InfoCard
                                title='Deadline'
                                value={
                                    new Date(
                                        data?.deadline
                                    ).toLocaleDateString()
                                }
                            />

                        </div>




                        {/* WORKFLOW */}

                        <div className='rounded-[30px] border border-slate-200 bg-[#f8faf9] p-6 sm:p-7'>


                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5'>


                                <div>

                                    <h3 className='text-2xl font-black text-slate-900'>
                                        Workflow Tracking
                                    </h3>

                                    <p className='text-slate-500 mt-1'>
                                        Real-time manufacturing workflow progress
                                    </p>

                                </div>




                                <div className='inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-emerald-50 border border-emerald-200'>


                                    <PackageCheck className='w-5 h-5 text-emerald-600' />

                                    <span className='font-bold text-emerald-700'>
                                        {
                                            data?.workflow
                                            ?.progress
                                        }%
                                        Complete
                                    </span>

                                </div>

                            </div>




                            <div className='w-full h-5 bg-white rounded-full overflow-hidden'>


                                <motion.div
                                    initial={{
                                        width: 0,
                                    }}
                                    animate={{
                                        width:
                                        `${data?.workflow?.progress || 0}%`
                                    }}
                                    transition={{
                                        duration: 1,
                                    }}
                                    className='h-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-full'
                                ></motion.div>

                            </div>

                        </div>

                    </div>

                </div>
            );
        }




        // =========================================
        // ANALYTICS
        // =========================================

        if (
            action ===
            'analytics'
        ) {

            return (

                <div className='overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-[0_10px_40px_rgba(16,185,129,0.06)]'>


                    <div className='bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 px-6 py-7 text-white'>


                        <div className='flex items-center gap-5'>


                            <div className='w-16 h-16 rounded-3xl bg-white/15 flex items-center justify-center'>

                                <BarChart3 className='w-8 h-8' />

                            </div>




                            <div>

                                <h3 className='text-3xl font-black'>
                                    {title}
                                </h3>

                                <p className='text-emerald-100 mt-2'>
                                    {description}
                                </p>

                            </div>

                        </div>

                    </div>




                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 p-6'>


                        <AnalyticsCard
                            title='Total Orders'
                            value={data?.totalOrders}
                        />

                        <AnalyticsCard
                            title='Accepted'
                            value={data?.acceptedOrders}
                            color='text-emerald-600'
                        />

                        <AnalyticsCard
                            title='In Review'
                            value={data?.reviewOrders}
                            color='text-orange-500'
                        />

                        <AnalyticsCard
                            title='Received'
                            value={data?.receivedOrders}
                            color='text-blue-600'
                        />

                    </div>

                </div>
            );
        }




        // =========================================
        // DEFAULT
        // =========================================

        return (

            <div className='rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm'>

                <h3 className='text-2xl font-black text-slate-900'>
                    {title}
                </h3>

                <p className='text-slate-600 mt-4 leading-8'>
                    {description}
                </p>

            </div>
        );
    };




    return (

        <div className='min-h-screen bg-[#f7faf8]'>

            <Navbar />




            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>


                <div className='overflow-hidden rounded-[36px] border border-emerald-100 bg-white/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(16,185,129,0.06)]'>


                    {/* HERO */}

                    <div className='relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 px-5 sm:px-8 py-8'>


                        <div className='absolute top-0 right-0 w-[320px] h-[320px] bg-white/10 rounded-full blur-3xl'></div>




                        <div className='relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8'>


                            <div>

                                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white text-sm font-semibold mb-5'>

                                    <Sparkles className='w-4 h-4' />

                                    AI Manufacturing Intelligence

                                </div>




                                <h1 className='text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight'>
                                    Smart AI
                                    <span className='block'>
                                        Operations Assistant
                                    </span>
                                </h1>




                                <p className='text-emerald-100 mt-5 max-w-3xl leading-8 text-sm sm:text-base'>

                                    Create manufacturing orders,
                                    manage workflows,
                                    track inspections,
                                    monitor production analytics,
                                    and automate enterprise operations using conversational AI.

                                </p>

                            </div>




                            <div className='grid grid-cols-2 gap-4 min-w-[320px]'>


                                <HeroStat
                                    title='Live Orders'
                                    value='24'
                                />

                                <HeroStat
                                    title='AI Accuracy'
                                    value='98%'
                                />

                                <HeroStat
                                    title='Automation'
                                    value='Active'
                                />

                                <HeroStat
                                    title='Operations'
                                    value='Live'
                                />

                            </div>

                        </div>

                    </div>




                    {/* CHAT */}

                    <div className='h-[68vh] overflow-y-auto bg-[#f8faf9] px-3 sm:px-6 py-6'>


                        <div className='space-y-6'>


                            {
                                messages.map((msg, index) => (

                                    <div
                                        key={index}
                                        className={`flex ${
                                            msg.type === 'user'
                                            ? 'justify-end'
                                            : 'justify-start'
                                        }`}
                                    >

                                        <div
                                            className={`max-w-[95%] rounded-[30px] p-4 sm:p-6 ${
                                                msg.type === 'user'
                                                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                                                : ''
                                            }`}
                                        >


                                            <div className='flex items-start gap-4'>


                                                <div
                                                    className={`flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 ${
                                                        msg.type === 'user'
                                                        ? 'bg-white/15'
                                                        : 'bg-emerald-100'
                                                    }`}
                                                >

                                                    {
                                                        msg.type === 'user'
                                                        ? (
                                                            <User className='w-5 h-5' />
                                                        ) : (
                                                            <Bot className='w-5 h-5 text-emerald-700' />
                                                        )
                                                    }

                                                </div>




                                                <div className='flex-1'>

                                                    {
                                                        msg.type === 'ai'
                                                        ? renderAIResponse(
                                                            msg.content
                                                        )
                                                        : (
                                                            <p className='leading-8 text-base'>
                                                                {msg.content}
                                                            </p>
                                                        )
                                                    }

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                ))
                            }




                            {
                                loading && (

                                    <div className='flex justify-start'>


                                        <div className='bg-white border border-emerald-100 rounded-[28px] px-6 py-5 shadow-sm flex items-center gap-5'>


                                            <div className='w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center'>

                                                <Bot className='w-5 h-5 text-emerald-700' />

                                            </div>




                                            <div>

                                                <p className='text-sm font-semibold text-slate-700 mb-3'>
                                                    AI Processing Request
                                                </p>




                                                <div className='flex gap-2'>

                                                    <span className='w-3 h-3 rounded-full bg-emerald-300 animate-bounce'></span>

                                                    <span className='w-3 h-3 rounded-full bg-emerald-300 animate-bounce [animation-delay:0.2s]'></span>

                                                    <span className='w-3 h-3 rounded-full bg-emerald-300 animate-bounce [animation-delay:0.4s]'></span>

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




                    {/* INPUT */}

                    <div className='border-t border-emerald-100 bg-white px-3 sm:px-6 py-5'>


                        <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4'>


                            <div className='flex-1 relative'>


                                <input
                                    type='text'
                                    placeholder='Ask AI to create orders, update workflow status, track quality inspections, or generate analytics...'
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(
                                            e.target.value
                                        )
                                    }
                                    onKeyDown={handleKeyDown}
                                    className='w-full px-6 py-4 rounded-3xl border border-emerald-100 bg-[#f8faf9] outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-slate-700'
                                />

                            </div>




                            <button
                                onClick={sendMessage}
                                disabled={loading}
                                className='inline-flex items-center justify-center gap-3 px-7 py-4 rounded-3xl bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 text-white font-semibold transition-all disabled:opacity-70 shadow-lg shadow-emerald-100'
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




function HeroStat({
    title,
    value,
}) {

    return (

        <div className='rounded-3xl bg-white/15 border border-white/10 backdrop-blur-md p-5 text-white'>

            <p className='text-sm text-emerald-100'>
                {title}
            </p>

            <h3 className='text-3xl font-black mt-3'>
                {value}
            </h3>

        </div>
    );
}




function InfoCard({
    title,
    value,
    highlight,
}) {

    return (

        <div className='rounded-[28px] bg-white border border-slate-200 p-6'>

            <p className='text-sm text-slate-500'>
                {title}
            </p>

            <h3 className={`text-2xl font-black mt-3 break-all ${
                highlight || 'text-slate-900'
            }`}>

                {value || 'N/A'}

            </h3>

        </div>
    );
}




function AnalyticsCard({
    title,
    value,
    color,
}) {

    return (

        <div className='rounded-3xl border border-slate-200 p-5 bg-[#f8faf9]'>

            <p className='text-slate-500'>
                {title}
            </p>

            <h2 className={`text-3xl font-black mt-3 ${
                color || 'text-slate-900'
            }`}>

                {value || 0}

            </h2>

        </div>
    );
}

export default ChatPage;