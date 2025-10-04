export const appConfig = {
  appTitle: "AI Chat",
  appSubtitle: "Powered by local AI models",
  welcomeTitle: "Welcome to AI Chat",
  welcomeDescription: "Start a conversation with your local AI model. Ask questions, get help with coding, or just chat!",
  examplePromptsTitle: "Try these example prompts:",
  inputPlaceholder: "Type your message here...",
  errorMessage: "Sorry, there was an error processing your message. Please try again.",
  status: {
    connecting: "Connecting...",
    connected: "Connected",
    disconnected: "Disconnected",
  },
  statusColors: {
    connecting: {
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      iconColor: "text-yellow-500",
      animate: "animate-spin"
    },
    connected: {
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      iconColor: "text-green-500",
      animate: "animate-pulse-glow"
    },
    disconnected: {
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      iconColor: "text-red-500",
      animate: ""
    }
  },
  models: [
    { value: "gpt-oss:120b-cloud", label: "GPT-OSS Cloud" },
    { value: "llama2", label: "Llama 2" },
    { value: "mistral", label: "Mistral" },
    { value: "codellama", label: "CodeLlama" },
    { value: "llava", label: "LLaVA" }
  ],
  examplePrompts: [
    {
      icon: "Code",
      title: "Code Generation",
      prompt: "Write a Python function to sort a list of numbers using bubble sort algorithm.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-700 dark:text-blue-300",
    },
    {
      icon: "FileText",
      title: "Markdown Document",
      prompt: "Create a markdown document explaining the benefits of using TypeScript over JavaScript.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-700 dark:text-green-300",
    },
    {
      icon: "Palette",
      title: "Creative Writing",
      prompt: "Write a short story about a robot who discovers emotions.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-700 dark:text-purple-300",
    },
    {
      icon: "Calculator",
      title: "Math Problem",
      prompt: "Solve this equation step by step: 2x² + 5x - 3 = 0",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-700 dark:text-orange-300",
    },
    {
      icon: "Database",
      title: "Data Analysis",
      prompt: "Explain SQL joins with examples and create a sample database schema.",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      textColor: "text-indigo-700 dark:text-indigo-300",
    },
    {
      icon: "Globe",
      title: "Web Development",
      prompt: "Create an HTML form with validation and explain the CSS Grid layout.",
      color: "from-teal-500 to-blue-500",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
      textColor: "text-teal-700 dark:text-teal-300",
    },
  ]
};
