import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { registerSchema, type RegisterInput } from "../schemas/register.schema"

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  })

  const onSubmit = (data: RegisterInput) => {
    console.log(data)
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
        <form
          className="space-y-3"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <header className="space-y-1 mb-5">
            <h1 className="text-2xl font-bold">
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Start by filling in your details.
            </p>
          </header>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-1 block text-sm font-medium">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Mario"
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby="firstName-error"
                className={cn(
                  "h-10 w-full border bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                  errors.firstName
                    ? "border-destructive focus-visible:ring-destructive"
                    : "border-input"
                )}
                {...register("firstName")}
              />
              {errors.firstName && (
                <p id="firstName-error" className="mt-1 text-xs leading-4 text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="mb-1 block text-sm font-medium">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Rossi"
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby="lastName-error"
                className={cn(
                  "h-10 w-full border bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                  errors.lastName
                    ? "border-destructive focus-visible:ring-destructive"
                    : "border-input"
                )}
                {...register("lastName")}
              />
              {errors.lastName && (
                <p id="lastName-error" className="mt-1 text-xs leading-4 text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="mariorossi"
              aria-invalid={Boolean(errors.username)}
              aria-describedby="username-error"
              className={cn(
                "h-10 w-full border bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                errors.username
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-input"
              )}
              {...register("username")}
            />
            {errors.username && (
              <p id="username-error" className="mt-1 text-xs leading-4 text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="nome@esempio.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby="email-error"
              className={cn(
                "h-10 w-full border bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                errors.email
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-input"
              )}
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs leading-4 text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="********"
                aria-invalid={Boolean(errors.password)}
                aria-describedby="password-error"
                className={cn(
                  "h-10 w-full border bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                  errors.password
                    ? "border-destructive focus-visible:ring-destructive"
                    : "border-input"
                )}
                {...register("password")}
              />
              {errors.password && (
                <p id="password-error" className="mt-1 text-xs leading-4 text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="********"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby="confirmPassword-error"
                className={cn(
                  "h-10 w-full border bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                  errors.confirmPassword
                    ? "border-destructive focus-visible:ring-destructive"
                    : "border-input"
                )}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="mt-1 text-xs leading-4 text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <Button className="mt-1 w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </div>
    </div>
  )
}
