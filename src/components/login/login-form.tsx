import {Alert, Button, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import "./login-form.css"
import {DataFormType} from "../registration/registration-form";



const LoginForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<DataFormType>()

    const onSubmit = (data: DataFormType): void => {
        console.log(data);
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
                    <Alert severity="info">This is required</Alert>}
                    {errors.username && errors.username.type === "maxLength" &&
                    <Alert severity="info">Max length exceeded</Alert>}
                    {errors.username && errors.username.type === "minLength" &&
                    <Alert severity="info">Min length not reached</Alert>}
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
                    <Alert severity="info">This is required</Alert>}
                    {errors.password && errors.password.type === "maxLength" &&
                    <Alert severity="info">Max length exceeded</Alert>}
                    {errors.password && errors.password.type === "minLength" &&
                    <Alert severity="info">Min length not reached</Alert>}
                </div>
                <div className="repeatPasswordErrorsSpan">
                    {/*{props.loginTextError &&*/}
                    {/*<Alert severity="warning">{props.loginTextErrorTextError}</Alert>*/}
                    {/*}*/}
                    {/*{!isIdenticalPasswords &&*/}
                    {/*<Alert className={s.isIdenticalErrorsSpan} severity="warning">This passwords not identical</Alert>*/}
                    {/*}*/}
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