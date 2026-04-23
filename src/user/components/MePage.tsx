import { useQuery } from "@tanstack/react-query"
import { userApi } from "../api/userApi"

export default function MePage() {

    const { data } = useQuery({
        queryKey: ["me"],
        queryFn: userApi.getMe,
    })
    return (
        <div className="flex min-h-svh items-center justify-center p-6">
            <section aria-labelledby="me-title" className="w-full max-w-lg rounded-lg border border-border bg-card text-card-foreground shadow-lg">
                <header className="w-full space-y-1 rounded-t-lg bg-muted p-6">
                    <h1 id="me-title" className="text-2xl font-bold">My Account</h1>
                    <p className="text-sm text-muted-foreground">
                        View and manage your account information.
                    </p>
                </header>
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-lg font-semibold">Account Information</h2>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-lg font-semibold">Account Information</h2>
                            <p className="text-sm text-muted-foreground">
                                {data?.email}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {data?.username}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {data?.firstName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {data?.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {data?.accountRole}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
  );
}