import { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { getWithdrawalHistory } from '@/features/Withdrawal/WithdrawalSlice';

const Withdrawal = () => {
    const dispatch = useDispatch<AppDispatch>();
    const withdrawal = useSelector((state: RootState) => state.withdrawal);

    useEffect(() => {
        dispatch(getWithdrawalHistory());
    }, [])

    return (
        <div className='p-5 lg:px-20'>
            <h1 className='font-bold text-3xl pb-5 text-left'>Withdrawal</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {withdrawal.withdrawalRequests.map((item, index) =>
                        <TableRow key={index}>
                            <TableCell className="text-left">{item.date}</TableCell>
                            <TableCell className="text-left">Bank</TableCell>
                            <TableCell className="text-left">${item.amount}</TableCell>
                            <TableCell className="text-right">{item.status}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Withdrawal