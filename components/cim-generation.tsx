import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "./file-uploader"
import { Loader2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Section {
  title: string
  content: string
  suggestions: string[]
}

export default function CIMGeneration() {
  const [sections, setSections] = useState<Section[]>([
    { title: 'Business Overview', content: '', suggestions: [] },
    { title: 'Financial Summary', content: '', suggestions: [] },
    { title: 'Market Analysis', content: '', suggestions: [] },
    { title: 'Growth Opportunities', content: '', suggestions: [] },
  ])
  const [uploadedDocuments, setUploadedDocuments] = useState<{ [key: string]: File | null }>({
    financialStatements: null,
    taxReturns: null,
    customerContracts: null,
    organizationalChart: null,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const handleDocumentUpload = async (documentType: string, file: File) => {
    setUploadedDocuments(prev => ({ ...prev, [documentType]: file }))
    // Simulate AI processing of the uploaded document
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGenerating(false)
    // Update relevant sections based on the uploaded document
    if (documentType === 'financialStatements') {
      updateSection('Financial Summary', 'Based on the uploaded financial statements, your company has shown a steady growth rate of 15% year-over-year for the past 3 years.')
    }
  }

  const updateSection = (title: string, content: string) => {
    setSections(prev => prev.map(section => 
      section.title === title ? { ...section, content: section.content + '\n\n' + content } : section
    ))
  }

  const handleAIAssist = async (index: number) => {
    setIsGenerating(true)
    // Simulate AI assistance
    await new Promise(resolve => setTimeout(resolve, 2000))
    const newSuggestions = [
      'Consider adding information about your company\'s unique value proposition.',
      'Include key performance indicators that demonstrate your company\'s success.',
      'Discuss any proprietary technology or processes that give you a competitive edge.',
    ]
    setSections(prev => prev.map((section, i) => 
      i === index ? { ...section, suggestions: newSuggestions } : section
    ))
    setIsGenerating(false)
  }

  const handleSuggestionAccept = (sectionIndex: number, suggestionIndex: number) => {
    setSections(prev => prev.map((section, i) => 
      i === sectionIndex ? {
        ...section,
        content: section.content + '\n\n' + section.suggestions[suggestionIndex],
        suggestions: section.suggestions.filter((_, j) => j !== suggestionIndex)
      } : section
    ))
  }

  const handleGenerateCIM = async () => {
    setIsGenerating(true)
    // Simulate CIM generation
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGenerating(false)
    console.log('Generated CIM with:', { sections, uploadedDocuments })
    // Here you would typically compile the CIM and offer it for download
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, sections.length - 1))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">AI-Assisted CIM Generation</h2>
      
      <Tabs defaultValue="content" className="w-full">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="content">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">{sections[currentStep].title}</h3>
            <Textarea
              value={sections[currentStep].content}
              onChange={(e) => setSections(prev => prev.map((section, i) => 
                i === currentStep ? { ...section, content: e.target.value } : section
              ))}
              className="min-h-[200px] mb-4"
              placeholder={`Enter your ${sections[currentStep].title.toLowerCase()} here...`}
            />
            <div className="flex justify-between items-center mb-4">
              <Button onClick={() => handleAIAssist(currentStep)} disabled={isGenerating}>
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Get AI Suggestions'}
              </Button>
              <div>
                <Button onClick={prevStep} disabled={currentStep === 0} className="mr-2">Previous</Button>
                <Button onClick={nextStep} disabled={currentStep === sections.length - 1}>Next</Button>
              </div>
            </div>
            {sections[currentStep].suggestions.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>AI Suggestions</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5">
                    {sections[currentStep].suggestions.map((suggestion, index) => (
                      <li key={index} className="mb-2">
                        {suggestion}
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleSuggestionAccept(currentStep, index)}
                          className="ml-2"
                        >
                          Accept
                        </Button>
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <div className="space-y-4">
            <Card className="p-4">
              <Label>Financial Statements (Last 3 Years)</Label>
              <FileUploader
                onFileSelect={(file) => handleDocumentUpload('financialStatements', file)}
                acceptedFileTypes=".pdf,.xlsx,.csv"
              />
            </Card>

            <Card className="p-4">
              <Label>Tax Returns (Last 3 Years)</Label>
              <FileUploader
                onFileSelect={(file) => handleDocumentUpload('taxReturns', file)}
                acceptedFileTypes=".pdf"
              />
            </Card>

            <Card className="p-4">
              <Label>Customer Contracts</Label>
              <FileUploader
                onFileSelect={(file) => handleDocumentUpload('customerContracts', file)}
                acceptedFileTypes=".pdf,.docx"
              />
            </Card>

            <Card className="p-4">
              <Label>Organizational Chart</Label>
              <FileUploader
                onFileSelect={(file) => handleDocumentUpload('organizationalChart', file)}
                acceptedFileTypes=".pdf,.png,.jpg"
              />
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-6">
        <Button 
          onClick={handleGenerateCIM} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating CIM...
            </>
          ) : (
            'Generate CIM'
          )}
        </Button>
      </div>
    </div>
  )
}

