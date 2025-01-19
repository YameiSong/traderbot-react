import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { ReloadIcon } from '@radix-ui/react-icons'
import { CopyIcon, DollarSign, DownloadIcon, ShuffleIcon, UploadIcon, WalletIcon } from 'lucide-react'
import React from 'react'
import TopupForm from './TopupForm'
import WithdrawForm from './WithdrawForm'
import TransferForm from './TransferForm'

const Wallet = () => {
    return (
        <div className='flex flex-col items-center'>
            <div className="pt-10 w-full lg:w-[60%]">
                <Card>
                    <CardHeader className='pb-9'>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-5">
                                <WalletIcon size={30} />
                                <div>
                                    <CardTitle className='text-2xl'>My Wallet</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <p className='text-gray-500 text-sm'>#A476Ed</p>
                                        <CopyIcon className='cursor-pointer hover:text-gray-500' size={12} />
                                    </div>
                                </div>
                            </div>
                            <ReloadIcon className='cursor-pointer hover:text-gray-500 w-6 h-6' />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <DollarSign />
                            <span className='text-2xl font-semibold'>20000</span>
                        </div>
                        <div className="flex gap-7 mt-5">
                            <Dialog>
                                <DialogTrigger className='bg-white'>
                                    <div className="h-24 w-24 hover:text-gray-500 cursor-pointer flex flex-col 
                                    items-center justify-center rounded-md shadow-slate-800 shadow-md">
                                        <UploadIcon />
                                        <span className='text-sm mt-2'>Add Money</span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Top Up Your Wallet</DialogTitle>
                                    </DialogHeader>
                                    <TopupForm />
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger className='bg-white'>
                                    <div className="h-24 w-24 hover:text-gray-500 cursor-pointer flex flex-col 
                                    items-center justify-center rounded-md shadow-slate-800 shadow-md">
                                        <DownloadIcon />
                                        <span className='text-sm mt-2'>Withdraw</span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Withdraw</DialogTitle>
                                    </DialogHeader>
                                    <WithdrawForm />
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger className='bg-white'>
                                    <div className="h-24 w-24 hover:text-gray-500 cursor-pointer flex flex-col 
                                    items-center justify-center rounded-md shadow-slate-800 shadow-md">
                                        <ShuffleIcon />
                                        <span className='text-sm mt-2'>Transfer</span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className='text-center text-xl'>Transfer to Other Wallet</DialogTitle>
                                    </DialogHeader>
                                    <TransferForm />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Wallet