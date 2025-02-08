import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import AssetTable from './AssetTable'
import StockChart from './StockChart'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { DotIcon } from '@radix-ui/react-icons'
import { X, MessageCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { AppDispatch, RootState } from '@/app/store'
import { useDispatch, useSelector } from 'react-redux'
import { getCoinList } from '@/features/Coin/CoinSlice'

const Home = () => {
    const [category, setCategory] = React.useState("all")
    const [inputValue, setInputValue] = React.useState("")
    const [isChatBotOpen, setIsChatBotOpen] = React.useState(false)
    const coin = useSelector((state: RootState) => state.coin)
    const dispatch: AppDispatch = useDispatch()

    const handleCategory = (value: string) => {
        setCategory(value)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log('Enter key pressed:' + inputValue)
            setInputValue('')
        }
    }

    const handleChatBotOpen = () => {
        setIsChatBotOpen(!isChatBotOpen)
    }

    useEffect(() => {
        dispatch(getCoinList(1));
    }, [])

    return (
        <div className="relative">
            <div className="lg:flex">
                <div className="lg:w-[50%] lg:border-r">
                    <div className="p-3 flex items-center gap-4">
                        <Button
                            onClick={() => handleCategory("all")}
                            variant={category == "all" ? "default" : "outline"}
                            className="rounded-full"
                        >
                            All
                        </Button>

                        <Button
                            onClick={() => handleCategory("top50")}
                            variant={category == "top50" ? "default" : "outline"}
                            className="rounded-full"
                        >
                            Top 50
                        </Button>

                        <Button
                            onClick={() => handleCategory("topGainers")}
                            variant={category == "topGainers" ? "default" : "outline"}
                            className="rounded-full"
                        >
                            Top Gainers
                        </Button>

                        <Button
                            onClick={() => handleCategory("topLosers")}
                            variant={category == "topLosers" ? "default" : "outline"}
                            className="rounded-full"
                        >
                            Top Losers
                        </Button>
                    </div>
                    <AssetTable coin={coin.coinList} category={category} />
                </div>
                <div className="hidden lg:block lg:w-[50%] p-5">
                    <StockChart />
                    <div className="flex gap-5 items-center">
                        <Avatar>
                            <AvatarImage src="https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628" />
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <p>ETH</p>
                                <DotIcon className="text-gray-400" />
                                <p className='text-gray-400'>Ethereum</p>
                            </div>
                            <div className="flex items-end gap-2">
                                <p className="text-xl font-semibold">5464</p>
                                <p className="text-red-600 flex gap-1">
                                    <span>-1319049822.578</span>
                                    <span>(-0.24436%)</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="fixed bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
                {isChatBotOpen &&
                    <div className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-100">
                        <div className="flex justify-between items-center border-b-2 px-6 h-[12%]">
                            <p>Chat Bot</p>
                            <Button
                                variant={'ghost'}
                                size={'icon'}
                                className='bg-slate-100 hover:bg-slate-200'
                                onClick={handleChatBotOpen}
                            >
                                <X style={{ width: '20px', height: '20px' }} />
                            </Button>
                        </div>
                        <div className="h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container">
                            {[1, 1, 1, 1].map((_, index) => (
                                <div key={index} className={`${index % 2 == 0 ? "self-start" : "self-end"} self-start pb-5 w-auto`}>
                                    <div className='px-5 py-2 rounded-md bg-violet-200 w-auto text-left'>
                                        <p>hi, yummy</p>
                                        <p>you can ask crypto related question</p>
                                        <p>like, price, market cap etc.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='h-[12%] border-t'>
                            <Input
                                className='w-full h-full order-none outline-none rounded-t-none'
                                placeholder='Type your message here...'
                                onChange={handleChange}
                                value={inputValue}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                }
                <div className="relative w-[10rem] cursor-pointer group">
                    <Button
                        className='w-full h-[3rem] gap-2 items-center'
                        onClick={handleChatBotOpen}
                    >
                        <MessageCircle className='fill-[#FFFFFF] -rotate-90' style={{ width: '24px', height: '24px' }} />
                        <span className='text-2xl'>Chat Bot</span>
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default Home