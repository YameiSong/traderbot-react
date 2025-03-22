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
import { getAllOrdersForUser, Order } from '@/features/Order/OrderSlice';

const calculatePNL = (order: Order) => {
    if (order && order.order_item?.buy_price && order.order_item?.sell_price) {
        return (order.order_item.sell_price - order.order_item.buy_price).toFixed(2)
    }
    return '-'
}

const Activity = () => {
    const dispatch = useDispatch<AppDispatch>();
    const order = useSelector((state: RootState) => state.order);

    useEffect(() => {
        dispatch(getAllOrdersForUser());
    }, [])

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
                    {order.orders.map((item, index) => {
                        const date = new Date(item.timestamp);
                        return <TableRow key={index}>
                            <TableCell className="text-left">
                                <p>{date.toLocaleDateString()}</p>
                                <p className='text-gray-400'>{date.toLocaleTimeString()}</p>
                            </TableCell>
                            <TableCell className="font-medium flex items-center gap-2">
                                <Avatar className='z-50 w-10'>
                                    <AvatarImage
                                        src={item.order_item?.coin.image}
                                    />
                                </Avatar>
                                <span>{item.order_item?.coin.name}</span>
                            </TableCell>
                            <TableCell className="text-left">${item.order_item?.buy_price}</TableCell>
                            <TableCell className="text-left">${item.order_item?.sell_price}</TableCell>
                            <TableCell className="text-left">{item.order_type}</TableCell>
                            <TableCell className="text-left">{calculatePNL(item)}</TableCell>
                            <TableCell className="text-right">{item.price}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default Activity