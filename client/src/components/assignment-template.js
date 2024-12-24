import React from 'react'
import { format } from 'date-fns'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

const TiptapEditor = dynamic(() => import('./tiptap-editor'), { ssr: false })

export function AssignmentTemplate({ questions, dueDate, courseName, teacherName }) {
  const params = usePathname()
  const totalMarks = questions.reduce((sum, question) => sum + question.marks, 0)

  return (
    (<div className="border-2 border-gray-300 p-8 rounded-lg shadow-lg bg-white">
      <div className="flex justify-between items-center mb-6">
      
        <img
          src="/placeholder.svg?height=40&width=120"
          alt="School Logo"
          className="h-10" />
        <h1 className="text-3xl font-bold text-center flex-grow">SIKSHALAYA ASSIGNMENTS</h1>
      </div>
      <div
        className="w-full h-32 mb-6 rounded bg-cover bg-center"
        style={{backgroundImage: "url('/placeholder.svg?height=200&width=800')"}}>
        <div
          className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-white text-3xl font-bold">{courseName}</h2>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-lg"><strong>Teacher:</strong> {teacherName}</p>
        <p className="text-lg"><strong>Due Date:</strong> {dueDate ? format(dueDate, 'MMMM d, yyyy') : 'Not specified'}</p>
        <p className="text-lg"><strong>Total Marks:</strong> {totalMarks}</p>
      </div>
      {questions.map((question, index) => (
        <div key={index} className="mb-8 page-break-before">
          <div className="mb-4">
            <p className="text-lg"><strong>Question {index + 1}:</strong> {question.title}</p>
            <p className="text-md text-gray-600">Marks: {question.marks}</p>
          </div>
          <div className="border border-gray-300 rounded-md">
            {params == '/teacher/assignment' ?    <div className='h-72 bg-white'></div> : <TiptapEditor /> }

          </div>
    
        </div>
      ))}
      <footer className="text-center text-sm text-gray-500 mt-8 page-break-before">
        <p>© 2023 Sikshalaya. All rights reserved.</p>
        <p>For any queries, please contact: support@sikshalaya.edu</p>
      </footer>
    </div>)
  );
}

