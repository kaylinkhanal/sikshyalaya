"use client";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import io from "socket.io-client";
const socket = io("http://localhost:9000");

const AssignmentProvider = ({ children }) => {
  const { userDetails } = useSelector((state) => state.user);
  const { toast } = useToast();

  useEffect(() => {
    socket.emit("joinRoom", userDetails._id);
  }, [userDetails._id]);

  useEffect(() => {
    socket.on("assignment", (assignment) => {
      toast({
        title: assignment,
      });
    });
  }, []);

  return <div>{children}</div>;
};

export default AssignmentProvider;
