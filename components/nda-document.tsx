import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { RevisionHistorySidebar } from "./revision-history-sidebar"

interface Revision {
  id: number
  user: string
  avatar: string
  timestamp: Date
  type: 'edit' | 'comment'
  content: string
  highlightedText: string
}

const dummyRevisions: Revision[] = [
  {
    id: 1,
    user: "Alice Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    timestamp: new Date(2023, 4, 15, 10, 30),
    type: 'edit',
    content: "Updated clause 2 to include digital assets",
    highlightedText: "",
  },
  {
    id: 2,
    user: "Bob Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    timestamp: new Date(2023, 4, 15, 11, 45),
    type: 'comment',
    content: "Can we clarify the definition of 'Confidential Information'?",
    highlightedText: "",
  },
  {
    id: 3,
    user: "Charlie Davis",
    avatar: "/placeholder.svg?height=32&width=32",
    timestamp: new Date(2023, 4, 15, 14, 20),
    type: 'edit',
    content: "Added a new clause regarding data protection",
    highlightedText: "",
  },
  {
    id: 4,
    user: "Diana Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
    timestamp: new Date(2023, 4, 16, 9, 10),
    type: 'comment',
    content: "The new data protection clause looks good. Approved!",
    highlightedText: "",
  },
  {
    id: 5,
    user: "Ethan Brown",
    avatar: "/placeholder.svg?height=32&width=32",
    timestamp: new Date(2023, 4, 16, 11, 5),
    type: 'edit',
    content: "Updated the governing law to California",
    highlightedText: "",
  },
]

export default function NDADocument() {
  const [nda, setNda] = useState(`
CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT

This Confidentiality and Non-Disclosure Agreement (the "Agreement") is entered into on [DATE] by and between:

[PARTY A NAME] ("Disclosing Party")
and
[PARTY B NAME] ("Receiving Party")

1. Purpose: The purpose of this Agreement is to protect the confidential information of the Disclosing Party in connection with a potential business transaction or relationship between the parties.

2. Confidential Information: "Confidential Information" means any information disclosed by the Disclosing Party to the Receiving Party, either directly or indirectly, in writing, orally or by inspection of tangible objects, which is designated as "Confidential," "Proprietary" or some similar designation, or that should reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure. Confidential Information includes, but is not limited to, digital assets, trade secrets, technical data, product plans, and business strategies.

3. Non-Disclosure: The Receiving Party agrees not to use any Confidential Information for any purpose except to evaluate and engage in discussions concerning a potential business relationship between the parties. The Receiving Party agrees not to disclose any Confidential Information to third parties or to its employees, except to those employees who are required to have the information in order to evaluate or engage in discussions concerning the contemplated business relationship.

4. Term: The obligations of the Receiving Party under this Agreement shall survive until such time as all Confidential Information disclosed hereunder becomes publicly known and made generally available through no action or inaction of the Receiving Party.

5. Data Protection: Both parties agree to comply with all applicable data protection laws and regulations when handling any personal data that may be included in the Confidential Information.

6. Governing Law: This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflicts of law provisions.

IN WITNESS WHEREOF, the parties have executed this Confidentiality and Non-Disclosure Agreement as of the date first above written.

[PARTY A NAME]                           [PARTY B NAME]

By: ____________________                 By: ____________________

Name: __________________                 Name: __________________

Title: ___________________                Title: ___________________
`)
  const [revisions, setRevisions] = useState<Revision[]>(dummyRevisions)
  const [comment, setComment] = useState('')
  const [revisionNumber, setRevisionNumber] = useState(1)
  const [highlightedText, setHighlightedText] = useState('')

  const handleNdaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNda(e.target.value)
    addRevision('edit', 'Updated NDA content', highlightedText)
    setRevisionNumber(prev => prev + 1)
  }

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      addRevision('comment', comment, highlightedText)
      setComment('')
      setHighlightedText('')
    }
  }

  const addRevision = (type: 'edit' | 'comment', content: string, highlightedText: string = '') => {
    const newRevision: Revision = {
      id: revisions.length + 1,
      user: "Current User",
      avatar: "/placeholder.svg?height=32&width=32",
      timestamp: new Date(),
      type,
      content,
      highlightedText,
    }
    setRevisions([newRevision, ...revisions])
  }

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      setHighlightedText(selection.toString())
    }
  }

  const handleRevert = (id: number) => {
    console.log(`Reverting to revision ${id}`)
    // In a real application, you would implement the logic to revert the document to a specific version
  }

  const handleSignAgreement = () => {
    console.log("Agreement signed")
    // Implement the logic for signing the agreement here
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="flex-1 p-6 flex flex-col">
        <Card className="mb-4 flex-grow overflow-auto flex flex-col">
          <div className="flex justify-between items-center mb-2 px-4 pt-4">
            <h2 className="text-2xl font-bold">Non-Disclosure Agreement</h2>
            <div className="text-sm text-gray-500">Revision: {revisionNumber}</div>
          </div>
          <div className="flex-grow px-4 pb-4">
            <Textarea
              value={nda}
              onChange={handleNdaChange}
              onMouseUp={handleTextSelection}
              className="w-full h-full min-h-[200px] font-mono text-sm resize-none"
            />
          </div>
        </Card>
        <Card className="p-4 mb-4">
          <Label htmlFor="comment" className="text-sm font-semibold mb-2">Add a comment:</Label>
          <div className="flex flex-col space-y-2">
            {highlightedText && (
              <div className="bg-yellow-100 p-2 rounded text-sm">
                <strong>Selected text:</strong> {highlightedText}
              </div>
            )}
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Type your comment here..."
              className="w-full h-20"
            />
            <Button onClick={handleCommentSubmit}>Submit Comment</Button>
          </div>
        </Card>
        <Button onClick={handleSignAgreement} className="w-full bg-green-600 hover:bg-green-700">Sign Agreement</Button>
      </div>
      <RevisionHistorySidebar revisions={revisions} onRevert={handleRevert} className="h-[calc(100vh-4rem)]" />
    </div>
  )
}

