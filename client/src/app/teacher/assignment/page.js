"use client";
import React from "react";
import AssignmentForm from "@/components/assignment-form";
import AssignmentList from "@/components/assignment-list";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Dashboard = () => {
  return (
    <div>
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Assignment
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AssignmentList />
            </div>
            <div>
              <AssignmentForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
