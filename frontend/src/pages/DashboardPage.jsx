import {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    Search,
    Package,
    Clock3,
    ShieldCheck,
    TrendingUp,
    Activity,
    Sparkles,
    AlertTriangle,
    Factory,
    ClipboardList,
} from 'lucide-react';

import {
    motion,
} from 'framer-motion';

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from 'recharts';

import API from '../api/axios';

import Navbar from '../components/Navbar';

import OrderCard from '../components/OrderCard';




function DashboardPage() {

    const [orders, setOrders] =
    useState([]);

    const [loading, setLoading] =
    useState(true);

    const [error, setError] =
    useState('');

    const [search, setSearch] =
    useState('');

    const [statusFilter, setStatusFilter] =
    useState('All');

    const [sortBy, setSortBy] =
    useState('latest');




    // =========================================
    // FETCH ORDERS
    // =========================================

    const fetchOrders = async () => {

        try {

            setLoading(true);

            const { data } =
            await API.get('/orders');

            setOrders(data.orders || []);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                'Failed to fetch orders'
            );

        } finally {

            setLoading(false);
        }
    };




    useEffect(() => {

        fetchOrders();

    }, []);




    // =========================================
    // FILTER ORDERS
    // =========================================

    const filteredOrders = useMemo(() => {

        let filtered = orders.filter((order) => {

            const matchesSearch =

                order.partName
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                ) ||

                order.material
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                ) ||

                order.orderNumber
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                );




            const matchesStatus =

                statusFilter === 'All'
                ? true
                : order.status === statusFilter;




            return (
                matchesSearch &&
                matchesStatus
            );
        });




        if (sortBy === 'latest') {

            filtered.sort(
                (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
            );
        }




        if (sortBy === 'priority') {

            filtered.sort((a, b) => {

                const priorityRank = {

                    Critical: 4,
                    High: 3,
                    Medium: 2,
                    Low: 1,
                };

                return (
                    priorityRank[b.priority] -
                    priorityRank[a.priority]
                );
            });
        }




        return filtered;

    }, [
        orders,
        search,
        statusFilter,
        sortBy,
    ]);




    // =========================================
    // ANALYTICS
    // =========================================

    const analytics = useMemo(() => {

        return {

            total:
            orders.length,

            received:
            orders.filter(
                (o) =>
                o.status === 'Received'
            ).length,

            review:
            orders.filter(
                (o) =>
                o.status === 'In Review'
            ).length,

            manufacturing:
            orders.filter(
                (o) =>
                o.status === 'Manufacturing'
            ).length,

            quality:
            orders.filter(
                (o) =>
                o.status === 'Quality Check'
            ).length,

            highPriority:
            orders.filter(
                (o) =>
                o.priority === 'High'
            ).length,

            completionRate:

            orders.length > 0

            ? Math.round(

                (
                    orders.filter(
                        (o) =>
                        o.status === 'Accepted'
                    ).length /

                    orders.length
                ) * 100
            )

            : 0,
        };

    }, [orders]);




    // =========================================
    // DASHBOARD CARDS
    // =========================================

    const cards = [

        {
            title: 'Total Orders',
            value: analytics.total,
            icon: Package,
            bg:
            'from-emerald-500 to-green-600',
            iconBg:
            'bg-emerald-100',
            iconColor:
            'text-emerald-700',
        },

        {
            title: 'In Review',
            value: analytics.review,
            icon: Clock3,
            bg:
            'from-amber-500 to-orange-500',
            iconBg:
            'bg-orange-100',
            iconColor:
            'text-orange-700',
        },

        {
            title: 'Manufacturing',
            value:
            analytics.manufacturing,
            icon: Factory,
            bg:
            'from-green-500 to-emerald-600',
            iconBg:
            'bg-green-100',
            iconColor:
            'text-green-700',
        },

        {
            title: 'Quality Check',
            value:
            analytics.quality,
            icon: ShieldCheck,
            bg:
            'from-teal-500 to-emerald-600',
            iconBg:
            'bg-teal-100',
            iconColor:
            'text-teal-700',
        },
    ];




    // =========================================
    // CHART DATA
    // =========================================

    const chartData = [

        {
            name: 'Received',
            value:
            analytics.received,
            color: '#10b981',
        },

        {
            name: 'Review',
            value:
            analytics.review,
            color: '#f59e0b',
        },

        {
            name: 'Manufacturing',
            value:
            analytics.manufacturing,
            color: '#22c55e',
        },

        {
            name: 'Quality',
            value:
            analytics.quality,
            color: '#14b8a6',
        },
    ];




    return (

        <div className='min-h-screen bg-[#f7faf8]'>

            <Navbar />




            <div className='w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7'>


                {/* HERO */}

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 20,
                    }}

                    animate={{
                        opacity: 1,
                        y: 0,
                    }}

                    className='mb-8'
                >

                    <div className='flex flex-col 2xl:flex-row 2xl:items-center 2xl:justify-between gap-6'>


                        <div>

                            <div className='inline-flex items-center gap-2 bg-white/90 backdrop-blur-xl border border-emerald-100 rounded-full px-4 py-2 shadow-[0_10px_40px_rgba(16,185,129,0.06)] mb-5'>

                                <Sparkles className='w-4 h-4 text-emerald-600' />

                                <span className='text-sm font-medium text-slate-700'>
                                    AI Manufacturing Operations
                                </span>

                            </div>




                            <h1 className='text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight'>

                                Smart

                                <span className='block bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent'>

                                    Operations Dashboard

                                </span>

                            </h1>




                            <p className='text-slate-500 mt-5 text-base sm:text-lg max-w-2xl leading-relaxed'>

                                Real-time manufacturing intelligence,
                                workflow visibility,
                                AI-assisted operations,
                                and production analytics.

                            </p>

                        </div>




                        {/* STATUS CARD */}

                        <div className='bg-white/90 backdrop-blur-xl rounded-[28px] border border-emerald-100 p-5 sm:p-6 shadow-[0_10px_40px_rgba(16,185,129,0.06)] w-full 2xl:max-w-[360px]'>

                            <div className='flex items-center justify-between mb-5'>


                                <div>

                                    <p className='text-slate-500 text-sm'>
                                        Live System
                                    </p>

                                    <h2 className='text-3xl sm:text-4xl font-black mt-2 text-slate-900'>
                                        Active
                                    </h2>

                                </div>


                                <div className='w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center'>

                                    <Activity className='w-6 h-6 text-emerald-700' />

                                </div>

                            </div>




                            <div className='space-y-5 mt-8'>


                                <LiveItem
                                    label='Orders'
                                    value={analytics.total}
                                />

                                <LiveItem
                                    label='Manufacturing'
                                    value={analytics.manufacturing}
                                />

                                <LiveItem
                                    label='High Priority'
                                    value={analytics.highPriority}
                                    danger
                                />

                            </div>

                        </div>

                    </div>

                </motion.div>




                {/* FILTERS */}

                <div className='bg-white/90 backdrop-blur-xl rounded-[28px] border border-emerald-100 p-5 shadow-[0_10px_40px_rgba(16,185,129,0.06)] mb-8'>

                    <div className='flex flex-col xl:flex-row gap-4'>


                        <div className='flex items-center gap-3 bg-[#f8faf9] rounded-2xl px-4 h-14 flex-1 border border-emerald-100'>

                            <Search className='w-5 h-5 text-slate-500' />

                            <input
                                type='text'
                                placeholder='Search by order number, material or part name'
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                className='bg-transparent w-full outline-none text-slate-700 placeholder:text-slate-400'
                            />

                        </div>




                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value
                                )
                            }
                            className='h-14 px-5 rounded-2xl border border-emerald-100 bg-[#f8faf9] min-w-[220px] outline-none'
                        >

                            <option value='All'>
                                All Status
                            </option>

                            <option value='Received'>
                                Received
                            </option>

                            <option value='In Review'>
                                In Review
                            </option>

                            <option value='Accepted'>
                                Accepted
                            </option>

                            <option value='Manufacturing'>
                                Manufacturing
                            </option>

                            <option value='Quality Check'>
                                Quality Check
                            </option>

                        </select>




                        <select
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(
                                    e.target.value
                                )
                            }
                            className='h-14 px-5 rounded-2xl border border-emerald-100 bg-[#f8faf9] min-w-[200px] outline-none'
                        >

                            <option value='latest'>
                                Latest Orders
                            </option>

                            <option value='priority'>
                                Priority Orders
                            </option>

                        </select>

                    </div>

                </div>




                {/* ANALYTICS */}

                <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 sm:gap-6 mb-8'>


                    {
                        cards.map((card, index) => (

                            <motion.div

                                key={index}

                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}

                                transition={{
                                    delay:
                                    index * 0.1,
                                }}

                                className='relative overflow-hidden bg-white/90 backdrop-blur-xl rounded-[28px] border border-emerald-100 p-5 shadow-[0_10px_40px_rgba(16,185,129,0.06)]'
                            >

                                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.bg}`}></div>




                                <div className='flex items-center justify-between'>


                                    <div>

                                        <p className='text-slate-500 text-sm'>
                                            {card.title}
                                        </p>

                                        <h2 className='text-3xl sm:text-4xl font-black text-slate-900 mt-3'>
                                            {card.value}
                                        </h2>

                                    </div>




                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.iconBg}`}>

                                        <card.icon className={`${card.iconColor} w-6 h-6`} />

                                    </div>

                                </div>

                            </motion.div>
                        ))
                    }

                </div>




                {/* WORKFLOW ANALYTICS */}

                <div className='grid grid-cols-1 2xl:grid-cols-3 gap-6 mb-8'>


                    {/* MAIN GRAPH */}

                    <div className='2xl:col-span-2 relative overflow-hidden bg-white/90 backdrop-blur-xl rounded-[32px] border border-emerald-100 p-6 sm:p-8 shadow-[0_10px_40px_rgba(16,185,129,0.06)]'>


                        <div className='absolute top-0 right-0 w-[320px] h-[320px] bg-emerald-100/40 blur-3xl rounded-full'></div>




                        {/* HEADER */}

                        <div className='relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10'>


                            <div>

                                <div className='inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-5'>

                                    <Activity className='w-4 h-4' />

                                    Live Workflow Intelligence

                                </div>




                                <h2 className='text-2xl sm:text-3xl font-black text-slate-900'>
                                    Workflow Distribution
                                </h2>




                                <p className='text-slate-500 mt-3 text-sm sm:text-base max-w-2xl leading-relaxed'>

                                    Real-time manufacturing lifecycle visibility,
                                    workflow balancing,
                                    operational bottlenecks,
                                    and intelligent production monitoring.

                                </p>

                            </div>

                        </div>




                        {/* GRAPH */}

                        <div className='relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-10 items-center'>


                            {/* LEFT STATUS */}

                            <div className='space-y-5 order-2 xl:order-1'>


                                {
                                    chartData.map((item, index) => (

                                        <motion.div

                                            key={index}

                                            initial={{
                                                opacity: 0,
                                                x: -20,
                                            }}

                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                            }}

                                            transition={{
                                                delay:
                                                index * 0.1,
                                            }}

                                            className='bg-[#f8faf9] border border-emerald-100 rounded-3xl p-5'
                                        >

                                            <div className='flex items-center justify-between mb-4'>


                                                <div className='flex items-center gap-3'>


                                                    <div
                                                        className='w-4 h-4 rounded-full'
                                                        style={{
                                                            background:
                                                            item.color,
                                                        }}
                                                    ></div>


                                                    <span className='font-semibold text-slate-800 text-lg'>
                                                        {item.name}
                                                    </span>

                                                </div>




                                                <span className='text-3xl font-black text-slate-900'>
                                                    {item.value}
                                                </span>

                                            </div>




                                            <div className='h-3 rounded-full bg-white overflow-hidden'>

                                                <motion.div

                                                    initial={{
                                                        width: 0,
                                                    }}

                                                    animate={{
                                                        width:
                                                        `${
                                                            analytics.total > 0
                                                            ? (
                                                                item.value /
                                                                analytics.total
                                                            ) * 100
                                                            : 0
                                                        }%`,
                                                    }}

                                                    transition={{
                                                        duration: 1,
                                                    }}

                                                    className='h-full rounded-full'
                                                    style={{
                                                        background:
                                                        item.color,
                                                    }}
                                                ></motion.div>

                                            </div>

                                        </motion.div>
                                    ))
                                }

                            </div>




                            {/* RIGHT GRAPH */}

                            <div className='relative h-[340px] sm:h-[420px] w-full order-1 xl:order-2 flex items-center justify-center'>


                                <ResponsiveContainer width='100%' height='100%'>

                                    <PieChart>

                                        <Pie
                                            data={chartData}
                                            dataKey='value'
                                            innerRadius={90}
                                            outerRadius={145}
                                            paddingAngle={6}
                                            strokeWidth={0}
                                        >

                                            {
                                                chartData.map((entry, index) => (

                                                    <Cell
                                                        key={index}
                                                        fill={entry.color}
                                                    />
                                                ))
                                            }

                                        </Pie>

                                    </PieChart>

                                </ResponsiveContainer>




                                <div className='absolute flex flex-col items-center justify-center pointer-events-none'>

                                    <span className='text-sm font-medium text-slate-500'>
                                        Total Orders
                                    </span>

                                    <h2 className='text-5xl font-black text-slate-900 mt-2'>
                                        {analytics.total}
                                    </h2>

                                </div>

                            </div>

                        </div>

                    </div>




                    {/* SIDE PANEL */}

                    <div className='space-y-6'>


                        <div className='bg-white/90 backdrop-blur-xl rounded-[32px] border border-emerald-100 p-7 shadow-[0_10px_40px_rgba(16,185,129,0.06)]'>

                            <p className='text-slate-500 text-sm font-medium'>
                                Completion Rate
                            </p>

                            <h2 className='text-5xl font-black text-slate-900 mt-5'>
                                {analytics.completionRate}%
                            </h2>




                            <div className='mt-8 h-4 rounded-full bg-slate-100 overflow-hidden'>

                                <motion.div
                                    initial={{
                                        width: 0,
                                    }}
                                    animate={{
                                        width:
                                        `${analytics.completionRate}%`
                                    }}
                                    transition={{
                                        duration: 1,
                                    }}
                                    className='h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600'
                                ></motion.div>

                            </div>

                        </div>




                        <div className='bg-white/90 backdrop-blur-xl rounded-[32px] border border-red-100 p-7 shadow-[0_10px_40px_rgba(239,68,68,0.05)]'>

                            <div className='flex items-center justify-between'>


                                <div>

                                    <p className='text-slate-500 text-sm font-medium'>
                                        Critical Alerts
                                    </p>

                                    <h2 className='text-5xl font-black text-red-600 mt-5'>
                                        {analytics.highPriority}
                                    </h2>

                                </div>




                                <div className='w-16 h-16 rounded-3xl bg-red-100 flex items-center justify-center shrink-0'>

                                    <AlertTriangle className='w-7 h-7 text-red-600' />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>




                {/* ORDERS */}

                {
                    loading ? (

                        <div className='bg-white rounded-[28px] border border-emerald-100 p-20 text-center'>

                            <div className='w-14 h-14 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6'></div>

                            <p className='text-slate-500 text-lg'>
                                Loading workflows...
                            </p>

                        </div>

                    ) : error ? (

                        <div className='bg-red-50 border border-red-200 rounded-[28px] p-20 text-center'>

                            <p className='text-red-600 text-lg font-medium'>
                                {error}
                            </p>

                        </div>

                    ) : filteredOrders.length === 0 ? (

                        <div className='bg-white rounded-[28px] border border-emerald-100 p-20 text-center'>

                            <ClipboardList className='mx-auto w-14 h-14 text-slate-300 mb-5' />

                            <h2 className='text-2xl font-bold text-slate-900 mb-3'>
                                No Orders Found
                            </h2>

                            <p className='text-slate-500'>
                                Try changing filters.
                            </p>

                        </div>

                    ) : (

                        <motion.div

                            layout

                            className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'
                        >

                            {
                                filteredOrders.map((order) => (

                                    <OrderCard
                                        key={order._id}
                                        order={order}
                                    />
                                ))
                            }

                        </motion.div>
                    )
                }

            </div>

        </div>
    );
}




function LiveItem({
    label,
    value,
    danger,
}) {

    return (

        <div className='flex items-center justify-between'>

            <span className='text-slate-500 text-sm'>
                {label}
            </span>

            <span className={`font-bold ${
                danger
                ? 'text-red-600'
                : 'text-slate-900'
            }`}>

                {value}

            </span>

        </div>
    );
}

export default DashboardPage;