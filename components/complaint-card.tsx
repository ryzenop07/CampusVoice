"use client"

import { Clock, AlertCircle, CheckCircle2, XCircle, Building, GraduationCap, BedDouble, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getStatusColor, getStatusLabel, getPriorityColor, getPriorityLabel, getCategoryLabel, formatDateTime } from "@/lib/complaint-helpers"
import EditComplaintDialog from "@/components/edit-complaint-dialog"
import type { Complaint } from "@/lib/types"

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

function ComplaintTimeline({ complaint }: { complaint: Complaint }) {
  const steps = [
    { label: "Filed", date: complaint.createdAt, done: true },
    { label: "In Progress", date: complaint.status !== "pending" ? complaint.updatedAt : null, done: complaint.status === "in-progress" || complaint.status === "resolved" },
    { label: complaint.status === "rejected" ? "Rejected" : "Resolved", date: complaint.resolvedAt || (complaint.status === "rejected" ? complaint.updatedAt : null), done: complaint.status === "resolved" || complaint.status === "rejected" },
  ]

  return (
    <div className="flex items-center gap-2 pt-3">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
              step.done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              {i + 1}
            </div>
            <span className="text-[10px] text-muted-foreground">{step.label}</span>
            {step.date && <span className="text-[9px] text-muted-foreground">{formatDateTime(step.date)}</span>}
          </div>
          {i < steps.length - 1 && (
            <div className={cn("mb-6 h-0.5 w-8 sm:w-12", step.done ? "bg-primary" : "bg-muted")} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function ComplaintCard({ complaint }: { complaint: Complaint }) {
  const [expanded, setExpanded] = useState(false)
  const StatusIcon = statusIcons[complaint.status]
  const CategoryIcon = categoryIcons[complaint.category]

  return (
    <Card className="border-border transition-shadow hover:shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <CategoryIcon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
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
            </div>
          </div>
          <div className="flex items-center gap-2">
            {complaint.status === 'pending' && <EditComplaintDialog complaint={complaint} />}
            <button
              onClick={() => setExpanded(!expanded)}
              className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label={expanded ? "Collapse complaint details" : "Expand complaint details"}
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="pt-0">
          <p className="text-sm leading-relaxed text-muted-foreground">{complaint.description}</p>
          
          {complaint.images && complaint.images.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Attached Images</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {complaint.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Complaint image ${index + 1}`}
                    className="w-full h-32 object-cover rounded border cursor-pointer hover:opacity-80"
                    onClick={() => window.open(img, '_blank')}
                  />
                ))}
              </div>
            </div>
          )}
          
          {complaint.adminResponse && (
            <div className="mt-4 rounded-lg border-2 border-green-500/30 bg-green-50 dark:bg-green-950/20 p-4 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <h4 className="text-sm font-semibold text-green-900 dark:text-green-100">Admin Response</h4>
                <Badge variant="secondary" className="ml-auto text-xs">New</Badge>
              </div>
              <p className="text-sm text-green-900 dark:text-green-100 leading-relaxed">{complaint.adminResponse}</p>
            </div>
          )}
          
          {complaint.assignedDepartment && (
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Assigned to:</span>
              {complaint.assignedDepartment}
              {complaint.assignedStaff && ` - ${complaint.assignedStaff}`}
            </div>
          )}
          <ComplaintTimeline complaint={complaint} />
          <div className="mt-2 text-xs text-muted-foreground">
            Filed on {formatDateTime(complaint.createdAt)}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
