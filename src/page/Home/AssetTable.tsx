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
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '@/app/store'
import { useDispatch } from 'react-redux';
import { CoinData, getCoinList } from '@/features/Coin/CoinSlice';
import { ScrollArea } from '@radix-ui/react-scroll-area';


interface AssetTableProps {
    coin: CoinData[];
    category: string;
}

const AssetTable: React.FC<AssetTableProps> = ({ coin, category }) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCoinList(1));
    }, [])

    return (
        <Table>
            <ScrollArea className='h-[72vh]'>
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
                    {coin && coin.map((item) =>
                        <TableRow key={item.id}>
                            <TableCell
                                className="font-medium flex items-center gap-2 cursor-pointer"
                                onClick={() => navigate(`/market/${item.id}`)}
                            >
                                <Avatar className='z-50 w-10'>
                                    <AvatarImage
                                        src={item.image}
                                    />
                                </Avatar>
                                <span>{item.name}</span>
                            </TableCell>
                            <TableCell className="text-left">{item.symbol}</TableCell>
                            <TableCell className="text-left">{item.total_volume}</TableCell>
                            <TableCell className="text-left">{item.market_cap}</TableCell>
                            <TableCell className="text-left">{item.price_change_percentage_24h}</TableCell>
                            <TableCell className="text-right">${item.current_price}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </ScrollArea>
        </Table>
    )
}

export default AssetTable