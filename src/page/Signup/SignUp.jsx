import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { Link, Navigate } from 'react-router-dom'
import { HiEye, HiEyeOff } from 'react-icons/hi';
import useAxiosConfig from '../../CustomHooks/useAxiosConfig';
import { FoodWaveData } from '../../Context/Context';
import { updateProfile } from "firebase/auth";
import { Helmet } from 'react-helmet';
const SignUp = () => {
    const axiosrequest = useAxiosConfig()
    const [showbutton, setShowBtn] = useState(true)
    //context data 
    const { createNewUser, loading, setloading, userinfo } = useContext(FoodWaveData)
    // chack already loading or not 
    if (userinfo?.displayName) {
        return <Navigate to={'/'}></Navigate>
    } else {
        // password show hide
        const showPassword = (e) => {
            const passwordField = document.querySelector('#hs-hero-password-2')
            if (passwordField.type === 'password') {
                passwordField.type = 'text'
                setShowBtn(false)
            } else {
                passwordField.type = 'password'
                setShowBtn(true)
            }
        }

        const formSubmit = e => {
            setloading(true)
            let error = [];
            e.preventDefault();
            const password = e.target.password.value;
            const email = e.target.email.value;
            const username = e.target.username.value;
            const file = e.target.file.files[0];
            const passwordLength = /.{6,}/;
            const specialCharacter = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;
            const uppercase = /[A-Z]/;
            if (!passwordLength.test(password)) {
                error = [...error, 'Password should be at least 6 characters long']
            }

            if (!specialCharacter.test(password)) {
                error = [...error, 'Password should contain at least one special character']
            }

            if (!uppercase.test(password)) {
                error = [...error, 'Password should contain at least one uppercase letter']
            }
            if (error.length > 0) {
                const msg = error[0]
                Swal.fire(
                    'opps!!',
                    `${msg}`,
                    'error'
                )
                setloading(false)
            } else {
                createNewUser(email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        const formData = new FormData()
                        formData.append('file', file)
                        formData.append('email', email)
                        axiosrequest.post('/user', formData).then((data) => {
                            setprofilePic(data.data)
                            console.log(data.data.filename)
                            updateProfile(user, {
                                displayName: username, photoURL: data.data.filename
                            }).then(() => {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'user created succesfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                setloading(false)
                                e.target.reset()
                            }).catch((error) => {
                                Swal.fire(
                                    'opps!!',
                                    `unable to update profile`,
                                    'error'
                                )
                                setloading(false)
                            });
                        })
                    }).catch((err) => {
                        Swal.fire(
                            'opps!!',
                            `unable to update profile picture`,
                            'error'
                        )
                        setloading(false)
                    })

                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        Swal.fire(
                            'opps!!',
                            `${errorMessage}`,
                            'error'
                        )
                        setloading(false)
                    });
            }
        };

        return (
            <div className='bg-black bg-opacity-5 py-8 relative'>
                <Helmet>
                    <title>FoodWave | sign up</title>
                </Helmet>
                {
                    loading && <span className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'><div className="w-20 h-20 border-4 border-dashed rounded-full opacity-100 border-emerald-600 animate-spin dark:border-violet-400 "></div></span>
                }
                <div className="container mx-auto max-w-3xl">
                    {/* <!-- Title --> */}
                    <h4 className="text-3xl text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-gray-200">
                        Ready to Get Started? <span className="text-blue-600 dark:text-blue-500">Sign Up</span>  Here!
                    </h4>
                    <p className="mt-3 text-base text-gray-500 pb-5">
                        Create your account to start a new chapter with us. Sign up today and be a part of a vibrant community where you can enjoy personalized content and connect with others who share your interests. Your journey begins with a simple signup!
                    </p>
                    {/* <!-- End Title --> */}
                    {/* <!-- Form --> */}
                    <form onSubmit={formSubmit}>
                        <div className="mb-4">
                            <label for="hs-hero-email-2" className="block text-sm font-medium dark:text-white"><span className="sr-only">username</span></label>
                            <input type="text" name='username' id="hs-hero-email-2" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="username" required />
                        </div>
                        <div className="mb-4">
                            <label for="hs-hero-email-2" className="block text-sm font-medium dark:text-white"><span className="sr-only">Email address</span></label>
                            <input type="email" name='email' id="hs-hero-email-2" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Email address" required />
                        </div>

                        <div className="mb-4">
                            <label for="hs-hero-password-2" className="block text-sm font-medium dark:text-white relative"><span className="sr-only">Password</span>
                                <input type="password" name='password' id="hs-hero-password-2" className="py-3 font-sans px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Password" required />
                                <span onClick={showPassword} className='text-2xl cursor-pointer active:scale-9 absolute right-4 top-[50%] -translate-y-[50%]'>{showbutton ? <HiEyeOff></HiEyeOff> : <HiEye></HiEye>}</span></label>
                        </div>
                        <div className="mb-4">
                            <label for="profile-pic">Choose Profile Pic:</label>
                            <input type="file" name='file' id="profile-pic" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600" required />
                        </div>

                        <div className="grid">
                            <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 sm:p-4">sign up</button>
                        </div>
                    </form>
                    <p className='my-2 font-semibold'>allready have an account ? <Link className=' text-blue-800' to={'/login'}>login</Link></p>

                    {/* <!-- End Form --> */}
                </div>
            </div>
        )
    }
}

export default SignUp
