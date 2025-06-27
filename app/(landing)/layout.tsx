import Navbar from '@/components/Navbar'
import React, { Children, ReactNode } from 'react'
import Landing from './page'

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div>
    <Navbar />
   {children}
    </div>
  )
}

export default layout