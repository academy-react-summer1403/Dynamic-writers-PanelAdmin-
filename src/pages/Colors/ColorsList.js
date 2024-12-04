import { useState } from 'react'
import { Spinner, Pagination, PaginationItem, PaginationLink, Input, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useQuery } from '@tanstack/react-query'
import { Edit } from 'react-feather'
import { GetColors } from '../../core/Services/api/SiteSettings/GetColors'
import jMoment from 'jalali-moment'
import AddModal from './AddModal'
import { DeleteColors } from '../../core/Services/api/SiteSettings/DeleteColors'
import toast from 'react-hot-toast'

const ColorsList = () => {
  const { data: technology, isLoading, isFetching, error, refetch } = useQuery({ queryKey: ['GetColors'], queryFn: GetColors })
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const [showAddColorModal, setShowAddColorModal] = useState(false)

  const filteredCourses = technology
    ? technology.filter(course =>
        course.colorData?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : []

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)

  const renderPaginationItems = () => {
    const pages = [];
    const maxVisiblePages = 7;
    const delta = 2; 

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > delta + 3) {
        pages.push("...");
      }
      const startPage = Math.max(2, currentPage - delta);
      const endPage = Math.min(totalPages - 1, currentPage + delta);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - delta - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages.map((page, index) =>
      page === "..." ? (
        <PaginationItem key={`ellipsis-${index}`} disabled>
          <PaginationLink>...</PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationItem key={page} active={page === currentPage}>
          <PaginationLink onClick={() => handlePageChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    );
  };

  if (isLoading || isFetching)
    return (
      <div className="d-flex" style={{ justifyContent: 'center', paddingTop: '250px' }}>
        {' '}
        <Spinner />{' '}
      </div>
    )
  if (error) return <div>خطا در بارگذاری داده‌ها</div>

  return (
    <>
      <div className="mb-3 d-flex align-items-center iranSans gap-1" style={{flexFlow: 'row wrap'}}>
        <div>
          <Input
            id="search"
            name="search"
            type="text"
            className="iranSans"
            placeholder="جستجو بر اساس نام رنگ..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '200px' }}
          />
        </div>
        <Button color="primary" style={{ height: '40px' }} onClick={() => setShowAddColorModal(true)}>
          ساخت رنگ جدید
        </Button>
        <Button color="danger" style={{ height: '40px' }} onClick={async () => {
            const response = await DeleteColors()

            if(response.success === true){
                toast.success(response.message)
                refetch()
            }
        }}>
          حذف همه
        </Button>
      </div>

      {isLoading || isFetching ? (
        <div className="d-flex" style={{ justifyContent: 'center', margin: '50px' }}>
          {' '}
          <Spinner />{' '}
        </div>
      ) : (
        <div>
          <div className="d-flex flex-wrap">
            {filteredCourses.length === 0 ? (
              <div className="w-100 text-center">هیچ رنگی ثبت نشده است</div>
            ) : (
              filteredCourses
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((tech, index) => {
                  const colors = JSON.parse(tech.colorData.replace(/(\w+)/g, '"$1"'))

                  return (
                    <UncontrolledDropdown key={index} className="card m-2" style={{ width: '18rem' }}>
                      <DropdownToggle tag="div" className="card-body" style={{ cursor: 'pointer' }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h6 className="card-title mb-1" style={{ fontSize: '16px' }}>
                              {jMoment(tech.date).locale('fa').format('jD jMMMM jYYYY')}
                            </h6>
                            <div className="d-flex flex-wrap">
                              {colors.length > 0 ? (
                                colors.map((color, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      width: '30px',
                                      height: '30px',
                                      backgroundColor: color.trim(),
                                      marginRight: '5px',
                                      borderRadius: '50%',
                                    }}
                                  />
                                ))
                              ) : (
                                <span>هیچ رنگی برای این مورد وجود ندارد</span>
                              )}
                            </div>
                          </div>
                          <Edit size={20} className="text-primary" />
                        </div>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <Edit size={14} className="me-50 text-primary" />
                          <span className="align-middle text-primary">تغییر مشخصات</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )
                })
            )}
          </div>

          <Pagination className="d-flex mt-3">
            {renderPaginationItems()}
          </Pagination> 
        </div>
      )}
      {showAddColorModal && <AddModal refetch={refetch} setShow={setShowAddColorModal} show={showAddColorModal} />}
    </>
  )
}

export default ColorsList
