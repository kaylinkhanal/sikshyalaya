'use client'

import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import EditorToolbar from './editor-toolbar'
import { Button } from './ui/button'
import axios from 'axios'
import { useSelector } from 'react-redux'

const TiptapEditor = ({setAnswers, answers, question, id,isLastQuestion}) => {
  const {userDetails} = useSelector(state=>state.user)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[200px]',
      },
    },
  })

  useEffect(()=>{
    if(editor?.getText()?.trim()){
      const questionAlreadyExist = answers.find((item)=> item.question== question)
      if(!questionAlreadyExist){
       setAnswers([...answers, {question:question, answer: editor?.getText()} ])
      }else{
        const previousAnswer = [...answers]
        const changePreviousAnswerArr= previousAnswer.map((item)=>{
          if(item.question === question){
            item.answer =  editor?.getText()
          }
          return item
        })
        setAnswers(changePreviousAnswerArr)
      }
    }
  
  },[editor?.getText()])

  const submitAssignment = async ()=>{ 
    const {data} = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/submit-assignments`,
    {
      "assignment":id,
      "student":userDetails._id,
      "answers":answers
      
    } )
    if(data){
      toast({
        title: data
      })
    }
  
  }
  return (
    (<div className="border rounded-md overflow-hidden">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
     {isLastQuestion && <Button onClick={()=>submitAssignment()}>Submit Assignment</Button>}
    </div>)
  );
}

export default TiptapEditor

