import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { getUserAssets } from '@/features/Asset/AssetSlice';

const Portfolio = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUserAssets());
    }, [])

    return (
        <div className='p-5 lg:px-20'>
            <h1 className='font-bold text-3xl pb-5 text-left'>Portfolio</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Change%</TableHead>
                        <TableHead className="text-right">Volume</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1, 1, 1, 1, 1, 1, 1].map((_, index) =>
                        <TableRow key={index}>
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
                            <TableCell className="text-right">$102225</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Portfolio