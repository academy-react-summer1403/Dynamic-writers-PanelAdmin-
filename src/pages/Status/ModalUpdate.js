import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { UpdateStatus } from '../../core/Services/api/Status/UpdateStatus'

const ModalUpdate = ({ show, setShow, refetch, selectedItem }) => {
    const SignupSchema = yup.object().shape({
        statusName: yup.string().required('  نام وضعیت را وارد کنید').min(5, ' وضعیت باید حداقل 5 حرف داشته باشد '),
        describe: yup.string().required(' توضحیات  را وارد کنید').min(5, ' توضیحات باید حداقل 5 حرف داشته باشد '),
      })
    
      const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
      } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    
      const onSubmit = async data => {
        const dataObj = {
          statusName: data.statusName,
          describe: data.describe,
          statusNumber: selectedItem.statusNumber,
          id: selectedItem.is
        }

        const response = await UpdateStatus(dataObj)
        if(response.success == true){
            refetch()
            toast.success(response.message)
            setShow(false)
        }
        }
    
      return (
        <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
          <ModalHeader>
            <CardTitle tag='h2' className='my-2'> تغییر وضعیت </CardTitle>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col lg='12' className='mb-1'>
                <Label className='form-label' for='statusName'>
                  وضعیت
                </Label>
                <Controller
                  id='statusName'
                  name='statusName'
                  defaultValue={selectedItem.statusName}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='نام وضعیت' invalid={errors.statusName && true} />}
                />
                {errors.statusName && <FormFeedback>{errors.statusName.message}</FormFeedback>}
              </Col>
              <Col lg='12' className='mb-1'>
                <Label className='form-label' for='describe'>
                  توضیحات
                </Label>
                <Controller
                  id='describe'
                  name='describe'
                  defaultValue={selectedItem.describe}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='توضیحات' invalid={errors.describe && true} />}
                />
                {errors.describe && <FormFeedback>{errors.describe.message}</FormFeedback>}
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
