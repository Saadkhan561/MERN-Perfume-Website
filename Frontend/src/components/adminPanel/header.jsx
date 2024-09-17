import React from 'react'
import { useRouter } from "next/router";
import SearchDiv from '../search';
import { User } from 'lucide-react';

const AdminHeader = () => {
    const router = useRouter()
    return (
        <div className='p-6 flex justify-between items-center w-full'>
            <div className='text-2xl font-semibold uppercase'>{router.pathname.split("/")[2]}</div>
            <div className='flex items-center gap-2'>
                <SearchDiv />
                <User className='h-5 w-5' />
            </div>
        </div>
    )
}

export default AdminHeader