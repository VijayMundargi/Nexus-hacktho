import {
    Activity,
    Sparkles,
    Clock3,
} from 'lucide-react';


function ActivityFeed({ activities }) {

    return (

        <div className='bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden'>


            <div className='relative overflow-hidden px-6 sm:px-8 py-7 border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-emerald-50'>


                <div className='absolute top-0 right-0 w-40 h-40 bg-emerald-100 blur-3xl rounded-full opacity-60'></div>


                <div className='relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5'>


                    <div>

                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4'>

                            <Sparkles className='w-4 h-4' />

                           AI Workflow Feed

                        </div>


                        <h2 className='text-3xl font-black text-slate-900'>
                            AI Activity Feed
                        </h2>


                        <p className='text-slate-500 mt-2 leading-7 max-w-2xl'>
                            Real-time manufacturing operations,
                            AI workflow automation, quality tracking,
                            and conversational activity monitoring.
                        </p>

                    </div>


                    <div className='hidden lg:flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-100'>

                        <Activity className='text-emerald-700 w-8 h-8' />

                    </div>

                </div>

            </div>



            <div className='p-5 sm:p-8'>


                {
                    activities?.length > 0 ? (

                        <div className='space-y-5'>


                            {
                                activities.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className='group relative flex gap-4 sm:gap-5 rounded-3xl border border-slate-200 bg-[#f8faf9] p-5 sm:p-6 hover:shadow-md transition-all duration-300'
                                        >


                                            <div className='flex flex-col items-center'>

                                                <div className='flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200'>

                                                    <Activity className='text-emerald-700 w-5 h-5' />

                                                </div>


                                                {
                                                    index !==
                                                    activities.length - 1 && (

                                                        <div className='w-[2px] flex-1 bg-gradient-to-b from-emerald-200 to-transparent mt-3'></div>
                                                    )
                                                }

                                            </div>



                                            <div className='flex-1 min-w-0'>


                                                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>


                                                    <div className='flex-1'>

                                                        <p className='text-slate-800 text-[15px] sm:text-base leading-8 font-medium break-words'>

                                                            {
                                                                item.message
                                                            }

                                                        </p>

                                                    </div>


                                                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-500 text-sm whitespace-nowrap self-start'>

                                                        <Clock3 className='w-4 h-4 text-emerald-600' />

                                                        {
                                                            new Date(
                                                                item.time
                                                            ).toLocaleString()
                                                        }

                                                    </div>

                                                </div>


                                                {
                                                    item.type && (

                                                        <div className='mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold'>

                                                            <span className='w-2 h-2 rounded-full bg-emerald-500'></span>

                                                            {
                                                                item.type
                                                            }

                                                        </div>
                                                    )
                                                }

                                            </div>

                                        </div>
                                    )
                                )
                            }

                        </div>

                    ) : (

                        <div className='flex flex-col items-center justify-center py-20 text-center'>


                            <div className='w-24 h-24 rounded-[28px] bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6'>

                                <Activity className='text-emerald-600 w-10 h-10' />

                            </div>


                            <h3 className='text-2xl font-bold text-slate-900 mb-3'>
                                No Activity Yet
                            </h3>


                            <p className='text-slate-500 max-w-lg leading-8'>
                                AI manufacturing workflow activities,
                                order operations, and quality updates
                                will appear here in real-time.
                            </p>

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default ActivityFeed;