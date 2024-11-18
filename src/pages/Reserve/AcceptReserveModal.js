import { Fragment, useEffect, useState } from 'react'
import {
  Row,
  Col,
  Modal,
  Label,
  Button,
  ModalBody,
  ModalHeader,
} from 'reactstrap'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AcceptReserve } from '../../core/Services/api/Course/AcceptReserve'
import { useQuery } from '@tanstack/react-query'
import { GetGroupCourse } from '../../core/Services/api/CourseGroup/GetGroupCourse'
import { GetDetailCourse } from '../../core/Services/api/Course/GetDetailCourse'

const AcceptReserveModal = ({ show, setShow, selectedItem, refetch }) => {
  
  const navigate = useNavigate()
  const [currentAccept, setCurrentAccept] = useState({ value: '', label: 'انتخاب کنید' })

  const { data: course, refetch: refetchCourse } = useQuery({
    queryKey: ['GetDetailCourse', selectedItem?.courseId],
    queryFn: () => GetDetailCourse(selectedItem?.courseId),
  })

  const { data: Group, refetch: refetchGroup } = useQuery({
    queryKey: ['GetGroupCourse', course?.teacherId, selectedItem?.courseId],
    queryFn: () => GetGroupCourse(course?.teacherId, selectedItem?.courseId),
  })

  const AcceptOption = Group?.map(group => ({ value: group.groupId, label: group.groupName }))

  useEffect(() => {
    if (show && Group?.length === 0) {
      toast.error('این دوره گروهی ندارد ابتدا برای این دوره گروهی بسازید و بعد دوباره تلاش کنید!!!')
      setShow(false)
      navigate(`/courses/view/${selectedItem.courseId}`)
    }
  }, [Group, show])

  useEffect(() => {
    if (show) {
      setCurrentAccept({ value: '', label: 'انتخاب کنید' })
      refetchCourse()
      refetchGroup()
    }
  }, [show])

  const { reset, handleSubmit } = useForm()

  const onSubmit = async () => {
    const response = await AcceptReserve(selectedItem.courseId, selectedItem.studentId, currentAccept.value)
    if (response.success) {
      toast.success(response.message)
      setShow(false)
      reset()
      refetch()
    }
  }

  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered iranSans'
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <h1 className='text-center mb-1'> قبول کردن دوره </h1>
          <Row tag='form' className='gy-1 gx-2 mt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col lg='12' className='mb-1'>
              <Label className='form-label' for='CourseTypeId'>
                گروه
              </Label>
              <Select
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: '#f3f3f3',
                    primary: '#7367f0',
                  },
                })}
                isClearable={false}
                id='CourseTypeId'
                className='react-select'
                classNamePrefix='select'
                options={AcceptOption}
                value={currentAccept}
                onChange={(data) => setCurrentAccept(data)}
              />
            </Col>
            <Col className='text-center mt-1' xs={12}>
              <Button type='submit' className='me-1' color='primary'>
                تایید
              </Button>
              <Button
                color='secondary'
                outline
                onClick={() => {
                  setShow(!show)
                  reset()
                }}
              >
                برگشت
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AcceptReserveModal
