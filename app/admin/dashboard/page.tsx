"use client"

import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { Clock, CheckCircle2, AlertCircle, FileText, XCircle, Building, GraduationCap, BedDouble, Search, Printer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"
import DashboardHeader from "@/components/dashboard-header"
import AdminComplaintCard from "@/components/admin-complaint-card"
import { useApp } from "@/lib/app-context"

const PIE_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-5)",
]


export default function AdminDashboardPage() {
  const router = useRouter()
  const { currentUser, isLoading, complaints, fetchComplaints, getCollegeById } = useApp()
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    if (!isLoading && (!currentUser || currentUser.role !== "admin")) {
      router.push("/auth/college/login")
    } else if (currentUser) {
      fetchComplaints()
    }
  }, [currentUser, isLoading, router])

  const college = currentUser?.role === "admin" ? getCollegeById(currentUser.collegeId) : null
  const allComplaints = currentUser ? complaints : []

  const stats = useMemo(() => ({
    total: allComplaints.length,
    pending: allComplaints.filter((c) => c.status === "pending").length,
    inProgress: allComplaints.filter((c) => c.status === "in-progress").length,
    resolved: allComplaints.filter((c) => c.status === "resolved").length,
    rejected: allComplaints.filter((c) => c.status === "rejected").length,
  }), [allComplaints])

  const filteredComplaints = useMemo(() => {
    return allComplaints.filter((c) => {
      const matchesSearch = search === "" || c.title.toLowerCase().includes(search.toLowerCase()) || c.studentName.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = categoryFilter === "all" || c.category === categoryFilter
      const matchesStatus = statusFilter === "all" || c.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [allComplaints, search, categoryFilter, statusFilter])

  const categoryData = useMemo(() => [
    { name: "Infrastructure", value: allComplaints.filter((c) => c.category === "infrastructure").length },
    { name: "Academics", value: allComplaints.filter((c) => c.category === "academics").length },
    { name: "Hostel", value: allComplaints.filter((c) => c.category === "hostel").length },
  ], [allComplaints])

  const statusData = useMemo(() => [
    { name: "Pending", count: stats.pending },
    { name: "In Progress", count: stats.inProgress },
    { name: "Resolved", count: stats.resolved },
    { name: "Rejected", count: stats.rejected },
  ], [stats])

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Complaints Report - ${college?.name || 'College'}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .header { margin-bottom: 30px; }
            .stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; margin-bottom: 30px; }
            .stat-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
            .stat-value { font-size: 24px; font-weight: bold; color: #333; }
            .stat-label { font-size: 12px; color: #666; margin-top: 5px; }
            .complaint { border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 8px; page-break-inside: avoid; }
            .complaint-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .complaint-title { font-weight: bold; font-size: 16px; }
            .complaint-id { font-size: 12px; color: #666; font-family: monospace; }
            .badges { display: flex; gap: 8px; margin: 8px 0; }
            .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
            .badge-pending { background: #fef3c7; color: #92400e; }
            .badge-in-progress { background: #dbeafe; color: #1e40af; }
            .badge-resolved { background: #d1fae5; color: #065f46; }
            .badge-rejected { background: #fee2e2; color: #991b1b; }
            .badge-low { background: #f3f4f6; color: #374151; }
            .badge-medium { background: #fef3c7; color: #92400e; }
            .badge-high { background: #fed7aa; color: #9a3412; }
            .badge-urgent { background: #fecaca; color: #991b1b; }
            .description { margin: 10px 0; color: #555; line-height: 1.6; }
            .meta { font-size: 12px; color: #666; margin-top: 10px; }
            @media print { body { padding: 10px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Complaints Report</h1>
            <p><strong>College:</strong> ${college?.name || 'N/A'} (${college?.code || 'N/A'})</p>
            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Total Complaints:</strong> ${allComplaints.length}</p>
          </div>
          
          <div class="stats">
            <div class="stat-card">
              <div class="stat-value">${stats.total}</div>
              <div class="stat-label">Total</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.pending}</div>
              <div class="stat-label">Pending</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.inProgress}</div>
              <div class="stat-label">In Progress</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.resolved}</div>
              <div class="stat-label">Resolved</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${stats.rejected}</div>
              <div class="stat-label">Rejected</div>
            </div>
          </div>

          <h2>All Complaints</h2>
          ${allComplaints.map(c => `
            <div class="complaint">
              <div class="complaint-header">
                <div class="complaint-title">${c.title}</div>
                <div class="complaint-id">#${c.id}</div>
              </div>
              <div class="badges">
                <span class="badge badge-${c.status}">${c.status.toUpperCase()}</span>
                <span class="badge badge-${c.priority}">${c.priority.toUpperCase()}</span>
                <span class="badge">${c.category.toUpperCase()}</span>
              </div>
              <div class="description">${c.description}</div>
              <div class="meta">
                <strong>Student:</strong> ${c.studentName} (${c.studentEmail})<br>
                <strong>Filed:</strong> ${new Date(c.createdAt).toLocaleString()}<br>
                ${c.assignedDepartment ? `<strong>Department:</strong> ${c.assignedDepartment}${c.assignedStaff ? ` - ${c.assignedStaff}` : ''}<br>` : ''}
                ${c.adminResponse ? `<strong>Admin Response:</strong> ${c.adminResponse}<br>` : ''}
              </div>
            </div>
          `).join('')}
        </body>
      </html>
    `
    
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  if (isLoading || !currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const statCards = [
    { label: "Total Complaints", value: stats.total, icon: FileText, color: "text-primary" },
    { label: "Pending", value: stats.pending, icon: Clock, color: "text-amber-600" },
    { label: "In Progress", value: stats.inProgress, icon: AlertCircle, color: "text-blue-600" },
    { label: "Resolved", value: stats.resolved, icon: CheckCircle2, color: "text-emerald-600" },
    { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-red-600" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground font-mono">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Manage complaints for {college?.name || "your college"}
                {college && (
                  <Badge variant="outline" className="ml-2 text-xs font-mono">{college.code}</Badge>
                )}
              </p>
            </div>
            <Button onClick={handlePrint} variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print Report
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {statCards.map((stat) => (
            <Card key={stat.label} className="border-border">
              <CardContent className="flex items-center gap-3 p-4">
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

        {/* Analytics Charts */}
        {allComplaints.length > 0 && (
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Complaints by Status</CardTitle>
                <CardDescription className="text-xs">Overview of complaint resolution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={statusData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="name" fontSize={12} stroke="var(--color-muted-foreground)" />
                    <YAxis fontSize={12} stroke="var(--color-muted-foreground)" allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        borderColor: "var(--color-border)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="count" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Complaints by Category</CardTitle>
                <CardDescription className="text-xs">Distribution across complaint types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        borderColor: "var(--color-border)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend fontSize={12} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Complaints Management */}
        <Card className="border-border">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="font-mono">All Complaints</CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="h-8 w-48 pl-8 text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-8 w-36 text-xs">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="academics">Academics</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-8 w-32 text-xs">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredComplaints.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {allComplaints.length === 0 ? "No complaints yet" : "No matching complaints"}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {allComplaints.length === 0 ? "Complaints from students will appear here." : "Try adjusting your filters."}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredComplaints.map((c) => (
                  <AdminComplaintCard
                    key={c.id}
                    complaint={c}
                    departments={college?.departments || []}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
