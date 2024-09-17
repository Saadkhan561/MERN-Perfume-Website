import { withProtectedWrapper } from '@/components/Protected Route/protectedRoute'
import AdminHeader from '@/components/adminPanel/header'
import Sidebar from '@/components/adminPanel/sidebar'
import React from 'react'

const AdminLayout = ({children}) => {
  return (
    <div className='flex h-screen w-screen'>
      <Sidebar />
      <div className='flex-1'>
        <AdminHeader />
        {children}
      </div>
    </div>
  )
}

export default withProtectedWrapper(AdminLayout)