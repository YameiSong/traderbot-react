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

const Watchlist = () => {
    const handleRemoveFromWatchlist = (value: number) => {
        console.log('Remove from watchlist' + value)
    }

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
                        <TableHead>24h</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right text-destructive">Remove</TableHead>
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
                            <TableCell className="text-left">BTC</TableCell>
                            <TableCell className="text-left">55159794426</TableCell>
                            <TableCell className="text-left">2023715712511</TableCell>
                            <TableCell className="text-left">102235</TableCell>
                            <TableCell className="text-left">$102225</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    size={'icon'}
                                    className='h-10 w-10 bg-white'
                                    variant={'ghost'}
                                    onClick={() => handleRemoveFromWatchlist(index)}
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