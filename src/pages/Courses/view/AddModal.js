import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { AddSocialGroup } from '../../../core/Services/api/SocialGroup/AddSocialGroup'

const AddModal = ({ show, setShow, refetch, id }) => {
    const SignupSchema = yup.object().shape({
        groupName: yup.string().required('  نام گروه را وارد کنید').min(4, ' گروه باید حداقل 4 حرف داشته باشد '),
        groupLink: yup.string().required(' توضحیات  را وارد کنید').min(5, ' توضیحات باید حداقل 5 حرف داشته باشد '),
      })
    
      const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
      } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    
      const onSubmit = async data => {
        const dataObj = {
          groupName: data.groupName,
          groupLink: data.groupLink,
          courseId: id
        }

        const response = await AddSocialGroup(dataObj)
        if(response.success == true){
            refetch()
            toast.success(response.message)
            setShow(false)
        }
        }
    
      return (
        <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
          <ModalHeader>
            <CardTitle tag='h2' className='my-2'>  ساخت گروه جدید  </CardTitle>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col lg='12' className='mb-1'>
                <Label className='form-label' for='groupName'>
                  نام گروه
                </Label>
                <Controller
                  id='groupName'
                  name='groupName'
                  defaultValue=''
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='نام گروه' invalid={errors.groupName && true} />}
                />
                {errors.groupName && <FormFeedback>{errors.groupName.message}</FormFeedback>}
              </Col>
              <Col lg='12' className='mb-1'>
                <Label className='form-label' for='groupLink'>
                  لینک گروه
                </Label>
                <Controller
                  id='groupLink'
                  name='groupLink'
                  defaultValue=''
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='لینک گروه' invalid={errors.groupLink && true} />}
                />
                {errors.groupLink && <FormFeedback>{errors.groupLink.message}</FormFeedback>}
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
