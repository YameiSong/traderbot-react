
import path from 'path'
import React from 'react'
import { Button } from '@/components/ui/button'
import { BookmarkIcon, CreditCardIcon, HomeIcon, LandmarkIcon, WalletIcon } from 'lucide-react'
import { SheetClose } from '@/components/ui/sheet'
import { ActivityLogIcon, DashboardIcon, ExitIcon, PersonIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'

const menu = [
    { name: "Home", path: "/", icon: <HomeIcon className='w-6 h-6' /> },
    { name: "Portfolio", path: "/portfolio", icon: <DashboardIcon className='w-6 h-6' /> },
    { name: "Watch List", path: "/watchlist", icon: <BookmarkIcon className='w-6 h-6' /> },
    { name: "Activity", path: "/activity", icon: <ActivityLogIcon className='w-6 h-6' /> },
    { name: "Wallet", path: "/wallet", icon: <WalletIcon className='w-6 h-6' /> },
    { name: "Payment Details", path: "/payment-details", icon: <LandmarkIcon className='w-6 h-6' /> },
    { name: "Withdrawal", path: "/withdrawal", icon: <CreditCardIcon className='w-6 h-6' /> },
    { name: "Profile", path: "/profile", icon: <PersonIcon className='w-6 h-6' /> },
    { name: "Logout", path: "/", icon: <ExitIcon className='w-6 h-6' /> },
]

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className='mt-10 space-y-5 overflow-auto'>
            {menu.map((item, index) => (
                <SheetClose key={index} className='w-full p-0'>
                    <Button
                        variant={'outline'}
                        className='flex items-center gap-5 py-6 w-full'
                        onClick={() => navigate(item.path)}
                    >
                        <span className='w-8'>
                            {item.icon}
                        </span>
                        <p className='flex-1 text-left'>{item.name}</p>
                    </Button>
                </SheetClose>
            ))}
        </div>
    )
}

export default Sidebar