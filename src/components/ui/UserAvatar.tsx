import { LS_USER_ID_KEY } from '@/constants'
import { useUserById } from '@/lib/useUserById'
import { cn } from '@/lib/utils'

export function UserAvatar(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const userId = localStorage.getItem(LS_USER_ID_KEY)
  const { data: userData } = useUserById(userId)

  return (
    <div
      {...props}
      title={userData?.name}
      className={cn(
        'fixed top-4 left-4 border-3 px-2 max-w-40 truncate bg-white rounded-xl',
        props.className
      )}
    >
      {userData?.name}
    </div>
  )
}
