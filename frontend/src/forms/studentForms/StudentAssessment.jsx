"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

import { studentSchema } from "../schemas/studentSchema.js" // 👈 schema from above

// Import all step components
import BasicInfo from "@/forms/studentForms/basicInfo"
import CommSkills from "@/forms/studentForms/commSkills"
import DatabaseSkills from "@/forms/studentForms/databaseSkills"
import EthicsProfessionalism from "@/forms/studentForms/ethicsProfessionalism"
import ProblemSolving from "@/forms/studentForms/problemSolving"
import SoftwareSkills from "@/forms/studentForms/softwareSkills"
import TechnicalSkills from "@/forms/studentForms/technicalSkills"
import TimeManagement from "@/forms/studentForms/timeManagement"
import WebDevSkills from "@/forms/studentForms/webdevSkills"
import Adaptability from "@/forms/studentForms/adaptability"

const steps = [
  BasicInfo,
  CommSkills,
  DatabaseSkills,
  EthicsProfessionalism,
  ProblemSolving,
  SoftwareSkills,
  TechnicalSkills,
  TimeManagement,
  WebDevSkills,
  Adaptability,
]

export default function StudentAssessment() {
  const form = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {}, // optional: preload
  })

  const [step, setStep] = useState(0)
  const CurrentStep = steps[step]

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

  const onSubmit = (values) => {
    console.log("Final submission:", values)
    toast.success("Assessment submitted!")
    // send `values` to backend
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Student Assessment Form</h1>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Pass `form` down so each step connects to the same state */}
        <CurrentStep form={form} />

        <div className="flex justify-between mt-6">
          {step > 0 && <Button type="button" onClick={prevStep}>Previous</Button>}
          {step < steps.length - 1 ? (
            <Button type="button" onClick={nextStep}>Next</Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </div>
  )
}
