'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Mic, Paperclip, Bot, User, Sparkles, Zap } from 'lucide-react';
import { Message } from '../../types/chat';
import { sendMessage } from '@/lib/api';
import SmartContentRenderer from '../ui/SmartContentRenderer';
import ExamplePrompts from '../ui/ExamplePrompts';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-oss:120b-cloud');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(input, selectedModel);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, there was an error processing your message. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Modern Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI Chat
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">Powered by local AI models</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-200/50 dark:border-slate-700/50">
              <Zap className="w-4 h-4 text-indigo-500" />
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="gpt-oss:120b-cloud">GPT-OSS Cloud</option>
                <option value="llama2">Llama 2</option>
                <option value="mistral">Mistral</option>
                <option value="codellama">CodeLlama</option>
                <option value="llava">LLaVA</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
            <div className="mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-float">
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce-subtle">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Welcome to AI Chat
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md">
              Start a conversation with your local AI model. Ask questions, get help with coding, or just chat!
            </p>
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
                Try these example prompts:
              </h3>
              <ExamplePrompts onPromptSelect={(prompt) => setInput(prompt)} />
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`flex items-start space-x-3 max-w-2xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-600' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-600'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                
                {/* Message Bubble */}
                <div className={`relative px-4 py-3 rounded-2xl shadow-lg ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                }`}>
                  {message.role === 'user' ? (
                    <div>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs mt-2 text-indigo-100">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm">
                        <SmartContentRenderer 
                          content={message.content} 
                          isDark={false} // Light mode for better readability in chat bubbles
                        />
                      </div>
                      <p className="text-xs mt-2 text-slate-500 dark:text-slate-400">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  )}
                  
                  {/* Message tail */}
                  <div className={`absolute top-3 w-3 h-3 transform rotate-45 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-500 to-blue-600 -right-1'
                      : 'bg-white dark:bg-slate-800 border-l border-b border-slate-200 dark:border-slate-700 -left-1'
                  }`}></div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start animate-slide-up">
            <div className="flex items-start space-x-3 max-w-2xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Modern Input Area */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            {/* Attachment Buttons */}
            <div className="flex space-x-2">
              <button 
                className="p-3 text-slate-500 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all duration-200 hover:scale-105" 
                title="Add image"
              >
                <Image className="w-5 h-5" />
              </button>
              <button 
                className="p-3 text-slate-500 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-200 hover:scale-105" 
                title="Voice input"
              >
                <Mic className="w-5 h-5" />
              </button>
              <button 
                className="p-3 text-slate-500 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-xl transition-all duration-200 hover:scale-105" 
                title="Attach file"
              >
                <Paperclip className="w-5 h-5" />
              </button>
            </div>
            
            {/* Input Field */}
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 pr-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 shadow-sm"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            
            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}