'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, CheckCircle, AlertCircle, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface Document {
  id: string
  name: string
  description: string
  status: 'pending' | 'uploaded' | 'verified'
}

const requiredDocuments: Document[] = [
  { id: '1', name: 'Financial Statements', description: 'Last 3 years of balance sheets, income statements, and cash flow statements', status: 'pending' },
  { id: '2', name: 'Tax Returns', description: 'Last 3 years of business tax returns', status: 'pending' },
  { id: '3', name: 'Sales Data', description: 'Detailed sales data by product/service, customer, and geography', status: 'pending' },
  { id: '4', name: 'Customer Contracts', description: 'Copies of all major customer contracts', status: 'pending' },
  { id: '5', name: 'Employee Information', description: 'Organization chart, employee list with salaries, and employment contracts', status: 'pending' },
  { id: '6', name: 'Intellectual Property', description: 'List of patents, trademarks, and other IP', status: 'pending' },
  { id: '7', name: 'Legal Documents', description: 'Articles of incorporation, bylaws, and any pending litigation documents', status: 'pending' },
  { id: '8', name: 'Business Plan', description: 'Current business plan and financial projections', status: 'pending' },
]

export default function DueDiligence() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Financial Statements', description: 'Last 3 years of balance sheets, income statements, and cash flow statements', status: 'uploaded' },
    { id: '2', name: 'Tax Returns', description: 'Last 3 years of business tax returns', status: 'uploaded' },
    { id: '3', name: 'Sales Data', description: 'Detailed sales data by product/service, customer, and geography', status: 'uploaded' },
    { id: '4', name: 'Customer Contracts', description: 'Copies of all major customer contracts', status: 'pending' },
    { id: '5', name: 'Employee Information', description: 'Organization chart, employee list with salaries, and employment contracts', status: 'pending' },
    { id: '6', name: 'Intellectual Property', description: 'List of patents, trademarks, and other IP', status: 'pending' },
    { id: '7', name: 'Legal Documents', description: 'Articles of incorporation, bylaws, and any pending litigation documents', status: 'pending' },
    { id: '8', name: 'Business Plan', description: 'Current business plan and financial projections', status: 'pending' },
  ])

  const handleFileUpload = (id: string) => {
    const updatedDocuments = documents.map(doc =>
      doc.id === id ? { ...doc, status: doc.status === 'pending' ? 'uploaded' as const : 'pending' as const } : doc
    )
    setDocuments(updatedDocuments)
  }

  const completedDocuments = documents.filter(doc => doc.status !== 'pending').length
  const progress = (completedDocuments / documents.length) * 100

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Due Diligence Document Checklist</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold">Progress</div>
          <div className="text-lg font-semibold">{completedDocuments} / {documents.length}</div>
        </div>
        <Progress value={progress} className="h-2 mb-6" />
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-blue-500" />
                    {doc.name}
                  </h3>
                  <Badge
                    variant={doc.status === 'pending' ? 'secondary' : 'default'}
                    className={`${
                      doc.status === 'uploaded' ? 'bg-green-500' : 
                      doc.status === 'verified' ? 'bg-blue-500' : ''
                    }`}
                  >
                    {doc.status === 'pending' ? 'Pending' : 
                     doc.status === 'uploaded' ? 'Uploaded' : 'Verified'}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{doc.description}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <Button
                  onClick={() => handleFileUpload(doc.id)}
                  className={`${
                    doc.status === 'pending'
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white transition-colors duration-300`}
                >
                  {doc.status === 'pending' ? (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Uploaded
                    </>
                  )}
                </Button>
                {doc.status === 'pending' ? (
                  <span className="text-yellow-500 dark:text-yellow-400 flex items-center">
                    <AlertCircle className="mr-1 h-4 w-4" /> Required
                  </span>
                ) : (
                  <span className="text-green-500 dark:text-green-400 flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4" /> Complete
                  </span>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

