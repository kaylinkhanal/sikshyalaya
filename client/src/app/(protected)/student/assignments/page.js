'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Assignments = () => {
  const {userDetails} = useSelector(state=>state.user)
  const [subjectList, setSubjectList] = useState([])
  const fetchSubjectList = async() => {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/students/${userDetails?._id}/subjects`)
      setSubjectList(data)
  }
  useEffect(()=>{
    fetchSubjectList()
  },[])
return (
  <div>{JSON.stringify(subjectList)}</div>
)
}

export default Assignments