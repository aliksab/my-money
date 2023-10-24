import { NavLink } from "react-router-dom";
import Button from "../components/Button";

const MainPage = () => {
    return (
        <div className="flex flex-col flex-1 w-full">
            <main className=" bg-gray-50 overflow-y-auto dark:bg-gray-900 false">
                <section className="h-screen items-center dark:bg-gray-800 dark:text-gray-100">
                    <div className="container relative z-10 mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
                        <h1 className="text-4xl font-bold leadi sm:text-5xl">
                            Ваш ассистент
                        </h1>
                        <h2 className="dark:text-violet-400 text-3xl font-bold leadi sm:text-4xl">
                            для отслеживания личных финансов
                        </h2>

                        <p className="px-8 mt-8 mb-12 text-lg">
                            Данный проект находится в разработке, но вы уже
                            сейчас можете принять участие в его развитии
                        </p>
                        <div className="flex flex-wrap justify-center">
                            <Button>
                                <NavLink to="/api">Поехали</NavLink>
                            </Button>
                        </div>
                    </div>

                    <div className="flex fixed w-screen justify-between top-1/2 opacity-40 lg:flex-row flex-col">
                        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px] invisible lg:visible">
                            <div className="rounded overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
                                <img
                                    src="/pc-light.png"
                                    className="dark:hidden h-[156px] md:h-[278px] w-full rounded-xl"
                                    alt=""
                                />
                                <img
                                    src="/pc-dark.png"
                                    className="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="relative -top-80 lg:-top-64 overflow-hidden mx-auto border-gray-800 dark:border-white bg-gray-800 dark:bg-white border-[14px] rounded-[2.5rem] h-[600px] w-[300px] visible">
                            <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-white absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-white absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-white absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                            <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-white absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-white">
                                <img
                                    src="/tglogo-light.png"
                                    className="dark:hidden w-[272px] h-[572px]"
                                    alt=""
                                />
                                <img
                                    src="/tglogo-dark.png"
                                    className="hidden dark:block w-[272px] h-[572px]"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default MainPage;
