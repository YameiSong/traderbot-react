import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BadgeCheck, BadgeMinus } from 'lucide-react'
import React from 'react'
import AccountVerificationForm from './AccountVerificationForm'

const Profile = () => {
  const enable2StepVerification = () => {
    console.log('Enable 2 Step Verification')
  }
  return (
    <div className='flex flex-col items-center mb-5'>
      <div className="pt-10 w-full lg:w-[60%]">
        <Card className="text-left">
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-32">
              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Email :</p>
                  <p className="text-gray-500">Your email address</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Full Name :</p>
                  <p className="text-gray-500">Your full name</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Date of Birth :</p>
                  <p className="text-gray-500">01/01/1990</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Nationality :</p>
                  <p className="text-gray-500">Your nationality</p>
                </div>
              </div>
              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Address :</p>
                  <p className="text-gray-500">Your address</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">City :</p>
                  <p className="text-gray-500">Your city</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Postcode :</p>
                  <p className="text-gray-500">Your postcode</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Country :</p>
                  <p className="text-gray-500">Your country</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle>2 Step Verification</CardTitle>
                {true ? (
                  <Badge className='bg-green-600 space-x-1'>
                    <BadgeCheck size={16} />
                    <span>Enabled</span>
                  </Badge>
                ) : (
                  <Badge className='bg-orange-500 space-x-1'>
                    <BadgeMinus size={16} />
                    <span>Disabled</span>
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger className='flex justify-start p-0'>
                  <Button>Enable 2 Step Verification</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Verify your account</DialogTitle>
                    <DialogDescription>
                      <AccountVerificationForm handleSubmit={enable2StepVerification} />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile