import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors },
        handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState("");
    const [loginUserEmail, setLoginUserEmail] = useState();
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const form = location.state?.form?.path || '/';

    if (token) {
        navigate(form, { replace: true });
    }

    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        // console.log(errors);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email);

            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            })


    }
    return (
        <div className='flex justify-center items-center h-[800px]'>
            <div className='w-96 p-7'>
                <h2 className="text-4xl text-center">Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>


                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>

                        </label>
                        <input type="email" placeholder="" {...register('email', { required: "Email Address is required" })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500' role="alert">{errors.email?.message}</p>}

                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>

                        </label>
                        <input type="password" placeholder="" {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password should be must 6 characters' }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-500' role="alert">{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text">Forget Password</span>

                        </label>

                    </div>
                    <div>
                        {loginError && <p>{loginError}</p>}
                    </div>


                    <button type="submit" value="Login" className='btn btn-accent w-full ' >Login</button>
                </form>
                <p>New to doctors portal<Link to="/signup" className='text-primary'>Create an account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-accent w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;