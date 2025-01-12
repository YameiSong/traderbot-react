import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { DragHandleHorizontalIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import logo from '@/assets/logo.png'
import Sidebar from './Sidebar'


const Navbar = () => {
    return (
        <div className='px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky 
        top-0 left-0 right-0 flex justify-between items-center'>
            <div className='flex items-center gap-3'>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant={'outline'}
                            size={'icon'}
                            className='rounded-full w-11 h-11'
                        >
                            <DragHandleHorizontalIcon className="w-7 h-7" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side={'left'}
                        className='w-72 border-r-0 flex flex-col justify-center'
                    >
                        <SheetHeader>
                            <SheetTitle>
                                <div className='text-3xl flex justify-center items-center gap-1'>
                                    <Avatar className="flex items-center">
                                        <AvatarImage src={logo} alt="avatar" className="w-16 h-16" />
                                        <div className='ml-2'>
                                            <span className='font-bold text-primary'>Coiniverse</span>
                                        </div>
                                    </Avatar>
                                </div>
                            </SheetTitle>
                        </SheetHeader>
                        <Sidebar />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default Navbar