import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReloadIcon, UpdateIcon } from '@radix-ui/react-icons'
import { CopyIcon, DollarSign, DownloadIcon, ShuffleIcon, UploadIcon, WalletIcon } from 'lucide-react'
import TopupForm from './TopupForm'
import WithdrawForm from './WithdrawForm'
import TransferForm from './TransferForm'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import { useEffect } from 'react'
import { depositMoney, getUserWallet, getWalletTransactions, retrievePaymentId } from '@/features/Wallet/WalletSlice'
import { useLocation } from 'react-router-dom'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Wallet = () => {
    const dispatch = useDispatch<AppDispatch>();
    const wallet = useSelector((state: RootState) => state.wallet);
    const query = useQuery();
    const orderId = query.get('order_id');
    const sessionId = query.get('session_id');
    console.log('order id', orderId);
    console.log('session id', sessionId);

    useEffect(() => {
        dispatch(getUserWallet());
        dispatch(getWalletTransactions());
    }, [])

    useEffect(() => {
        if (sessionId) {
            dispatch(retrievePaymentId(sessionId)).then((action) => {
                const paymentId = action.payload?.payment_id;
                console.log("Retrieved Payment ID:", paymentId);
    
                if (paymentId && orderId) {
                    dispatch(depositMoney({
                        orderId: Number(orderId),
                        paymentId: paymentId
                    }));
                }
            });
        }
    }, [sessionId, orderId, dispatch]);

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
                                        <p className='text-gray-500 text-sm'>{wallet.userWallet?.id}</p>
                                        <CopyIcon className='cursor-pointer hover:text-gray-500' size={12} />
                                    </div>
                                </div>
                            </div>
                            <ReloadIcon
                                onClick={() => dispatch(getUserWallet())}
                                className='cursor-pointer hover:text-gray-500 w-6 h-6'
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <DollarSign />
                            <span className='text-2xl font-semibold'>{wallet.userWallet?.balance}</span>
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
                                    <DialogDescription>
                                        <TopupForm />
                                    </DialogDescription>
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
                                    <DialogDescription>
                                        <WithdrawForm />
                                    </DialogDescription>
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
                                    <DialogDescription>
                                        <TransferForm />
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
                <div className='py-5 pt-10'>
                    <div className='flex gap-2 items-center pb-5'>
                        <p className='text-2xl font-semibold'>History</p>
                        <UpdateIcon className='cursor-pointer hover:text-gray-500' />
                    </div>
                    <div className="space-y-5">
                        {wallet.transactions.map((item, index) => (
                            <div key={index}>
                                <Card className='px-5 py-2 flex justify-between items-center'>
                                    <div className="flex items-center gap-5">
                                        <Avatar onClick={() => dispatch(getWalletTransactions())}>
                                            <AvatarFallback>
                                                <ShuffleIcon />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='space-y-1'>
                                            <p>{item.type || item.purpose}</p>
                                            <p className="text-sm text-gray-500">{item.date}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-green-600">{item.amount} USD</p>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet