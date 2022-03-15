import {Alert, Button, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import "./registration-form.css"
import {setUsersData} from "../../store/auth-reducer";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {usersApi} from "../../servises/api";
import {AppState} from "../../store/redux-store";

export type DataFormType = { username: string, password: string, repeatPassword: string };

const RegistrationForm = () => {
    const dispatch = useDispatch();
    let error = useSelector<AppState>(state => state.authStore.registrationTextError) as string;
    const {register, handleSubmit, formState: {errors}} = useForm<DataFormType>()
    const [isIdenticalPasswords, setNotIdentical] = useState(true)
    const onSubmit = (data: DataFormType): void => {
        if (data.password === data.repeatPassword) {
            dispatch(setUsersData(data, usersApi.usersRegistration, "registerType"));
        } else {
            setNotIdentical(false)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="registration-form-wr">
                <div className="userName">
                    <TextField id="username" label="username" variant="outlined"  {...register("username",
                        {
                            required: true,
                            maxLength: 25,
                            minLength: 3
                        }
                    )}/>
                </div>
                <div className="userNameErrorsSpan">
                    {errors.username && errors.username.type === "required" &&
                    <Alert className="errorsStyle" severity="info">Поле, обязательное для заполнения</Alert>}
                    {errors.username && errors.username.type === "maxLength" &&
                    <Alert className="errorsStyle" severity="info">Максимальная длина вводимого текста
                        превышена</Alert>}
                    {errors.username && errors.username.type === "minLength" &&
                    <Alert className="errorsStyle" severity="info">Минимальная длина вводимого текста составляет 3
                        символа</Alert>}
                </div>
                <div className="password">
                    <TextField id="password" label="password" variant="outlined"
                               type="password" {...register("password",
                        {
                            required: true,
                            maxLength: 25,
                            minLength: 3
                        }
                    )}/>
                </div>
                <div className="passwordErrorsSpan">
                    {errors.password && errors.password.type === "required" &&
                    <Alert className="errorsStyle" severity="info">Поле, обязательное для заполнения</Alert>}
                    {errors.password && errors.password.type === "maxLength" &&
                    <Alert className="errorsStyle" severity="info">Максимальная длина вводимого текста
                        превышена</Alert>}
                    {errors.password && errors.password.type === "minLength" &&
                    <Alert className="errorsStyle" severity="info">Минимальная длина вводимого текста составляет 3
                        символа</Alert>}
                </div>
                <div className="repeatPassword">
                    <TextField id="repeatPassword" label="repeat password" variant="outlined"
                               type="password" {...register("repeatPassword",
                        {
                            required: true,
                            maxLength: 25,
                            minLength: 3
                        }
                    )}/>
                </div>
                <div className="repeatPasswordErrorsSpan">
                    {errors.repeatPassword && errors.repeatPassword.type === "required" &&
                    <Alert className="errorsStyle" severity="info">Поле, обязательное для заполнения</Alert>}
                    {errors.repeatPassword && errors.repeatPassword.type === "maxLength" &&
                    <Alert className="errorsStyle" severity="info">Максимальная длина вводимого текста
                        превышена</Alert>}
                    {errors.repeatPassword && errors.repeatPassword.type === "minLength" &&
                    <Alert className="errorsStyle" severity="info">Минимальная длина вводимого текста составляет 3
                        символа</Alert>}
                    {error &&
                    <Alert severity="warning">
                        {error}
                    </Alert>
                    }
                    {!isIdenticalPasswords &&
                    <Alert className="isIdenticalErrorsSpan" severity="warning">Пароли не совпадают</Alert>
                    }
                </div>
                <div className="loginButton">
                    <Button variant="contained" type="submit">
                        Send
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default RegistrationForm;