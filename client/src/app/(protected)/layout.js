import ProfileSection from '@/components/profile-section'
import React from 'react'

const ProtectedAuthLayout = ({children}) => {
  return (
    <div>
        <ProfileSection/>
        {children}
    </div>
  )
}

export default ProtectedAuthLayout