import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider"
import RegistrationForm from "./features/auth/components/RegistrationForm"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./shared/lib/queryClient"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RegistrationForm />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)
