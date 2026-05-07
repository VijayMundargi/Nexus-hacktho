import {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    Search,
    Package,
    CheckCircle,
    Clock3,
    ClipboardList,
} from 'lucide-react';

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

    }, [orders, search, statusFilter]);


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

            accepted:
            orders.filter(
                (o) =>
                o.status === 'Accepted'
            ).length,
        };

    }, [orders]);


    return (

        <div className='min-h-screen bg-slate-100'>

            <Navbar />


            <div className='p-6 lg:p-10'>


                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8'>

                    <div>

                        <h1 className='text-4xl font-bold text-slate-900'>
                            Manufacturing Dashboard
                        </h1>

                        <p className='text-slate-500 mt-2'>
                            Track manufacturing workflows and AI-powered order operations.
                        </p>

                    </div>

                </div>


                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8'>


                    <div className='bg-white rounded-3xl shadow-sm p-6 border border-slate-200'>

                        <div className='flex items-center justify-between'>

                            <div>

                                <p className='text-slate-500 text-sm'>
                                    Total Orders
                                </p>

                                <h2 className='text-4xl font-bold mt-2 text-slate-900'>
                                    {analytics.total}
                                </h2>

                            </div>

                            <div className='bg-blue-100 p-4 rounded-2xl'>
                                <Package className='text-blue-600' />
                            </div>

                        </div>

                    </div>


                    <div className='bg-white rounded-3xl shadow-sm p-6 border border-slate-200'>

                        <div className='flex items-center justify-between'>

                            <div>

                                <p className='text-slate-500 text-sm'>
                                    Received
                                </p>

                                <h2 className='text-4xl font-bold mt-2 text-slate-900'>
                                    {analytics.received}
                                </h2>

                            </div>

                            <div className='bg-yellow-100 p-4 rounded-2xl'>
                                <ClipboardList className='text-yellow-600' />
                            </div>

                        </div>

                    </div>


                    <div className='bg-white rounded-3xl shadow-sm p-6 border border-slate-200'>

                        <div className='flex items-center justify-between'>

                            <div>

                                <p className='text-slate-500 text-sm'>
                                    In Review
                                </p>

                                <h2 className='text-4xl font-bold mt-2 text-slate-900'>
                                    {analytics.review}
                                </h2>

                            </div>

                            <div className='bg-orange-100 p-4 rounded-2xl'>
                                <Clock3 className='text-orange-600' />
                            </div>

                        </div>

                    </div>


                    <div className='bg-white rounded-3xl shadow-sm p-6 border border-slate-200'>

                        <div className='flex items-center justify-between'>

                            <div>

                                <p className='text-slate-500 text-sm'>
                                    Accepted
                                </p>

                                <h2 className='text-4xl font-bold mt-2 text-slate-900'>
                                    {analytics.accepted}
                                </h2>

                            </div>

                            <div className='bg-green-100 p-4 rounded-2xl'>
                                <CheckCircle className='text-green-600' />
                            </div>

                        </div>

                    </div>

                </div>


                <div className='bg-white rounded-3xl shadow-sm border border-slate-200 p-6 mb-8'>

                    <div className='flex flex-col lg:flex-row gap-4'>


                        <div className='flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-2xl flex-1'>

                            <Search className='text-slate-500 w-5 h-5' />

                            <input
                                type='text'
                                placeholder='Search by part name or material'
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                className='bg-transparent outline-none w-full text-slate-700'
                            />

                        </div>


                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value
                                )
                            }
                            className='px-5 py-3 rounded-2xl border border-slate-200 bg-slate-50 outline-none text-slate-700'
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

                        </select>

                    </div>

                </div>


                {
                    loading ? (

                        <div className='bg-white rounded-3xl p-10 text-center text-slate-500 shadow-sm'>
                            Loading orders...
                        </div>

                    ) : error ? (

                        <div className='bg-red-50 border border-red-200 rounded-3xl p-10 text-center text-red-600 shadow-sm'>
                            {error}
                        </div>

                    ) : filteredOrders.length === 0 ? (

                        <div className='bg-white rounded-3xl p-10 text-center text-slate-500 shadow-sm'>
                            No orders found
                        </div>

                    ) : (

                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>

                            {
                                filteredOrders.map(
                                    (order) => (

                                        <OrderCard
                                            key={order._id}
                                            order={order}
                                        />
                                    )
                                )
                            }

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default DashboardPage;