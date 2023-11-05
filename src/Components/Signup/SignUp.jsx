import React from 'react'
import { Link } from 'react-router-dom'
const SignUp = () => {
    return (
        <div className='bg-black bg-opacity-5 py-8'>
            <div class="container mx-auto max-w-3xl">
                {/* <!-- Title --> */}
                <h4 class="text-3xl text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-gray-200">
                    Ready to Get Started? <span class="text-blue-600 dark:text-blue-500">Sign Up</span>  Here!
                </h4>
                <p class="mt-3 text-base text-gray-500 pb-5">
                    Create your account to start a new chapter with us. Sign up today and be a part of a vibrant community where you can enjoy personalized content and connect with others who share your interests. Your journey begins with a simple signup!
                </p>
                {/* <!-- End Title --> */}
                {/* <!-- Form --> */}
                <form>
                    <div class="mb-4">
                        <label for="hs-hero-email-2" class="block text-sm font-medium dark:text-white"><span class="sr-only">name</span></label>
                        <input type="text" id="hs-hero-email-2" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="name" required/>
                    </div>
                    <div class="mb-4">
                        <label for="hs-hero-email-2" class="block text-sm font-medium dark:text-white"><span class="sr-only">Email address</span></label>
                        <input type="email" id="hs-hero-email-2" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Email address" required />
                    </div>

                    <div class="mb-4">
                        <label for="hs-hero-password-2" class="block text-sm font-medium dark:text-white"><span class="sr-only">Password</span></label>
                        <input type="password" id="hs-hero-password-2" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Password" required/>
                    </div>
                    <div class="mb-4">
                    <label for="profile-pic">Choose Profile Pic:</label>
                        <input type="file" id="profile-pic" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600" required/>
                    </div>

                    <div class="grid">
                        <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 sm:p-4">login</button>
                    </div>
                </form>
                <p className='my-2 font-semibold'>allready have an account ? <Link className=' text-blue-800' to={'/login'}>login</Link></p>

                {/* <!-- End Form --> */}
            </div>
        </div>
    )
}

export default SignUp
