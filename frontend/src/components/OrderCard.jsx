import {
    Package,
    Layers3,
    Boxes,
    Flag,
    ShieldCheck,
    CalendarDays,
    ArrowUpRight,
    CheckCircle2,
    Clock3,
    ClipboardList,
} from 'lucide-react';


function OrderCard({ order }) {


    const statusConfig = {

        Received: {

            className:
            'bg-amber-50 text-amber-700 border-amber-200',

            icon:
            <ClipboardList className='w-4 h-4' />,
        },

        'In Review': {

            className:
            'bg-orange-50 text-orange-700 border-orange-200',

            icon:
            <Clock3 className='w-4 h-4' />,
        },

        Accepted: {

            className:
            'bg-emerald-50 text-emerald-700 border-emerald-200',

            icon:
            <CheckCircle2 className='w-4 h-4' />,
        },
    };


    const priorityConfig = {

        Low:
        'bg-slate-100 text-slate-700 border-slate-200',

        Medium:
        'bg-blue-50 text-blue-700 border-blue-200',

        High:
        'bg-red-50 text-red-700 border-red-200',
    };


    return (

        <div className='group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500'>


            <div className='absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60'></div>


            <div className='relative z-10 p-6 sm:p-7'>


                <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-7'>


                    <div className='flex items-start gap-4'>


                        <div className='flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-100'>

                            <Package className='text-white w-8 h-8' />

                        </div>


                        <div className='min-w-0'>


                            <h2 className='text-2xl font-black text-slate-900 capitalize break-words'>

                                {order.partName}

                            </h2>


                            <p className='text-slate-500 mt-1 text-sm sm:text-base'>
                                Smart Manufacturing Order
                            </p>


                            <div className='flex flex-wrap items-center gap-3 mt-4'>


                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-semibold ${
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



                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-semibold ${
                                    priorityConfig[
                                        order.priority
                                    ]
                                }`}>

                                    <Flag className='w-4 h-4' />

                                    {
                                        order.priority
                                    }

                                    {' '}
                                    Priority

                                </div>

                            </div>

                        </div>

                    </div>

                </div>




                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>


                    <div className='rounded-3xl border border-slate-200 bg-[#f8faf9] p-5 hover:shadow-sm transition-all duration-300'>


                        <div className='flex items-center gap-4'>


                            <div className='flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-100'>

                                <Layers3 className='w-5 h-5 text-blue-700' />

                            </div>


                            <div>

                                <p className='text-sm text-slate-500'>
                                    Material
                                </p>

                                <h3 className='text-lg font-bold text-slate-900 capitalize mt-1'>
                                    {order.material}
                                </h3>

                            </div>

                        </div>

                    </div>




                    <div className='rounded-3xl border border-slate-200 bg-[#f8faf9] p-5 hover:shadow-sm transition-all duration-300'>


                        <div className='flex items-center gap-4'>


                            <div className='flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-100'>

                                <Boxes className='w-5 h-5 text-indigo-700' />

                            </div>


                            <div>

                                <p className='text-sm text-slate-500'>
                                    Quantity
                                </p>

                                <h3 className='text-lg font-bold text-slate-900 mt-1'>
                                    {order.quantity}
                                </h3>

                            </div>

                        </div>

                    </div>




                    <div className='md:col-span-2 rounded-3xl border border-slate-200 bg-[#f8faf9] p-5 hover:shadow-sm transition-all duration-300'>


                        <div className='flex items-start gap-4'>


                            <div className='flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 shrink-0'>

                                <ShieldCheck className='w-5 h-5 text-emerald-700' />

                            </div>


                            <div className='min-w-0 flex-1'>


                                <p className='text-sm text-slate-500'>
                                    Latest Quality Update
                                </p>


                                <p className='text-slate-800 leading-8 mt-2 font-medium break-words'>

                                    {
                                        order.latestQualityNote
                                        || 'No quality updates available yet.'
                                    }

                                </p>

                            </div>

                        </div>

                    </div>

                </div>




                <div className='mt-7 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>


                    <div className='flex items-center gap-3 text-slate-500 text-sm'>


                        <div className='flex items-center justify-center w-10 h-10 rounded-2xl bg-slate-100'>

                            <CalendarDays className='w-4 h-4' />

                        </div>


                        <div>

                            <p className='text-xs text-slate-400'>
                                Created On
                            </p>

                            <p className='font-semibold text-slate-700 mt-1'>
                                {
                                    new Date(
                                        order.createdAt
                                    ).toLocaleDateString()
                                }
                            </p>

                        </div>

                    </div>




                   

                </div>

            </div>

        </div>
    );
}

export default OrderCard;