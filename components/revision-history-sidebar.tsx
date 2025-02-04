import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from 'date-fns'

interface Revision {
  id: number
  user: string
  avatar: string
  timestamp: Date
  type: 'edit' | 'comment'
  content: string
  highlightedText?: string
}

interface RevisionHistorySidebarProps {
  revisions: Revision[]
  onRevert: (id: number) => void
  className?: string
}

export function RevisionHistorySidebar({ revisions, onRevert, className }: RevisionHistorySidebarProps) {
  return (
    <aside className="w-80 border-l border-gray-200 p-4 bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Revision History</h2>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        {revisions.map((revision) => (
          <div key={revision.id} className="mb-4 p-3 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={revision.avatar} alt={revision.user} />
                  <AvatarFallback>{revision.user[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{revision.user}</span>
              </div>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(revision.timestamp, { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm mb-2">
              {revision.type === 'edit' ? 'Edited the document' : 'Added a comment'}
            </p>
            {revision.type === 'comment' && revision.highlightedText && (
  <div className="bg-yellow-100 p-2 rounded text-xs mb-2">
    <strong>Highlighted text:</strong> {revision.highlightedText}
  </div>
)}
            <p className="text-sm text-gray-600 mb-2">{revision.content}</p>
            {revision.type === 'edit' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRevert(revision.id)}
              >
                Revert to this version
              </Button>
            )}
          </div>
        ))}
      </ScrollArea>
    </aside>
  )
}

