"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Clock, AlertCircle, CheckCircle2, XCircle, Building, GraduationCap, BedDouble, Send, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { getStatusColor, getStatusLabel, getPriorityColor, getPriorityLabel, getCategoryLabel, formatDateTime } from "@/lib/complaint-helpers"
import { useApp } from "@/lib/app-context"
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
  const { updateComplaintStatus, updateComplaintPriority, assignComplaint, addInternalNote } = useApp()
  const [expanded, setExpanded] = useState(false)
  const [noteText, setNoteText] = useState("")
  const [staffName, setStaffName] = useState(complaint.assignedStaff || "")

  const StatusIcon = statusIcons[complaint.status]
  const CategoryIcon = categoryIcons[complaint.category]

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
    </Card>
  )
}
