import {
    ShieldCheck,
    Clock3,
    CheckCircle2,
    AlertTriangle,
    LoaderCircle,
    Sparkles,
} from 'lucide-react';


function QualityLogs({ logs }) {


    const statusConfig = {

        Passed: {

            className:
            'bg-emerald-50 text-emerald-700 border-emerald-200',

            icon:
            <CheckCircle2 className='w-4 h-4' />,
        },

        Failed: {

            className:
            'bg-red-50 text-red-700 border-red-200',

            icon:
            <AlertTriangle className='w-4 h-4' />,
        },

        Pending: {

            className:
            'bg-amber-50 text-amber-700 border-amber-200',

            icon:
            <LoaderCircle className='w-4 h-4' />,
        },
    };


    return (

        <div className='overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm'>


            <div className='relative overflow-hidden border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 px-6 sm:px-8 py-7'>


                <div className='absolute top-0 right-0 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50'></div>


                <div className='relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5'>


                    <div className='flex items-start sm:items-center gap-4'>


                        <div className='flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-100'>

                            <ShieldCheck className='text-white w-8 h-8' />

                        </div>


                        <div>

                            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-3'>

                                <Sparkles className='w-3 h-3' />

                                Smart Inspection Tracking

                            </div>


                            <h2 className='text-3xl font-black text-slate-900'>
                                Quality Logs
                            </h2>


                            <p className='text-slate-500 mt-2 leading-7'>
                                Inspection reports, manufacturing quality updates,
                                and operational verification logs.
                            </p>

                        </div>

                    </div>



                    <div className='flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-emerald-100 shadow-sm w-fit'>


                        <div className='w-3 h-3 rounded-full bg-emerald-500 animate-pulse'></div>


                        <span className='text-sm font-semibold text-emerald-700'>
                            Live Monitoring Active
                        </span>

                    </div>

                </div>

            </div>




            <div className='p-5 sm:p-8'>


                {
                    logs?.length > 0 ? (

                        <div className='space-y-5'>


                            {
                                logs.map((log) => (

                                    <div
                                        key={log._id}
                                        className='group rounded-[28px] border border-slate-200 bg-[#f8faf9] p-5 sm:p-6 hover:shadow-lg transition-all duration-300'
                                    >


                                        <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-5'>


                                            <div className='flex items-start gap-4 flex-1'>


                                                <div className='flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 shrink-0'>

                                                    <ShieldCheck className='w-5 h-5 text-emerald-700' />

                                                </div>


                                                <div className='flex-1 min-w-0'>


                                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-semibold ${
                                                        statusConfig[
                                                            log.inspectionStatus
                                                        ]?.className
                                                    }`}>

                                                        {
                                                            statusConfig[
                                                                log.inspectionStatus
                                                            ]?.icon
                                                        }

                                                        {
                                                            log.inspectionStatus
                                                        }

                                                    </div>



                                                    <p className='text-slate-800 leading-8 mt-5 font-medium break-words text-[15px] sm:text-base'>

                                                        {log.note}

                                                    </p>

                                                </div>

                                            </div>




                                            <div className='flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-500 text-sm w-fit shrink-0'>


                                                <Clock3 className='w-4 h-4 text-emerald-600' />


                                                <span className='font-medium whitespace-nowrap'>

                                                    {
                                                        new Date(
                                                            log.createdAt
                                                        ).toLocaleString()
                                                    }

                                                </span>

                                            </div>

                                        </div>




                                        {
                                            log.remarks && (

                                                <div className='mt-5 rounded-2xl border border-slate-200 bg-white p-5'>


                                                    <p className='text-sm font-semibold text-slate-500 mb-2'>
                                                        Inspector Remarks
                                                    </p>


                                                    <p className='text-slate-700 leading-7'>
                                                        {log.remarks}
                                                    </p>

                                                </div>
                                            )
                                        }

                                    </div>
                                ))
                            }

                        </div>

                    ) : (

                        <div className='flex flex-col items-center justify-center py-20 text-center'>


                            <div className='flex items-center justify-center w-24 h-24 rounded-[30px] bg-emerald-50 border border-emerald-100 mb-6'>

                                <ShieldCheck className='w-10 h-10 text-emerald-600' />

                            </div>


                            <h3 className='text-3xl font-black text-slate-900 mb-4'>
                                No Quality Logs Yet
                            </h3>


                            <p className='max-w-xl text-slate-500 leading-8 text-base'>
                                Inspection reports and manufacturing quality
                                updates will appear here once operational
                                checkpoints are completed.
                            </p>

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default QualityLogs;