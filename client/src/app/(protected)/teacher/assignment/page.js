'use client'
import AssignmentTemplateGenerator from '@/components/assignment-template-generator';
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux';

export default function Page() {
 
  return (
    (<div className="container mx-auto py-10">
      
      <AssignmentTemplateGenerator />
    </div>)
  );
}

