'use client'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default  function Page() {
const router = useRouter()
const [submissionList, setSubmissionList] = useState([])
const {userDetails} = useSelector(state=>state.user)
const fetchSubmissions = async ()=>{
 const {data} = await  axios.get(`${process.env.NEXT_PUBLIC_API_URL}/submissions?teacherId=${userDetails._id}`)
  setSubmissionList(data)
}

useEffect(()=>{
  fetchSubmissions()
},[])
  return (
    (<div className="container mx-auto py-10">
      <Button onClick={()=> router.push('assignment/create-assignments')}>Create Assignment</Button>
      <Button  onClick={()=> router.push('assignment/past-assignments')}>Past Assignments</Button>
{submissionList.length> 0 ? submissionList.map((item)=>{
  return (
    <div className='m-2 p-2 shadow-lg'>
        {item.student?.fullName}
    </div>
  )
}): "No Submissions!!"}
    </div>)
  );
}

