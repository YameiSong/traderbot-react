import { AppDispatch } from "@/app/store"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/features/Auth/AuthSlice"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

const SinginForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const form = useForm({
    resolver: undefined,
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = (data: any) => {
    dispatch(loginUser(data))
  }
  return (
    <div>
      <p className="text-xl text-gray-600 font-bold text-center pb-5">Login</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Password" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full py-5"
          >
            Login
          </Button>
        </form>
      </Form>

    </div>
  )
}

export default SinginForm