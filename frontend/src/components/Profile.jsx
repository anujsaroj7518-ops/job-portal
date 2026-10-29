import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Contact, Mail, Pen } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'  
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
 

  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile photo"/>
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p className='text-gray-500'>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen/></Button>
        </div>  

        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail/>
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3'>
            <Contact/>
            <span>{user?.phoneNumber}</span>
          </div>
        </div>     

        <div className='my-5'>
          <h1 className='font-bold text-lg'>Skills</h1>
          <div className='flex gap-2 flex-wrap mt-2'>
            {
              user?.profile?.skills?.length === 0 
              ? <span>NA</span> 
              : user?.profile?.skills?.map((item, index) => (
                <Badge key={index} className="bg-black text-white">{item}</Badge>
              ))
            }
          </div>
        </div>

        <div className='my-5'>
          <h1 className='font-bold text-lg'>Resume</h1>
           <a 
            target='_blank' 
            href={user?.profile?.resume}
           className='text-blue-500 hover:underline cursor-pointer'
          >
          {user?.profile?.resumeOriginalName}
          </a>
        </div>

        <div className='my-5'>
          <h1 className='font-bold text-lg mb-3'>Applied Jobs</h1>
          <AppliedJobTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
      </div>   
    </div>
  )
}

export default Profile