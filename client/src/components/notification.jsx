'use client'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
const notifications = [
    "You have a new message!",
    "Your subscription is expiring soon.",
    "New feature available: Dark mode",
    "Your post has 100 new likes!",
    "Don't forget to complete your profile.",
  ]
  
  export function NotificationIcon() {
    const [notification, setNotification] = useState("")
    const {userDetails } = useSelector(state=> state.user)
    const [lastNotifiedTime, setLastNotifiedTime] = useState('')
    const [userViewed, setUserViewed] =useState(false)
   
    const handleOpenPopover =async () => {
        setUserViewed(true)
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userDetails._id}/notifications`)
      setNotification(data.notification)
      setLastNotifiedTime(data.dateTime)
    }
  
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative" onClick={handleOpenPopover}>
            <Bell className="h-4 w-4" />
          {!userViewed &&  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Notifications</h4>
             Last checked: {lastNotifiedTime}
             {notification.length>0 && notification.map((item)=>{
                return(
                    <div ket={item._id} className="m-4 p-2 shadow-sm">
                        {item}
                    </div>
                )
             })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
  