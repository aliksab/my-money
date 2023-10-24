import React from "react";
import { Outlet } from "react-router-dom";

const Container = () => {
    return (
        <>
            <div className="flex flex-col flex-1 w-full">
                <main className="h-full bg-gray-50 overflow-y-auto dark:bg-gray-900 false">
                    <div className="container md:px-6 mx-auto h-screen mt-5">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
};

export default Container;
