"use client"

import Link from "next/link"
import { Shield, FileText, BarChart3, Users, ArrowRight, CheckCircle2, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: FileText,
    title: "Easy Complaint Filing",
    description: "Submit complaints for infrastructure, academics, or hostel issues with a streamlined form.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description: "Monitor your complaint status with live updates from submission to resolution.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Secure, role-based dashboards for students, departments, and administrators.",
  },
  {
    icon: Users,
    title: "Departmental Assignment",
    description: "Complaints are assigned to relevant departments with priority levels and internal notes.",
  },
]

const steps = [
  { step: "01", title: "College Registers", description: "Your institution signs up with a unique college code and sets up departments." },
  { step: "02", title: "Students Sign Up", description: "Students register using their official college email and the college code." },
  { step: "03", title: "File Complaints", description: "Submit issues under infrastructure, academics, or hostel categories." },
  { step: "04", title: "Track Resolution", description: "Follow real-time status updates until your issue is resolved." },
]

export default function LandingHero() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <CheckCircle2 className="h-4 w-4" />
            Transparent. Accountable. Efficient.
          </div>
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-mono">
            Your Campus Complaints,{" "}
            <span className="text-primary">Resolved Faster</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            A centralized web-based complaint management system that empowers students to register issues,
            track their resolution in real time, and ensures accountability across departments.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 px-8" asChild>
              <Link href="/auth/student/signup">
                Get Started as Student
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 px-8" asChild>
              <Link href="/auth/college/signup">Register Your College</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground font-mono">
            Why CampusVoice?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built for educational institutions that value transparency and efficiency.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-card transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground font-mono">
              How It Works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Four simple steps to a better complaint resolution process.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
              <div key={item.step} className="flex flex-col gap-3">
                <span className="text-4xl font-bold text-primary/20 font-mono">{item.step}</span>
                <h3 className="text-lg font-semibold text-foreground">{item.step === "01" ? item.title : item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-primary/5 p-10">
          <h2 className="text-2xl font-bold text-foreground font-mono">
            Ready to Transform Campus Complaint Management?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Register your institution today and give students a voice that is heard.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/auth/college/signup">
                Register Your College
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/student/signup">Student Sign Up</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground font-mono">CampusVoice</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Making campus complaint resolution transparent and efficient.
          </p>
        </div>
      </footer>
    </div>
  )
}
