// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import Chart from 'react-apexcharts'
import { Circle } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
import { useQuery } from 'react-query'
import { GetCoursePayments } from '../../../../core/Services/api/Payment/GetCoursePayments'
import { GetTotalNews } from '../../../../core/Services/api/New/GetTotalNews'
import { GetTotalActiveNews } from '../../../../core/Services/api/New/GetTotalAvtiveNews'
import classNames from 'classnames'

const ProductOrders = props => {
  // ** State
  const {data: Actives, isLoading: isLoading, refetch: refetchL} = useQuery({queryKey: ['GetTotalNews'], queryFn: GetTotalNews})
  const {data: UnActives, isLoading: loadingActive, refetch: refetchA} = useQuery({queryKey: ['GetTotalActiveNews'], queryFn: GetTotalActiveNews})
  const Total = UnActives?.totalCount + Actives?.totalCount
  const Accept = ((Actives?.totalCount / Total) * 100 ).toFixed(0)
  const UnAccept = ((UnActives?.totalCount / Total) * 100 ).toFixed(0)

  const options = {
      labels: ['فعال', 'غیر فعال'],
      classNames: 'iranSans',
      plotOptions: {
        radialBar: {
          size: 150,
          hollow: {
            size: '30%'
          },
          track: {
            strokeWidth: '100%',
            margin: 15
          },
          dataLabels: {
            value: {
              fontSize: '1rem',
              colors: '#5e5873',
              fontWeight: '500',
              offsetY: 5
            },
            total: {
              show: true,
              label: ' تعداد کل ',
              fontSize: '1.286rem',
              colors: '#5e5873',
              fontWeight: '500',

              formatter() {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return Total
              }
            }
          }
        }
      },
      colors: [props.primary, props.danger],
      stroke: {
        lineCap: 'round'
      },
      chart: {
        height: 355,
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1
        }
      }
    },
    series = [Accept, UnAccept]

  return Actives !== null ? (
    <Card className='iranSans'>
      <CardHeader>
        <CardTitle tag='h4'> وضعیت اخبار و مقالات </CardTitle>
        <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
            جدیدترین آمار
          </DropdownToggle>
          <DropdownMenu end>
            {/* {data?.last_days.map(item => (
              <DropdownItem className='w-100' key={item}>
                {item}
              </DropdownItem>
            ))} */}
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type='radialBar' height={325} />
        <div className='d-flex justify-content-between mb-1'>
          <div className='d-flex align-items-center'>
            <Circle size={15} className='text-primary' />
            <span className='fw-bold ms-75'> فعال </span>
          </div>
          {/* <span>{data?.chart_info.finished}</span> */}
        </div>
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            <Circle size={15} className='text-danger' />
            <span className='fw-bold ms-75'> غیر فعال </span>
          </div>
          {/* <span>{data?.chart_info.rejected}</span> */}
        </div>
      </CardBody>
    </Card>
  ) : null
}
export default ProductOrders
