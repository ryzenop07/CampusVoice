"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Clock, CheckCircle2, AlertCircle, FileText, AlertTriangle, Ban } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from "@/components/dashboard-header"
import FileComplaintDialog from "@/components/file-complaint-dialog"
import ComplaintCard from "@/components/complaint-card"
import { useApp } from "@/lib/app-context"

export default function StudentDashboardPage() {
  const router = useRouter()
  const { currentUser, isLoading, complaints, fetchComplaints } = useApp()

  useEffect(() => {
    if (!isLoading && (!currentUser || currentUser.role !== "student")) {
      router.push("/auth/student/login")
    } else if (currentUser) {
      fetchComplaints()
      // Auto-refresh every 10 seconds
      const interval = setInterval(() => {
        fetchComplaints()
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [currentUser, isLoading, router])

  if (isLoading || !currentUser || currentUser.role !== "student") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const userComplaints = currentUser ? complaints : []
  const pending = userComplaints.filter((c) => c.status === "pending").length
  const inProgress = userComplaints.filter((c) => c.status === "in-progress").length
  const resolved = userComplaints.filter((c) => c.status === "resolved").length
  const rejected = userComplaints.filter((c) => c.status === "rejected").length
  const rejectionCount = currentUser.role === 'student' ? currentUser.rejectionCount : 0
  const isBlocked = currentUser.role === 'student' ? currentUser.isBlocked : false

  const stats = [
    { label: "Total Filed", value: userComplaints.length, icon: FileText, color: "text-primary" },
    { label: "Pending", value: pending, icon: Clock, color: "text-amber-600" },
    { label: "In Progress", value: inProgress, icon: AlertCircle, color: "text-blue-600" },
    { label: "Resolved", value: resolved, icon: CheckCircle2, color: "text-emerald-600" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Rejection Warning Banner */}
        {isBlocked && (
          <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 dark:bg-red-950/20 p-4 flex items-start gap-3">
            <Ban className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-200">Account Blocked</h3>
              <p className="text-sm text-red-800 dark:text-red-300 mt-1">
                Your account has been blocked due to 5 rejected complaints. You cannot file new complaints. Please contact your college admin.
              </p>
            </div>
          </div>
        )}
        {!isBlocked && rejectionCount >= 3 && (
          <div className="mb-6 rounded-lg border-2 border-amber-500 bg-amber-50 dark:bg-amber-950/20 p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-200">Warning: {rejectionCount} Complaints Rejected</h3>
              <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
                You have {rejectionCount} rejected complaints. After 5 rejections, your account will be blocked from filing new complaints.
              </p>
            </div>
          </div>
        )}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-mono">Student Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {currentUser.name}. Manage your complaints below.
            </p>
          </div>
          <FileComplaintDialog />
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Complaints List */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-mono">My Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            {userComplaints.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No complaints yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  File your first complaint to get started.
                </p>
              </div>
            ) : (
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All ({userComplaints.length})</TabsTrigger>
                  <TabsTrigger value="pending">Pending ({pending})</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress ({inProgress})</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved ({resolved})</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected ({rejected})</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="flex flex-col gap-3">
                  {userComplaints.map((c) => <ComplaintCard key={c.id} complaint={c} />)}
                </TabsContent>
                <TabsContent value="pending" className="flex flex-col gap-3">
                  {userComplaints.filter((c) => c.status === "pending").map((c) => <ComplaintCard key={c.id} complaint={c} />)}
                </TabsContent>
                <TabsContent value="in-progress" className="flex flex-col gap-3">
                  {userComplaints.filter((c) => c.status === "in-progress").map((c) => <ComplaintCard key={c.id} complaint={c} />)}
                </TabsContent>
                <TabsContent value="resolved" className="flex flex-col gap-3">
                  {userComplaints.filter((c) => c.status === "resolved").map((c) => <ComplaintCard key={c.id} complaint={c} />)}
                </TabsContent>
                <TabsContent value="rejected" className="flex flex-col gap-3">
                  {userComplaints.filter((c) => c.status === "rejected").map((c) => <ComplaintCard key={c.id} complaint={c} />)}
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
