'use client'
import AssignmentTemplateGenerator from '@/components/assignment-template-generator';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default  function Page() {
  const [assignmentList, setAssignmentList] = useState([])
  const {userDetails} = useSelector(state=>state.user)
  const fetchAssignmentofTeacher =async () => {
    const {data}  = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assignments?teacherId=${userDetails._id}&user=teacher`)
    setAssignmentList(data)
  }

  useEffect(()=>{
    fetchAssignmentofTeacher()
  },[])
  return (
    (<div className="container mx-auto py-10">


      {JSON.stringify(assignmentList)}
    </div>)
  );
}

