import { AppDispatch } from "@/app/store"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addPaymentDetails } from "@/features/Withdrawal/WithdrawalSlice"
import { DialogClose } from "@radix-ui/react-dialog"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

const PaymentDetailsForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const form = useForm({
        resolver: undefined,
        defaultValues: {
            accountHolderName: "",
            accountNumber: "",
            ifsc: "",
            bankName: "",
        },
    })
    const onSubmit = (data: any) => {
        dispatch(addPaymentDetails(data));
    }
    return (
        <div className='px-10 py-2'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="accountHolderName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Holder Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Number</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ifsc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>IFSC Code</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bankName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bank Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogClose className="p-0 w-full">
                        <Button
                            type="submit"
                            className="w-full py-5"
                        >
                            Submit
                        </Button>
                    </DialogClose>
                </form>
            </Form>

        </div>
    )
}

export default PaymentDetailsForm