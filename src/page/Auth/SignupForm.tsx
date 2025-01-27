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
import { registerUser } from "@/features/Auth/AuthSlice"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

const SingupForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const form = useForm({
    resolver: undefined,
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })
  const onSubmit = (data: any) => {
    dispatch(registerUser(data))
  }
  return (
    <div>
      <p className="text-xl text-gray-600 font-bold text-center pb-5">Create New Account</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Full Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            Sign Up
          </Button>
        </form>
      </Form>

    </div>
  )
}

export default SingupForm