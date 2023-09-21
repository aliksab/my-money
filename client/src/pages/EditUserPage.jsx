import { Input, Label } from "@windmill/react-ui";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import PageTitle from "../components/PageTitle";

const EditUserPage = () => {
    return (
        <>
            
            <div className="block">
                <PageTitle>Мой аккаунт</PageTitle>
                <div className="flex justify-between gap-4 h-fit">
                    <TextInput label={"Фамилия"} placeholder={"Иванов"} />
                    <TextInput label={"Имя"} placeholder={"Иван"} />
                    <TextInput label={"Отчество"} placeholder={"Ивнаович"} />
                </div>
                <div className="flex justify-between gap-4 h-fit">
                    <TextInput label={"Email"} placeholder={"john@doe.ru"} />
                    <TextInput label={"Пароль"} placeholder={"********"} />
                    <TextInput label={"Логин"} placeholder={"username"} />
                </div>
                
                <Textarea label={"О себе"} placeholder={"Расскажите немного о себе и своей деятельности"} />
                
                <Button>Сохранить</Button>
            </div>
            
        </>
    );
}
 
export default EditUserPage;