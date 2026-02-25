"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, LogOut, User, FileText, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/app-context"

export default function Navigation() {
  const router = useRouter()
  const { currentUser, logout } = useApp()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!currentUser) {
    return (
      <nav className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold font-mono">CampusVoice</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/auth/student/login">
                <Button variant="ghost">Student Login</Button>
              </Link>
              <Link href="/auth/college/login">
                <Button variant="ghost">College Login</Button>
              </Link>
              <Link href="/auth/college/signup">
                <Button>Register College</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-mono">CampusVoice</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span>{currentUser.name}</span>
              <span className="text-muted-foreground">
                ({currentUser.role === 'admin' ? 'Admin' : 'Student'})
              </span>
            </div>
            
            {currentUser.role === 'student' && (
              <Link href="/student/dashboard">
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            )}
            
            {currentUser.role === 'admin' && (
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Panel
                </Button>
              </Link>
            )}
            
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}