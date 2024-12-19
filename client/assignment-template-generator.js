'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import { DatePicker } from "./date-picker"
import { AssignmentTemplate } from "./assignment-template"

export default function AssignmentTemplateGenerator() {
  const [questions, setQuestions] = useState([{ title: '', marks: 0 }])
  const [dueDate, setDueDate] = useState(undefined)
  const [courseName, setCourseName] = useState('')
  const [teacherName, setTeacherName] = useState('')

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

  return (
    (<div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Assignment Template Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter course name" />
        <Input
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
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
        courseName={courseName}
        teacherName={teacherName} />
    </div>)
  );
}

