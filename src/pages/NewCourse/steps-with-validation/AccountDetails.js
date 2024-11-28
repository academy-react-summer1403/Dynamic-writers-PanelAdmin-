import { Fragment } from 'react'
import { isObjEmpty } from '@utils'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
import { getItem, setItem } from '../../../core/Services/common/storage'

const step1 = (JSON.parse(getItem('step1')))

const defaultValues = {
  Describe: (step1.Describe || ''),
  Title: (step1.Title || ''),
  MiniDescribe: (step1.MiniDescribe || ''),
  Capacity: (Number(step1.Capacity)|| 0)
}


const AccountDetails = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    Title: yup.string().required(' لطفا نام دوره را وارد کنید ').min(5, 'نام دوره نمی تواند کمتر از 5 حرف باشد'),
    Describe: yup.string().required(' لطفا توضیحات دوره را وارد کنید '),
    MiniDescribe: yup.string().required(' لطفا پاره ای از توضیحات دوره را وارد کنید '),
    Capacity: yup.number().min(1, 'ظرفیت دوره باید بیشتر از 1 نفر باشد'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
      setItem('step1', JSON.stringify(data))
      stepper.next()
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'> مشخصات دوره </h5>
        <small className='text-muted'>مشخصات رو وارد کنید.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='Title'>
              نام دوره
            </Label>
            <Controller
              id='Title'
              name='Title'
              control={control}
              render={({ field }) => <Input placeholder='دوره ری اکت' invalid={errors.Title && true} {...field} />}
            />
            {errors.Title && <FormFeedback>{errors.Title.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`Describe`}>
              توضیحات دوره
            </Label>
            <Controller
              control={control}
              id='Describe'
              name='Describe'
              render={({ field }) => (
                <Input type='text' placeholder='این دوره برای آموزش ری اکت است' invalid={errors.Describe && true} {...field} />
              )}
            />
            {errors.Describe && <FormFeedback>{errors.Describe.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <div className='form-password-toggle col-md-6 mb-1'>
            <Label className='form-label' for='MiniDescribe'>
              توضیحات خلاصه
            </Label>
            <Controller
              id='MiniDescribe'
              name='MiniDescribe'
              control={control}
              render={({ field }) => <Input type='text' placeholder='خلاصه دوره' invalid={errors.MiniDescribe && true} {...field} />}
            />
            {errors.MiniDescribe && <FormFeedback>{errors.MiniDescribe.message}</FormFeedback>}
          </div>
          <div className='form-password-toggle col-md-6 mb-1'>
            <Label className='form-label' for='Capacity'>
              ظرفیت دوره
            </Label>
            <Controller
              control={control}
              id='Capacity'
              name='Capacity'
              render={({ field }) => <Input type='number' invalid={errors.Capacity && true} {...field} />}
            />
            {errors.Capacity && <FormFeedback>{errors.Capacity.message}</FormFeedback>}
          </div>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='secondary' className='btn-prev' outline disabled>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'> قبلی </span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'> بعدی </span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default AccountDetails
