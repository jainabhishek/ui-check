import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { LinearProgress } from "@mui/material";
import { Check, Folder, BarChart, Zap, GitCommit, Share2 } from "lucide-react";

const journeySteps = [
  {
    id: "auth",
    title: "GitHub Connected",
    description: "Authentication complete",
    status: "completed",
    estimatedTime: "✓ Done",
    icon: Check,
  },
  {
    id: "repositories",
    title: "Select Repositories",
    description: "Choose repos to monitor",
    status: "current",
    estimatedTime: "1-2 min",
    icon: Folder,
  },
  {
    id: "webhooks",
    title: "Enable Webhooks",
    description: "Listen for GitHub events",
    status: "upcoming",
    estimatedTime: "2 min",
    icon: Zap,
  },
  {
    id: "commits",
    title: "Track Commits",
    description: "Capture commit activity",
    status: "locked",
    estimatedTime: "—",
    icon: GitCommit,
  },
  {
    id: "posts",
    title: "Create Posts",
    description: "Transform commits into content",
    status: "locked",
    estimatedTime: "—",
    icon: Share2,
  },
  {
    id: "analytics",
    title: "View Analytics",
    description: "Track engagement",
    status: "locked",
    estimatedTime: "—",
    icon: BarChart,
  },
];

export default function JourneyUI() {
  const completedSteps = journeySteps.filter((s) => s.status === "completed").length;
  const totalSteps = journeySteps.length;
  const completionPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="p-6 space-y-8">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Setup Progress</span>
          <span className="text-gray-500">{completedSteps} of {totalSteps} complete</span>
        </div>
        <LinearProgress
          variant="determinate"
          value={completionPercentage}
          sx={{
            height: 8,
            borderRadius: 4,
            background: "linear-gradient(90deg, #E3F2FD 0%, #F3E5F5 100%)",
            '& .MuiLinearProgress-bar': {
              background: "linear-gradient(90deg, #4285F4 0%, #9C27B0 100%)",
              borderRadius: 4,
            },
          }}
        />
      </div>

      {/* Flow Diagram */}
      <div className="flex items-center justify-center gap-4">
        {journeySteps.map((step, i) => (
          <React.Fragment key={step.id}>
            <div className="text-center">
              <Avatar className={`w-12 h-12 flex items-center justify-center mb-1 ${
                step.status === "completed" ? "bg-green-500" :
                step.status === "current" ? "bg-blue-500 animate-pulse" : "bg-gray-300"
              }`}>
                <step.icon className="w-5 h-5 text-white" />
              </Avatar>
              <div className="text-xs text-gray-700">{step.title}</div>
            </div>
            {i < journeySteps.length - 1 && (
              <div className={`w-10 h-1 ${i < completedSteps ? "bg-green-500" : "bg-gray-300"}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {journeySteps.map((step, index) => (
          <Card
            key={step.id}
            className={`relative p-4 text-center transition transform ${
              step.status === "current" ? "border-2 border-blue-500 scale-105" : "border border-gray-200"
            } ${step.status === "completed" ? "bg-green-50" : "bg-white"}
              ${step.status !== "locked" ? "hover:scale-105 hover:shadow-xl cursor-pointer" : "cursor-default opacity-70"}`}
          >
            {/* Badge */}
            <div className="absolute -top-2 -left-2">
              <Avatar className={`w-6 h-6 text-xs font-bold text-white ${
                step.status === "completed" ? "bg-green-500" :
                step.status === "current" ? "bg-blue-500" : "bg-gray-300"
              }`}>
                {step.status === "completed" ? <Check className="w-3 h-3" /> : index + 1}
              </Avatar>
            </div>

            <CardContent className="flex flex-col items-center gap-2">
              <step.icon className={`w-8 h-8 ${
                step.status === "completed" ? "text-green-500" :
                step.status === "current" ? "text-blue-500" : "text-gray-400"
              }`} />

              <div className="font-semibold text-sm">{step.title}</div>
              <div className="text-xs text-gray-500">{step.description}</div>

              <div className="mt-1 text-xs border rounded px-2 py-0.5 text-gray-600">
                {step.estimatedTime}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendation Box */}
      <div className="p-4 border rounded-lg bg-yellow-50 flex gap-3 items-start">
        <div className="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center">
          💡
        </div>
        <div>
          <div className="font-semibold">Quick Start Tip</div>
          <div className="text-sm text-gray-700">
            Select your most active repositories first to see results faster.
          </div>
          <Button size="sm" className="mt-2">Choose 2–3 repositories</Button>
        </div>
      </div>
    </div>
  );
}
