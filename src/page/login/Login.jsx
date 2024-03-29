import React, { useContext, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { FoodWaveData } from '../../Context/Context';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { GoogleAuthProvider } from 'firebase/auth'; // Import GoogleAuthProvider from Firebase

const Login = () => {
    const {
        loginUser,
        loading,
        setloading,
        userinfo,
        loginWithGoogle,
        setuserupdate,
        userupdate,
    } = useContext(FoodWaveData);
    const navigate = useNavigate();
    const location = useLocation();

    const [showbutton, setShowBtn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signin = () => {
        loginWithGoogle()
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                if (user) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Logged in successfully',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire('Oops!', `${errorMessage}`, 'error');
            });
    };

    const showPassword = () => {
        const passwordField = document.querySelector('#hs-hero-password-2');
        passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
        setShowBtn(!showbutton);
    };
    const loggindemouser = () => {
        setloading(true);
        loginUser('user1@gmail.com', 'User1@gmail.com')
            .then((userCredential) => {
                const user = userCredential.user;
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Logged in successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setloading(false);
                setuserupdate(!userupdate);
                navigate('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire('Oops!', `${errorMessage}`, 'error');
                setloading(false);
            });
        ///User!@gmail.com
    }
    const formSubmit = (e) => {
        e.preventDefault();
        setloading(true);

        loginUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Logged in successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setEmail('');
                setPassword('');
                setloading(false);
                setuserupdate(!userupdate);
                navigate('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire('Oops!', `${errorMessage}`, 'error');
                setloading(false);
            });
    };
    if (userinfo?.displayName) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Logged in successfully',
            showConfirmButton: false,
            timer: 1500,
        });

        if (location.state) {
            return navigate(`${location.state}`);
        } else {
            return <Navigate to={'/'} />;
        }
    } else {
        return (
            <div className="bg-black bg-opacity-5 py-8 relative">
                <Helmet>
                    <title>FoodWave | login</title>
                </Helmet>
                {loading && (
                    <span className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                        <div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div>
                    </span>
                )}
                <button className='mx-auto block bg-red-600 text-white font-bold px-8 py-2 rounded active:scale-90 hover:bg-red-300 hover:text-black transition-all' onClick={loggindemouser}>demo user</button>
                <div className="container mx-auto max-w-3xl">
                    <h4 className="text-3xl text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-gray-200">
                        Ready to Dive In? <span className="text-blue-600 dark:text-blue-500">LogIn</span> Here!
                    </h4>
                    <p className="mt-3 text-base text-gray-500">
                        Sign in to access your account and unlock a world of personalized content and services. Your adventure starts here. If you're new, join us and be part of our community.
                    </p>

                    <div className="mt-8 grid">
                        <button onClick={signin} type="button" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                            <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                                <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                                <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                                <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                                <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                            </svg>
                            Sign up with Google
                        </button>
                    </div>

                    <div className="py-6 flex items-center text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:mr-6 after:flex-[1_1_0%] after:border-t after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                        Or
                    </div>

                    <form onSubmit={formSubmit}>
                        <div className="mb-4">
                            <label htmlFor="hs-hero-email-2" className="block text-sm font-medium dark:text-white">
                                <span className="sr-only">Email address</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="hs-hero-email-2"
                                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                placeholder="Email address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="hs-hero-password-2" className="block text-sm font-medium dark:text-white relative">
                                <span className="sr-only">Password</span>
                                <input
                                    type={showbutton ? 'password' : 'text'}
                                    name="password"
                                    id="hs-hero-password-2"
                                    className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span
                                    onClick={showPassword}
                                    className="text-2xl cursor-pointer absolute right-4 top-[50%] -translate-y-[50%]"
                                >
                                    {showbutton ? <HiEyeOff /> : <HiEye />}
                                </span>
                            </label>
                        </div>

                        <div className="grid">
                            <button
                                type="submit"
                                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 sm:p-4"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="my-2 font-semibold">
                        Don't have an account? <Link className="text-blue-800" to="/signup">
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
};

export default Login;
