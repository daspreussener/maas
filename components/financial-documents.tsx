'use client'

import { useState } from 'react'
import { File, Upload, Trash2, Eye } from 'lucide-react'

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
}

export default function FinancialDocuments() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: 'Balance Sheet 2023.pdf', type: 'PDF', size: '2.3 MB', uploadDate: '2023-05-15' },
    { id: 2, name: 'Income Statement 2023.xlsx', type: 'Excel', size: '1.7 MB', uploadDate: '2023-05-15' },
    { id: 3, name: 'Cash Flow Statement 2023.pdf', type: 'PDF', size: '1.9 MB', uploadDate: '2023-05-15' },
  ])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newDocuments = Array.from(files).map((file, index) => ({
        id: documents.length + index + 1,
        name: file.name,
        type: file.type.split('/')[1].toUpperCase(),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
      }))
      setDocuments(prev => [...prev, ...newDocuments])
    }
  }

  const deleteDocument = (id: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Financial Documents</h2>
      <div className="mb-6">
        <label htmlFor="file-upload" className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
          <Upload className="mr-2 h-5 w-5 text-gray-400" />
          <span>Upload New Documents</span>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileUpload} />
        </label>
      </div>
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <File className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {doc.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button onClick={() => deleteDocument(doc.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

