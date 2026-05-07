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
                'Failed to fetch analytics'
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

        return {

            totalOrders,

            acceptedOrders,

            reviewOrders,

            receivedOrders,

            highPriority,

            acceptanceRate:
            totalOrders > 0
            ? (
                (
                    acceptedOrders /
                    totalOrders
                ) * 100
            ).toFixed(1)
            : 0,
        };

    }, [orders]);


    return (

        <div className='min-h-screen bg-slate-100'>

            <Navbar />


            <div className='p-6 lg:p-10'>


                <div className='mb-10'>

                    <h1 className='text-4xl font-bold text-slate-900'>
                        Analytics Dashboard
                    </h1>

                    <p className='text-slate-500 mt-2'>
                        Manufacturing workflow insights and AI operational metrics.
                    </p>

                </div>


                {
                    loading ? (

                        <div className='bg-white rounded-3xl p-10 text-center shadow-sm text-slate-500'>
                            Loading analytics...
                        </div>

                    ) : error ? (

                        <div className='bg-red-50 border border-red-200 rounded-3xl p-10 text-center shadow-sm text-red-600'>
                            {error}
                        </div>

                    ) : (

                        <>

                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8'>


                                <div className='bg-white rounded-3xl p-6 shadow-sm border border-slate-200'>

                                    <div className='flex items-center justify-between'>

                                        <div>

                                            <p className='text-slate-500 text-sm'>
                                                Total Orders
                                            </p>

                                            <h2 className='text-4xl font-bold mt-2 text-slate-900'>
                                                {
                                                    analytics.totalOrders
                                                }
                                            </h2>

                                        </div>

                                        <div className='bg-blue-100 p-4 rounded-2xl'>
                                            <Package className='text-blue-600' />
                                        </div>

                                    </div>

                                </div>


                                <div className='bg-white rounded-3xl p-6 shadow-sm border border-slate-200'>

                                    <div className='flex items-center justify-between'>

                                        <div>

                                            <p className='text-slate-500 text-sm'>
                                                Accepted Orders
                                            </p>

                                            <h2 className='text-4xl font-bold mt-2 text-slate-900'>
                                                {
                                                    analytics.acceptedOrders
                                                }
                                            </h2>

                                        </div>

                                        <div className='bg-green-100 p-4 rounded-2xl'>
                                            <CheckCircle2 className='text-green-600' />
                                        </div>

                                    </div>

                                </div>


                                <div className='bg-white rounded-3xl p-6 shadow-sm border border-slate-200'>

                                    <div className='flex items-center justify-between'>

                                        <div>

                                            <p className='text-slate-500 text-sm'>
                                                In Review
                                            </p>

                                            <h2 className='text-4xl font-bold mt-2 text-slate-900'>
                                                {
                                                    analytics.reviewOrders
                                                }
                                            </h2>

                                        </div>

                                        <div className='bg-orange-100 p-4 rounded-2xl'>
                                            <Clock3 className='text-orange-600' />
                                        </div>

                                    </div>

                                </div>


                                <div className='bg-white rounded-3xl p-6 shadow-sm border border-slate-200'>

                                    <div className='flex items-center justify-between'>

                                        <div>

                                            <p className='text-slate-500 text-sm'>
                                                Received Orders
                                            </p>

                                            <h2 className='text-4xl font-bold mt-2 text-slate-900'>
                                                {
                                                    analytics.receivedOrders
                                                }
                                            </h2>

                                        </div>

                                        <div className='bg-yellow-100 p-4 rounded-2xl'>
                                            <ClipboardList className='text-yellow-600' />
                                        </div>

                                    </div>

                                </div>


                                <div className='bg-white rounded-3xl p-6 shadow-sm border border-slate-200'>

                                    <div className='flex items-center justify-between'>

                                        <div>

                                            <p className='text-slate-500 text-sm'>
                                                Acceptance Rate
                                            </p>

                                            <h2 className='text-4xl font-bold mt-2 text-slate-900'>
                                                {
                                                    analytics.acceptanceRate
                                                }%
                                            </h2>

                                        </div>

                                        <div className='bg-purple-100 p-4 rounded-2xl'>
                                            <TrendingUp className='text-purple-600' />
                                        </div>

                                    </div>

                                </div>


                                <div className='bg-white rounded-3xl p-6 shadow-sm border border-slate-200'>

                                    <div className='flex items-center justify-between'>

                                        <div>

                                            <p className='text-slate-500 text-sm'>
                                                High Priority
                                            </p>

                                            <h2 className='text-4xl font-bold mt-2 text-slate-900'>
                                                {
                                                    analytics.highPriority
                                                }
                                            </h2>

                                        </div>

                                        <div className='bg-red-100 p-4 rounded-2xl'>
                                            <Activity className='text-red-600' />
                                        </div>

                                    </div>

                                </div>

                            </div>


                            <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-8'>

                                <h2 className='text-2xl font-bold text-slate-900 mb-6'>
                                    Workflow Insights
                                </h2>


                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>


                                    <div className='bg-slate-50 rounded-2xl p-6'>

                                        <h3 className='text-lg font-semibold text-slate-800 mb-3'>
                                            System Status
                                        </h3>

                                        <p className='text-slate-600 leading-7'>
                                            AI-powered manufacturing workflow is actively tracking orders,
                                            processing status updates, and managing quality inspection logs.
                                        </p>

                                    </div>


                                    <div className='bg-slate-50 rounded-2xl p-6'>

                                        <h3 className='text-lg font-semibold text-slate-800 mb-3'>
                                            Operational Efficiency
                                        </h3>

                                        <p className='text-slate-600 leading-7'>
                                            Current analytics indicate manufacturing operations,
                                            acceptance flow, and order processing metrics are functioning normally.
                                        </p>

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