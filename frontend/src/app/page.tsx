import ChatInterface from '@/components/chat/ChatInterface';
import StatusIndicator from '@/components/ui/StatusIndicator';

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Status Bar */}
      <div className="absolute top-4 right-4 z-50">
        <StatusIndicator />
      </div>
      
      {/* Chat Interface */}
      <ChatInterface />
    </div>
  );
}