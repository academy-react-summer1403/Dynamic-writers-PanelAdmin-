import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { AddSchedule } from '../../core/Services/api/Schedule/AddSchedule'
import { GetDetailCourse } from '../../core/Services/api/Course/GetDetailCourse'
import { GetGroupCourse } from '../../core/Services/api/CourseGroup/GetGroupCourse'

const AddModal = ({ show, setShow, refetch, selectedItem }) => {

  const SignupSchema = yup.object().shape({
    startDate: yup.date().required('تاریخ شروع را وارد کنید').nullable(),
    startTime: yup.string().required('زمان شروع را وارد کنید'),
    endTime: yup.string().required('زمان پایان را وارد کنید'),
    weekNumber: yup.number().required('شماره هفته را وارد کنید').min(1, 'شماره هفته باید حداقل 1 باشد').max(52, 'شماره هفته نباید بیشتر از 52 باشد')
  })

  const {data: course} = useQuery({queryKey: ['GetDetailCourse'], queryFn: () => GetDetailCourse(selectedItem)})
  const {data: group} = useQuery({queryKey: ['GetGroupCourse'], queryFn: () => GetGroupCourse(course?.teacherId, selectedItem), enabled: !!course})

  console.log(group)

  const [currentGroup, setCurrentGroup] = useState({ value: null, label: ' انتخاب کنید '})
  const groupOptions = group?.map(item => ({value: item.groupId, label: item.groupName}))

  const { reset, control, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SignupSchema)
  })

  const timeToNumber = (time) => {
    const [hour] = time.split(':'); 
    return parseInt(hour, 10); 
  };

  const onSubmit = async (data) => {
    const startTimeNumber = timeToNumber(data.startTime);
    const endTimeNumber = timeToNumber(data.endTime);

    const dataObj = {
      courseGroupId: currentGroup.value,
      startDate: data.startDate,
      startTime: startTimeNumber,
      endTime: endTimeNumber,
      weekNumber: data.weekNumber
    }

    const response = await AddSchedule(selectedItem, dataObj)
    if (response.success == true) {
        refetch()
        toast.success(response.message)
        setShow(false)
    }
  }

  return (
    <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
      <ModalHeader>
        <CardTitle tag='h2' className='my-2'>ایجاد زمان بندی</CardTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          <Col lg='12' className='mb-1'>
              <Label className='form-label' for='courseGroupId'>
                گروه
              </Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                id={`courseGroupId`}
                className='react-select'
                classNamePrefix='select'
                options={groupOptions}
                value={currentGroup}
                onChange={data => setCurrentGroup(data)}
              />
            </Col>
            <Col lg='12' className='mb-1'>
              <Label className='form-label' for='startDate'>
                تاریخ شروع
              </Label>
              <Controller
                id='startDate'
                name='startDate'
                defaultValue=''
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
                defaultValue=''
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
                defaultValue=''
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
                defaultValue=''
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

export default AddModal
