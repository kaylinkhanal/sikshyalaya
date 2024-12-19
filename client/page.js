import dynamic from 'next/dynamic'
const AssignmentTemplateGenerator = dynamic(() => import('./assignment-template-generator'), { ssr: false })

export default function Page() {
  return (
    (<div className="container mx-auto py-10">
      <AssignmentTemplateGenerator />
    </div>)
  );
}

