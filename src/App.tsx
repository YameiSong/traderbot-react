import './App.css'
import Navbar from './page/Navbar/Navbar'
import Home from './page/Home/Home'
import Activity from './page/Activity/Activity'
import Wallet from './page/Wallet/Wallet'
import Withdrawal from './page/Withdrawal/Withdrawal'
import Portfolio from './page/Portfolio/Portfolio'
import PaymentDetails from './page/Payment Details/PaymentDetails'
import StockDetails from './page/Stock Details/StockDetails'
import Watchlist from './page/Watchlist/Watchlist'
import Profile from './page/Profile/Profile'
import SearchCoin from './page/Search/SearchCoin'
import Notfound from './page/Notfound/Notfound'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Auth from './page/Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './features/Auth/AuthSlice'
import { AppDispatch, RootState } from './app/store'

function App() {
  const auth  = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token || !!auth.loggedIn) {
      dispatch(getUser())
    }
  }, [auth.loggedIn])

  return (
    <>
      {
        auth.loggedIn ? (
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/withdrawal" element={<Withdrawal />} />
              <Route path="/payment-details" element={<PaymentDetails />} />
              <Route path="/market/:id" element={<StockDetails />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<SearchCoin />} />
              <Route path='*' element={<Notfound />} />
            </Routes>
          </div>
        ) : <Auth />
      }
    </>
  )
}

export default App
