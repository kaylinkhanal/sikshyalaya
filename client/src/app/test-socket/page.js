'use client'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
const socket = io('http://localhost:9000'); 

const Socket = () => {
  const [msg, setMsg] = useState('')
    useEffect(() => {
        socket.on('connection')
        socket.on('chat message', (msg)=>{
          setMsg(msg)
        })
      }, []); 

      const sendMsg = ()=>{
        socket.emit('chat message', msg);
      }
  return (
    <div>
      {msg}
      <input onChange={(e)=>setMsg(e.target.value)} value={msg}/>
        <button onClick={sendMsg} >Send Hi</button>
    </div>
  )
}

export default Socket