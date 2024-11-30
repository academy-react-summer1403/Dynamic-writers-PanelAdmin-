import { Edit } from 'react-feather'
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Spinner, Input, Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { GetCourseLevels } from '../../core/Services/api/CourseLevels/GetCourseLevels'
import ModalUpdate from './ModalUpdate'
import AddCourseLevelModal from './AddCourseLevelModal'

const CourseLevelsList = () => {
    const { data: assistants, isLoading, isFetching, error, refetch } = useQuery({ queryKey: ['GetCourseLevels'], queryFn: GetCourseLevels })

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredCourses = assistants
        ? assistants.filter(course =>
            course.levelName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const navigate = useNavigate();

    const [show, setShow] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const [show2, setShow2] = useState(false)

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

    if (isLoading || isFetching) return <div className='d-flex' style={{ justifyContent: 'center', paddingTop: '250px' }}> <Spinner /> </div>;
    if (error) return <div>خطا در بارگذاری داده‌ها</div>;

    return (
        <>
            <div className="mb-3 d-flex align-items-center iranSans gap-1">
                <div>
                    <Input
                        id='search'
                        name='search'
                        type="text"
                        className='iranSans'
                        placeholder="جستجو بر اساس سطح..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{ width: '250px' }}
                    />
                </div>
                <Button color='primary' style={{height: '40px'}} onClick={() => {setShow2(true)}}> ساخت سطح جدید </Button>
            </div>

            {isLoading || isFetching ? (
                <div className='d-flex' style={{ justifyContent: 'center', margin: '50px' }}> <Spinner /> </div>
            ) : (
                <div>
                    <div className="d-flex flex-wrap">
                        {filteredCourses.length === 0 ? (
                            <div className="w-100 text-center">
                                هیچ سطحی ثبت نشده است
                            </div>
                        ) : (
                            filteredCourses
                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                .map((level, index) => (
                                    <UncontrolledDropdown key={index} className="card m-2" style={{ width: '18rem' }}>
                                        <DropdownToggle tag="div" className="card-body" style={{ cursor: 'pointer' }}>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <h5 className="card-title mb-1">{level.id}_ {level.levelName}</h5>
                                                    <span className="text-muted">سطح: {level.levelName}</span>
                                                </div>
                                                <Edit size={20} className="text-primary" />
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => {setShow(true), setSelectedItem(level)}}>
                                                <Edit size={14} className='me-50 text-primary' />
                                                <span className='align-middle text-primary'> تغییر مشخصات </span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                ))
                        )}
                    </div>
                    <Pagination>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index + 1} active={index + 1 === currentPage}>
                                <PaginationLink onClick={() => handlePageChange(index + 1)}>
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </Pagination>
                </div>
            )}
            {show && <ModalUpdate show={show} setShow={setShow} refetch={refetch} selectedItem={selectedItem} />}
            {show2 && <AddCourseLevelModal show={show2} setShow={setShow2} refetch={refetch} />}
        </>
    )
}

export default CourseLevelsList
