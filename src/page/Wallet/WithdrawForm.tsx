import { AppDispatch, RootState } from '@/app/store'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { requestWithdrawal } from '@/features/Withdrawal/WithdrawalSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const WithdrawForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const withdrawal = useSelector((state: RootState) => state.withdrawal);

  const [amount, setAmount] = React.useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }
  const handleSubmit = () => {
    dispatch(requestWithdrawal(Number(amount)));
  }
  return (
    <div className='space-y-5'>
      <div className="flex justify-between items-center rounded-md text-xl font-bold p-4 mt-3 bg-gray-100">
        <p>Balance</p>
        <p>$2580</p>
      </div>
      <div >
        <p className='pb-2'>Enter amount</p>
        <Input
          value={amount}
          onChange={handleChange}
          className='py-6 outline-none focus:outline px-0 text-2xl text-center'
          placeholder='$9999'
          type='number'
        />
      </div>
      <div>
        <p className='pb-2'>Transfer to</p>
        <div className='flex items-center gap-5 border px-5 py-2 rounded-md'>
          <img
            className='h-8 w-8'
            src="https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_1280.png"
            alt=""
          />
          <p className='text-xl font-bold'>{withdrawal.paymentDetails?.bankName}</p>
          <p className='text-xs'>{withdrawal.paymentDetails?.accountNumber}</p>
        </div>
      </div>
      <DialogClose className='w-full p-0'>
        <Button
          onClick={handleSubmit}
          className='w-full py-6 text-xl'
        >
          Withdraw
        </Button>
      </DialogClose>
    </div>
  )
}

export default WithdrawForm