import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState([]);   
  const navigate = useNavigate();

  useEffect(() => {
    const safeJobs = allAdminJobs || [];

    const filteredJobs = safeJobs.filter((job) => {
      if (!searchJobByText) return true;
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) 
          || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0
            ? (
              <TableRow>
                <TableCell colSpan={4}>You haven't posted any jobs yet.</TableCell>
              </TableRow>
            )
            : (
              filterJobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell className="font-medium">{job?.company?.name}</TableCell>  
                  <TableCell className="font-medium">{job?.title}</TableCell>
                  <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <div className="p-2 rounded hover:bg-gray-100 cursor-pointer inline-flex">
                          <MoreHorizontal className="w-5 h-5" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-32" align="end">
                        <div
                          onClick={() => navigate(`/admin/jobs/${job._id}`)}
                          className='flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded'
                        >
                          <Edit2 className='w-4 h-4' />
                          <span>Edit</span>
                        </div>
                        <div onClick={()=> navigate(`/admin/jobs/${job._id}/application`)} className='flex item-center w-fit gap-2 cursor-pointer mt-2'>
                           <Eye className='w-4'/>
                           <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;