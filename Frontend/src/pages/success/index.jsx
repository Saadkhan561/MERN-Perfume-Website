import React, { useEffect } from 'react'
import Link from 'next/link'
import useCartStore from '@/store/cart'

const Success = () => {
  const {clearCart} = useCartStore()
  useEffect(() => {
    clearCart()
  }, [])
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <div className='w-2/5 h-2/5 flex gap-4 items-center justify-center shadow-2xl border border-slate-200'>
        <div>
          <img src="/images/success.png" alt="" height={80} width={80}/>
        </div>
        <div>
          <p className='text-xl font-semibold'>Your order has been placed!</p>
          <div className='flex gap-2 items-center'><p>Go back to shopping</p><Link href={'/products'}><img className='mt-1' src="/images/right-arrow.png" alt="" height={15} width={15}/></Link></div>
        </div>
      </div>
    </div>
  )
}

export default Success