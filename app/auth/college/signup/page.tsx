"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, Eye, EyeOff, UserPlus, Plus, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/app-context"

export default function CollegeSignupPage() {
  const router = useRouter()
  const { registerCollege } = useApp()
  const [collegeName, setCollegeName] = useState("")
  const [collegeCode, setCollegeCode] = useState("")
  const [emailDomain, setEmailDomain] = useState("")
  const [adminName, setAdminName] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [departments, setDepartments] = useState<string[]>([])
  const [deptInput, setDeptInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const addDepartment = () => {
    const dept = deptInput.trim()
    if (dept && !departments.includes(dept)) {
      setDepartments((prev) => [...prev, dept])
      setDeptInput("")
    }
  }

  const removeDepartment = (dept: string) => {
    setDepartments((prev) => prev.filter((d) => d !== dept))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }
    if (collegeCode.length < 3) {
      setError("College code must be at least 3 characters.")
      return
    }

    setLoading(true)
    const result = await registerCollege({
      name: collegeName,
      code: collegeCode,
      emailDomain,
      departments,
      adminName,
      adminEmail,
      adminPassword: password,
    })
    if (result.success) {
      toast.success("College registered successfully! Welcome to CampusVoice.")
      router.push("/admin/dashboard")
    } else {
      setError(result.error || "Registration failed.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Building2 className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground font-mono">CampusVoice</span>
      </Link>

      <Card className="w-full max-w-lg border-border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-card-foreground font-mono">Register Your College</CardTitle>
          <CardDescription>
            Set up your institution on CampusVoice to manage student complaints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* College Information */}
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-foreground">College Information</h3>
              <p className="text-xs text-muted-foreground">Details about your institution</p>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="collegeName">College Name</Label>
              <Input
                id="collegeName"
                type="text"
                placeholder="e.g., National Institute of Technology"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="collegeCode">College Code</Label>
                <Input
                  id="collegeCode"
                  type="text"
                  placeholder="e.g., NIT2024"
                  value={collegeCode}
                  onChange={(e) => setCollegeCode(e.target.value.toUpperCase())}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Students will use this code to register.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="emailDomain">Email Domain</Label>
                <Input
                  id="emailDomain"
                  type="text"
                  placeholder="e.g., nit.edu"
                  value={emailDomain}
                  onChange={(e) => setEmailDomain(e.target.value.toLowerCase())}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Official student email domain.
                </p>
              </div>
            </div>

            {/* Departments */}
            <div className="flex flex-col gap-2">
              <Label>Departments (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="e.g., Computer Science"
                  value={deptInput}
                  onChange={(e) => setDeptInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addDepartment()
                    }
                  }}
                />
                <Button type="button" variant="outline" size="icon" onClick={addDepartment} aria-label="Add department">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {departments.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {departments.map((dept) => (
                    <Badge key={dept} variant="secondary" className="gap-1 pr-1">
                      {dept}
                      <button
                        type="button"
                        onClick={() => removeDepartment(dept)}
                        className="rounded-full p-0.5 hover:bg-muted"
                        aria-label={`Remove ${dept}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Separator */}
            <div className="h-px bg-border" />

            {/* Admin Account */}
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-foreground">Admin Account</h3>
              <p className="text-xs text-muted-foreground">Your admin credentials to manage complaints</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="adminName">Admin Name</Label>
                <Input
                  id="adminName"
                  type="text"
                  placeholder="Your full name"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="admin@college.edu"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="mt-2 gap-2" disabled={loading}>
              <UserPlus className="h-4 w-4" />
              {loading ? "Registering..." : "Register College"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already registered?{" "}
            <Link href="/auth/college/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
