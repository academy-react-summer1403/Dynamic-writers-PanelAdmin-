import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { useState } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { UpdateJob } from '../../core/Services/api/Jobs/UpdateJob'

const ModalUpdate = ({ show, setShow, refetch, selectedItem }) => {

    const [currentInWork, setCurrentInWork] = useState({ value: selectedItem.inWork, label: selectedItem.inWork ? 'در حال کار' : 'اتمام کار' })
    const inWorkOptions = [
        {value: true, label: 'در حال کار'},
        {value: false, label: 'اتمام کار'},
    ]

    const SignupSchema = yup.object().shape({
        jobTitle: yup.string().required('نام شغل الزامی است'),
        companyName: yup.string().required('نام شرکت الزامی است'),
        aboutJob: yup.string().required('توضیحات شغل الزامی است'),
        companyWebSite: yup.string().url('لطفا یک آدرس وب سایت معتبر وارد کنید').required('آدرس وب سایت الزامی است'),
        companyLinkdin: yup.string().url('لطفا یک آدرس لینکدین معتبر وارد کنید').required('آدرس لینکدین الزامی است'),
        workStartDate: yup.date().required('تاریخ شروع الزامی است').nullable(),
        workEndDate: yup.date().when('workStartDate', (workStartDate, schema) => 
            workStartDate ? schema.min(workStartDate, 'تاریخ پایان باید بعد از تاریخ شروع باشد') : schema
        ).nullable()
    })

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

    const onSubmit = async (data) => {
        if(currentInWork.value == null){
            toast.error(' وضعیت را انتخاب کنید ')
        }
        else{
            const dataObj = {
                jobTitle: data.jobTitle,
                aboutJob: data.aboutJob,
                companyWebSite: data.companyWebSite,
                companyLinkdin: data.companyLinkdin,
                workStartDate: data.workStartDate,
                workEndDate: data.workEndDate,
                inWork: currentInWork.value,
                companyName: data.companyName,
                userId: selectedItem.userId,
                id: selectedItem.id
              }
    
            const response = await UpdateJob(dataObj)
            if (response.success === true) {
                refetch()
                toast.success(response.message)
                setShow(false)
            }
        }
    }

    return (
        <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
            <ModalHeader>
                <CardTitle tag='h2' className='my-2'>ویرایش مشخصات</CardTitle>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col lg='12' className='mb-1'>
                            <Label className='form-label' for='jobTitle'>
                                نام شغل
                            </Label>
                            <Controller
                                id='jobTitle'
                                name='jobTitle'
                                defaultValue={selectedItem.jobTitle}
                                control={control}
                                render={({ field }) => <Input {...field} placeholder='نام شغل' invalid={errors.jobTitle && true} />}
                            />
                            {errors.jobTitle && <FormFeedback>{errors.jobTitle.message}</FormFeedback>}
                        </Col>

                        <Col lg='12' className='mb-1'>
                            <Label className='form-label' for='companyName'>
                                نام شرکت
                            </Label>
                            <Controller
                                id='companyName'
                                name='companyName'
                                defaultValue={selectedItem.companyName}
                                control={control}
                                render={({ field }) => <Input {...field} placeholder='نام شرکت' invalid={errors.companyName && true} />}
                            />
                            {errors.companyName && <FormFeedback>{errors.companyName.message}</FormFeedback>}
                        </Col>

                        <Col lg='12' className='mb-1'>
                            <Label className='form-label' for='aboutJob'>
                                توضیحات شغل
                            </Label>
                            <Controller
                                id='aboutJob'
                                name='aboutJob'
                                defaultValue={selectedItem.aboutJob}
                                control={control}
                                render={({ field }) => <Input {...field} placeholder='توضیحات شغل' invalid={errors.aboutJob && true} />}
                            />
                            {errors.aboutJob && <FormFeedback>{errors.aboutJob.message}</FormFeedback>}
                        </Col>

                        <Col lg='12' className='mb-1'>
                            <Label className='form-label' for='companyWebSite'>
                                آدرس وب سایت شرکت
                            </Label>
                            <Controller
                                id='companyWebSite'
                                name='companyWebSite'
                                defaultValue={selectedItem.companyWebSite}
                                control={control}
                                render={({ field }) => <Input {...field} placeholder='آدرس وب سایت' invalid={errors.companyWebSite && true} />}
                            />
                            {errors.companyWebSite && <FormFeedback>{errors.companyWebSite.message}</FormFeedback>}
                        </Col>

                        <Col lg='12' className='mb-1'>
                            <Label className='form-label' for='companyLinkdin'>
                                آدرس لینکدین شرکت
                            </Label>
                            <Controller
                                id='companyLinkdin'
                                name='companyLinkdin'
                                defaultValue={selectedItem.companyLinkdin}
                                control={control}
                                render={({ field }) => <Input {...field} placeholder='آدرس لینکدین' invalid={errors.companyLinkdin && true} />}
                            />
                            {errors.companyLinkdin && <FormFeedback>{errors.companyLinkdin.message}</FormFeedback>}
                        </Col>

                        <Col lg='12' className='mb-1'>
                            <Label className='form-label' for='inWork'>
                                وضعیت
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                isClearable={false}
                                id={`inWork`}
                                className='react-select'
                                classNamePrefix='select'
                                options={inWorkOptions}
                                value={currentInWork}
                                onChange={data => {
                                    setCurrentInWork(data)
                                }}
                            />
                        </Col>

                        <Col lg='12' className='mb-1'>
                            <Label className='form-label' for='workStartDate'>
                                تاریخ شروع
                            </Label>
                            <Controller
                                id='workStartDate'
                                name='workStartDate'
                                defaultValue={selectedItem.workStartDate ? selectedItem.workStartDate.split('T')[0] : ''}
                                control={control}
                                render={({ field }) => <Input type='date' {...field} invalid={errors.workStartDate && true} />}
                            />
                            {errors.workStartDate && <FormFeedback>{errors.workStartDate.message}</FormFeedback>}
                        </Col>

                        <Col lg='12' className='mb-1'>
                            <Label className='form-label' for='workEndDate'>
                                تاریخ پایان
                            </Label>
                            <Controller
                                id='workEndDate'
                                name='workEndDate'
                                defaultValue={selectedItem.workEndDate ? selectedItem.workEndDate.split('T')[0] : ''}
                                control={control}
                                render={({ field }) => <Input type='date' {...field} invalid={errors.workEndDate && true} />}
                            />
                            {errors.workEndDate && <FormFeedback>{errors.workEndDate.message}</FormFeedback>}
                        </Col>

                        <div className='d-flex'>
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

export default ModalUpdate
