"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, Eye, EyeOff, UserPlus, Info } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useApp } from "@/lib/app-context"

export default function StudentSignupPage() {
  const router = useRouter()
  const { colleges, registerStudent, fetchColleges } = useApp()
  const [name, setName] = useState("")
  const [selectedCollegeId, setSelectedCollegeId] = useState("")
  const [collegeCode, setCollegeCode] = useState("")
  const [email, setEmail] = useState("")
  const [enrollmentNumber, setEnrollmentNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const selectedCollege = colleges.find((c) => c.id === selectedCollegeId)

  useEffect(() => {
    fetchColleges()
  }, [])

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
    if (!selectedCollege) {
      setError("Please select your college.")
      return
    }
    if (collegeCode.toUpperCase() !== selectedCollege.code) {
      setError("Invalid college code. Please check with your institution.")
      return
    }

    setLoading(true)
    const result = await registerStudent({
      name,
      email,
      password,
      collegeId: selectedCollegeId,
      enrollmentNumber,
    })
    if (result.success) {
      toast.success("Account created! Welcome to CampusVoice.")
      router.push("/student/dashboard")
    } else {
      setError(result.error || "Signup failed.")
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
          <CardTitle className="text-2xl font-bold text-card-foreground font-mono">Student Sign Up</CardTitle>
          <CardDescription>Create your account using your official college email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="college">Select Your College</Label>
              <Select value={selectedCollegeId || ""} onValueChange={setSelectedCollegeId}>
                <SelectTrigger className="w-full" id="college">
                  <SelectValue placeholder="Choose your college" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.length === 0 && (
                    <SelectItem value="_none" disabled>
                      No colleges registered yet
                    </SelectItem>
                  )}
                  {colleges.map((college) => (
                    <SelectItem key={college.id} value={college.id}>
                      {college.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCollege && (
                <div className="flex items-start gap-2 rounded-md bg-primary/5 px-3 py-2 text-xs text-primary">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    Use your official email ending with <strong>@{selectedCollege.emailDomain}</strong>
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="collegeCode">College Code</Label>
              <Input
                id="collegeCode"
                type="text"
                placeholder="Enter your college code"
                value={collegeCode}
                onChange={(e) => setCollegeCode(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                This code is provided by your college administration.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Official College Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={selectedCollege ? `you@${selectedCollege.emailDomain}` : "you@college.edu"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="enrollment">Enrollment / Roll Number</Label>
              <Input
                id="enrollment"
                type="text"
                placeholder="e.g., 2024CS001"
                value={enrollmentNumber}
                onChange={(e) => setEnrollmentNumber(e.target.value)}
                required
              />
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
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/student/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
