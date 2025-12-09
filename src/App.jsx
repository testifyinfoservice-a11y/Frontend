import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { HomeIcon, GridIcon, ReportIcon, UserIcon } from './components/icons'
import Home from './pages/Home'
import Login from './pages/Login'
import RegisterUser from './pages/RegisterUser'
import RegisterProvider from './pages/RegisterProvider'
import ForgotPassword from './pages/ForgotPassword'
import AdminDashboard from './pages/AdminDashboard'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Reports from './pages/Reports'
import Account from './pages/Account'
import Help from './pages/Help'
import Address from './pages/Address'
import HowToBook from './pages/HowToBook'
import Packages from './pages/Packages'
import Reserve from './pages/Reserve'

function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const items = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Services', path: '/services', icon: GridIcon },
    { label: 'Reports', path: '/reports', icon: ReportIcon },
    { label: 'Account', path: '/account', icon: UserIcon },
  ]
  return (
    <nav className="bottom-nav">
      <div className="items">
        {items.map(i => {
          const Icon = i.icon
          const active = location.pathname === i.path
          return (
            <button key={i.path} onClick={() => navigate(i.path)} className={active ? 'active' : ''}>
              <Icon />
              <span>{i.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <div className="app">
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/user" element={<RegisterUser />} />
          <Route path="/register/provider" element={<RegisterProvider />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/account" element={<Account />} />
          <Route path="/help" element={<Help />} />
          <Route path="/account/address" element={<Address />} />
          <Route path="/how-to-book" element={<HowToBook />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/reserve" element={<Reserve />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  )
}
