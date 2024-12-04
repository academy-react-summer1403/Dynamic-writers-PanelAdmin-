import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { useState } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { GetDepartment } from '../../core/Services/api/Department/GetDepartment'
import { UpdateTerm } from '../../core/Services/api/Term/UpdateTerm'

const ModalUpdate = ({ show, setShow, refetch, selectedItem }) => {

    const { data } = useQuery({ queryKey: ['GetDepartments'], queryFn: GetDepartment })

    const [currentBuildingId, setCurrentBuildingId] = useState({ value: selectedItem.departmentId, label: selectedItem.departmentName })
    const buildingIdOptions = data
        ? data.map(type => ({
            value: type.id,
            label: type.depName
        }))
        : []

    const [currentExpire, setCurrentExpire] = useState({ value: selectedItem.expire, label: selectedItem.expire ? 'منقضی شده' : 'فعال' })
    const expireOptions = [
      {value: false, label: 'فعال'},
      {value: true, label: 'منقضی شده'}
    ]

    const SignupSchema = yup.object().shape({
        termName: yup.string().required('نام ترم کاربر را وارد کنید').min(5, 'باید بیشتر از 5 حرف باشد').max(500, 'باید کمتر از 500 حرف باشد'),
        startDate: yup.date().required('تاریخ شروع را وارد کنید').nullable(),
        endDate: yup.date()
            .required('تاریخ پایان را وارد کنید')
            .nullable()
            .min(yup.ref('startDate'), 'تاریخ پایان باید بعد از تاریخ شروع باشد')
    })

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

    const onSubmit = async (data) => {
        const dataObj = {
            id: selectedItem.id,
            termName: data.termName,
            departmentId: currentBuildingId.value,
            startDate: data.startDate,
            endDate: data.endDate,
            expire: currentExpire.value
        }

        const response = await UpdateTerm(dataObj)
        if (response.success === true) {
            refetch()
            toast.success(response.message)
            setShow(false)
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
                            <Label className='form-label' for='termName'>
                                نام ترم
                            </Label>
                            <Controller
                                id='termName'
                                name='termName'
                                defaultValue={selectedItem.termName}
                                control={control}
                                render={({ field }) => <Input {...field} placeholder='نام ترم' invalid={errors.termName && true} />}
                            />
                            {errors.termName && <FormFeedback>{errors.termName.message}</FormFeedback>}
                        </Col>

                        <Col lg='12' className='mb-1'>
                            <Label className='form-label' for='buildingId'>
                                بخش
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                isClearable={false}
                                id={`ClassId`}
                                className='react-select'
                                classNamePrefix='select'
                                options={buildingIdOptions}
                                value={currentBuildingId}
                                onChange={data => {
                                    setCurrentBuildingId(data)
                                }}
                            />
                        </Col>

                        <Col lg='12' className='mb-1'>
                            <Label className='form-label' for='expire'>
                                وضعیت
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                isClearable={false}
                                id={`expire`}
                                className='react-select'
                                classNamePrefix='select'
                                options={expireOptions}
                                value={currentExpire}
                                onChange={data => {
                                    setCurrentExpire(data)
                                }}
                            />
                        </Col>

                        <Col lg='12' className='mb-1'>
                            <Label className='form-label' for='startDate'>
                                تاریخ شروع
                            </Label>
                            <Controller
                                id='startDate'
                                name='startDate'
                                defaultValue={selectedItem.startDate ? selectedItem.startDate.split('T')[0] : ''}
                                control={control}
                                render={({ field }) => <Input type='date' {...field} invalid={errors.startDate && true} />}
                            />
                            {errors.startDate && <FormFeedback>{errors.startDate.message}</FormFeedback>}
                        </Col>

                        <Col lg='12' className='mb-1'>
                            <Label className='form-label' for='endDate'>
                                تاریخ پایان
                            </Label>
                            <Controller
                                id='endDate'
                                name='endDate'
                                defaultValue={selectedItem.endDate ? selectedItem.endDate.split('T')[0] : ''}
                                control={control}
                                render={({ field }) => <Input type='date' {...field} invalid={errors.endDate && true} />}
                            />
                            {errors.endDate && <FormFeedback>{errors.endDate.message}</FormFeedback>}
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
