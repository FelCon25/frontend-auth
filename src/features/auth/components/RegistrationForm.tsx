import { useState, type ComponentProps } from "react"

import { Button } from "@/components/ui/button"

type FormSubmitEvent = Parameters<NonNullable<ComponentProps<"form">["onSubmit"]>>[0]

export default function RegistrationForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault()
    console.log({
      email,
      username,
      firstName,
      lastName,
      password,
      confirmPassword,
    })
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
        <div className="w-full max-w-lg border border-border p-6 text-card-foreground shadow-sm">
            <form className="grid gap-5" onSubmit={handleSubmit}>
                <div>
                    <h1 className="text-2xl font-bold">Registration Form</h1>
                    <p className="text-sm font-medium">Start by filling your details</p>
                </div>
            </form>
        </div>
    </div>
  )
}