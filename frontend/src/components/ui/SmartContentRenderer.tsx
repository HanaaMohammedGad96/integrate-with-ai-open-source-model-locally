'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, FileText, Code, Link, Quote } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface SmartContentRendererProps {
  content: string;
  isDark?: boolean;
}

export default function SmartContentRenderer({ content, isDark = false }: SmartContentRendererProps) {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Detect content type
  const detectContentType = (text: string) => {
    // Check for code blocks
    if (text.includes('```') || text.includes('`')) {
      return 'code';
    }
    
    // Check for markdown patterns
    if (text.includes('# ') || text.includes('## ') || text.includes('### ') || 
        text.includes('- ') || text.includes('* ') || text.includes('1. ')) {
      return 'markdown';
    }
    
    // Check for URLs
    if (text.includes('http://') || text.includes('https://')) {
      return 'link';
    }
    
    // Default to plain text
    return 'text';
  };

  const contentType = detectContentType(content);

  const CodeBlock = ({ inline, className, children, ...props }: {
    inline?: boolean;
    className?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    const codeString = String(children).replace(/\n$/, '');
    const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;
    const isCopied = copiedStates[codeId];

    if (!inline && language) {
      return (
        <div className="relative group my-4">
          <div className="flex items-center justify-between bg-slate-800 dark:bg-slate-900 px-4 py-2 rounded-t-lg border border-slate-700 dark:border-slate-600">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-300 font-medium">{language}</span>
            </div>
            <button
              onClick={() => copyToClipboard(codeString, codeId)}
              className="flex items-center space-x-1 px-2 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors"
            >
              {isCopied ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <SyntaxHighlighter
            style={isDark ? vscDarkPlus : vs}
            language={language}
            PreTag="div"
            className="!m-0 !rounded-b-lg !rounded-t-none"
            {...props}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      );
    }

    return (
      <code className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-1 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomComponents: any = {
    code: CodeBlock,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    p: ({ children }: any) => (
      <p className="mb-3 leading-relaxed text-slate-700 dark:text-slate-300">
        {children}
      </p>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h1: ({ children }: any) => (
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 mt-6 border-b border-slate-200 dark:border-slate-700 pb-2">
        {children}
      </h1>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h2: ({ children }: any) => (
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3 mt-5">
        {children}
      </h2>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h3: ({ children }: any) => (
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2 mt-4">
        {children}
      </h3>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1 text-slate-700 dark:text-slate-300">
        {children}
      </ul>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 text-slate-700 dark:text-slate-300">
        {children}
      </ol>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    li: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-r-lg">
        <div className="flex items-start space-x-2">
          <Quote className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
          <div className="text-slate-700 dark:text-slate-300 italic">{children}</div>
        </div>
      </blockquote>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    a: ({ href, children }: any) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline decoration-indigo-300 hover:decoration-indigo-500 transition-colors"
      >
        <div className="flex items-center space-x-1">
          <Link className="w-3 h-3" />
          <span>{children}</span>
        </div>
      </a>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    img: ({ src, alt }: any) => (
      <div className="my-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={src} 
          alt={alt || "Image"} 
          className="max-w-full h-auto rounded-lg shadow-md border border-slate-200 dark:border-slate-700"
        />
        {alt && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center italic">
            {alt}
          </p>
        )}
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700 rounded-lg">
          {children}
        </table>
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    th: ({ children }: any) => (
      <th className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">
        {children}
      </th>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    td: ({ children }: any) => (
      <td className="border border-slate-200 dark:border-slate-700 px-4 py-2 text-slate-700 dark:text-slate-300">
        {children}
      </td>
    ),
  };

  const renderContent = () => {
    switch (contentType) {
      case 'code':
        return (
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown
              components={CustomComponents}
              remarkPlugins={[remarkGfm]}
            >
              {content}
            </ReactMarkdown>
          </div>
        );
      
      case 'markdown':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Rich Content
              </span>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                components={CustomComponents}
                remarkPlugins={[remarkGfm]}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        );
      
      case 'link':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 mb-3">
              <Link className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Link Content
              </span>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                components={CustomComponents}
                remarkPlugins={[remarkGfm]}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-2">
            <p className="leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
              {content}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {renderContent()}
    </div>
  );
}
