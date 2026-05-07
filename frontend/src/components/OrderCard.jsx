import {
    Package,
    Layers3,
    Boxes,
    Flag,
    ShieldCheck,
    CheckCircle2,
    Clock3,
    ClipboardList,
    XCircle,
    Factory,
} from 'lucide-react';

import {
    motion,
} from 'framer-motion';

import API from '../api/axios';




function OrderCard({ order }) {


    // =========================================
    // UPDATE STATUS
    // =========================================

    const updateStatus = async (status) => {

        try {

            await API.put(
                `/orders/${order._id}/status`,
                { status }
            );

            window.location.reload();

        } catch (error) {

            console.log(error);
        }
    };




    // =========================================
    // STATUS CONFIG
    // =========================================

    const statusConfig = {

        Received: {
            className:
            'bg-amber-50 text-amber-700',
            icon:
            <ClipboardList className='w-3.5 h-3.5' />,
        },

        'In Review': {
            className:
            'bg-orange-50 text-orange-700',
            icon:
            <Clock3 className='w-3.5 h-3.5' />,
        },

        Accepted: {
            className:
            'bg-emerald-50 text-emerald-700',
            icon:
            <CheckCircle2 className='w-3.5 h-3.5' />,
        },

        Manufacturing: {
            className:
            'bg-blue-50 text-blue-700',
            icon:
            <Factory className='w-3.5 h-3.5' />,
        },

        'Quality Check': {
            className:
            'bg-violet-50 text-violet-700',
            icon:
            <ShieldCheck className='w-3.5 h-3.5' />,
        },

        Rejected: {
            className:
            'bg-red-50 text-red-700',
            icon:
            <XCircle className='w-3.5 h-3.5' />,
        },
    };




    // =========================================
    // PRIORITY CONFIG
    // =========================================

    const priorityConfig = {

        Low:
        'bg-slate-100 text-slate-700',

        Medium:
        'bg-blue-50 text-blue-700',

        High:
        'bg-red-50 text-red-700',

        Critical:
        'bg-purple-50 text-purple-700',
    };




    return (

        <motion.div

            whileHover={{
                y: -4,
            }}

            transition={{
                duration: 0.2,
            }}

            className='group bg-white border border-slate-200 rounded-[28px] p-5 shadow-sm hover:shadow-xl transition-all duration-300'
        >


            {/* TOP */}

            <div className='flex items-start justify-between gap-4'>


                <div className='flex items-start gap-4 min-w-0'>


                    <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0'>

                        <Package className='w-6 h-6 text-white' />

                    </div>


                    <div className='min-w-0'>


                        <h2 className='text-lg font-black text-slate-900 truncate'>

                            {order.partName}

                        </h2>


                        <p className='text-slate-500 text-sm mt-1 truncate'>
                            {order.orderNumber}
                        </p>

                    </div>

                </div>

            </div>




            {/* BADGES */}

            <div className='flex flex-wrap gap-2 mt-5'>


                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    statusConfig[
                        order.status
                    ]?.className
                }`}>

                    {
                        statusConfig[
                            order.status
                        ]?.icon
                    }

                    {order.status}

                </div>




                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    priorityConfig[
                        order.priority
                    ]
                }`}>

                    <Flag className='w-3.5 h-3.5' />

                    {order.priority}

                </div>

            </div>




            {/* INFO */}

            <div className='grid grid-cols-2 gap-3 mt-5'>


                <div className='bg-slate-50 rounded-2xl p-4'>

                    <div className='flex items-center gap-3'>


                        <div className='w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center'>

                            <Layers3 className='w-4 h-4 text-blue-700' />

                        </div>


                        <div className='min-w-0'>

                            <p className='text-xs text-slate-500'>
                                Material
                            </p>

                            <h3 className='font-bold text-slate-900 text-sm truncate'>
                                {order.material}
                            </h3>

                        </div>

                    </div>

                </div>




                <div className='bg-slate-50 rounded-2xl p-4'>

                    <div className='flex items-center gap-3'>


                        <div className='w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center'>

                            <Boxes className='w-4 h-4 text-indigo-700' />

                        </div>


                        <div>

                            <p className='text-xs text-slate-500'>
                                Quantity
                            </p>

                            <h3 className='font-bold text-slate-900 text-sm'>
                                {order.quantity}
                            </h3>

                        </div>

                    </div>

                </div>

            </div>




            {/* PRODUCT CODE */}

            <div className='mt-4 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100'>

                <p className='text-xs text-slate-500 mb-1'>
                    Product Code
                </p>

                <h3 className='text-sm font-black text-slate-900 break-all'>
                    {order.productCode}
                </h3>

            </div>




            {/* QUALITY */}

            <div className='mt-4 flex items-start gap-3 bg-emerald-50 rounded-2xl p-4'>


                <div className='w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0'>

                    <ShieldCheck className='w-4 h-4 text-emerald-700' />

                </div>


                <div className='min-w-0'>

                    <p className='text-xs text-emerald-700 font-semibold mb-1'>
                        Quality Update
                    </p>

                    <p className='text-sm text-slate-700 line-clamp-2'>

                        {
                            order.latestQualityNote
                            || 'No quality updates available.'
                        }

                    </p>

                </div>

            </div>




            {/* ACTIONS */}

            <div className='flex gap-3 mt-5'>


                {
                    order.status === 'Received' && (

                        <button

                            onClick={() =>
                                updateStatus(
                                    'In Review'
                                )
                            }

                            className='flex-1 h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all'
                        >

                            Start Review

                        </button>
                    )
                }




                {
                    order.status === 'In Review' && (

                        <>

                            <button

                                onClick={() =>
                                    updateStatus(
                                        'Accepted'
                                    )
                                }

                                className='flex-1 h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all'
                            >

                                Accept

                            </button>




                            <button

                                onClick={() =>
                                    updateStatus(
                                        'Rejected'
                                    )
                                }

                                className='flex-1 h-11 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all'
                            >

                                Reject

                            </button>

                        </>
                    )
                }




                {
                    order.status === 'Accepted' && (

                        <button

                            onClick={() =>
                                updateStatus(
                                    'Manufacturing'
                                )
                            }

                            className='flex-1 h-11 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-all'
                        >

                            Start Manufacturing

                        </button>
                    )
                }




                {
                    order.status === 'Manufacturing' && (

                        <button

                            onClick={() =>
                                updateStatus(
                                    'Quality Check'
                                )
                            }

                            className='flex-1 h-11 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all'
                        >

                            Move To QC

                        </button>
                    )
                }

            </div>

        </motion.div>
    );
}

export default OrderCard;