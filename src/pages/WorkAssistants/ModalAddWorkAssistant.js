import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { UpdateAssistant } from '../../core/Services/api/Assistants/UpdateAssistant'
import { UpdateWorkAssistant } from '../../core/Services/api/WorkAssistants/UpdateWorkAssistant'
import moment from 'moment'
import { AddWorkAssistant } from '../../core/Services/api/WorkAssistants/AddWorkAssistant'

const ModalAddWorkAssistant = ({ show, setShow, refetch, selectedAssistant }) => {
    const SignupSchema = yup.object().shape({
        worktitle: yup.string().required(' نام فعالیت را وارد کنید ').min(5, ' نام فعالیت باید بیشتر از 5 حرف باشد '),
        workDescribe: yup.string().required(' توضیحات فعالیت را وارد کنید ').min(5, ' توضیحات باید بیشتر از 5 حرف باشد '), 
      })
    
      const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
      } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    
      const onSubmit = async data => {
        const dataObj = {
            worktitle: data.worktitle,
            workDescribe: data.workDescribe,
            assistanceId: selectedAssistant.id,
            workDate:  moment().format('YYYY-MM-DDTHH:mm:ss')
          }

        const response = await AddWorkAssistant(dataObj)
        if(response.success == true){
            refetch()
            toast.success(response.message)
            setShow(false)
        }
        }
    
      return (
        <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
          <ModalHeader>
            <CardTitle tag='h2' className='my-2'> تغییر مشخصات </CardTitle>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col lg='12' className='mb-1'>
                <Label className='form-label' for='worktitle'>
                  نام فعالیت
                </Label>
                <Controller
                  id='worktitle'
                  name='worktitle'
                  defaultValue=''
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='نام فعالیت' invalid={errors.worktitle && true} />}
                />
                {errors.worktitle && <FormFeedback>{errors.worktitle.message}</FormFeedback>}
              </Col>
              <Col lg='12' className='mb-1'>
                <Label className='form-label' for='workDescribe'>
                  توضیحات فعالیت
                </Label>
                <Controller
                  id='workDescribe'
                  name='workDescribe'
                  defaultValue=''
                  control={control}
                  render={({ field }) => <Input {...field} placeholder='توضیحات فعالیت' invalid={errors.workDescribe && true} />}
                />
                {errors.workDescribe && <FormFeedback>{errors.workDescribe.message}</FormFeedback>}
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

export default ModalAddWorkAssistant
