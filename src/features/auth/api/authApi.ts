import { apiClient } from "@/shared/lib/authClient"
import type { AccountRole } from "@/shared/types/accountRole"

export type RegisterPayload = {
  email: string
  username: string
  firstName: string
  lastName: string
  password: string
  deviceName?: string
  userAgent?: string
}

export type RegisterResponse = {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  accountRole: AccountRole
  createdAt: string
  updatedAt: string
}

export const authApi = {
  register: async (payload: RegisterPayload) => {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register",
      payload
    )
    return response.data
  },
}
