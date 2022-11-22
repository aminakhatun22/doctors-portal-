import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const { signUpError, setSignUPError } = useState('');
    const [createUserEmail, setCreateUserEmail] = useState('');
    const [token] = useToken(createUserEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }


    const handleSignup = data => {
        // console.log(data.displayName);
        // setSignUPError('')
        console.log(errors);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('user created successfully')
                const userInfo = { displayName: data.name }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email);
                    })
                    .catch(err => console.log(err));
            })


            .catch(error => {
                console.log(error)
                setSignUPError(error.message)

            });
    }

    const saveUser = (name, email) => {
        const user = { name, email };

        fetch('http://localhost:7000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCreateUserEmail(email);

            })

    }




    return (
        <div className='flex justify-center items-center h-[800px]'>
            <div className='w-96 p-7'>
                <h2 className="text-4xl text-center">SignUP</h2>
                <form onSubmit={handleSubmit(handleSignup)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>

                        </label>
                        <input type="name" placeholder="" {...register('name', { required: "Name is required" })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500' role="alert">{errors.name?.message}</p>}

                    </div>


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
                            minLength: { value: 6, message: 'Password should be must 6 characters' },
                            pattern: {
                                // value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}/, message: 'Password must be strong'
                            }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-500' role="alert">{errors.password?.message}</p>}


                    </div>
                    <div>
                        {signUpError && <p className='text-red-500'> {signUpError}</p>}
                    </div>


                    <button type="submit" value="SignUp" className='btn btn-accent w-full mt-5' >SignUP</button>
                </form>
                <p>Already have an account<Link to="/login" className='text-primary'>Please Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-accent w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>

    );
};
// };
export default SignUp;