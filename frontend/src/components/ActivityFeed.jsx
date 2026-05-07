function ActivityFeed({ activities }) {

    return (

        <div className='bg-white rounded-[30px] p-6 shadow-sm border border-slate-200'>


            <h2 className='text-2xl font-bold text-slate-900 mb-6'>
                AI Activity Feed
            </h2>


            <div className='space-y-4'>


                {
                    activities?.map((item, index) => (

                        <div
                            key={index}
                            className='border-l-4 border-blue-500 pl-5 py-2'
                        >

                            <p className='text-slate-700 leading-7'>
                                {item.message}
                            </p>

                            <span className='text-sm text-slate-500'>
                                {
                                    new Date(
                                        item.time
                                    ).toLocaleString()
                                }
                            </span>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default ActivityFeed;