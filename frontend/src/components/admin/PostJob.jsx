import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import useGetCompanies from '@/hooks/useGetCompanies'
import { JOB_API_END_POINT } from '@/utils/constant';

const PostJob = () => {
    useGetCompanies(); 
    
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  });

  const [loading, setLoading] = useState(false);
  const { companies } = useSelector(store => store.company);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      toast.error("Please select a company first!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        input,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Job posted successfully!");
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center w-screen my-5'>
        <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <Label>Title</Label>
              <Input type="text" name="title" value={input.title} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>Description</Label>
              <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>Salary</Label>
              <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>Location</Label>
              <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
            </div>

            <Select onValueChange={selectChangeHandler}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies.length > 0 ? (
                    companies.map((company) => (
                      <SelectItem key={company._id} value={company.name.toLowerCase()}>
                        {company.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-company" disabled>
                      No companies registered yet
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-purple-700 hover:bg-purple-800 text-white"
          >
            {loading ? "Posting..." : "Post New Job"}
          </Button>

          {companies.length === 0 && (
            <p className='text-xs text-red-600 text-center mt-3'>
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default PostJob