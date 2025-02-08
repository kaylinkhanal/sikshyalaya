"use client";

import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import { DatePicker } from "./date-picker"
import { AssignmentTemplate } from "./assignment-template"
import axios from 'axios'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SparkleIcon } from 'lucide-react'
import { StarsIcon } from 'lucide-react'
import io from 'socket.io-client';
const socket = io('http://localhost:9000'); 

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DatePicker } from "./date-picker";
import { AssignmentTemplate } from "./assignment-template";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useSelector } from "react-redux";
import { SparkleIcon } from "lucide-react";
import { StarsIcon } from "lucide-react";
import { use } from "@/hooks/use-";

export default function AssignmentTemplateGenerator() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [prompt, setPrompt] = useState("");
  // Generate an array with this year and last year
  const years = [currentYear.toString(), (currentYear - 1).toString()];
  const [questions, setQuestions] = useState([{ title: "", marks: 0 }]);
  const [dueDate, setDueDate] = useState(undefined);
  const [subjectId, setSubjectId] = useState("");
  const { userDetails } = useSelector((state) => state.user);
  const [subjectList, setSubjectList] = useState([]);
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [classList, setClassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const {} = use();

  const generateQuestions = async () => {
    const subjectName = subjectList.find((item) => item._id == classId)?.name;
    const gradeLevel = classList.find((item) => item._id == classId)?.name;
    const { data } = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD5XnfofzJQNxrjn7cWYObAE_wxIA1i3M0",
      {
        contents: [
          {
            parts: [
              {
                text: `${prompt}. The question level should be for grade level ${gradeLevel} students and subject should be ${subjectName}, and result should be in array of objects [{ title: '', marks: 0 }] like this. Just return an array back, i do not need answers, do not add JSON.parse inside the response . Do not add \n at the end.
  

i would strictly only like to get output as following without adding any other texts:
[{ title: 'Multiply 7 by 9.', marks: 2 }]


Do not add any trailing nextlines in output it should be perfect array of objects.  Dont add new lines or spaces at all. Send response itself in JSON.parse
      `,
              },
            ],
          },
        ],
      }
    );
    if (data?.candidates && data.candidates[0].content.parts[0].text) {
      debugger;
      const cleanJsonString = data.candidates[0].content.parts[0].text
        .replace(/```json\n|```/g, "")
        .replaceAll("\n", "");
      const assignments = JSON.parse(cleanJsonString);
      setQuestions(assignments);
    }
  };

  const submitAssignment = async ()=>{

      socket.emit('assignment', userDetails.fullName + 'has created a new assignment.',sectionId);

  const submitAssignment = async () => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/assignments`,
      {
        section: sectionId,
        gradeLevel: classId,
        subject: subjectId,
        dueDate,
        questionsSet: questions,
        createdBy: userDetails._id,
      }
    );
    if (data) {
      ({
        title: "Assignment Created!!",
      });
    }
  };
  const fetchSubjects = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/teachers/${userDetails._id}/subjects`
    );

    setSubjectList(data);
  };

  const fetchClasses = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/class?academicYear=${selectedYear}`
    );

    setClassList(data);
  };
  const fetchSectionByClassId = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/class/${classId}/sections`
    );

    setSectionList(data);
  };

  const handleChange = (e, id, type) => {
    const updatedQuestions = questions.map((question, index) => {
      if (index === id) {
        return {
          ...question,
          [type]: type === "marks" ? Number(e.target.value) : e.target.value,
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { title: "", marks: 0 }]);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedYear) fetchClasses();
  }, [selectedYear]);

  useEffect(() => {
    if (classId) fetchSectionByClassId();
  }, [classId]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create Assignment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={classId} onValueChange={setClassId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Grade" />
          </SelectTrigger>
          <SelectContent>
            {classList.map((item) => (
              <SelectItem key={item._id} value={item._id}>
                {item.gradeLevel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setSectionId(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Section" />
          </SelectTrigger>
          {/* setCourseName(e.target.value) */}
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Section</SelectLabel>
              {sectionList.map((item) => {
                return (
                  <SelectItem key={item._id} value={item._id}>
                    {item.sectionName}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setSubjectId(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          {/* setCourseName(e.target.value) */}
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Subject</SelectLabel>
              {subjectList.map((item) => {
                return (
                  <SelectItem key={item._id} value={item._id}>
                    {item.subjectName}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          value={userDetails.fullName}
          disabled={true}
          placeholder="Enter teacher name"
        />
        <DatePicker date={dueDate} setDate={setDueDate} />
      </div>
      <Input
        placeholder="Generate your assignemnts questions with prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button
        onClick={generateQuestions}
        variant="outline"
        className="text-white"
      >
        Generate Question
        <StarsIcon />
      </Button>
      <h2 className="text-xl font-semibold mb-4">Assignment Questions:</h2>
      {questions.map((item, id) => (
        <div key={id} className="flex gap-4 mb-4">
          <Input
            value={item.title}
            onChange={(e) => handleChange(e, id, "title")}
            placeholder={`Enter question ${id + 1}`}
          />
          <Input
            className="w-36"
            type="number"
            value={item.marks || ""}
            onChange={(e) => handleChange(e, id, "marks")}
            placeholder="Marks"
          />
        </div>
      ))}
      <Button onClick={addQuestion} className="mb-8">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Question
      </Button>
      {sectionId && classId && subjectId && (
        <AssignmentTemplate
          questions={questions}
          dueDate={dueDate}
          courseName={
            subjectList.find((item) => item._id == subjectId)?.subjectName +
              " Grade-" +
              classList?.find((item) => item._id == classId)?.gradeLevel +
              " Section-" +
              sectionList?.find((item) => item._id == sectionId)?.sectionName ||
            ""
          }
          teacherName={userDetails.fullName}
        />
      )}

      <Button className="mt-4" onClick={submitAssignment}>
        Create new assignment
      </Button>
    </div>
  );
}
