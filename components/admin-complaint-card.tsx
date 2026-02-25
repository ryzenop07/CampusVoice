"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Clock, AlertCircle, CheckCircle2, XCircle, Building, GraduationCap, BedDouble, Send, ChevronDown, ChevronUp, Sparkles, Zap, Image as ImageIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { getStatusColor, getStatusLabel, getPriorityColor, getPriorityLabel, getCategoryLabel, formatDateTime } from "@/lib/complaint-helpers"
import { useApp } from "@/lib/app-context"
import { assignDepartment, generateResponseSuggestions } from "@/lib/ai-service"
import type { Complaint, ComplaintStatus, ComplaintPriority } from "@/lib/types"

const statusIcons = {
  pending: Clock,
  "in-progress": AlertCircle,
  resolved: CheckCircle2,
  rejected: XCircle,
}

const categoryIcons = {
  infrastructure: Building,
  academics: GraduationCap,
  hostel: BedDouble,
}

interface AdminComplaintCardProps {
  complaint: Complaint
  departments: string[]
}

export default function AdminComplaintCard({ complaint, departments }: AdminComplaintCardProps) {
  const { updateComplaintStatus, updateComplaintPriority, assignComplaint, addInternalNote, addAdminResponse } = useApp()
  const [expanded, setExpanded] = useState(false)
  const [noteText, setNoteText] = useState("")
  const [responseText, setResponseText] = useState(complaint.adminResponse || "")
  const [staffName, setStaffName] = useState(complaint.assignedStaff || "")
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [loadingAI, setLoadingAI] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const StatusIcon = statusIcons[complaint.status]
  const CategoryIcon = categoryIcons[complaint.category]

  // Auto-assign department using AI when complaint is first opened
  useEffect(() => {
    if (expanded && !complaint.assignedDepartment && departments.length > 0) {
      assignDepartment(complaint.title, complaint.description, departments)
        .then(dept => {
          if (dept) {
            assignComplaint(complaint.id, dept, null)
            toast.success(`AI assigned to ${dept}`, { icon: '🤖' })
          }
        })
        .catch(err => console.error('AI assignment failed:', err))
    }
  }, [expanded])

  // Load AI response suggestions
  const loadAISuggestions = async () => {
    setLoadingAI(true)
    try {
      const suggestions = await generateResponseSuggestions({
        title: complaint.title,
        description: complaint.description,
        category: complaint.category
      })
      setAiSuggestions(suggestions)
      toast.success('AI suggestions loaded', { icon: '✨' })
    } catch (error) {
      toast.error('Failed to load AI suggestions')
    }
    setLoadingAI(false)
  }

  const handleStatusChange = (status: string) => {
    updateComplaintStatus(complaint.id, status as ComplaintStatus)
    toast.success(`Status updated to ${getStatusLabel(status as ComplaintStatus)}`)
  }

  const handlePriorityChange = (priority: string) => {
    updateComplaintPriority(complaint.id, priority as ComplaintPriority)
    toast.success(`Priority updated to ${getPriorityLabel(priority as ComplaintPriority)}`)
  }

  const handleDepartmentAssign = (department: string) => {
    assignComplaint(complaint.id, department, complaint.assignedStaff)
    toast.success(`Assigned to ${department}`)
  }

  const handleStaffAssign = () => {
    if (staffName.trim()) {
      assignComplaint(complaint.id, complaint.assignedDepartment, staffName.trim())
      toast.success(`Assigned to staff: ${staffName.trim()}`)
    }
  }

  const handleAddNote = () => {
    if (noteText.trim()) {
      addInternalNote(complaint.id, noteText.trim())
      setNoteText("")
      toast.success("Internal note added.")
    }
  }

  const handleSendResponse = async () => {
    if (responseText.trim()) {
      await addAdminResponse(complaint.id, responseText.trim())
      toast.success("✅ Response sent to student!", {
        description: "Student will see your response in their dashboard"
      })
    }
  }

  return (
    <Card className="border-border transition-shadow hover:shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <CategoryIcon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex flex-col gap-1.5">
              <CardTitle className="text-sm font-semibold leading-tight text-card-foreground">
                {complaint.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono">{complaint.id}</span>
                <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", getStatusColor(complaint.status))}>
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {getStatusLabel(complaint.status)}
                </Badge>
                <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0", getPriorityColor(complaint.priority))}>
                  {getPriorityLabel(complaint.priority)}
                </Badge>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {getCategoryLabel(complaint.category)}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>By: <strong className="text-foreground">{complaint.studentName}</strong></span>
                <span>{complaint.studentEmail}</span>
                <span>{formatDateTime(complaint.createdAt)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label={expanded ? "Collapse details" : "Expand details"}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="flex flex-col gap-5 border-t border-border pt-4">
          {/* Description */}
          <div>
            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</h4>
            <p className="text-sm leading-relaxed text-foreground">{complaint.description}</p>
          </div>

          {/* Images */}
          {complaint.images && complaint.images.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                Attached Images ({complaint.images.length})
              </h4>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {complaint.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted cursor-pointer"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Complaint image ${idx + 1}`}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admin Controls */}
          <div className="grid gap-4 rounded-lg border border-border bg-muted/30 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Status</Label>
              <Select value={complaint.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Priority</Label>
              <Select value={complaint.priority} onValueChange={handlePriorityChange}>
                <SelectTrigger className="w-full h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Assign Department</Label>
              <Select value={complaint.assignedDepartment || ""} onValueChange={handleDepartmentAssign}>
                <SelectTrigger className="w-full h-8 text-xs">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs">Assign Staff</Label>
              <div className="flex gap-1">
                <Input
                  className="h-8 text-xs"
                  placeholder="Staff name"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                />
                <Button size="sm" variant="outline" className="h-8 px-2" onClick={handleStaffAssign}>
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* AI Response Suggestions */}
          {expanded && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Sparkles className="h-3 w-3" />
                  AI Response Suggestions
                </h4>
                {aiSuggestions.length === 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={loadAISuggestions}
                    disabled={loadingAI}
                    className="h-7 text-xs"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    {loadingAI ? 'Loading...' : 'Generate'}
                  </Button>
                )}
              </div>
              {aiSuggestions.length > 0 && (
                <div className="flex flex-col gap-2">
                  {aiSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="rounded-md border border-primary/20 bg-primary/5 p-3 cursor-pointer hover:bg-primary/10 transition-colors"
                      onClick={() => {
                        setResponseText(suggestion)
                        toast.success('Response template applied')
                      }}
                    >
                      <p className="text-sm text-foreground">{suggestion}</p>
                      <p className="text-xs text-muted-foreground mt-1">Click to use as response to student</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Student Response */}
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Response to Student</h4>
            <div className="flex flex-col gap-2">
              <Textarea
                placeholder="Write response that student will see..."
                rows={3}
                className="text-sm"
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
              />
              <Button
                variant="default"
                size="sm"
                className="self-end"
                onClick={handleSendResponse}
                disabled={!responseText.trim()}
              >
                <Send className="mr-1 h-3 w-3" />
                Send Response to Student
              </Button>
            </div>
          </div>

          {/* Internal Notes */}
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Internal Notes</h4>
            {complaint.internalNotes.length > 0 && (
              <div className="mb-3 flex flex-col gap-2">
                {complaint.internalNotes.map((note) => (
                  <div key={note.id} className="rounded-md border border-border bg-card p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground">{note.authorName}</span>
                      <span className="text-[10px] text-muted-foreground">{formatDateTime(note.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{note.content}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Textarea
                placeholder="Add an internal note..."
                rows={2}
                className="text-sm"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <Button variant="outline" size="sm" className="h-auto self-end" onClick={handleAddNote} disabled={!noteText.trim()}>
                <Send className="mr-1 h-3 w-3" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      )}

      {/* Image Viewer Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative w-full">
              <img
                src={selectedImage}
                alt="Full size preview"
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
