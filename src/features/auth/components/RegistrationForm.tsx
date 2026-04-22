import { Button } from "@/components/ui/button";
import { registerSchema, type RegisterInput } from "../schemas/register.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function RegistrationForm() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterInput) => {
        console.log(data);
    }


    return (
        <div className="flex min-h-svh justify-center items-center p-6">

            <div className="border border-border w-full max-w-lg rounded-lg bg-card text-card-foreground shadow-sm">
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
                            <input className="border border-border rounded-sm p-2"
                                id="firstName"
                                type="text"
                                placeholder="Mario"
                                {...register("firstName")} />
                        </div>
                        <div className="grid gap-1">
                            <label htmlFor="lastName">Last Name</label>
                            <input className="border border-border rounded-sm p-2"
                                id="lastName"
                                type="text"
                                placeholder="Rossi"
                                {...register("lastName")} />
                        </div>
                    </div>
                    {/* Email and Username */}
                    <div className="grid gap-1 mb-4">
                        <label htmlFor="email">Email</label>
                        <input className="border border-border rounded-sm p-2"
                            id="email"
                            type="email"
                            placeholder="mario.rossi@example.com"
                            {...register("email")} />
                    </div>
                    <div className="grid gap-1 mb-4">
                        <label htmlFor="username">Username</label>
                        <input className="border border-border rounded-sm p-2"
                            id="username"
                            type="text"
                            placeholder="mario.rossi"
                            {...register("username")} />
                    </div>
                    {/* Password and Confirm Password */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        <div className="grid gap-1">
                            <label htmlFor="password">Password</label>
                            <input className="border border-border rounded-sm p-2"
                                id="password"
                                type="password"
                                placeholder="********"
                                {...register("password")} />
                        </div>
                        <div className="grid gap-1">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input className="border border-border rounded-sm p-2"
                                id="confirmPassword"
                                type="password"
                                placeholder="********"
                                {...register("confirmPassword")} />
                        </div>
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