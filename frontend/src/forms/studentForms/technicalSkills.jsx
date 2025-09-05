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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radiogroup"

const formSchema = z.object({
  progSkills: z.string(),
  javaSkills: z.string(),
  cppSkill: z.string(),
  pythonSkills: z.string(),
  webSkills: z.string(),
  jsSkills: z.string(),
  phpSkills: z.string(),
})

export default function TechnicalSkills() {
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
          { name: "progSkills", label: "Programming Skills" },
          { name: "javaSkills", label: "Java" },
          { name: "cppSkill", label: "C++" },
          { name: "pythonSkills", label: "Python" },
          { name: "webSkills", label: "HTML & CSS" },
          { name: "jsSkills", label: "JavaScript" },
          { name: "phpSkills", label: "PHP" },
        ].map((fieldConfig, index) => (
          <FormField
            key={index}
            control={form.control}
            name={fieldConfig.name}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{fieldConfig.label}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-1"
                  >
                    {options.map((option, i) => (
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={i}
                      >
                        <FormControl>
                          <RadioGroupItem value={option[1]} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option[0]}
                        </FormLabel>
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
