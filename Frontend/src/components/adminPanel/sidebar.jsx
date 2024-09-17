'use client';

import {
    LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const Sidebar = () => {
    const [active, setActive] = useState('/');
    return (
        <aside
            className="duration-300 p-6 bg-slate-900 text-white w-[250px] sm:block hidden h-screen border-r border-r-slate-300 relative"

        >
            <div className='text-center mb-10 text-3xl w-full'>
                <p>Perfume Store</p>
            </div>
            <ul className="p-2">
                <Link href={'/admin'}>
                    <li
                        className={`sidebar_li   ${active == 'dashboard' ? 'bg-slate-700 border  border-slate-800 text-white' : ''}`}
                        onClick={() => setActive('dashboard')}
                    >
                        <LayoutDashboard className='h-5 w-5' />
                        <p>Dashboard</p>
                    </li>
                </Link>
                <Link href={'/admin/products'}>
                    <li
                        className={`sidebar_li   ${active == 'products' ? 'bg-slate-700 border  border-slate-800 text-white' : ''}`}
                        onClick={() => setActive('products')}
                    >
                        <LayoutDashboard className='h-5 w-5' />
                        <p>Products</p>
                    </li>
                </Link>
            </ul>
        </aside>
    );
};

export default Sidebar;
