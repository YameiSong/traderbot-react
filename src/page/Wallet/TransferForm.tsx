import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DialogClose } from '@radix-ui/react-dialog'
import React from 'react'

const TransferForm = () => {
  const [formData, setFormData] = React.useState({
    amount: '',
    walletID: '',
    purpose: '',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = () => {
    console.log(formData)
  }
  return (
    <div className='space-y-5'>
      <div>
        <p>Enter amount</p>
        <Input
          name='amount'
          value={formData.amount}
          onChange={handleChange}
          className='py-6'
          placeholder='$9999'
          type='number'
        />
      </div>
      <div>
        <p>Wallet ID</p>
        <Input
          name='walletID'
          value={formData.walletID}
          onChange={handleChange}
          className='py-6'
          placeholder='#ADER455'
          type='text'
        />
      </div>
      <div>
        <p>Purpose</p>
        <Input
          name='purpose'
          value={formData.purpose}
          onChange={handleChange}
          className='py-6'
          placeholder='Gift for your friend'
          type='text'
        />
      </div>
      <DialogClose className='w-full p-0'>
        <Button onClick={handleSubmit} className='w-full py-6 text-xl'>
          Submit
        </Button>
      </DialogClose>
    </div>
  )
}

export default TransferForm