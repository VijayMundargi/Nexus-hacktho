import {
    ShieldCheck,
    Clock3,
} from 'lucide-react';


function QualityLogs({ logs }) {

    return (

        <div className='bg-white rounded-[30px] p-6 shadow-sm border border-slate-200'>


            <div className='flex items-center gap-3 mb-6'>

                <div className='bg-green-100 p-3 rounded-2xl'>

                    <ShieldCheck className='text-green-600' />

                </div>

                <div>

                    <h2 className='text-2xl font-bold text-slate-900'>
                        Quality Logs
                    </h2>

                    <p className='text-slate-500'>
                        Inspection and quality updates
                    </p>

                </div>

            </div>


            <div className='space-y-4'>


                {
                    logs?.length > 0 ? (

                        logs.map((log) => (

                            <div
                                key={log._id}
                                className='border border-slate-200 rounded-2xl p-5 bg-slate-50'
                            >

                                <div className='flex items-center justify-between mb-3'>

                                    <span className='px-3 py-1 rounded-xl bg-blue-100 text-blue-700 text-sm font-semibold'>
                                        {log.inspectionStatus}
                                    </span>


                                    <div className='flex items-center gap-2 text-sm text-slate-500'>

                                        <Clock3 className='w-4 h-4' />

                                        {
                                            new Date(
                                                log.createdAt
                                            ).toLocaleString()
                                        }

                                    </div>

                                </div>


                                <p className='text-slate-700 leading-7'>
                                    {log.note}
                                </p>

                            </div>
                        ))

                    ) : (

                        <div className='text-center py-10 text-slate-500'>
                            No quality logs available
                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default QualityLogs;