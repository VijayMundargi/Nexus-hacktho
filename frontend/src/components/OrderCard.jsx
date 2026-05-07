import {
    Package,
    Layers3,
    Boxes,
    Flag,
    ShieldCheck,
    CalendarDays,
} from 'lucide-react';


function OrderCard({ order }) {


    const statusColor = {

        Received:
        'bg-yellow-100 text-yellow-700 border-yellow-200',

        'In Review':
        'bg-orange-100 text-orange-700 border-orange-200',

        Accepted:
        'bg-green-100 text-green-700 border-green-200',
    };


    const priorityColor = {

        Low:
        'bg-slate-100 text-slate-700',

        Medium:
        'bg-blue-100 text-blue-700',

        High:
        'bg-red-100 text-red-700',
    };


    return (

        <div className='group bg-white border border-slate-200 rounded-[28px] p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>


            <div className='flex items-start justify-between mb-6'>


                <div className='flex items-center gap-4'>


                    <div className='w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg'>

                        <Package className='text-white w-8 h-8' />

                    </div>


                    <div>

                        <h2 className='text-2xl font-bold text-slate-900 capitalize'>
                            {order.partName}
                        </h2>

                        <p className='text-slate-500 mt-1'>
                            Manufacturing Order
                        </p>

                    </div>

                </div>



                <div className={`px-4 py-2 rounded-2xl text-sm font-semibold border ${
                    statusColor[order.status]
                }`}>

                    {order.status}

                </div>

            </div>



            <div className='space-y-4'>


                <div className='flex items-center gap-4 bg-slate-50 rounded-2xl p-4'>

                    <div className='bg-blue-100 p-3 rounded-xl'>
                        <Layers3 className='w-5 h-5 text-blue-600' />
                    </div>

                    <div>

                        <p className='text-sm text-slate-500'>
                            Material
                        </p>

                        <h3 className='font-semibold text-slate-800 capitalize'>
                            {order.material}
                        </h3>

                    </div>

                </div>



                <div className='flex items-center gap-4 bg-slate-50 rounded-2xl p-4'>

                    <div className='bg-indigo-100 p-3 rounded-xl'>
                        <Boxes className='w-5 h-5 text-indigo-600' />
                    </div>

                    <div>

                        <p className='text-sm text-slate-500'>
                            Quantity
                        </p>

                        <h3 className='font-semibold text-slate-800'>
                            {order.quantity}
                        </h3>

                    </div>

                </div>



                <div className='flex items-center gap-4 bg-slate-50 rounded-2xl p-4'>

                    <div className='bg-purple-100 p-3 rounded-xl'>
                        <Flag className='w-5 h-5 text-purple-600' />
                    </div>

                    <div>

                        <p className='text-sm text-slate-500'>
                            Priority
                        </p>

                        <span className={`inline-flex px-3 py-1 rounded-xl text-sm font-semibold mt-1 ${
                            priorityColor[order.priority]
                        }`}>

                            {order.priority}

                        </span>

                    </div>

                </div>



                <div className='flex items-center gap-4 bg-slate-50 rounded-2xl p-4'>

                    <div className='bg-green-100 p-3 rounded-xl'>
                        <ShieldCheck className='w-5 h-5 text-green-600' />
                    </div>

                    <div className='flex-1'>

                        <p className='text-sm text-slate-500'>
                            Latest Quality Update
                        </p>

                        <h3 className='font-medium text-slate-800 mt-1 leading-7'>
                            {
                                order.latestQualityNote
                                || 'No quality updates available'
                            }
                        </h3>

                    </div>

                </div>

            </div>



            <div className='mt-6 pt-5 border-t border-slate-100 flex items-center justify-between'>


                <div className='flex items-center gap-3 text-slate-500 text-sm'>

                    <CalendarDays className='w-4 h-4' />

                    {
                        new Date(
                            order.createdAt
                        ).toLocaleDateString()
                    }

                </div>


                <div className='text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-all duration-300'>

                    View Details →

                </div>

            </div>

        </div>
    );
}

export default OrderCard;