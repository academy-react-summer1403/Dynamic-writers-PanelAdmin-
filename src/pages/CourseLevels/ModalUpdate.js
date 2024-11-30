import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { UpdateCourseLevel } from '../../core/Services/api/CourseLevels/UpdateCourseLevel'

const ModalUpdate = ({ show, setShow, refetch, selectedItem }) => {
    const SignupSchema = yup.object().shape({
        levelName: yup.string().required(' سطح دوره را وارد کنید '),
      })
    
      const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
      } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    
      const onSubmit = async data => {
        const dataObj = {
            levelName: data.levelName,
            id: selectedItem.id,
        }

        const response = await UpdateCourseLevel(dataObj)
        if(response.success == true){
            refetch()
            toast.success(response.message)
            setShow(false)
        }
        }
    
      return (
        <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
          <ModalHeader>
            <CardTitle tag='h2' className='my-2'> تغییر سطح </CardTitle>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col lg='12' className='mb-1'>
                <Label className='form-label' for='levelName'>
                  نام سطح
                </Label>
                <Controller
                  id='levelName'
                  name='levelName'
                  defaultValue={selectedItem.levelName}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='نام سطح' invalid={errors.levelName && true} />}
                />
                {errors.levelName && <FormFeedback>{errors.levelName.message}</FormFeedback>}
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

export default ModalUpdate
