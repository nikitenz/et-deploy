"use client"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  studentId: z.number().min(10).max(10),
  schoolYear: z.string(),
  semester: z.string(),
  courseYearSection: z.string(),
})

export default function BasicInfo() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values) {
    try {
      console.log(values)
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      )
    } catch (error) {
      console.error("Form submission error", error)
      toast.error("Failed to submit the form. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Number</FormLabel>
              <FormControl>
                <Input placeholder="2022100001" type="number" {...field} />
              </FormControl>
              <FormDescription>
                Please enter your student id number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="schoolYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Year</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="2025-2026" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2025-2026">2025-2026</SelectItem>
                  <SelectItem value="2026-2027">2026-2027</SelectItem>
                  <SelectItem value="2027-2028">2027-2028</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select the school year</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="semester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semester</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="1st" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1st">1st Semester</SelectItem>
                  <SelectItem value="2nd">2nd Semester</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose a semester</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courseYearSection"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course, Year, and Section</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="BSIT 4DG2" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BSIT 4DG2">BSIT 4DG2</SelectItem>
                  <SelectItem value="BSIT 4DG1">BSIT 4DG1</SelectItem>
                  <SelectItem value="BSCS 3A">BSCS 3A</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose your current course, year, and section
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
