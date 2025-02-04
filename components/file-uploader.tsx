import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FileUploaderProps {
  onFileSelect: (file: File) => void
  acceptedFileTypes: string
}

export function FileUploader({ onFileSelect, acceptedFileTypes }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setSelectedFile(file)
      onFileSelect(file)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="file"
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        className="flex-grow"
      />
      {selectedFile && (
        <span className="text-sm text-gray-500">{selectedFile.name}</span>
      )}
    </div>
  )
}

