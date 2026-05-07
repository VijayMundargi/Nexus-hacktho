import {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    Package,
    CheckCircle2,
    Clock3,
    ClipboardList,
    TrendingUp,
    Activity,
    ShieldCheck,
    Factory,
    Cpu,
    AlertTriangle,
    ArrowUpRight,
    Sparkles,
    TimerReset,
    Workflow,
    Target,
} from 'lucide-react';

import API from '../api/axios';

import Navbar from '../components/Navbar';


function AnalyticsPage() {

    const [orders, setOrders] =
    useState([]);

    const [loading, setLoading] =
    useState(true);

    const [error, setError] =
    useState('');


    const fetchOrders = async () => {

        try {

            setLoading(true);

            const { data } =
            await API.get('/orders');

            setOrders(data.orders || []);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                'Failed to load analytics'
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchOrders();

    }, []);



    const analytics = useMemo(() => {

        const totalOrders =
        orders.length;

        const acceptedOrders =
        orders.filter(
            (o) =>
            o.status === 'Accepted'
        ).length;

        const reviewOrders =
        orders.filter(
            (o) =>
            o.status === 'In Review'
        ).length;

        const receivedOrders =
        orders.filter(
            (o) =>
            o.status === 'Received'
        ).length;

        const highPriority =
        orders.filter(
            (o) =>
            o.priority === 'High'
        ).length;

        const mediumPriority =
        orders.filter(
            (o) =>
            o.priority === 'Medium'
        ).length;

        const lowPriority =
        orders.filter(
            (o) =>
            o.priority === 'Low'
        ).length;

        const qualityUpdates =
        orders.filter(
            (o) =>
            o.latestQualityNote
        ).length;

        const acceptanceRate =
        totalOrders > 0
        ? (
            (
                acceptedOrders /
                totalOrders
            ) * 100
        ).toFixed(1)
        : 0;

        return {

            totalOrders,

            acceptedOrders,

            reviewOrders,

            receivedOrders,

            highPriority,

            mediumPriority,

            lowPriority,

            qualityUpdates,

            acceptanceRate,
        };

    }, [orders]);



    const metricCards = [

        {
            title: 'Total Orders',
            value: analytics.totalOrders,
            icon: Package,
            color:
            'from-blue-500 to-indigo-600',
            growth: '+12%',
        },

        {
            title: 'Accepted Orders',
            value: analytics.acceptedOrders,
            icon: CheckCircle2,
            color:
            'from-emerald-500 to-green-600',
            growth: '+18%',
        },

        {
            title: 'In Review',
            value: analytics.reviewOrders,
            icon: Clock3,
            color:
            'from-orange-400 to-amber-500',
            growth: '+5%',
        },

        {
            title: 'Received Orders',
            value: analytics.receivedOrders,
            icon: ClipboardList,
            color:
            'from-cyan-500 to-sky-500',
            growth: '+9%',
        },

        {
            title: 'Workflow Efficiency',
            value:
            `${analytics.acceptanceRate}%`,
            icon: TrendingUp,
            color:
            'from-purple-500 to-fuchsia-600',
            growth: '+21%',
        },

        {
            title: 'Quality Reports',
            value:
            analytics.qualityUpdates,
            icon: ShieldCheck,
            color:
            'from-pink-500 to-rose-500',
            growth: '+16%',
        },
    ];


    return (

        <div className='min-h-screen bg-[#f5f7f7]'>

            <Navbar />


            <div className='p-5 lg:p-10'>


                <div className='relative overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm mb-10'>


                    <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[120px] opacity-50'></div>


                    <div className='relative z-10 p-8 lg:p-12'>


                        <div className='flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10'>


                            <div className='max-w-4xl'>


                                <div className='inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold mb-6'>

                                    <Sparkles className='w-4 h-4' />

                                    Enterprise Manufacturing Intelligence

                                </div>


                                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight'>

                                    Operational
                                    <span className='text-emerald-600'>
                                        {' '}
                                        Analytics
                                    </span>
                                    {' '}
                                    Dashboard

                                </h1>


                                <p className='text-slate-600 text-lg leading-9 mt-6 max-w-3xl'>

                                    Monitor AI-powered manufacturing workflows,
                                    production efficiency, operational quality,
                                    and intelligent automation performance
                                    across enterprise manufacturing operations.

                                </p>

                            </div>




                            <div className='grid grid-cols-2 gap-5'>


                                <div className='rounded-3xl border border-slate-200 bg-[#f8faf9] p-5 min-w-[180px]'>

                                    <Factory className='text-emerald-600 mb-4 w-7 h-7' />

                                    <p className='text-slate-500 text-sm'>
                                        Manufacturing
                                    </p>

                                    <h3 className='text-2xl font-black text-slate-900 mt-2'>
                                        Active
                                    </h3>

                                </div>


                                <div className='rounded-3xl border border-slate-200 bg-[#f8faf9] p-5 min-w-[180px]'>

                                    <Cpu className='text-cyan-600 mb-4 w-7 h-7' />

                                    <p className='text-slate-500 text-sm'>
                                        AI Engine
                                    </p>

                                    <h3 className='text-2xl font-black text-slate-900 mt-2'>
                                        Online
                                    </h3>

                                </div>


                                <div className='rounded-3xl border border-slate-200 bg-[#f8faf9] p-5 min-w-[180px]'>

                                    <Workflow className='text-purple-600 mb-4 w-7 h-7' />

                                    <p className='text-slate-500 text-sm'>
                                        Workflow Status
                                    </p>

                                    <h3 className='text-2xl font-black text-slate-900 mt-2'>
                                        Running
                                    </h3>

                                </div>


                                <div className='rounded-3xl border border-slate-200 bg-[#f8faf9] p-5 min-w-[180px]'>

                                    <Target className='text-orange-600 mb-4 w-7 h-7' />

                                    <p className='text-slate-500 text-sm'>
                                        Performance
                                    </p>

                                    <h3 className='text-2xl font-black text-slate-900 mt-2'>
                                        Stable
                                    </h3>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>



                {
                    loading ? (

                        <div className='rounded-[30px] border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm'>
                            Loading operational analytics...
                        </div>

                    ) : error ? (

                        <div className='rounded-[30px] border border-red-200 bg-red-50 p-12 text-center text-red-600 shadow-sm'>
                            {error}
                        </div>

                    ) : (

                        <>

                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10'>


                                {
                                    metricCards.map(
                                        (
                                            card,
                                            index
                                        ) => {

                                            const Icon =
                                            card.icon;

                                            return (

                                                <div
                                                    key={index}
                                                    className='relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1'
                                                >

                                                    <div className={`absolute inset-0 opacity-[0.04] bg-gradient-to-br ${card.color}`}></div>


                                                    <div className='relative z-10'>


                                                        <div className='flex items-start justify-between'>


                                                            <div>

                                                                <p className='text-slate-500 text-sm font-medium'>
                                                                    {
                                                                        card.title
                                                                    }
                                                                </p>

                                                                <h2 className='text-5xl font-black text-slate-900 mt-5'>
                                                                    {
                                                                        card.value
                                                                    }
                                                                </h2>

                                                            </div>



                                                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${card.color} shadow-lg`}>

                                                                <Icon className='text-white w-7 h-7' />

                                                            </div>

                                                        </div>




                                                        <div className='mt-8 flex items-center justify-between'>


                                                            <div className='inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-semibold'>

                                                                <TrendingUp className='w-4 h-4' />

                                                                {
                                                                    card.growth
                                                                }

                                                            </div>


                                                            <div className='text-slate-400 text-sm font-medium'>
                                                                Last 30 days
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            );
                                        }
                                    )
                                }

                            </div>




                            <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>


                                <div className='xl:col-span-2 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm'>


                                    <div className='flex items-center justify-between mb-8'>


                                        <div>

                                            <h2 className='text-3xl font-black text-slate-900'>
                                                Operational Insights
                                            </h2>

                                            <p className='text-slate-500 mt-2'>
                                                AI-powered manufacturing intelligence
                                            </p>

                                        </div>


                                        <div className='flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold'>

                                            <div className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></div>

                                            Live Data

                                        </div>

                                    </div>




                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>


                                        <div className='rounded-3xl border border-slate-200 bg-[#f8faf9] p-6'>


                                            <div className='flex items-center justify-between mb-6'>


                                                <div className='w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center'>

                                                    <ShieldCheck className='text-emerald-700 w-7 h-7' />

                                                </div>


                                                <ArrowUpRight className='text-slate-400' />

                                            </div>


                                            <h3 className='text-xl font-black text-slate-900'>
                                                Quality Monitoring
                                            </h3>


                                            <p className='text-slate-600 leading-8 mt-4'>
                                                {
                                                    analytics.qualityUpdates
                                                }
                                                {' '}
                                                active quality checkpoints
                                                are currently being tracked
                                                through operational workflows.
                                            </p>

                                        </div>




                                        <div className='rounded-3xl border border-slate-200 bg-[#f8faf9] p-6'>


                                            <div className='flex items-center justify-between mb-6'>


                                                <div className='w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center'>

                                                    <TimerReset className='text-blue-700 w-7 h-7' />

                                                </div>


                                                <ArrowUpRight className='text-slate-400' />

                                            </div>


                                            <h3 className='text-xl font-black text-slate-900'>
                                                Workflow Efficiency
                                            </h3>


                                            <p className='text-slate-600 leading-8 mt-4'>
                                                Manufacturing workflow completion
                                                efficiency is currently operating
                                                at
                                                {' '}
                                                {
                                                    analytics.acceptanceRate
                                                }
                                                % across active orders.
                                            </p>

                                        </div>

                                    </div>

                                </div>




                                <div className='rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm'>


                                    <h2 className='text-3xl font-black text-slate-900 mb-8'>
                                        Priority Overview
                                    </h2>



                                    <div className='space-y-6'>


                                        <div>

                                            <div className='flex items-center justify-between mb-3'>

                                                <span className='font-semibold text-slate-700'>
                                                    High Priority
                                                </span>

                                                <span className='text-red-600 font-bold'>
                                                    {
                                                        analytics.highPriority
                                                    }
                                                </span>

                                            </div>

                                            <div className='h-3 rounded-full bg-red-100 overflow-hidden'>

                                                <div
                                                    style={{
                                                        width: `${analytics.highPriority * 10}%`,
                                                    }}
                                                    className='h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full'
                                                ></div>

                                            </div>

                                        </div>




                                        <div>

                                            <div className='flex items-center justify-between mb-3'>

                                                <span className='font-semibold text-slate-700'>
                                                    Medium Priority
                                                </span>

                                                <span className='text-blue-600 font-bold'>
                                                    {
                                                        analytics.mediumPriority
                                                    }
                                                </span>

                                            </div>

                                            <div className='h-3 rounded-full bg-blue-100 overflow-hidden'>

                                                <div
                                                    style={{
                                                        width: `${analytics.mediumPriority * 10}%`,
                                                    }}
                                                    className='h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full'
                                                ></div>

                                            </div>

                                        </div>




                                        <div>

                                            <div className='flex items-center justify-between mb-3'>

                                                <span className='font-semibold text-slate-700'>
                                                    Low Priority
                                                </span>

                                                <span className='text-slate-700 font-bold'>
                                                    {
                                                        analytics.lowPriority
                                                    }
                                                </span>

                                            </div>

                                            <div className='h-3 rounded-full bg-slate-200 overflow-hidden'>

                                                <div
                                                    style={{
                                                        width: `${analytics.lowPriority * 10}%`,
                                                    }}
                                                    className='h-full bg-slate-500 rounded-full'
                                                ></div>

                                            </div>

                                        </div>

                                    </div>




                                    <div className='mt-10 rounded-3xl border border-orange-200 bg-orange-50 p-6'>


                                        <div className='flex items-start gap-4'>


                                            <div className='w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0'>

                                                <AlertTriangle className='text-orange-600 w-6 h-6' />

                                            </div>


                                            <div>

                                                <h3 className='text-lg font-bold text-orange-700'>
                                                    Operational Alert
                                                </h3>


                                                <p className='text-orange-600 leading-8 mt-3'>
                                                    {
                                                        analytics.reviewOrders
                                                    }
                                                    {' '}
                                                    orders are currently under review
                                                    and awaiting operational approval.
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </>
                    )
                }

            </div>

        </div>
    );
}

export default AnalyticsPage;