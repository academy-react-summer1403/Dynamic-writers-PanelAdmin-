import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { AddFileSession } from '../../core/Services/api/Session/AddFileSession'

const getFileFormatFromUrl = (url) => {
  const match = url.match(/\.(\w+)$/)
  return match ? match[1] : ''
}

const AddModalFileSession = ({ show, setShow, refetch, selectedItem }) => {

  const SignupSchema = yup.object().shape({
    url: yup.string().url('لطفاً یک URL معتبر وارد کنید').required('لطفاً URL را وارد کنید'),
    fileName: yup.string().required('لطفاً نام فایل را وارد کنید'),
    fileFormat: yup.string().required('لطفاً فرمت فایل را وارد کنید'),
  })

  const { reset, control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SignupSchema)
  })

  useEffect(() => {
    const url = getValues('url')
    if (url) {
      const format = getFileFormatFromUrl(url)
      setValue('fileFormat', format)
    }
  }, [getValues, setValue])

  const onSubmit = async (data) => {

    const response = await AddFileSession(selectedItem.scheduleSessionId, data.url, data.fileName, data.fileFormat)
    if (response.success === true) {
        refetch()
        toast.success(response.message)
        setShow(false)
    }
  }

  return (
    <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
      <ModalHeader>
        <CardTitle tag='h2' className='my-2'>ساخت فایل</CardTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={12} className='mb-1'>
              <Label for='url'>فایل</Label>
              <Controller
                name="url"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="url"
                    placeholder="لطفاً URL فایل را وارد کنید"
                    invalid={!!errors.url}
                  />
                )}
              />
              {errors.url && <FormFeedback>{errors.url.message}</FormFeedback>}
            </Col>

            <Col md={12} className='mb-1'>
              <Label for='fileName'>نام فایل</Label>
              <Controller
                name="fileName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="fileName"
                    placeholder="لطفاً نام فایل را وارد کنید"
                    invalid={!!errors.fileName}
                  />
                )}
              />
              {errors.fileName && <FormFeedback>{errors.fileName.message}</FormFeedback>}
            </Col>

            <Col md={12} className='mb-1'>
              <Label for='fileFormat'>فرمت فایل</Label>
              <Controller
                name="fileFormat"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="fileFormat"
                    placeholder="فرمت فایل (مثال: jpg, png)"
                    invalid={!!errors.fileFormat}
                  />
                )}
              />
              {errors.fileFormat && <FormFeedback>{errors.fileFormat.message}</FormFeedback>}
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

export default AddModalFileSession
