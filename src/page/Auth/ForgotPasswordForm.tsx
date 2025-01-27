import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

const ForgotPasswordForm = () => {
  const form = useForm({
    resolver: undefined,
    defaultValues: {
      email: "",
    },
  })
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <div>
      <p className="text-xl text-gray-600 font-bold text-center pb-5">Forgot Password</p>
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
          <Button
            type="submit"
            className="w-full py-5"
          >
            Reset Password
          </Button>
        </form>
      </Form>

    </div>
  )
}

export default ForgotPasswordForm