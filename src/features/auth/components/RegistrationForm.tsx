import { Button } from "@/components/ui/button";
import { registerSchema, type RegisterInput } from "../schemas/register.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function RegistrationForm() {

    const {
        register,
        handleSubmit,
        formState: { errors}
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterInput) => {
        console.log(data);
    }

    const inputClassName =
        "w-full h-10 rounded-sm border border-border bg-background p-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"


    return (
        <div className="flex min-h-svh justify-center items-center p-6">

            <div className="border border-border w-full max-w-lg rounded-lg bg-card text-card-foreground shadow-lg">
                <header className="w-full space-y-1 bg-muted rounded-t-lg p-6">
                    <h1 className="text-2xl font-bold">
                        Create your account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Start by filling in your details.
                    </p>
                </header>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6">
                    {/* First Name and Last Name */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        <div className="grid gap-1">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                className={inputClassName}
                                id="firstName"
                                type="text"
                                placeholder="Mario"
                                {...register("firstName")} />
                            {errors.firstName && <p className="text-destructive text-sm">{errors.firstName.message}</p>}
                        </div>
                        <div className="grid gap-1">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                className={inputClassName}
                                id="lastName"
                                type="text"
                                placeholder="Rossi"
                                {...register("lastName")} />
                            {errors.lastName && <p className="text-destructive text-sm">{errors.lastName.message}</p>}
                        </div>
                    </div>
                    {/* Email and Username */}
                    <div className="grid gap-1 mb-4">
                        <label htmlFor="email">Email</label>
                        <input
                            className={inputClassName}
                            id="email"
                            type="email"
                            placeholder="mario.rossi@example.com"
                            {...register("email")} />
                    {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="grid gap-1 mb-4">
                        <label htmlFor="username">Username</label>
                        <input
                            className={inputClassName}
                            id="username"
                            type="text"
                            placeholder="mario.rossi"
                            {...register("username")} />
                        {errors.username && <p className="text-destructive text-sm">{errors.username.message}</p>}
                    </div>
                    {/* Password and Confirm Password */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        <div className="grid gap-1">
                            <label htmlFor="password">Password</label>
                            <input
                                className={inputClassName}
                                id="password"
                                type="password"
                                placeholder="●●●●●●●●"
                                {...register("password")} />
                        </div>
                        <div className="grid gap-1">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                className={inputClassName}
                                id="confirmPassword"
                                type="password"
                                placeholder="●●●●●●●●"
                                {...register("confirmPassword")} />
                        </div>
                        {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
                        {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>}
                    </div>
                    {/* Submit Button */}
                    <Button type="submit" className="w-full rounded-sm mt-2">
                        Create Account
                    </Button>

                    <footer className="mt-4">
                        Already have an account?{" "}
                        <a href="/login" className="text-primary font-medium hover:text-primary/80 transition-colors">
                            Login
                        </a>
                    </footer>
                </form>

            </div>
        </div>
    )
}