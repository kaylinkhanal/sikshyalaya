'use client'

import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import { DatePicker } from "./date-picker"
import { AssignmentTemplate } from "./assignment-template"
import axios from 'axios'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { useSelector } from 'react-redux'

export default function AssignmentTemplateGenerator() {
  const [questions, setQuestions] = useState([{ title: '', marks: 0 }])
  const [dueDate, setDueDate] = useState(undefined)
  const [courseName, setCourseName] = useState('')
  const {userDetails } = useSelector(state=>state.user)
  const [subjectList, setSubjectList] = useState([])
  const fetchSubjects = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/subjects`,
    );

    setSubjectList(data);
  };
  const handleChange = (e, id, type) => {
    const updatedQuestions = questions.map((question, index) => {
      if (index === id) {
        return { ...question, [type]: type === 'marks' ? Number(e.target.value) : e.target.value };
      }
      return question
    })
    setQuestions(updatedQuestions)
  }

  const addQuestion = () => {
    setQuestions([...questions, { title: '', marks: 0 }])
  }

  useEffect(()=>{
    fetchSubjects()
  },[])


  return (
    (<div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Assignment Template Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      
      <Select onValueChange={(value)=>setCourseName(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>
      {/* setCourseName(e.target.value) */}
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subject</SelectLabel>
          {subjectList.map((item)=>{
            return   <SelectItem  key={item._id} value={item._id}>{item.subjectName}</SelectItem>
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
        <Input
          value={userDetails.fullName}
          disabled={true}
          placeholder="Enter teacher name" />
        <DatePicker date={dueDate} setDate={setDueDate} />
      </div>
      <h2 className="text-xl font-semibold mb-4">Assignment Questions:</h2>
      {questions.map((item, id) => (
        <div key={id} className="flex gap-4 mb-4">
          <Input
            value={item.title}
            onChange={(e) => handleChange(e, id, 'title')}
            placeholder={`Enter question ${id + 1}`} />
          <Input
            className="w-36"
            type="number"
            value={item.marks || ''}
            onChange={(e) => handleChange(e, id, 'marks')}
            placeholder="Marks" />
        </div>
      ))}
      <Button onClick={addQuestion} className="mb-8">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Question
      </Button>
      <AssignmentTemplate
        questions={questions}
        dueDate={dueDate}
        courseName={ subjectList.find(item=> item._id == courseName)?.subjectName || ''}
        teacherName={userDetails.fullName} />

      <Button className="mt-4">
              Create new assignment
            </Button>
    </div>)
  );
}


