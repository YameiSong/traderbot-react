import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { BookmarkIcon, DotIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect } from 'react'
import TradeForm from './TradeForm'
import StockChart from '../Home/StockChart'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import { useParams } from 'react-router-dom'
import { getCoinDetails } from '@/features/Coin/CoinSlice'

const StockDetails = () => {
  const coin = useSelector((state: RootState) => state.coin)
  const dispatch = useDispatch<AppDispatch>()
  const {id} = useParams()

  useEffect(() => {
    if (id) {
      dispatch(getCoinDetails(id))
    }
  }, [id])

  return (
    <div className='p-5 mt-5'>
      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <div>
            <Avatar>
              <AvatarImage
                src={coin.coinDetails?.image.large}
                className='w-10'
              />
            </Avatar>
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <p>{coin.coinDetails?.name}</p>
              <DotIcon className='text-gray-500' />
              <p className="text-gray-500">{coin.coinDetails?.symbol.toUpperCase()}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">${coin.coinDetails?.market_data.current_price.usd}</p>
              <p className="text-red-600">
                <span>-{coin.coinDetails?.market_data.market_cap_change_24h}</span>
                <span>(-{coin.coinDetails?.market_data.market_cap_change_percentage_24h}%)</span>
              </p>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-6'>
          <Button>
            {true ? <BookmarkFilledIcon className='w-6 h-6' /> : <BookmarkIcon className='w-6 h-6' />}
          </Button>
          <Dialog>
            <DialogTrigger>Trade</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>How much do you want to trade?</DialogTitle>
                <DialogDescription>
                  <TradeForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

        </div>
      </div>
      <div className="mt-14">
        <StockChart coinId={id ?? ''} />
      </div>
    </div>
  )
}

export default StockDetails