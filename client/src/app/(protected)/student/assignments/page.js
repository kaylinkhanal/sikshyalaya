'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from 'next/navigation'

const Assignments = () => {
  const { userDetails } = useSelector(state => state.user)
  const [subjectList, setSubjectList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const fetchSubjectList = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/students/${userDetails?._id}/subjects`)
      if (response.status === 200) {
        setSubjectList(response.data)
        setError(null)
      } else {
        setError('Failed to fetch subjects. Please try again later.')
      }
    } catch (err) {
      setError('Failed to fetch subjects. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubjectList()
  }, [userDetails?._id])
//console.log(subjectList);

console.log(userDetails)
  
  

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (subjectList.length === 0) {
    return <div className="text-gray-600">No subjects found.</div>
  }

  return (
    <>
    
      <p className='text-teal font-mono text-4xl'>ASSIGNMENT SUBJECTS:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {subjectList.map((subject) => (
          <Card onClick={()=>router.push('assignments/'+subject._id)} key={subject._id} className="w-full hover:shadow-lg transition-shadow duration-300 text-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{subject.subjectName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-white">Teacher: {subject.teacher?.fullName}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    
    </>
  
  )
}

export default Assignments