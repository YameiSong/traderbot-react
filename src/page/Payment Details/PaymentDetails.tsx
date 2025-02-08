import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PaymentDetailsForm from './PaymentDetailsForm'

const PaymentDetails = () => {
  return (
    <div className="p-5">
      <div className='px-20'>
        <p className='font-bold text-3xl pb-5 text-left'>Payment Details</p>
        {true ? (
          <Card className='text-left'>
            <CardHeader>
              <CardTitle>Yes Bank</CardTitle>
              <CardDescription>Account No. ************1651</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-5">
                <p className='w-32'>Account Holder</p>
                <p className='text-gray-500'>Claire</p>
              </div>
              <div className="flex items-center gap-5">
                <p className="w-32">IFSC</p>
                <p className="text-gray-500">YES500000007</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Dialog>
            <DialogTrigger className='p-0 mt-5 flex items-start'>
              <Button className='py-6'>
                Add payment details
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Payment Details</DialogTitle>
                <DialogDescription>
                  <PaymentDetailsForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}


      </div>
    </div>

  )
}

export default PaymentDetails