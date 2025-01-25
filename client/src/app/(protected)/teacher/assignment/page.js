'use client'
import { AssignmentTemplate } from '@/components/assignment-template';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default  function Page() {
const router = useRouter()
const [submissionList, setSubmissionList] = useState([])
const {userDetails} = useSelector(state=>state.user)
const [dialogOpen, setDialogOpen] = useState(false)
const [dialogItem, setDialogItem] = useState({})
const fetchSubmissions = async ()=>{
 const {data} = await  axios.get(`${process.env.NEXT_PUBLIC_API_URL}/submissions?teacherId=${userDetails._id}`)
  setSubmissionList(data)
}

useEffect(()=>{
  fetchSubmissions()
},[])

const openAssignment = (item)=>{
  setDialogItem(item)
  setDialogOpen(true)
}


const formattedAnsWithQuestion = dialogItem.answers?.map((item)=>{
  const {marks, title, _id} = item.question
  return {
    marks, title, _id, answer: item.answer
  }
})

  return (
    (<div className="">
      <Button onClick={()=> router.push('assignment/create-assignments')}>Create Assignment</Button>
      <Button  onClick={()=> router.push('assignment/past-assignments')}>Past Assignments</Button>

      <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="text-white">
					Edit Profile
				</Button>
    </DialogTrigger>
			<DialogContent className="sm:max-w-[425px] overflow-scroll">
			<div className='h-[400px]'>
      <DialogHeader>
					<DialogTitle>Add New Subjects</DialogTitle>
				</DialogHeader>

       <div>
            <AssignmentTemplate questions={formattedAnsWithQuestion} dueDate={dialogItem.assignment?.dueDate} assignmentId={dialogItem?._id} courseName={'test'} teacherName={'test'} id={'test'} />
      
        </div>
      
      </div>
      
			</DialogContent>
		</Dialog>
{submissionList.length> 0 ? submissionList.map((item)=>{
  return (
    <div key={item._id}  className=' flex gap-4 m-2 p-2 shadow-lg'>
      <div>
      {item.student?.fullName}
        </div>  
        <div className='bg-pink-100'>
       Due date: {moment(item.assignment?.dueDate).format('DD/MM/YYYY') }
        </div>
        {item.assignment?.subject.subjectName}
        <Button onClick={()=>openAssignment(item)}>View</Button>
    </div>
  )
}): "No Submissions!!"}
    </div>)
  );
}
