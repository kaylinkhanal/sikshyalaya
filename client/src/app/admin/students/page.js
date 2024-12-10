'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [studentList, setStudentList] = useState([])
  const fetchStudentsData =async () => {
   const {data}= await axios.get(process.env.NEXT_PUBLIC_API_URL+ '/users?role=student')
   setStudentList(data)
  }
  useEffect(()=>{
    fetchStudentsData()
  },[])
  return (
    <div>
      studnet list:

      {JSON.stringify(studentList)}
    </div>
  )
}

export default Dashboard