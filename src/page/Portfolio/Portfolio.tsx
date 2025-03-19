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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { getUserAssets } from '@/features/Asset/AssetSlice';

const Portfolio = () => {
    const dispatch = useDispatch<AppDispatch>();
    const asset = useSelector((state: RootState) => state.asset);

    useEffect(() => {
        dispatch(getUserAssets());
    }, [])

    return (
        <div className='p-5 lg:px-20'>
            <h1 className='font-bold text-3xl pb-5 text-left'>Portfolio</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Coin</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price Change 24h</TableHead>
                        <TableHead>Price Change% 24h</TableHead>
                        <TableHead className="text-right">Total Volume</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {asset.userAssets.map((item, index) =>
                        <TableRow key={index}>
                            <TableCell className="font-medium flex items-center gap-2">
                                <Avatar className='z-50 w-10'>
                                    <AvatarImage
                                        src={item.coin.image}
                                    />
                                </Avatar>
                                <span>{item.coin.name}</span>
                            </TableCell>
                            <TableCell className="text-left">{item.coin.symbol.toUpperCase()}</TableCell>
                            <TableCell className="text-left">{item.quantity}</TableCell>
                            <TableCell className="text-left">{item.coin.price_change_24h}</TableCell>
                            <TableCell className="text-left">{item.coin.price_change_percentage_24h}</TableCell>
                            <TableCell className="text-right">{item.coin.total_volume}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Portfolio