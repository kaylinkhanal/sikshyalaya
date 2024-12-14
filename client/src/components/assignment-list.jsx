import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Eye } from "lucide-react";

const assignments = [
  {
    id: 1,
    title: "Math Homework: Algebra Basics",
    dueDate: "2023-06-15",
    status: "Active",
    course: "Mathematics",
  },
  {
    id: 2,
    title: "Science Project: Ecosystem Model",
    dueDate: "2023-06-20",
    status: "Draft",
    course: "Biology",
  },
  {
    id: 3,
    title: "History Essay: Industrial Revolution",
    dueDate: "2023-06-18",
    status: "Active",
    course: "History",
  },
  {
    id: 4,
    title: "Literature Analysis: Shakespeare",
    dueDate: "2023-06-22",
    status: "Active",
    course: "Literature",
  },
];

export default function AssignmentList() {
  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <Card key={assignment.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{assignment.title}</CardTitle>
                <CardDescription>Due: {assignment.dueDate}</CardDescription>
              </div>
              <Badge
                variant={
                  assignment.status === "Active" ? "default" : "secondary"
                }
              >
                {assignment.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {assignment.course}
              </span>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" /> View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit2 className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
