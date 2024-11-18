// ** React Imports
import { Fragment, useState } from 'react'

import {
  X,
  MoreVertical,
  Trash2,
  Edit
} from 'react-feather'

import {
  Badge,
  Button,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Spinner,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'

// ** Images
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { GetGroupCourse } from '../../../core/Services/api/CourseGroup/GetGroupCourse'
import { DeleteGroup } from '../../../core/Services/api/CourseGroup/DeleteGroup'
import ModalGroup from '../../ModalCourp/ModalGroup'
import EditModalGroup from '../../ModalCourp/EditModalGroup'

const GroupListCourse = ({ Course }) => {

  const {id} = useParams()

  const {data: Group, refetch: refetchGroup, isLoading: isLoadingGroup} = useQuery({queryKey: ['GetGroupCourse', Course?.teacherId, Course?.courseId], queryFn: () => GetGroupCourse(Course?.teacherId, Course?.courseId)})
  const itemsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingGroupId, setEditingGroupId] = useState(null)

  const filteredCourses = Group
  ? Group.filter(course => {
      const matchesSearch = course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.studentName?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
  : [];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const toggleModal2 = (groupId) => {
    setEditingGroupId(groupId === editingGroupId ? null : groupId)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);


  return (
    <Fragment>
        <ModalGroup refetch={refetchGroup} isOpen={isModalOpen} toggleModal={toggleModal} CourseId={id} />
        <div className='d-flex justify-content-between w-100'>
            <CardTitle> گروه ها </CardTitle>
            <Button style={{height: '40px', width: '160px'}} color='primary' onClick={toggleModal}> ساخت گروه جدید </Button>
        </div>
        {Group?.length > 0 ? <Table hover responsive>
        <thead>
        <tr>
            <th style={{whiteSpace: 'nowrap'}}>#</th>
            <th style={{whiteSpace: 'nowrap'}}>نام گروه</th>
            <th style={{whiteSpace: 'nowrap'}}>نام مدرس</th>
            <th style={{whiteSpace: 'nowrap'}}>طرفیت گروه</th>
            <th style={{whiteSpace: 'nowrap'}}>نام دوره</th>
            <th>  </th>
        </tr>
        </thead>
        {isLoadingGroup ? <div className='d-flex justify-content-center py-5'> <Spinner /> </div> : <tbody>
        {filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((course, index) => (
            <tr key={course.groupId}>
            <td style={{height: '70px', whiteSpace: 'nowrap'}}> {(currentPage - 1) * itemsPerPage + index + 1} </td>
            <td style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>{course.groupName}</td>
            <td style={{whiteSpace: 'nowrap'}}>{(course.teacherName).replace('-', ' ')}</td>
            <td style={{whiteSpace: 'nowrap'}}>{course.groupCapacity}</td>
            <td style={{whiteSpace: 'nowrap'}}>{course.courseName}</td>
            <td>
            <UncontrolledDropdown className='position-static'>
                <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer' />
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem
                tag='a'
                className='w-100'
                onClick={async (e) => {
                    e.preventDefault()
                    const formData = new FormData()
                    formData.append('Id', course.groupId)
                    const response = await DeleteGroup(formData)
                    if(response.success === true){
                    toast.success(' حذف انجام شد ')
                    refetchGroup()
                    }
                }}
                >
                <Trash2 size={14} className='me-50 text-danger' />
                <span className='align-middle text-danger'> حذف </span>
                </DropdownItem>
                <DropdownItem
                tag='a'
                className='w-100'
                onClick={() => toggleModal2(course.groupId)}
                >
                <Edit size={14} className='me-50' />
                <span className='align-middle'> ویرایش </span>
                <EditModalGroup refetch={refetchGroup} isOpen={editingGroupId === course.groupId} toggleModal={() => toggleModal2(course.groupId)} CourseId={id}
                GroupId={course.groupId} GroupName={course.groupName} GroupCapacity={course.groupCapacity} />
                </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            </td>
            </tr>
        ))}
        </tbody>}
        </Table> : <div style={{height: '20px'}}> <Badge color='danger'> <X /> </Badge> گروهی موجود نیست </div>}
        <Pagination>
        {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index + 1} active={index + 1 === currentPage}>
            <PaginationLink onClick={() => handlePageChange(index + 1)}>
                {index + 1}
            </PaginationLink>
            </PaginationItem>
        ))}
        </Pagination>
    </Fragment>
  )
}

export default GroupListCourse
