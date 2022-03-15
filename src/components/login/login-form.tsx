import {Alert, Button, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import "./login-form.css"
import {DataFormType} from "../registration/registration-form";
import {usersApi} from "../../servises/api";
import {setUsersData} from "../../store/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/redux-store";

const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<DataFormType>()
    const dispatch = useDispatch()
    let error = useSelector<AppState>(state => state.authStore.registrationTextError) as string;

    const onSubmit = (data: DataFormType): void => {
        dispatch(setUsersData(data, usersApi.usersLogin, "loginType"))
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
                    <Alert severity="info">Поле, бязательное для заполнения</Alert>}
                    {errors.username && errors.username.type === "maxLength" &&
                    <Alert severity="info">Максимальная длина вводимого текста превышена</Alert>}
                    {errors.username && errors.username.type === "minLength" &&
                    <Alert severity="info">Минимальная длина вводимого текста составляет 3 символа</Alert>}
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
                    <Alert severity="info">Поле, бязательное для заполнения</Alert>}
                    {errors.password && errors.password.type === "maxLength" &&
                    <Alert severity="info">Максимальная длина вводимого текста превышена</Alert>}
                    {errors.password && errors.password.type === "minLength" &&
                    <Alert severity="info">Минимальная длина вводимого текста составляет 3 символа</Alert>}
                </div>
                <div className="repeatPasswordErrorsSpan">
                    {error &&
                    <Alert severity="warning">{error}</Alert>
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
export default LoginForm;