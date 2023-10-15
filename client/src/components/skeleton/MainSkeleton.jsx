const MainSkeleton = () => {
    return (
        <>
            <header className="py-2 bg-white shadow-bottom dark:bg-gray-800">
                <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                    <div role="status" className="animate-pulse flex flex-row-reverse">
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
                        <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
                        <div className="flex items-center justify-center mt-4">
                            <svg className="w-8 h-8 text-gray-200 dark:text-gray-700 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                            <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"></div>
                            <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </header>
            <div className="flex flex-col flex-1 w-full">
                <main className="h-full bg-gray-50 overflow-y-auto dark:bg-gray-900 false">
                    <div className="container md:px-6 mx-auto h-screen mt-5">
                        <div className="flex flex-col md:flex-row dark:bg-gray-800 ">
                            <div className="w-80 m-auto">
                                <div className="flex flex-col">
                                    <div role="status" className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                            </div>
                                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4">
                                            <div>
                                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                            </div>
                                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4">
                                            <div>
                                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                            </div>
                                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4">
                                            <div>
                                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                            </div>
                                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                        </div>
                                        <div className="flex items-center justify-between pt-4">
                                            <div>
                                                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                            </div>
                                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                        </div>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>


                            <div className="w-full flex content-around justify-around align-center h-fit">
                                <div role="status" className="w-4/5 p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                                    <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    <div className="flex items-baseline mt-4 space-x-6">
                                        <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                                        <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                                        <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                                        <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                                        <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
                                        <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                                        <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
                                        <div className="w-full bg-gray-200 rounded-t-lg h-56 dark:bg-gray-700"></div>
                                        <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
                                        <div className="w-full bg-gray-200 rounded-t-lg h-60 dark:bg-gray-700"></div>
                                        <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                                        <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
                                        <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                                        <div className="w-full bg-gray-200 rounded-t-lg h-56 dark:bg-gray-700"></div>
                                        <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                                        <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                                        <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
                                    </div>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            
        </>
        
    );
}
 
export default MainSkeleton;