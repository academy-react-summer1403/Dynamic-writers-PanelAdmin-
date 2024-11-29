// ** Third Party Components
import { useQuery } from '@tanstack/react-query';
import Chart from 'react-apexcharts';
import { Card, CardTitle, CardBody, Row, Col } from 'reactstrap';
import { GetCourseTotal } from '../../../../core/Services/api/Course/GetCourseTotal';
import { GetTotalActiveCourse } from '../../../../core/Services/api/Course/ActiveCoursesTotal';

const Earnings = ({ themeColors }) => {
  const { data: courseTotal, isLoading: loadingCourseTotal } = useQuery({
    queryKey: ['GetTotalCourse'],
    queryFn: GetCourseTotal
  });
  const { data: Actives, isLoading: loadingActives } = useQuery({
    queryKey: ['GetActiveTotal'],
    queryFn: GetTotalActiveCourse
  });

  const ActiveS =
    courseTotal?.totalCount && Actives?.totalCount
      ? ((Actives.totalCount / courseTotal.totalCount) * 100).toFixed(0)
      : 0;

  const RemoveS =
    courseTotal?.totalCount && Actives?.totalCount
      ? (((courseTotal.totalCount - Actives.totalCount) / courseTotal.totalCount) * 100).toFixed(0)
      : 0;

  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: { show: false },
    comparedResult: [2, -3],
    stroke: { width: 0 },
    labels: ['فعال', 'غیرفعال'],
    colors: [themeColors?.primary || '#3498db', themeColors?.danger || '#ff9999'],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20
      }
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 15
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)} %`;
              }
            },
            total: {
              show: true,
              offsetY: 15,
              label: 'فعال',
              formatter() {
                return parseFloat(ActiveS) + ' %';
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120
          }
        }
      }
    ]
  };

  if (loadingCourseTotal || loadingActives) {
    return (
      <Card className="earnings-card">
        <CardBody className="text-center">
          <div>در حال بارگذاری...</div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="earnings-card iranSans">
      <CardBody>
        <Row>
          <Col xs="6" className="d-flex justify-content-between" style={{ flexDirection: 'column' }}>
            <CardTitle className="mb-1 font-bold">وضعیت دوره‌ها</CardTitle>
            <div className="d-flex" style={{ flexDirection: 'column' }}>
              <div className="font-small-1">
                تعداد دوره‌های ساخته‌شده توسط اساتید <strong>{courseTotal?.totalCount || '...'}</strong> دوره است
              </div>
              <div className="font-small-1">
                که تعداد دوره‌های فعال<strong> %{ActiveS} </strong> است و
                <strong> %{RemoveS} </strong> آن غیرفعال است
              </div>
            </div>
          </Col>
          <Col xs="6">
            <Chart
              options={options}
              series={[parseFloat(ActiveS), parseFloat(RemoveS)]}
              className="iranSans"
              type="donut"
              height={120}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Earnings;
