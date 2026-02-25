"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { authAPI, collegeAPI, complaintAPI } from "./api"
import type {
  College,
  StudentUser,
  AdminUser,
  AppUser,
  Complaint,
  ComplaintCategory,
  ComplaintStatus,
  ComplaintPriority,
} from "./types"

interface AppContextType {
  colleges: College[]
  complaints: Complaint[]
  currentUser: AppUser | null
  isLoading: boolean
  registerCollege: (data: { name: string; code: string; emailDomain: string; departments: string[]; adminName: string; adminEmail: string; adminPassword: string }) => Promise<{ success: boolean; error?: string }>
  registerStudent: (data: { name: string; email: string; password: string; collegeId: string; enrollmentNumber: string }) => Promise<{ success: boolean; error?: string }>
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: AppUser }>
  logout: () => void
  fileComplaint: (data: { title: string; description: string; category: ComplaintCategory; images?: string[] }) => Promise<{ success: boolean; error?: string }>
  updateComplaint: (complaintId: string, data: { title: string; description: string; category: ComplaintCategory; images?: string[] }) => Promise<{ success: boolean; error?: string }>
  updateComplaintStatus: (complaintId: string, status: ComplaintStatus) => Promise<void>
  updateComplaintPriority: (complaintId: string, priority: ComplaintPriority) => Promise<void>
  assignComplaint: (complaintId: string, department: string | null, staff: string | null) => Promise<void>
  addInternalNote: (complaintId: string, content: string) => Promise<void>
  addAdminResponse: (complaintId: string, response: string) => Promise<void>
  fetchColleges: () => Promise<void>
  fetchComplaints: () => Promise<void>
  getCollegeById: (id: string) => College | undefined
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [colleges, setColleges] = useState<College[]>([])
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('currentUser')
      if (token && user) {
        setCurrentUser(JSON.parse(user))
      }
      await fetchColleges()
      setIsLoading(false)
    }
    initializeApp()
  }, [])

  const fetchColleges = async () => {
    try {
      console.log('Fetching colleges...');
      const response = await collegeAPI.getAll()
      console.log('Colleges fetched:', response.colleges);
      setColleges(response.colleges || [])
    } catch (error) {
      console.error('Failed to fetch colleges:', error)
      setColleges([])
    }
  }

  const fetchComplaints = async () => {
    try {
      console.log('Fetching complaints...');
      const response = await complaintAPI.getAll()
      console.log('Complaints fetched:', response.complaints);
      setComplaints(response.complaints || [])
    } catch (error) {
      console.error('Failed to fetch complaints:', error)
      setComplaints([])
    }
  }

  const registerCollege = useCallback(async (data: { name: string; code: string; emailDomain: string; departments: string[]; adminName: string; adminEmail: string; adminPassword: string }) => {
    try {
      console.log('Registering college:', data);
      const response = await authAPI.registerCollege(data)
      console.log('College registered:', response);
      localStorage.setItem('token', response.token)
      localStorage.setItem('currentUser', JSON.stringify(response.user))
      setCurrentUser(response.user)
      await fetchColleges()
      return { success: true }
    } catch (error: any) {
      console.error('College registration failed:', error);
      return { success: false, error: error.message || 'Registration failed' }
    }
  }, [])

  const registerStudent = useCallback(async (data: { name: string; email: string; password: string; collegeId: string; enrollmentNumber: string }) => {
    try {
      console.log('Registering student:', data);
      const response = await authAPI.registerStudent(data)
      console.log('Student registered:', response);
      localStorage.setItem('token', response.token)
      localStorage.setItem('currentUser', JSON.stringify(response.user))
      setCurrentUser(response.user)
      return { success: true }
    } catch (error: any) {
      console.error('Student registration failed:', error);
      return { success: false, error: error.message || 'Registration failed' }
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      console.log('Logging in:', email);
      const response = await authAPI.login(email, password)
      console.log('Login successful:', response);
      localStorage.setItem('token', response.token)
      localStorage.setItem('currentUser', JSON.stringify(response.user))
      setCurrentUser(response.user)
      return { success: true, user: response.user }
    } catch (error: any) {
      console.error('Login failed:', error);
      return { success: false, error: error.message || 'Login failed' }
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    setComplaints([])
  }, [])

  const fileComplaint = useCallback(async (data: { title: string; description: string; category: ComplaintCategory; images?: string[] }) => {
    try {
      console.log('Filing complaint:', data);
      await complaintAPI.create(data)
      await fetchComplaints()
      return { success: true }
    } catch (error: any) {
      console.error('File complaint failed:', error);
      return { success: false, error: error.message || 'Failed to file complaint' }
    }
  }, [])

  const updateComplaint = useCallback(async (complaintId: string, data: { title: string; description: string; category: ComplaintCategory; images?: string[] }) => {
    try {
      console.log('Updating complaint:', complaintId, data);
      await complaintAPI.update(complaintId, data)
      await fetchComplaints()
      return { success: true }
    } catch (error: any) {
      console.error('Update complaint failed:', error);
      return { success: false, error: error.message || 'Failed to update complaint' }
    }
  }, [])

  const updateComplaintStatus = useCallback(async (complaintId: string, status: ComplaintStatus) => {
    try {
      await complaintAPI.updateStatus(complaintId, status)
      await fetchComplaints()
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }, [])

  const updateComplaintPriority = useCallback(async (complaintId: string, priority: ComplaintPriority) => {
    try {
      await complaintAPI.updatePriority(complaintId, priority)
      await fetchComplaints()
    } catch (error) {
      console.error('Failed to update priority:', error)
    }
  }, [])

  const assignComplaint = useCallback(async (complaintId: string, department: string | null, staff: string | null) => {
    try {
      await complaintAPI.assign(complaintId, department, staff)
      await fetchComplaints()
    } catch (error) {
      console.error('Failed to assign complaint:', error)
    }
  }, [])

  const addInternalNote = useCallback(async (complaintId: string, content: string) => {
    try {
      await complaintAPI.addNote(complaintId, content)
      await fetchComplaints()
    } catch (error) {
      console.error('Failed to add note:', error)
    }
  }, [])

  const addAdminResponse = useCallback(async (complaintId: string, response: string) => {
    try {
      await complaintAPI.addResponse(complaintId, response)
      await fetchComplaints()
    } catch (error) {
      console.error('Failed to add response:', error)
    }
  }, [])

  const getCollegeById = useCallback((id: string) => colleges.find((c) => c.id === id), [colleges])

  return (
    <AppContext.Provider
      value={{
        colleges, complaints, currentUser, isLoading,
        registerCollege, registerStudent, login, logout,
        fileComplaint, updateComplaint, updateComplaintStatus, updateComplaintPriority,
        assignComplaint, addInternalNote, addAdminResponse, fetchColleges, fetchComplaints,
        getCollegeById,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
