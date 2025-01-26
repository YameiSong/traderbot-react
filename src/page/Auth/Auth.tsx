import React from 'react'
import './Auth.css'
import SingupForm from './SingupForm'
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
                <div className="bgBlur absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            flex flex-col justify-center items-center h-[35rem] w-[30rem] rounded-md z-50 bg-black
            bg-opacity-20 shadow-2xl shadow-white">
                    <p className='text-6xl font-bold pb-9'>Coiniverse</p>
                    {
                        location.pathname === '/signin' && (
                            <section>
                                <SinginForm />
                                <div className="flex items-center justify-center gap-4">
                                    <span>Don't have account?</span>
                                    <Button
                                        onClick={() => navigate('/signup')}
                                        variant={'ghost'}
                                        className='bg-inherit hover:bg-inherit'
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                                <div className="flex items-center justify-center">
                                    <Button
                                        onClick={() => navigate('/forgot-password')}
                                        variant={'ghost'}
                                        className='w-full bg-slate-200 mt-5'
                                    >
                                        Forgot password
                                    </Button>
                                </div>
                            </section>
                        )
                    }
                    {
                        location.pathname === '/signup' && (
                            <section>
                                <SingupForm />
                                <div className="flex items-center justify-center gap-4">
                                    <span>Already have account?</span>
                                    <Button
                                        onClick={() => navigate('/signin')}
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
                            <section>
                                <ForgotPasswordForm />
                                <div className="flex items-center justify-center gap-4">
                                    <span>Back to login</span>
                                    <Button
                                        onClick={() => navigate('/signin')}
                                        variant={'ghost'}
                                        className='bg-inherit hover:bg-inherit'
                                    >
                                        Sign In
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