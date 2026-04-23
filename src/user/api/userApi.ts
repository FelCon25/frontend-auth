import { apiClient } from "@/shared/lib/authClient"

export const userApi = {
    getMe: async () => {
        const response = await apiClient.get("/users/me")
        return response.data
    }
}