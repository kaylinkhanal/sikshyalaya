'use client'
import { useToast } from '@/hooks/use-toast';
import React, { useEffect } from 'react'

import io from 'socket.io-client';
const socket = io('http://localhost:9000'); 

const AssignmentProvider = ({children}) => {
    const { toast } = useToast()
    useEffect(() => {
        socket.on('assignment', (assignment)=>{
         toast({
            title: assignment,
            
          })
        })
      }, []); 

  return (
    <div>{children}</div>
  )
}

export default AssignmentProvider