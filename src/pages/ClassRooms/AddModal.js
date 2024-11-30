import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { GetBuildings } from '../../core/Services/api/Buildings/GetBuildings'
import { useState } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { AddClassRoom } from '../../core/Services/api/ClassRooms/AddClassRoom'

const AddModal = ({ show, setShow, refetch }) => {

    const {data} = useQuery({queryKey: ['GetBuildings'], queryFn: GetBuildings})

    const [currentBuildingId, setCurrentBuildingId] = useState({value: 0, label: 'انتخاب کنید'})
    const buildingIdOptions = data
  ? data.filter(type => type.active).map(type => ({
      value: type.id,
      label: type.buildingName
    }))
  : []

    const SignupSchema = yup.object().shape({
        classRoomName: yup.string().required('نام کلاس کاربر را وارد  ').min(5, 'باید بیشتر از 5 حرف باشد').max(500, ' باید کمتر از 500 حرف باشد '),
        capacity: yup.number().min(1, ' ظرفیت باید بیشتر از 1 باشد ').max(200, ' ظرفیت نمی تواند بیشتر از 200 نفر یاشد '),
      })
    
      const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
      } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    
      const onSubmit = async data => {
        if(currentBuildingId.value === 0){
            toast.error(' ساختمان را انتخاب کنید ')
        }  
        else{
            const dataObj = {
                id: 1,
                classRoomName: data.classRoomName,
                capacity: data.capacity,
                buildingId: currentBuildingId.value
              }
              console.log(dataObj)
      
              const response = await AddClassRoom(dataObj)
              if(response.success == true){
                  refetch()
                  toast.success(response.message)
                  setShow(false)
              }
        }
      }
    
      return (
        <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
          <ModalHeader>
            <CardTitle tag='h2' className='my-2'> ساخت کلاس </CardTitle>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col lg='12' className='mb-1'>
                <Label className='form-label' for='classRoomName'>
                  نام کلاس
                </Label>
                <Controller
                  id='classRoomName'
                  name='classRoomName'
                  defaultValue=''
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='نام کلاس' invalid={errors.classRoomName && true} />}
                />
                {errors.classRoomName && <FormFeedback>{errors.classRoomName.message}</FormFeedback>}
              </Col>
              <Col lg='12' className='mb-1'>
                <Label className='form-label' for='capacity'>
                  ظرفیت
                </Label>
                <Controller
                  id='capacity'
                  name='capacity'
                  defaultValue=''
                  control={control}
                  render={({ field }) => <Input {...field} type='number' placeholder=' ظرفیت ' invalid={errors.capacity && true} />}
                />
                {errors.capacity && <FormFeedback>{errors.capacity.message}</FormFeedback>}
              </Col>
              <Col lg='12' className='mb-1'>
                <Label className='form-label' for='buildingId'>
                  ساختمان
                </Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  id={`ClassId`}
                  className='react-select'
                  classNamePrefix='select'
                  options={buildingIdOptions}
                  value={currentBuildingId}
                  onChange={data => {
                    setCurrentBuildingId(data)
                  }}
                />
              </Col>
              <div className='d-flex'>
                <Button className='me-1' color='primary' type='submit'>
                  تایید
                </Button>
                <Button outline color='secondary' type='reset' onClick={()=>setShow(false)}>
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
