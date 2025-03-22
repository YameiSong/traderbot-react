import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { DialogClose } from '@radix-ui/react-dialog'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'


const AccountVerificationForm = () => {
    const auth = useSelector((state: RootState) => state.auth)
    const [value, setValue] = React.useState('')
    const handleSubmit = () => {
        console.log(value)
    }
    return (
        <div className='flex justify-center'>
            <div className='space-y-5 mt-10 w-full'>
                <div className="flex justify-between items-center">
                    <p><b>Email :</b> {auth.email}</p>
                    <Dialog>
                        <DialogTrigger className='p-0'>
                            <Button>Send OTP</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Enter OTP</DialogTitle>
                                <DialogDescription className='py-5 flex gap-10 justify-center items-center'>
                                    <InputOTP
                                        maxLength={6}
                                        value={value}
                                        onChange={(value) => setValue(value)}
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                    <DialogClose className='p-0'>
                                        <Button
                                            onClick={handleSubmit}
                                            className='w-[10rem]'
                                        >
                                            Submit
                                        </Button>
                                    </DialogClose>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}

export default AccountVerificationForm