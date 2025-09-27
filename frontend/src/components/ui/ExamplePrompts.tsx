'use client';

import React from 'react';
import { Code, FileText, Palette, Calculator, Database, Globe } from 'lucide-react';

interface ExamplePromptsProps {
  onPromptSelect: (prompt: string) => void;
}

const examplePrompts = [
  {
    icon: Code,
    title: 'Code Generation',
    prompt: 'Write a Python function to sort a list of numbers using bubble sort algorithm.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-700 dark:text-blue-300',
  },
  {
    icon: FileText,
    title: 'Markdown Document',
    prompt: 'Create a markdown document explaining the benefits of using TypeScript over JavaScript.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-700 dark:text-green-300',
  },
  {
    icon: Palette,
    title: 'Creative Writing',
    prompt: 'Write a short story about a robot who discovers emotions.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-700 dark:text-purple-300',
  },
  {
    icon: Calculator,
    title: 'Math Problem',
    prompt: 'Solve this equation step by step: 2x² + 5x - 3 = 0',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-700 dark:text-orange-300',
  },
  {
    icon: Database,
    title: 'Data Analysis',
    prompt: 'Explain SQL joins with examples and create a sample database schema.',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    textColor: 'text-indigo-700 dark:text-indigo-300',
  },
  {
    icon: Globe,
    title: 'Web Development',
    prompt: 'Create an HTML form with validation and explain the CSS Grid layout.',
    color: 'from-teal-500 to-blue-500',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    textColor: 'text-teal-700 dark:text-teal-300',
  },
];

export default function ExamplePrompts({ onPromptSelect }: ExamplePromptsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {examplePrompts.map((prompt, index) => {
        const IconComponent = prompt.icon;
        return (
          <button
            key={index}
            onClick={() => onPromptSelect(prompt.prompt)}
            className={`p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 hover:scale-105 hover:shadow-lg group ${prompt.bgColor}`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${prompt.color} shadow-md group-hover:shadow-lg transition-shadow`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className={`font-semibold text-sm mb-2 ${prompt.textColor}`}>
                  {prompt.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {prompt.prompt}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
