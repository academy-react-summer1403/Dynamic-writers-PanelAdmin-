import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { GetDepartment } from '../../core/Services/api/Department/GetDepartment'
import { UpdateSchedule } from '../../core/Services/api/Schedule/UpdateSchedule'

const ModalUpdate = ({ show, setShow, refetch, selectedItem }) => {

  const [currentForming, setCurrentForming] = useState({ value: selectedItem.forming, label: selectedItem.forming ? 'تشکیل شده' : 'تشکیل نشده' })
  const formingOptions = [
    { value: false, label: 'تشکیل نشده' },
    { value: true, label: 'تشکیل شده' }
  ]

  const [currentLock, setCurrentLock] = useState({ value: selectedItem.lockToRaise, label: selectedItem.lockToRaise ? ' حضور و غیاب شده ' : ' حضور غیاب نشده ' })
  const lockOptions = [
    { value: false, label: 'حضور و غیاب نشده' },
    { value: true, label: ' حضور و غیاب شده ' }
  ]

  const SignupSchema = yup.object().shape({
    startDate: yup.date().required('تاریخ شروع را وارد کنید').nullable(),
    startTime: yup.string().required('زمان شروع را وارد کنید'),
    endTime: yup.string().required('زمان پایان را وارد کنید'),
    weekNumber: yup.number().required('شماره هفته را وارد کنید').min(1, 'شماره هفته باید حداقل 1 باشد').max(52, 'شماره هفته نباید بیشتر از 52 باشد')
  })

  const { reset, control, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SignupSchema)
  })

  const formatTime = (hour) => {
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    return `${formattedHour}:00`;
  };

  const timeToNumber = (time) => {
    const [hour] = time.split(':'); 
    return parseInt(hour, 10);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    reset({
      startDate: selectedItem.startDate ? selectedItem.startDate.split('T')[0] : '',
      startTime: selectedItem.startTime ? formatTime(selectedItem.startTime) : formatTime(1), 
      endTime: selectedItem.endTime ? formatTime(selectedItem.endTime) : formatTime(2),       
      weekNumber: selectedItem.weekNumber || 1
    })
  }, [selectedItem, reset])

  const onSubmit = async (data) => {
    const formattedStartDate = formatDate(data.startDate);
    const startTimeNumber = timeToNumber(data.startTime);
    const endTimeNumber = timeToNumber(data.endTime);

    const dataObj = {
      courseGroupId: selectedItem.courseGroupId,
      startDate: formattedStartDate, 
      startTime: startTimeNumber,  
      endTime: endTimeNumber, 
      weekNumber: data.weekNumber,
      forming: currentForming.value,
      lockToRaise: currentLock.value,
      id: selectedItem.id
    }

    const response = await UpdateSchedule(dataObj, selectedItem.id)
    if (response.success) {
        refetch()
        toast.success(response.message)
        setShow(false)
    }
  }

  return (
    <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
      <ModalHeader>
        <CardTitle tag='h2' className='my-2'>ویرایش مشخصات</CardTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>

            <Col lg='12' className='mb-1'>
              <Label className='form-label' for='forming'>
                وضعیت
              </Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                id={`forming`}
                className='react-select'
                classNamePrefix='select'
                options={formingOptions}
                value={currentForming}
                onChange={data => setCurrentForming(data)}
              />
            </Col>

            <Col lg='12' className='mb-1'>
              <Label className='form-label' for='lockToRaise'>
                حضور و غیاب
              </Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                id={`lockToRaise`}
                className='react-select'
                classNamePrefix='select'
                options={lockOptions}
                value={currentLock}
                onChange={data => setCurrentLock(data)}
              />
            </Col>

            <Col lg='12' className='mb-1'>
              <Label className='form-label' for='startDate'>
                تاریخ شروع
              </Label>
              <Controller
                id='startDate'
                name='startDate'
                defaultValue={selectedItem.startDate ? selectedItem.startDate.split('T')[0] : ''}
                control={control}
                render={({ field }) => <Input type='date' {...field} invalid={errors.startDate && true} />}
              />
              {errors.startDate && <FormFeedback>{errors.startDate.message}</FormFeedback>}
            </Col>

            <Col lg='12' className='mb-1'>
              <Label className='form-label' for='startTime'>
                زمان شروع
              </Label>
              <Controller
                id='startTime'
                name='startTime'
                defaultValue={selectedItem.startTime ? formatTime(selectedItem.startTime) : formatTime(1)} 
                control={control}
                render={({ field }) => <Input type='time' {...field} invalid={errors.startTime && true} />}
              />
              {errors.startTime && <FormFeedback>{errors.startTime.message}</FormFeedback>}
            </Col>

            <Col lg='12' className='mb-1'>
              <Label className='form-label' for='endTime'>
                زمان پایان
              </Label>
              <Controller
                id='endTime'
                name='endTime'
                defaultValue={selectedItem.endTime ? formatTime(selectedItem.endTime) : formatTime(2)}
                control={control}
                render={({ field }) => <Input type='time' {...field} invalid={errors.endTime && true} />}
              />
              {errors.endTime && <FormFeedback>{errors.endTime.message}</FormFeedback>}
            </Col>

            <Col lg='12' className='mb-1'>
              <Label className='form-label' for='weekNumber'>
                شماره هفته
              </Label>
              <Controller
                id='weekNumber'
                name='weekNumber'
                defaultValue={selectedItem.weekNumber || 1}
                control={control}
                render={({ field }) => <Input type='number' {...field} invalid={errors.weekNumber && true} />}
              />
              {errors.weekNumber && <FormFeedback>{errors.weekNumber.message}</FormFeedback>}
            </Col>

            <div className='d-flex'>
              <Button className='me-1' color='primary' type='submit'>
                تایید
              </Button>
              <Button outline color='secondary' type='reset' onClick={() => setShow(false)}>
                برگشت
              </Button>
            </div>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default ModalUpdate
