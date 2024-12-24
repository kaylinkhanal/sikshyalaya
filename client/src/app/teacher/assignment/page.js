import AssignmentTemplateGenerator from '@/components/assignment-template-generator';
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux';

export default function Page() {
  const {value} = useSelector(state=>state.counter)
  return (
    (<div className="container mx-auto py-10">
      {value}
      <AssignmentTemplateGenerator />
    </div>)
  );
}

