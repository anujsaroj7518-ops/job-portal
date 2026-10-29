import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Button } from "@/components/ui/button"
import { Bookmark } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import React from 'react'
import { useNavigate } from "react-router-dom"


const Job = ({job}) => {
  const navigate = useNavigate();
  // const jobId = "vdljdgilbgfbig"

  const dayAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/ (1000*24*60*60));
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm w-72">
      
      {/* Date aur Bookmark */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">{dayAgoFunction(job?.createdAt) == 0 ? "Today" : `${dayAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size='icon'>
          <Bookmark size={16}/>
        </Button>
      </div>

      {/* Logo aur Company */}
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage 
            src={job?.company?.logo}
            alt="company logo"
          />
          {/* ✅ YE ADD KARO - image fail hone par dikhega */}
          <AvatarFallback className="bg-gray-100">
            <img src="https://i.pravatar.cc/150?img=5" alt="fallback" className="w-full h-full object-cover rounded-full"/>
          </AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-semibold">{job?.company?.name}</h3>
          <p className="text-xs text-gray-400">India</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
          <div className='flex item-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
        </div>
        <div className='flex item-center gap-4 mt-4'>
          <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
          <Button className="bg-[#7209b7]">Save For Later</Button>
        </div>
    </div>
  )
}

export default Job