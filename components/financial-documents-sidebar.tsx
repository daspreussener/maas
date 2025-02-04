import { useState } from 'react'
import { File, Upload } from 'lucide-react'

export default function FinancialDocumentsSidebar() {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Balance Sheet 2023.pdf' },
    { id: 2, name: 'Income Statement 2023.pdf' },
    { id: 3, name: 'Cash Flow Statement 2023.pdf' },
  ])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newDocuments = Array.from(files).map((file, index) => ({
        id: documents.length + index + 1,
        name: file.name,
      }))
      setDocuments(prev => [...prev, ...newDocuments])
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64">
      <h2 className="text-lg font-semibold mb-4">Financial Documents</h2>
      <div className="mb-4">
        <label htmlFor="file-upload" className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Upload className="mr-2 h-5 w-5 text-gray-400" />
          <span>Upload New</span>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileUpload} />
        </label>
      </div>
      <ul className="space-y-2">
        {documents.map(doc => (
          <li key={doc.id} className="flex items-center space-x-2 text-sm">
            <File className="h-5 w-5 text-gray-400" />
            <span className="truncate">{doc.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

