import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { AddHomeWork } from '../../core/Services/api/Session/AddHomeWork'

const AddModalHomeWork = ({ show, setShow, refetch, selectedItem }) => {

  console.log(selectedItem)

  const SignupSchema = yup.object().shape({
    hwTitle: yup.string().required('لطفاً عنوان تکلیف را وارد کنید').min(40, ' عنوان باید بیشتر از 40 حرف باشد '),
    hwDescribe: yup.string().required('لطفاً توضیحات تکلیف را وارد کنید').min(10, ' عنوان باید بیشتر از 10 حرف باشد '),
  })

  const { reset, control, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = async (data) => {

    const dataObj = {
      sessionId: selectedItem.scheduleSessionId,
      hwTitle: data.hwTitle,
      hwDescribe: data.hwDescribe
    }

    const response = await AddHomeWork(dataObj)

    if (response.success === true) {
        refetch()
        toast.success(response.message)
        setShow(false)
    }
  }

  return (
    <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
      <ModalHeader>
        <CardTitle tag='h2' className='my-2'>ساخت تکلیف</CardTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={12} className='mb-1'>
              <Label for='hwTitle'> عنوان تکلیف </Label>
              <Controller
                name="hwTitle"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="لطفاً تکلیف را وارد کنید"
                    invalid={!!errors.hwTitle}
                  />
                )}
              />
              {errors.hwTitle && <FormFeedback>{errors.hwTitle.message}</FormFeedback>}
            </Col>

            <Col md={12} className='mb-1'>
              <Label for='hwDescribe'>توضیحات تکلیف</Label>
              <Controller
                name="hwDescribe"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="hwDescribe"
                    placeholder="لطفاً توضیحات تکلیف را وارد کنید"
                    invalid={!!errors.hwDescribe}
                  />
                )}
              />
              {errors.hwDescribe && <FormFeedback>{errors.hwDescribe.message}</FormFeedback>}
            </Col>

            <div className='d-flex mt-3'>
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

export default AddModalHomeWork
