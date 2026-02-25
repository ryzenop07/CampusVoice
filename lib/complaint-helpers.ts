import type { ComplaintStatus, ComplaintPriority, ComplaintCategory } from "@/lib/types"

export function getStatusColor(status: ComplaintStatus) {
  switch (status) {
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-200"
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "resolved":
      return "bg-emerald-100 text-emerald-800 border-emerald-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
  }
}

export function getStatusLabel(status: ComplaintStatus) {
  switch (status) {
    case "pending": return "Pending"
    case "in-progress": return "In Progress"
    case "resolved": return "Resolved"
    case "rejected": return "Rejected"
  }
}

export function getPriorityColor(priority: ComplaintPriority) {
  switch (priority) {
    case "low": return "bg-slate-100 text-slate-700 border-slate-200"
    case "medium": return "bg-blue-100 text-blue-700 border-blue-200"
    case "high": return "bg-orange-100 text-orange-700 border-orange-200"
    case "urgent": return "bg-red-100 text-red-700 border-red-200"
  }
}

export function getPriorityLabel(priority: ComplaintPriority) {
  switch (priority) {
    case "low": return "Low"
    case "medium": return "Medium"
    case "high": return "High"
    case "urgent": return "Urgent"
  }
}

export function getCategoryLabel(category: ComplaintCategory) {
  switch (category) {
    case "infrastructure": return "Infrastructure"
    case "academics": return "Academics"
    case "hostel": return "Hostel"
  }
}

export function getCategoryIcon(category: ComplaintCategory) {
  switch (category) {
    case "infrastructure": return "building"
    case "academics": return "graduation-cap"
    case "hostel": return "bed"
  }
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
