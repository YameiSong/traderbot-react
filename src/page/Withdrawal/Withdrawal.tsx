import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Withdrawal = () => {
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
                    {[1, 1, 1, 1, 1, 1, 1].map((_, index) =>
                        <TableRow key={index}>
                            <TableCell className="text-left">2 June, 2024 at 11:42</TableCell>
                            <TableCell className="text-left">Bank</TableCell>
                            <TableCell className="text-left">$102225</TableCell>
                            <TableCell className="text-right">345</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
  )
}

export default Withdrawal