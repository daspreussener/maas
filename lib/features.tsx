import { ClipboardList, Users, FolderOpen, LayoutDashboard, Handshake, Bot, FileSearch } from 'lucide-react'

export const features = [
  {
    title: "Intelligent Matching",
    description: "Get matched with the best possible buyers or sellers based on your criteria.",
    icon: <Users className="h-8 w-8" />,
  },
  {
    title: "Document Management",
    description: "Keep all important financial documents in one secure place throughout the M&A process.",
    icon: <FolderOpen className="h-8 w-8" />,
  },
  {
    title: "Deal Dashboard",
    description: "View and manage all your deals and their stages in one simple interface.",
    icon: <LayoutDashboard className="h-8 w-8" />,
  },
  {
    title: "Guided Deal Room",
    description: "Step-by-step guidance through every stage of the acquisition process.",
    icon: <Handshake className="h-8 w-8" />,
  },
  {
    title: "AI Assistance",
    description: "Generate key documents and get real-time feedback with our AI assistants.",
    icon: <Bot className="h-8 w-8" />,
  },
  {
    title: "Due Diligence Support",
    description: "Streamline the due diligence process with our comprehensive assistant and tools.",
    icon: <FileSearch className="h-8 w-8" />,
  },
]