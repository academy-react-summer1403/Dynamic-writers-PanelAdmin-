import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { UpdateAssistant } from '../../core/Services/api/Assistants/UpdateAssistant'

const ModalUpdate = ({ show, setShow, refetch, selectedAssistant }) => {
    const SignupSchema = yup.object().shape({
        userId: yup.string().required(' شناسه کاربر را وارد کنید '),
      })
    
      const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
      } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    
      const onSubmit = async data => {
        const dataObj = {
            courseId: selectedAssistant.courseId,
            userId: data.userId,
            id: selectedAssistant.id,
        }

        const response = await UpdateAssistant(dataObj)
        if(response.success == true){
            refetch()
            toast.success(response.message)
            setShow(false)
        }
        }
    
      return (
        <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
          <ModalHeader>
            <CardTitle tag='h2' className='my-2'> تغییر منتور </CardTitle>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col lg='12' className='mb-1'>
                <Label className='form-label' for='userId'>
                  شناسه کاربر
                </Label>
                <Controller
                  id='userId'
                  name='userId'
                  defaultValue=''
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='شناسه کاربر' invalid={errors.userId && true} />}
                />
                {errors.userId && <FormFeedback>{errors.userId.message}</FormFeedback>}
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
