'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles } from 'lucide-react'

type Message = {
  role: 'user' | 'ai';
  content: string;
}

const initialMessages: Message[] = [
  { role: 'ai', content: "Hello! I'm CIM Assist, your AI assistant for creating a comprehensive Confidential Information Memorandum. Let's get started! What's your company name?" },
  { role: 'user', content: "TechInnovate Solutions" },
  { role: 'ai', content: "Great! Let's start with the Company Overview for TechInnovate Solutions. Can you tell me about your main products or services?" },
  { role: 'user', content: "We specialize in AI-powered software solutions for business process automation." },
  { role: 'ai', content: "Excellent! Now, let's move on to Financial Highlights. What was your total revenue for the last fiscal year?" },
  { role: 'user', content: "Our total revenue for the last fiscal year was $10 million." },
]

export default function CIMAssistPreview() {
  const [messages, setMessages] = useState<Message[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];

    const typeMessage = (messageIndex: number, charIndex: number) => {
      if (messageIndex >= initialMessages.length) {
        return;
      }

      const currentMessage = initialMessages[messageIndex];
      if (!currentMessage) return;

      if (charIndex <= currentMessage.content.length) {
        setMessages(prev => {
          const newMessages = [...prev];
          if (!newMessages[messageIndex]) {
            newMessages[messageIndex] = { ...currentMessage, content: '' };
          }
          newMessages[messageIndex].content = currentMessage.content.slice(0, charIndex);
          return newMessages;
        });

        const nextTimeout = setTimeout(() => {
          typeMessage(messageIndex, charIndex + 1);
        }, 25);
        timeoutIds.push(nextTimeout);
      } else {
        const nextTimeout = setTimeout(() => {
          typeMessage(messageIndex + 1, 0);
        }, 500);
        timeoutIds.push(nextTimeout);
      }
    };

    typeMessage(0, 0);

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="w-full h-[500px] md:h-[calc(80vh-8rem)] p-6 overflow-hidden flex flex-col bg-white/50 backdrop-blur-sm shadow-m">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center">
        <Sparkles className="mr-2 text-yellow-500" />
        CIM Assist
      </h2>
      <ScrollArea className="flex-grow overflow-auto pr-4" ref={scrollAreaRef}>
        <div className="space-y-4 w-full">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
              <div className={`flex items-start max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {message.content && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={message.role === 'ai' ? "/ai-avatar.png" : "/user-avatar.png"} />
                    <AvatarFallback>{message.role === 'ai' ? 'AI' : 'You'}</AvatarFallback>
                  </Avatar>
                )}
                {message.content && (
                  <Card className={`mx-2 p-3 break-words ${
                    message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {message.content}
                  </Card>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}

