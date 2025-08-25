import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { LinearProgress } from "@mui/material";
import { Check, Folder, BarChart, Zap, GitCommit, Share2, Lightbulb, Clock, Users, Target } from "lucide-react";

// 🎨 UI/UX Journey Flow Improvements - Enhanced Journey Step Interface
interface JourneyStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming' | 'locked';
  estimatedTime: string;
  action: () => void;
  icon: React.ElementType;
  category: 'setup' | 'configuration' | 'automation' | 'analytics';
  priority: 'high' | 'medium' | 'low';
}

// 1. Interactive Journey Stepper - Enhanced journey steps with actions and categories
const journeySteps: JourneyStep[] = [
  {
    id: "auth",
    title: "GitHub Connected",
    description: "Authentication complete",
    status: "completed",
    estimatedTime: "✓ Done",
    action: () => console.log("GitHub auth completed"),
    icon: Check,
    category: 'setup',
    priority: 'high'
  },
  {
    id: "repositories",
    title: "Select Repositories",
    description: "Choose repos to monitor",
    status: "current",
    estimatedTime: "1-2 min",
    action: () => console.log("Navigate to repositories"),
    icon: Folder,
    category: 'setup',
    priority: 'high'
  },
  {
    id: "webhooks",
    title: "Enable Webhooks",
    description: "Listen for GitHub events",
    status: "upcoming",
    estimatedTime: "2 min",
    action: () => console.log("Setup webhooks"),
    icon: Zap,
    category: 'configuration',
    priority: 'high'
  },
  {
    id: "commits",
    title: "Track Commits",
    description: "Capture commit activity",
    status: "locked",
    estimatedTime: "Auto",
    action: () => console.log("Start tracking commits"),
    icon: GitCommit,
    category: 'automation',
    priority: 'medium'
  },
  {
    id: "posts",
    title: "Create Posts",
    description: "Transform commits into content",
    status: "locked",
    estimatedTime: "Auto",
    action: () => console.log("Generate posts"),
    icon: Share2,
    category: 'automation',
    priority: 'medium'
  },
  {
    id: "analytics",
    title: "View Analytics",
    description: "Track engagement",
    status: "locked",
    estimatedTime: "Available",
    action: () => console.log("View analytics"),
    icon: BarChart,
    category: 'analytics',
    priority: 'low'
  },
];

