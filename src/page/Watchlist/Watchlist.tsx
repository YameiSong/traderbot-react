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
import { Button } from '@/components/ui/button'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import { getUserWatchlist, removeFromWatchlist } from '@/features/Watchlist/WatchlistSlice'

const Watchlist = () => {
    const watchlist = useSelector((state: RootState) => state.watchlist);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUserWatchlist());
    }, [])

    return (
        <div className='p-5 lg:px-20'>
            <h1 className='font-bold text-3xl pb-5 text-left'>Watch List</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Coin</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>Market Cap</TableHead>
                        <TableHead>Price Change% 24h</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right text-destructive">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {watchlist.coins.map((item, index) =>
                        <TableRow key={index}>
                            <TableCell className="font-medium flex items-center gap-2">
                                <Avatar className='z-50 w-10'>
                                    <AvatarImage
                                        src={item.image}
                                    />
                                </Avatar>
                                <span>{item.name}</span>
                            </TableCell>
                            <TableCell className="text-left">{item.symbol.toUpperCase()}</TableCell>
                            <TableCell className="text-left">{item.total_volume}</TableCell>
                            <TableCell className="text-left">{item.market_cap}</TableCell>
                            <TableCell className="text-left">{item.price_change_percentage_24h}</TableCell>
                            <TableCell className="text-left">${item.current_price}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    size={'icon'}
                                    className='h-10 w-10 bg-white'
                                    variant={'ghost'}
                                    onClick={() => dispatch(removeFromWatchlist(item.id))}
                                >
                                    <BookmarkFilledIcon style={{width: '20px', height: '20px'}}/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Watchlist