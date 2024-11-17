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
import { GetCategoryNews } from '../../../core/Services/api/Category/GetCategoryNews'

const UsersList = () => {
  
  const [RowsOfPage, setRowsOfPage] = useState(5)
  const [PageNumber, setPageNumber] = useState(1)
  const [Query, setQuery] = useState('')

  const {data: CategoryNewsList, refetch, isLoading} = useQuery({
    queryKey: ['GetCategoryNewsList'], 
    queryFn: () => GetCategoryNews(),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  })

  return (
    <>
    {isLoading ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <div className='app-user-list'>
      <Table NewsList={CategoryNewsList} isLoading={isLoading} refetch={refetch}/>
    </div>}
    </>
  )
}

export default UsersList
