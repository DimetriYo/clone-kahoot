import { axiosInstance } from "@/constants"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkIsAdminUser = async (userId: string) =>
  await axiosInstance.get(`/users/auth/${userId}`)
