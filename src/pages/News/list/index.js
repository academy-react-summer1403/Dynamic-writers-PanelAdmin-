// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col, Spinner } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { File, X } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useQuery } from '@tanstack/react-query'
import { GetTotalActiveNews } from '../../../core/Services/api/New/GetTotalAvtiveNews'
import { GetTotalNews } from '../../../core/Services/api/New/GetTotalNews'
import { useState } from 'react'
import { GetNewsList } from '../../../core/Services/api/New/GetNewsList'

const UsersList = () => {
  
  const {data: NewsList2, isLoading: isLoading2, refetch: refetchL} = useQuery({queryKey: ['GetTotalNews'], queryFn: GetTotalNews})
  const {data: Actives, isLoading: loadingActive, refetch: refetchA} = useQuery({queryKey: ['GetTotalActiveNews'], queryFn: GetTotalActiveNews})

  const [RowsOfPage, setRowsOfPage] = useState(5)
  const [PageNumber, setPageNumber] = useState(1)
  const [Query, setQuery] = useState('')
  const [IsActive, setIsActive] = useState(true)

  const {data: NewsList, refetch, isLoading, isFetching} = useQuery({
    queryKey: ['GetNewsList', RowsOfPage,PageNumber,IsActive,Query], 
    queryFn: () => GetNewsList(RowsOfPage,PageNumber,IsActive,Query),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  })

  return (
    <>
    {isLoading2 ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <div className='app-user-list'>
      <Row>
        <Col lg='6' sm='4' onClick={() => {setIsActive(false), setPageNumber(1)}}>
          <StatsHorizontal
            color='danger'
            statTitle=' مقالات غیر فعال شده'
            icon={<X size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{Actives?.totalCount || ''}</h3>}
          />
        </Col>
        <Col lg='6' sm='4' onClick={() => {setIsActive(true), setPageNumber(1)}}>
          <StatsHorizontal
            color='success'
            statTitle=' مقالات فعال '
            icon={<File size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{NewsList2?.totalCount}</h3>}
          />
        </Col>
      </Row>
      <Table NewsList={NewsList} RowsOfPage={RowsOfPage} setRowsOfPage={setRowsOfPage} PageNumber={PageNumber} setPageNumber={setPageNumber} Query={Query} setQuery={setQuery} isLoading={isLoading} refetch={refetch} isFetching={isFetching} refetchA={refetchA} refetchL={refetchL} />
    </div>}
    </>
  )
}

export default UsersList
