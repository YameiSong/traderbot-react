import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import React from 'react'

// ISSUE: Item selection is not working.

const TopupForm = () => {
    const [amount, setAmount] = React.useState('')
    const [paymentMethod, setPaymentMethod] = React.useState('Stripe')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value)
    }
    const handlePaymentMethod = (value: string) => {
        setPaymentMethod(value)
    }
    const handleSubmit = () => {
        console.log('submit')
    }
    return (
        <div className="pt-10 space-y-5">
            <div>
                <p className="pb-2">Enter Amount</p>
                <Input
                    onChange={handleChange}
                    value={amount}
                    className='py-7 text-lg'
                    placeholder='$9999'
                />
            </div>
            <div>
                <p className="pb-2">Select payment method</p>
                <RadioGroup
                    onValueChange={handlePaymentMethod}
                    className='flex'
                    defaultValue='Stripe'
                >
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem
                            value='Stripe'
                            id='Stripe'
                        />
                        <Label htmlFor='Stripe'>
                            <img
                                className='h-6'
                                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                                alt="stripe logo" />
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem
                            value='Visa'
                            id='Visa'
                        />
                        <Label htmlFor='Visa'>
                            <img
                                className='h-4'
                                src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg"
                                alt="visa logo" />
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem
                            value='Mastercard'
                            id='Mastercard'
                        />
                        <Label htmlFor='Mastercard'>
                            <img
                                className='h-6'
                                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                                alt="mastercard logo" />
                        </Label>
                    </div>
                </RadioGroup>
            </div>
            <Button
                onClick={handleSubmit}
                className='w-full py-7'
            >
                Submit
            </Button>
        </div>
    )
}

export default TopupForm