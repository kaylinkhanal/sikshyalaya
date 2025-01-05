'use client'
import React from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/lib/redux/slices/userSlice'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownTrigger,
Dropdown,
DropdownMenu,
DropdownItem,
Chip,
User,
Pagination,
} from "@nextui-org/react";
const ProfileSection = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const handleLogin = () => {
        dispatch(logoutUser())
        router.push('/login')
    }
  return (
    
    <div className='absolute right-4 top-2'> 
     <Dropdown>
              <DropdownTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="settings">Settings</DropdownItem>
                <DropdownItem key="profile">Profile</DropdownItem>
                <DropdownItem     onClick={()=>handleLogin()} key="logout">Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
  </div>
  )
}

export default ProfileSection