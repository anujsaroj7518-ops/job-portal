import { Edit2, MoreHorizontal } from 'lucide-react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  
  const [filterCompany, setFilterCompany] = useState([]);  // ✅ always start with []
  const navigate = useNavigate();

  useEffect(() => {
    const safeCompanies = companies || [];  // ✅ null/undefined se bachao
    
    const filtered = safeCompanies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    
    setFilterCompany(filtered);  // ✅ hamesha array set hoga
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length === 0
            ? (
              <TableRow>
                <TableCell colSpan={4}>You haven't registered any company yet.</TableCell>
              </TableRow>
            )
            : (
              filterCompany.map((company) => (
                <TableRow key={company._id}>
                  <TableCell>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={company.logo} alt={company.name} />
                      <AvatarFallback>
                        {company.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="p-2 rounded hover:bg-gray-100 cursor-pointer inline-flex">
                          <MoreHorizontal className="w-5 h-5" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-32" align="end">
                        <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded'>
                          <Edit2 className='w-4 h-4' />
                          <span>Edit</span>
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

export default CompaniesTable;