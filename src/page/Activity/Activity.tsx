import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'

const Activity = () => {
  return (
    <div className='p-5 lg:px-20'>
            <h1 className='font-bold text-3xl pb-5 text-left'>Activity</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Coin</TableHead>
                        <TableHead>Buy Price</TableHead>
                        <TableHead>Sell Price</TableHead>
                        <TableHead>Order Type</TableHead>
                        <TableHead>Profit / Loss</TableHead>
                        <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1, 1, 1, 1, 1, 1, 1].map((_, index) =>
                        <TableRow key={index}>
                            <TableCell className="text-left">
                                <p>2025-01-19</p>
                                <p className='text-gray-400'>12:00:00</p>
                            </TableCell>
                            <TableCell className="font-medium flex items-center gap-2">
                                <Avatar className='z-50 w-10'>
                                    <AvatarImage
                                        src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                                    />
                                </Avatar>
                                <span>Bitcoin</span>
                            </TableCell>
                            <TableCell className="text-left">55159794426</TableCell>
                            <TableCell className="text-left">2023715712511</TableCell>
                            <TableCell className="text-left">102235</TableCell>
                            <TableCell className="text-left">$102225</TableCell>
                            <TableCell className="text-right">345</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
  )
}

export default Activity