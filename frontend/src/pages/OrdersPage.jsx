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
    Factory,
    AlertTriangle,
    ClipboardList,
} from 'lucide-react';

import {
    motion,
} from 'framer-motion';

import API from '../api/axios';

import Navbar from '../components/Navbar';

import OrderCard from '../components/OrderCard';




function OrdersPage() {

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

        return orders.filter((order) => {

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

    }, [
        orders,
        search,
        statusFilter,
    ]);




    // =========================================
    // ANALYTICS
    // =========================================

    const analytics = {

        total:
        orders.length,

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
    };




    const stats = [

        {
            title: 'Total Orders',
            value: analytics.total,
            icon: Package,
            color:
            'text-emerald-600',
            bg:
            'bg-emerald-100',
        },

        {
            title: 'In Review',
            value: analytics.review,
            icon: Clock3,
            color:
            'text-orange-600',
            bg:
            'bg-orange-100',
        },

        {
            title: 'Manufacturing',
            value:
            analytics.manufacturing,
            icon: Factory,
            color:
            'text-green-600',
            bg:
            'bg-green-100',
        },

        {
            title: 'Quality Check',
            value:
            analytics.quality,
            icon: ShieldCheck,
            color:
            'text-teal-600',
            bg:
            'bg-teal-100',
        },
    ];




    return (

        <div className='min-h-screen bg-[#f7faf8]'>

            <Navbar />




            <div className='max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6'>


                {/* HEADER */}

                <div className='mb-8'>


                    <h1 className='text-3xl sm:text-4xl font-black text-slate-900'>
                        Manufacturing Orders
                    </h1>




                    <p className='text-slate-500 mt-3 text-base sm:text-lg'>
                        Manage enterprise workflows,
                        manufacturing progress,
                        inspections,
                        and production lifecycle tracking.
                    </p>

                </div>




                {/* STATS */}

                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8'>


                    {
                        stats.map((item, index) => (

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

                                className='bg-white border border-emerald-100 rounded-[30px] p-6 shadow-sm'
                            >

                                <div className='flex items-center justify-between'>


                                    <div>

                                        <p className='text-slate-500 text-sm'>
                                            {item.title}
                                        </p>

                                        <h2 className='text-4xl font-black text-slate-900 mt-4'>
                                            {item.value}
                                        </h2>

                                    </div>




                                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${item.bg}`}>

                                        <item.icon className={`w-7 h-7 ${item.color}`} />

                                    </div>

                                </div>

                            </motion.div>
                        ))
                    }

                </div>




                {/* FILTERS */}

                <div className='bg-white border border-emerald-100 rounded-[30px] p-5 mb-8 shadow-sm'>


                    <div className='flex flex-col xl:flex-row gap-4'>


                        <div className='flex items-center gap-3 flex-1 bg-[#f8faf9] border border-emerald-100 rounded-2xl px-4 h-14'>


                            <Search className='w-5 h-5 text-slate-500' />




                            <input
                                type='text'
                                placeholder='Search orders by number, material or part name'
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                className='w-full bg-transparent outline-none text-slate-700'
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

                    </div>

                </div>




                {/* ORDERS */}

                {
                    loading ? (

                        <div className='bg-white border border-emerald-100 rounded-[30px] p-20 text-center shadow-sm'>


                            <div className='w-14 h-14 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6'></div>




                            <p className='text-slate-500 text-lg'>
                                Loading orders...
                            </p>

                        </div>

                    ) : error ? (

                        <div className='bg-red-50 border border-red-200 rounded-[30px] p-20 text-center'>


                            <AlertTriangle className='w-14 h-14 text-red-500 mx-auto mb-5' />




                            <p className='text-red-600 text-lg font-medium'>
                                {error}
                            </p>

                        </div>

                    ) : filteredOrders.length === 0 ? (

                        <div className='bg-white border border-emerald-100 rounded-[30px] p-20 text-center shadow-sm'>


                            <ClipboardList className='w-16 h-16 text-slate-300 mx-auto mb-5' />




                            <h2 className='text-2xl font-bold text-slate-900 mb-3'>
                                No Orders Found
                            </h2>




                            <p className='text-slate-500'>
                                Try changing filters or create a new workflow.
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

export default OrdersPage;