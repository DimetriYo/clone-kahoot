import { axiosInstance } from "@/constants"

type User = { id: string; name: string; password: string }

export const getUserId = async (props: { name: string; password: string }) => {
  const userData = await axiosInstance.post<User>("/users", props)

  return userData.data.id
}
