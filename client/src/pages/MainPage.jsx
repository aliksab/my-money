import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import Container from "../containers/Container";

const MainPage = () => {
    return (
        <div className="flex flex-col flex-1 w-full">
            <main className=" bg-gray-50 overflow-y-auto dark:bg-gray-900 false">
                <section className="h-screen flex items-center dark:bg-gray-800 dark:text-gray-100">
                    <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
                        <h1 className="text-4xl font-bold leadi sm:text-5xl">Ваш личный ассистент</h1>
                            <h2 className="dark:text-violet-400 text-3xl font-bold leadi sm:text-4xl">для отслеживания личных финансов</h2>
                        
                        <p className="px-8 mt-8 mb-12 text-lg">Данный проект находится в разработке, но вы уже сейчас можете принять участие в его развитии</p>
                        <div className="flex flex-wrap justify-center">
                            <Button><NavLink to="auth/login">Поехали</NavLink></Button>
                        </div>
                    </div>
                </section>
            </main>
        </div>


    );
}
 
export default MainPage;