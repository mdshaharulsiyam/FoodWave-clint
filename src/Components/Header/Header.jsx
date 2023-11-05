import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-col z-50 w-full bg-white border-b border-gray-200 text-sm pb-2 sm:pb-0 dark:bg-gray-800 dark:border-gray-700">
            {/* <!-- Topbar --> */}
            <div className=' bg-[#F8E0AE] bg-opacity-20'>
                <div className=" mx-auto w-full container  px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-x-5 w-full py-2 ">
                        <div className='sm:flex justify-start items-center gap-2'>
                            <a className='flex justify-start gap-1 items-center font-extralight' href="tel:+8801566026301"><BsFillTelephoneFill /> +8801566026301 </a>
                            <a className='flex justify-start gap-1 items-center font-extralight' href="mailto:shaharulsiyam0273@gmail.com"><MdEmail /> shaharulsiyam0273@gmail.com </a>
                        </div>
                        <div>
                            <NavLink className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-blue-600 hover:bg-blue-50 hover:border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:hover:bg-blue-600/[.3] dark:border-slate-700 dark:hover:border-blue-500 dark:hover:text-blue-500">Get started</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Topbar --> */}
            <div className='bg-[#F8E0AE] py-1 '>
                <nav className="relative w-full mx-auto px-4 container sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
                    <div className="flex items-center justify-between">
                        <span className='flex justify-start items-center gap-2'>
                            <img className='w-1/2 h-12 rounded-full' src="/logo.png" alt="" />
                            <Link className="flex-none text-xl font-bold dark:text-white" aria-label="Brand">FoodWave</Link>
                        </span>
                        <div className="sm:hidden">
                            <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                                <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                </svg>
                                <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
                        <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
                            <NavLink className="font-medium text-gray-800 hover:text-gray-500 sm:py-6 dark:text-gray-200 dark:hover:text-gray-400" >Account</NavLink>
                            <NavLink className="font-medium text-gray-800 hover:text-gray-500 sm:py-6 dark:text-gray-200 dark:hover:text-gray-400" >Work</NavLink>
                            <NavLink className="font-medium text-gray-800 hover:text-gray-500 sm:py-6 dark:text-gray-200 dark:hover:text-gray-400">Blog</NavLink>

                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
