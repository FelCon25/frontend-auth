import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import RegistrationForm from "./features/auth/components/RegistrationForm.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RegistrationForm />
    </ThemeProvider>
  </StrictMode>
)
