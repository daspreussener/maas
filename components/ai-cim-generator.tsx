import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileUploader } from "@/components/file-uploader"
import { Sparkles, Send, Loader2 } from 'lucide-react'

type Message = {
  role: 'user' | 'ai'
  content: string
}

type Section = {
  title: string
  content: string
  completed: boolean
}

export default function AICIMGenerator() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Hello! I'm CIM Assist, your AI assistant for creating a comprehensive Confidential Information Memorandum. Let's get started! What's your company name?" },
    { role: 'user', content: "TechInnovate Solutions" },
    { role: 'ai', content: "Great! Let's start with the Company Overview for TechInnovate Solutions. Can you tell me about your main products or services?" },
    { role: 'user', content: "We specialize in AI-powered software solutions for business process automation." },
    { role: 'ai', content: "Excellent! Now, let's move on to Financial Highlights. What was your total revenue for the last fiscal year?" },
    { role: 'user', content: "Our total revenue for the last fiscal year was $10 million." },
    { role: 'ai', content: "That's impressive! Now, for the Market Analysis, who are your main competitors in the industry?" },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sections, setSections] = useState<Section[]>([
    { title: 'Company Overview', content: 'TechInnovate Solutions specializes in AI-powered software solutions for business process automation.', completed: true },
    { title: 'Products and Services', content: 'AI-powered software solutions for business process automation', completed: true },
    { title: 'Management Team', content: 'Experienced team with backgrounds in AI and software development', completed: true },
    { title: 'Financial Highlights', content: 'Total revenue for the last fiscal year: $10 million', completed: true },
    { title: 'Market Analysis', content: '', completed: false },
    { title: 'Competitive Landscape', content: '', completed: false },
    { title: 'Growth Strategy', content: '', completed: false },
    { title: 'SWOT Analysis', content: '', completed: false },
    { title: 'Investment Opportunity', content: '', completed: false },
    { title: 'Financial Projections', content: '', completed: false },
    { title: 'Risk Factors', content: '', completed: false },
    { title: 'Upload Financial Documents', content: '', completed: false },
  ])
  const [currentSection, setCurrentSection] = useState(4)

  const handleSend = async () => {
    if (input.trim() === '') return

    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1000))

    let aiResponse = await generateAIResponse(input, currentSection)

    setMessages(prev => [...prev, { role: 'ai', content: aiResponse }])
    setIsLoading(false)
  }

  const generateAIResponse = async (userInput: string, sectionIndex: number) => {
    const questions = [
      "Great! Now, let's discuss your Products and Services in more detail. What are your main offerings?",
      "Excellent. Can you tell me about your Management Team and their experience?",
      "Now, let's dive deeper into your Financial Highlights. What has been your revenue growth rate over the past few years?",
      "For the Market Analysis, can you describe the current trends in your industry?",
      "Let's talk about your Competitive Landscape. Who are your main competitors and what sets you apart?",
      "Regarding your Growth Strategy, what are your primary expansion plans for the next 3-5 years?",
      "Let's do a quick SWOT Analysis. What would you say are your main strengths and weaknesses?",
      "Now, describe the Investment Opportunity. What makes your company an attractive investment?",
      "Can you provide some high-level Financial Projections for the next 3-5 years?",
      "What are the main Risk Factors that investors should be aware of?",
      "Excellent! Now, let's upload some financial documents to support your CIM. Please use the file uploader to add your documents.",
      "Your CIM is now complete! Is there anything else you'd like to add or modify?",
    ]

    setSections(prev => prev.map((section, i) => 
      i === sectionIndex ? { ...section, content: userInput, completed: true } : section
    ))

    setCurrentSection(prev => prev + 1)
    return questions[Math.min(sectionIndex, questions.length - 1)]
  }

  const handleFileUpload = async (file: File) => {
    setIsLoading(true)
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    setSections(prev => prev.map((section, i) => 
      i === sections.length - 1 ? { ...section, content: `Uploaded: ${file.name}`, completed: true } : section
    ))
    setMessages(prev => [...prev, 
      { role: 'user', content: `Uploaded file: ${file.name}` },
      { role: 'ai', content: `Thanks for uploading ${file.name}! Your CIM is now complete. Is there anything else you'd like to add or modify?` }
    ])
  }

  return (
    <div className="flex h-[calc(50vh-2rem)]">
      <Card className="w-1/3 p-6 mr-4 overflow-auto">
        <h3 className="text-xl font-bold mb-4">CIM Sections</h3>
        {sections.map((section, index) => (
          <div key={index} className="flex items-center mb-2">
            <div className={`w-4 h-4 rounded-full mr-2 ${section.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className={section.completed ? 'text-green-600' : 'text-gray-600'}>
              {section.title}
            </span>
          </div>
        ))}
        {currentSection === sections.length - 1 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Upload Financial Documents</h4>
            <FileUploader
              onFileSelect={handleFileUpload}
              acceptedFileTypes=".pdf,.xlsx,.csv"
            />
          </div>
        )}
      </Card>
      <Card className="w-2/3 p-6 overflow-hidden flex flex-col">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Sparkles className="mr-2 text-yellow-500" />
          CIM Assist
        </h2>
        <ScrollArea className="flex-grow mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`flex items-start ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={message.role === 'ai' ? "/ai-avatar.png" : "/user-avatar.png"} />
                  <AvatarFallback>{message.role === 'ai' ? 'AI' : 'You'}</AvatarFallback>
                </Avatar>
                <Card className={`mx-2 p-3 ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {message.content}
                </Card>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow mr-2"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </Card>
    </div>
  )
}

