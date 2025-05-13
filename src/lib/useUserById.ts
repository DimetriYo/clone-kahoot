import { axiosInstance } from '@/constants'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const getUserById = async (userId: string) => {
  try {
    const userResponse = await axiosInstance.get<{ id: string; name: string }>(
      `/users/${userId}`
    )

    return userResponse.data
  } catch (e: any) {
    if (e.status === 404) {
      toast(String(e.response?.data))
    }
  }
}

export const useUserById = (userId: string | null) =>
  useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId!),
    enabled: Boolean(userId),
    staleTime: Infinity,
  })
