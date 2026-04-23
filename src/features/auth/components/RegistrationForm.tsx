import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authApi } from "../api/authApi"
import { registerSchema, type RegisterInput } from "../schemas/register.schema"

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  })

  const registerMutation = useMutation({
    mutationFn: authApi.register,

  })

  const password = watch("password")

  useEffect(() => {
    if (password && touchedFields.confirmPassword) {
      void trigger("confirmPassword")
    }
  }, [password, touchedFields.confirmPassword, trigger])

  const onSubmit = ({
    email,
    username,
    firstName,
    lastName,
    password,
  }: RegisterInput) => {
    registerMutation.mutate({
      email,
      username,
      firstName,
      lastName,
      password,
      deviceName: "web",
    })
  }

  const isPending = isSubmitting || registerMutation.isPending

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <section
        aria-labelledby="register-title"
        className="w-full max-w-lg rounded-lg border border-border bg-card text-card-foreground shadow-lg"
      >
        <header className="w-full space-y-1 rounded-t-lg bg-muted p-6">
          <h1 id="register-title" className="text-2xl font-bold">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Start by filling in your details.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4 p-6"
        >
          {registerMutation.isError && (
            <div
              role="alert"
              className="rounded-sm border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
            >
              Something went wrong. Please try again.
            </div>
          )}

          {registerMutation.isSuccess && (
            <div
              role="status"
              className="rounded-sm border border-primary/40 bg-primary/10 p-3 text-sm text-primary"
            >
              Account created successfully.
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="firstName"
              label="First Name"
              error={errors.firstName?.message}
            >
              <Input
                id="firstName"
                type="text"
                placeholder="Mario"
                autoComplete="given-name"
                disabled={isPending}
                aria-invalid={!!errors.firstName}
                aria-describedby={
                  errors.firstName ? "firstName-error" : undefined
                }
                {...register("firstName")}
              />
            </FormField>

            <FormField
              id="lastName"
              label="Last Name"
              error={errors.lastName?.message}
            >
              <Input
                id="lastName"
                type="text"
                placeholder="Rossi"
                autoComplete="family-name"
                disabled={isPending}
                aria-invalid={!!errors.lastName}
                aria-describedby={
                  errors.lastName ? "lastName-error" : undefined
                }
                {...register("lastName")}
              />
            </FormField>
          </div>

          <FormField id="email" label="Email" error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              placeholder="mario.rossi@example.com"
              autoComplete="email"
              disabled={isPending}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
          </FormField>

          <FormField
            id="username"
            label="Username"
            error={errors.username?.message}
          >
            <Input
              id="username"
              type="text"
              placeholder="mario.rossi"
              autoComplete="username"
              disabled={isPending}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
              {...register("username")}
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="password"
              label="Password"
              error={errors.password?.message}
            >
              <Input
                id="password"
                type="password"
                placeholder="●●●●●●●●"
                autoComplete="new-password"
                disabled={isPending}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                {...register("password")}
              />
            </FormField>

            <FormField
              id="confirmPassword"
              label="Confirm Password"
              error={errors.confirmPassword?.message}
            >
              <Input
                id="confirmPassword"
                type="password"
                placeholder="●●●●●●●●"
                autoComplete="new-password"
                disabled={isPending}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
                {...register("confirmPassword")}
              />
            </FormField>
          </div>

          <Button
            type="submit"
            className="mt-2 w-full rounded-sm"
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending ? "Creating account..." : "Create Account"}
          </Button>

          <footer className="text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Login
            </a>
          </footer>
        </form>
      </section>
    </main>
  )
}

type FormFieldProps = {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}

function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      <p
        id={`${id}-error`}
        role={error ? "alert" : undefined}
        aria-live="polite"
        className="min-h-4 text-sm text-destructive"
      >
        {error ?? "\u00A0"}
      </p>
    </div>
  )
}
