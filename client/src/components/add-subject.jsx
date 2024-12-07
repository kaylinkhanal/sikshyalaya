
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

const SubjectForm = () => {
  const [subjectName, setSubjectName] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/users?role=teacher');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setMessage('Failed to fetch teachers. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/sections/674bce5e1682d6f6f8e27a10/subjects', {
        subjectName,
        teacher: selectedTeacher
      });

      if (response.status === 200 || response.status === 201) {
        setMessage('Subject added successfully!');
        setSubjectName('');
        setSelectedTeacher('');
      } else {
        setMessage('Failed to add subject. Please try again.');
      }
    } catch (error) {
      console.error('Error adding subject:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Subjects</DialogTitle>
       
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">
            Subject Name
          </label>
          <input
            type="text"
            id="subjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">
            Teacher
          </label>
          <select
            id="teacher"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.fullName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Subject
        </button>
      </form>
      </DialogContent>
    </Dialog>

  );
};

export default SubjectForm;

