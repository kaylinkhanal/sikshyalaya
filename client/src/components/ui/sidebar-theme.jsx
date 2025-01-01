'use client'
import React from 'react'
import { useSelector } from 'react-redux'

const SidebarTheme = ({children}) => {
    const {userDetails } = useSelector(state=>state.user)
    const themeConfig = {
        'teacher': 'bg-red-400',
        'student': 'bg-blue-400',
        'admin': 'bg-pink-400'
    }
  return (
    <div className={themeConfig[userDetails.role]}>
        {children}
    </div>
  )
}

export default SidebarTheme