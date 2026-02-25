"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/app-context"

export default function DashboardHeader() {
  const router = useRouter()
  const { currentUser, logout, getCollegeById } = useApp()

  const college = currentUser?.role === "student"
    ? getCollegeById(currentUser.collegeId)
    : currentUser?.role === "admin"
      ? getCollegeById(currentUser.collegeId)
      : null

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground font-mono">CampusVoice</span>
          </Link>
          {college && (
            <>
              <div className="h-5 w-px bg-border" />
              <span className="text-sm font-medium text-muted-foreground">{college.name}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-medium text-foreground">{currentUser?.name}</span>
              <span className="text-xs text-muted-foreground capitalize">{currentUser?.role}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
