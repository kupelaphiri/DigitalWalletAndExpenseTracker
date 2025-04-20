import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
<div className="w-full h-screen flex flex-col overflow-hidden">
  <div className="sticky top-0 z-10">
    <Navbar />
  </div>
  <div className="flex flex-1 overflow-hidden">
    <Sidebar />
    <div className="flex-1 overflow-y-auto">
      <Outlet />
    </div>
  </div>
</div>

  )
}

export default RootLayout