export type ComplaintCategory = "infrastructure" | "academics" | "hostel"
export type ComplaintStatus = "pending" | "in-progress" | "resolved" | "rejected"
export type ComplaintPriority = "low" | "medium" | "high" | "urgent"
export type UserRole = "student" | "admin"

export interface College {
  id: string
  name: string
  code: string
  emailDomain: string
  departments: string[]
  createdAt: string
}

export interface StudentUser {
  id: string
  role: "student"
  name: string
  email: string
  password: string
  collegeId: string
  collegeCode: string
  enrollmentNumber: string
  rejectionCount: number
  isBlocked: boolean
  createdAt: string
}

export interface AdminUser {
  id: string
  role: "admin"
  name: string
  email: string
  password: string
  collegeId: string
  collegeName: string
  collegeCode: string
  createdAt: string
}

export type AppUser = StudentUser | AdminUser

export interface InternalNote {
  id: string
  authorName: string
  content: string
  createdAt: string
}

export interface Complaint {
  id: string
  title: string
  description: string
  category: ComplaintCategory
  status: ComplaintStatus
  priority: ComplaintPriority
  studentId: string
  studentName: string
  studentEmail: string
  collegeId: string
  assignedDepartment: string | null
  assignedStaff: string | null
  images?: string[]
  adminResponse?: string
  internalNotes: InternalNote[]
  createdAt: string
  updatedAt: string
  resolvedAt: string | null
}
