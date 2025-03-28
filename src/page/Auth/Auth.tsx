import './Auth.css'
import SingupForm from './SignupForm'
import SinginForm from './SigninForm'
import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import ForgotPasswordForm from './ForgotPasswordForm'

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className='h-screen relative authContainer'>
            <div className="absolute top-0 right-0 left-0 bottom-0">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            flex flex-col justify-center items-center h-[35rem] w-[30rem] rounded-md z-50 bg-black
            bg-opacity-20 shadow-2xl shadow-white px-10 py-2">
                    <p className='text-6xl font-bold pb-9 text-primary'>Coiniverse</p>
                    {
                        location.pathname === '/' && (
                            <section className='w-full'>
                                <SinginForm />
                                <div className="flex items-center justify-center gap-4 text-gray-600 mt-3">
                                    <span>Don't have account?</span>
                                    <Button
                                        onClick={() => navigate('/register')}
                                        variant={'ghost'}
                                        className='bg-inherit hover:bg-inherit'
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                                <div className="mt-5">
                                    <Button
                                        onClick={() => navigate('/forgot-password')}
                                        variant={'ghost'}
                                        className='bg-slate-200 mt-5 text-gray-600'
                                    >
                                        Forgot password
                                    </Button>
                                </div>
                            </section>
                        )
                    }
                    {
                        location.pathname === '/register' && (
                            <section className='w-full'>
                                <SingupForm />
                                <div className="flex items-center justify-center gap-4 text-gray-600 mt-3">
                                    <span>Already have account?</span>
                                    <Button
                                        onClick={() => navigate('/')}
                                        variant={'ghost'}
                                        className='bg-inherit hover:bg-inherit'
                                    >
                                        Sign In
                                    </Button>
                                </div>
                            </section>
                        )
                    }
                    {
                        location.pathname === '/forgot-password' && (
                            <section className='w-full'>
                                <ForgotPasswordForm />
                                <div className="flex items-center justify-center gap-4 text-gray-600 mt-3">
                                    <Button
                                        onClick={() => navigate('/')}
                                        variant={'ghost'}
                                        className='bg-inherit hover:bg-inherit'
                                    >
                                        Back to Login
                                    </Button>
                                </div>
                            </section>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Auth