export default function JourneyUI() {
  const [activeStepId, setActiveStepId] = useState<string>("repositories");
  const [showCelebration, setShowCelebration] = useState(false);
  
  const completedSteps = journeySteps.filter((s) => s.status === "completed").length;
  const totalSteps = journeySteps.length;
  const completionPercentage = (completedSteps / totalSteps) * 100;
  const currentStepIndex = journeySteps.findIndex(step => step.status === "current");

  // 7. Smart Recommendations - Contextual tips based on journey state
  const getSmartRecommendation = () => {
    const currentStep = journeySteps.find(step => step.status === "current");
    
    if (currentStep?.id === "repositories") {
      return {
        title: "🎯 Quick Start Tip",
        message: "Select your most active repositories first to see results faster. Focus on repos with frequent commits.",
        action: "Choose 2–3 repositories",
        icon: Target,
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        iconBg: "bg-blue-500"
      };
    } else if (currentStep?.id === "webhooks") {
      return {
        title: "⚡ Automation Tip",
        message: "Webhooks enable real-time monitoring. Enable them for instant post generation when you commit.",
        action: "Enable webhooks now",
        icon: Zap,
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        iconBg: "bg-purple-500"
      };
    }
    
    return {
      title: "💡 Quick Start Tip",
      message: "Select your most active repositories first to see results faster.",
      action: "Choose 2–3 repositories",
      icon: Lightbulb,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconBg: "bg-yellow-500"
    };
  };

  const recommendation = getSmartRecommendation();

  // Handle step interactions
  const handleStepClick = (step: JourneyStep) => {
    if (step.status !== "locked") {
      setActiveStepId(step.id);
      step.action();
      
      // 8. Micro-Interactions & Celebrations
      if (step.status === "completed") {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
    }
  };

  return (
    <div className="p-6 space-y-8 relative">
      {/* 8. Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      {/* 4. Progress Animation - Enhanced progress bar */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500 font-medium">Setup Progress</span>
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
              transition: 'transform 0.8s ease-in-out',
            },
          }}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Getting Started</span>
          <span>Ready to Launch</span>
        </div>
      </div>

      {/* 6. Journey Flow Visualization - Enhanced flow diagram */}
      <div className="flex items-center justify-center gap-4 py-4">
        {journeySteps.map((step, i) => (
          <React.Fragment key={step.id}>
            <div className="text-center group">
              <Avatar className={`w-12 h-12 flex items-center justify-center mb-2 transition-all duration-300 ${
                step.status === "completed" ? "bg-green-500 scale-110" :
                step.status === "current" ? "bg-blue-500 animate-pulse scale-110" : "bg-gray-300"
              } ${step.status !== "locked" ? "group-hover:scale-125 cursor-pointer" : ""}`}
              onClick={() => handleStepClick(step)}>
                <step.icon className="w-5 h-5 text-white" />
              </Avatar>
              <div className={`text-xs transition-colors duration-200 ${
                step.status === "current" ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}>
                {step.title}
              </div>
              {/* Category Badge */}
              <div className="text-xs text-gray-400 capitalize mt-1">
                {step.category}
              </div>
            </div>
            {i < journeySteps.length - 1 && (
              <div className={`w-10 h-1 transition-all duration-500 ${
                i < completedSteps ? "bg-green-500" : "bg-gray-300"
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 3. Step Cards with Actions - Enhanced interactive cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {journeySteps.map((step, index) => (
          <Card
            key={step.id}
            className={`relative text-center transition-all duration-300 transform ${
              step.status === "current" ? "border-2 border-blue-500 scale-105 shadow-lg" : 
              step.status === "completed" ? "border-2 border-green-500" : "border border-gray-200"
            } ${
              step.status === "completed" ? "bg-gradient-to-br from-green-50 to-green-25" : 
              step.status === "current" ? "bg-gradient-to-br from-blue-50 to-blue-25" : "bg-white"
            } ${
              step.status !== "locked" ? "hover:scale-105 hover:shadow-xl cursor-pointer" : 
              "cursor-default opacity-70"
            }`}
            onClick={() => handleStepClick(step)}
          >
            {/* Step number badge with priority indicator */}
            <div className="absolute -top-2 -left-2">
              <Avatar className={`w-6 h-6 text-xs font-bold text-white transition-all duration-200 ${
                step.status === "completed" ? "bg-green-500" :
                step.status === "current" ? "bg-blue-500" : "bg-gray-300"
              }`}>
                {step.status === "completed" ? <Check className="w-3 h-3" /> : index + 1}
              </Avatar>
            </div>

            {/* Priority indicator */}
            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
              step.priority === "high" ? "bg-red-400" :
              step.priority === "medium" ? "bg-yellow-400" : "bg-green-400"
            }`}></div>

            <CardContent className="flex flex-col items-center gap-2 p-4">
              {/* 8. Micro-Interactions - Enhanced icon with animations */}
              <step.icon className={`w-8 h-8 transition-all duration-300 ${
                step.status === "completed" ? "text-green-500" :
                step.status === "current" ? "text-blue-500 animate-pulse" : "text-gray-400"
              } ${step.status !== "locked" ? "hover:scale-110" : ""}`} />

              <div className="font-semibold text-sm">{step.title}</div>
              <div className="text-xs text-gray-500">{step.description}</div>

              {/* Enhanced time estimate with icon */}
              <div className={`mt-1 text-xs rounded-full px-2 py-1 flex items-center gap-1 ${
                step.status === "completed" ? "bg-green-100 text-green-700" :
                step.status === "current" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
              }`}>
                {step.status !== "completed" && <Clock className="w-3 h-3" />}
                {step.estimatedTime}
              </div>

              {/* Action button for interactive steps */}
              {step.status === "current" && (
                <Button 
                  size="sm" 
                  className="mt-2 text-xs bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleStepClick(step);
                  }}
                >
                  Continue →
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 7. Smart Recommendations - Dynamic contextual recommendations */}
      <div className={`p-4 border rounded-lg ${recommendation.bgColor} ${recommendation.borderColor} flex gap-3 items-start transition-all duration-300 hover:shadow-md`}>
        <div className={`${recommendation.iconBg} w-8 h-8 rounded-full flex items-center justify-center`}>
          <recommendation.icon className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-800">{recommendation.title}</div>
          <div className="text-sm text-gray-700 mt-1">
            {recommendation.message}
          </div>
          <Button 
            size="sm" 
            className="mt-3 bg-gray-800 hover:bg-gray-900 text-white transition-all duration-200 hover:scale-105"
            onClick={() => {
              const currentStep = journeySteps.find(step => step.status === "current");
              if (currentStep) handleStepClick(currentStep);
            }}
          >
            {recommendation.action} →
          </Button>
        </div>
      </div>

      {/* Journey Statistics */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Users className="w-6 h-6 text-gray-500 mx-auto mb-1" />
          <div className="text-sm font-semibold text-gray-700">Setup</div>
          <div className="text-xs text-gray-500">{journeySteps.filter(s => s.category === 'setup').length} steps</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Zap className="w-6 h-6 text-gray-500 mx-auto mb-1" />
          <div className="text-sm font-semibold text-gray-700">Automation</div>
          <div className="text-xs text-gray-500">{journeySteps.filter(s => s.category === 'automation').length} steps</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <BarChart className="w-6 h-6 text-gray-500 mx-auto mb-1" />
          <div className="text-sm font-semibold text-gray-700">Analytics</div>
          <div className="text-xs text-gray-500">{journeySteps.filter(s => s.category === 'analytics').length} step</div>
        </div>
      </div>
    </div>
  );
}
