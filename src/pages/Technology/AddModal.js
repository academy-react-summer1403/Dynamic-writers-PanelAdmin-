import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { AddTechnology } from '../../core/Services/api/Technology/AddTechnology'

const AddModal = ({ show, setShow, refetch }) => {
    const SignupSchema = yup.object().shape({
        techName: yup.string().required('  نام تکنولوژی را وارد کنید').min(4, ' تکنولوژی باید حداقل 4 حرف داشته باشد '),
      })
    
      const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
      } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    
      const onSubmit = async data => {
        const dataObj = {
          techName: data.techName,
          describe: data.techName,
          iconAddress: 'string'
        }

        const response = await AddTechnology(dataObj)
        if(response.success == true){
            refetch()
            toast.success(response.message)
            setShow(false)
        }
        }
    
      return (
        <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
          <ModalHeader>
            <CardTitle tag='h2' className='my-2'>  ساخت تکنولوژی جدید  </CardTitle>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col lg='12' className='mb-1'>
                <Label className='form-label' for='techName'>
                  نام تکنولوژی
                </Label>
                <Controller
                  id='techName'
                  name='techName'
                  defaultValue=''
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='نام تکنولوژی' invalid={errors.techName && true} />}
                />
                {errors.techName && <FormFeedback>{errors.techName.message}</FormFeedback>}
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
