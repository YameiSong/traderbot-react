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
import { useNavigate } from 'react-router-dom';


const AssetTable = () => {
    const navigate = useNavigate();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Coin</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Market Cap</TableHead>
                    <TableHead>24h</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[1, 1, 1, 1, 1, 1, 1].map((_, index) =>
                    <TableRow key={index}>
                        <TableCell
                            className="font-medium flex items-center gap-2"
                            onClick={() => navigate(`/market/bitcoin`)}
                        >
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
                        <TableCell className="text-right">$102225</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>

    )
}

export default AssetTable