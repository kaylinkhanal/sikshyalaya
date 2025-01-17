'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays } from 'lucide-react'
import { ClipboardList } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { AssignmentTemplate } from '@/components/assignment-template'
const Assignment = () => {
  const params = useParams()
  const {userDetails} = useSelector(state=>state.user)
  const [assignmentList, setAssignmentList] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentAssignmentDetails, setCurrentAssignmentDetails] = useState({})
  const fetchAssignmentBySubjectId = async() => {
   const {data} = await axios.get(`http://localhost:9000/assignments?userId=${userDetails._id}&subjectId=${params.assignmentId}`)
    if(data) setAssignmentList(data)
  }

  useEffect(()=>{
    fetchAssignmentBySubjectId()
  },[])

  const handleCardOpen = (item)=>{
    setIsDialogOpen(true)
    setCurrentAssignmentDetails(item)
  }
  if(assignmentList.length ==0) return "No Assignments found. Please wait..."
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Dialog open={isDialogOpen} onOpenChange={()=>setIsDialogOpen(!isDialogOpen)}>
      <DialogContent className="w-[90vw] h-[90vh] max-w-none overflow-scroll	">
        <DialogHeader>
          <DialogTitle>Add Assignments</DialogTitle>
         
        </DialogHeader>
        <DialogDescription>
          <div>
          <AssignmentTemplate
        questions={currentAssignmentDetails?.questionsSet}
        dueDate={currentAssignmentDetails.dueDate}
        id={currentAssignmentDetails._id}
        courseName={ currentAssignmentDetails.subject?.subjectName}
        teacherName={currentAssignmentDetails.createdBy?.fullName} />
          </div>
       
        </DialogDescription>
      </DialogContent>
    </Dialog>
    {assignmentList.map((item, id) => (
      <Card onClick={()=>handleCardOpen(item)} key={item._id} className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Assignment No.{id+1}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{item.questionsSet?.length} Questions</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>Due {moment(item.dueDate, "YYYYMMDD").fromNow()}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <ClipboardList className="mr-2 h-4 w-4" />
            <span>Due Date: {moment(item.dueDate).format('MMMM D, YYYY')}</span>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
  )
}

export default Assignment