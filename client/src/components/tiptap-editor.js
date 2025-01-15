'use client'

import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import EditorToolbar from './editor-toolbar'
import { Button } from './ui/button'

const TiptapEditor = ({setAnswers, answers, question}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
    ],
    content: '<p>Start typing your answer here...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[200px]',
      },
    },
  })

  useEffect(()=>{
    const questionAlreadyExist = answers.find((item)=> item.question== question)
    if(questionAlreadyExist){
    //   questionAlreadyExist
    // setAnswers([...answers,  ])

    //   {question:question, text: editor?.getText()}
    } 
  },[editor?.getText()])
  return (
    (<div className="border rounded-md overflow-hidden">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
 
    </div>)
  );
}

export default TiptapEditor

