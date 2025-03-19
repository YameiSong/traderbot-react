import { AppDispatch, RootState } from '@/app/store'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getAssetDetails } from '@/features/Asset/AssetSlice'
import { payOrder } from '@/features/Order/OrderSlice'
import { getUserWallet } from '@/features/Wallet/WalletSlice'
import { DotIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const calculateBuyCost = (amount: number, price: number) => {
    let volume = amount / price
    let decimalPlaces = Math.max(2, price.toString().split('.')[0].length)
    return volume.toFixed(decimalPlaces)
}

const TradeForm = () => {
    const [orderType, setOrderType] = React.useState('BUY')
    const [amount, setAmount] = React.useState(0)
    const [quantity, setQuantity] = React.useState(0)
    const coin = useSelector((state: RootState) => state.coin)
    const wallet = useSelector((state: RootState) => state.wallet)
    const asset = useSelector((state: RootState) => state.asset)
    const dispatch = useDispatch<AppDispatch>()

    const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const amount = Number(e.target.value)
        setAmount(amount)
        const volume = calculateBuyCost(amount, coin.coinDetails?.market_data.current_price.usd || 0)
        setQuantity(Number(volume))
    }

    useEffect(() => {
        dispatch(getUserWallet());
        if (coin.coinDetails?.id) {
            dispatch(getAssetDetails(coin.coinDetails.id));
        }
    }
    , [])
    
    const handleBuyCrypto = () => {
        dispatch(payOrder({
            coinId: coin.coinDetails?.id || '',
            quantity: quantity,
            orderType: orderType
        }))
    }
    return (
        <div className='space-y-10 p-5'>
            <div>
                <div className="flex gap-4 items-center justify-between">
                    <Input
                        className='py-7 focus:outline-none'
                        placeholder='Amount'
                        onChange={handleChangeAmount}
                        type='number'
                        name='amount'
                    />
                    <div>
                        <p className='border text-2xl flex justify-center items-center w-36 h-14 rounded-md'>
                            {quantity}
                        </p>
                    </div>
                </div>
                {true && <p className='text-red-600 text-center pt-4'>Insufficient wallet balance to buy</p>}
            </div>

            <div className="flex gap-5 items-center">
                <div>
                    <Avatar>
                        <AvatarImage
                            src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                            className='w-10'
                        />
                    </Avatar>
                </div>
                <div>
                    <div className='flex items-center gap-2'>
                        <p>BTC</p>
                        <DotIcon className='text-gray-500' />
                        <p className="text-gray-500">Bitcoin</p>
                    </div>
                    <div className="flex items-end gap-2">
                        <p className="text-xl font-bold">${coin.coinDetails?.market_data.current_price.usd}</p>
                        <p className="text-red-600">
                            <span>-135734925.759</span>
                            <span>(-0.47395%)</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <p>Order Type</p>
                <p>Market Order</p>
            </div>
            <div className="flex items-center justify-between">
                <p>
                    {orderType == 'BUY' ? "Available Balance" : "Available Quantity"}
                </p>
                <p>
                    {orderType == 'BUY' ? "$" + wallet.userWallet?.balance : asset.assetDetails?.quantity || 0}
                </p>
            </div>
            <div>
                <Button 
                className='w-full py-6'
                onClick={handleBuyCrypto}
                >
                    {orderType}
                </Button>
                <Button
                    variant={'link'}
                    className='w-full mt-3 bg-transparent text-gray-500'
                    onClick={() => setOrderType(orderType === 'BUY' ? 'SELL' : 'BUY')}
                >
                    {orderType === 'BUY' ? 'Or Sell' : 'Or Buy'}
                </Button>
            </div>
        </div>
    )
}

export default TradeForm