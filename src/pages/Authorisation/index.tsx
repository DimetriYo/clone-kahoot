import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { getUserId } from './api/getUserId'

type UserForm = { name: string; password: string }
const defaultValues = { name: '', password: '' }

export function Authorisation({
  setUserId,
}: {
  setUserId: (newUserId: string) => void
}) {
  const { register, handleSubmit } = useForm({ defaultValues })

  const onSubmit = (data: UserForm) => {
    const userId = getUserId(data)
    setUserId(userId)
  }

  return (
    <div className="h-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Authorisation</CardTitle>
          <CardDescription>
            Please, enter your nickname and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="max-w-3xs flex flex-col gap-4 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Label>
              <Input
                placeholder="Nickname"
                {...register('name', { required: true })}
              />
            </Label>
            <Label>
              <Input
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
              />
            </Label>
            <Button>Enter</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
