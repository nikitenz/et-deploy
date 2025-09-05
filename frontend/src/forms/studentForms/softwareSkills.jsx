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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
  requirements: z.string(),
  designArchitecture: z.string(),
  agileScrum: z.string(),
  testingDebugging: z.string(),
  maintenanceTroubleshooting: z.string(),
})

export default function SoftwareSkills() {
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

  // reusable radio options (replace with levels if you want)
  const options = [
    ["Beginner", "beginner"],
    ["Intermediate", "intermediate"],
    ["Advanced", "advanced"],
  ]

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        {[
          { name: "requirements", label: "Software Requirements" },
          { name: "designArchitecture", label: "Design Architecture" },
          { name: "agileScrum", label: "Agile Scrum" },
          { name: "testingDebugging", label: "Testing and Debugging" },
          { name: "maintenanceTroubleshooting", label: "Maintenance Troubleshooting" },
        ].map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: controller }) => (
              <FormItem className="space-y-3">
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={controller.onChange}
                    className="flex flex-col space-y-1"
                  >
                    {options.map(([label, value], index) => (
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={index}
                      >
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="font-normal">{label}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormDescription>Select your skill level.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
