import Table from './Table'
import { Row, Col, Spinner } from 'reactstrap'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import { File, X } from 'react-feather'
import '@styles/react/apps/app-users.scss'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useState } from 'react'
import { GetBuildings } from '../../core/Services/api/Buildings/GetBuildings'

const BuildingsList = () => {
  
  const {data: Buildings, isLoading: isLoading2, refetch: refetchL} = useQuery({queryKey: ['GetBuildings'], queryFn: GetBuildings})

  const [ActiveBuilding, setActiveBuilding] = useState(0)
  const [DataBuilding, setDataBuilding] = useState([])
  useEffect(() => {
    if (isLoading2==false){
      setActiveBuilding(Buildings.filter(el => el.active==true))
      setDataBuilding(Buildings)
    }
  
  }, [isLoading2,Buildings])
  

  return (
    <>
    {isLoading2 ? <div className='d-flex' style={{justifyContent: 'center', margin: '50px'}}> <Spinner /> </div> : <div className='app-user-list'>
      <Row>
        <Col lg='6' sm='4' onClick={() => {setDataBuilding(Buildings.filter(el => el.active==false))}}>
          <StatsHorizontal
            color='danger'
            statTitle=' ساختمان های غیر فعال شده'
            icon={<X size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{Buildings.length-ActiveBuilding.length || ''}</h3>}
          />
        </Col>
        <Col lg='6' sm='4' onClick={() => {setDataBuilding(ActiveBuilding)}}>
          <StatsHorizontal
            color='success'
            statTitle=' ساختمان های فعال '
            icon={<File size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{ActiveBuilding.length}</h3>}
          />
        </Col>
      </Row>
      <Table Buildings={DataBuilding} refetchL={refetchL} isLoading={isLoading2}/>
    </div>}
    </>
  )
}

export default BuildingsList
