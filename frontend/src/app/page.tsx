import ChatInterface from '@/components/chat/ChatInterface';
import StatusIndicator from '@/components/ui/StatusIndicator';

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      {/* Status Bar */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex justify-end">
        <StatusIndicator />
      </div>
      
      {/* Chat Interface */}
      <ChatInterface />
    </div>
  );
}
