import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { UpdateCourseLevel } from '../../core/Services/api/CourseLevels/UpdateCourseLevel'
import { UpdateTechnology } from '../../core/Services/api/Technology/UpdateTechnology'

const ModalUpdate = ({ show, setShow, refetch, selectedItem }) => {
    const SignupSchema = yup.object().shape({
        techName: yup.string().required('  نام تکنولوژی را وارد کنید').min(4, ' تکنولوژی باید حداقل 4 حرف داشته باشد '),
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
          techName: data.techName,
          describe: data.describe,
          iconAddress: selectedItem.iconAddress,
          id: selectedItem.id
        }

        const response = await UpdateTechnology(dataObj)
        if(response.success == true){
            refetch()
            toast.success(response.message)
            setShow(false)
        }
        }
    
      return (
        <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
          <ModalHeader>
            <CardTitle tag='h2' className='my-2'> تغییر تکنولوژی </CardTitle>
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
                  defaultValue={selectedItem.techName}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='نام تکنولوژی' invalid={errors.techName && true} />}
                />
                {errors.techName && <FormFeedback>{errors.techName.message}</FormFeedback>}
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
