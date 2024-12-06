import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, Button, Form, Label, Input, FormFeedback, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap'
import toast from 'react-hot-toast'
import { AddTermCloseDate } from '../../core/Services/api/Term/AddCloseDate'

const AddModalCloseDate = ({ show, setShow, refetch, selectedItem }) => {

    const SignupSchema = yup.object().shape({
        startCloseDate: yup.date().required('تاریخ شروع را وارد کنید').nullable(),
        endCloseDate: yup.date()
            .required('تاریخ پایان را وارد کنید')
            .nullable()
            .min(yup.ref('startCloseDate'), 'تاریخ پایان باید بعد از تاریخ شروع باشد'),
        closeReason: yup.string().required(' علت بستن ترم را وارد کنید ').min(5, ' باید بیشتر از 5 حرف باشد ')
    })

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

    const onSubmit = async (data) => {
        if (!selectedItem?.id) {
            toast.error('مورد انتخابی را وارد کنید')
            return
        }

        const dataObj = {
            startCloseDate: data.startCloseDate,
            endCloseDate: data.endCloseDate,
            termId: selectedItem.id,
            closeReason: data.closeReason,
        }

        const response = await AddTermCloseDate(dataObj)
        if (response.success === true) {
            refetch()
            toast.success(response.message)
            setShow(false)
            reset()
        }
    }

    return (
        <Modal className='iranSans' isOpen={show} toggle={() => setShow(!show)} centered>
            <ModalHeader>
                <CardTitle tag='h2' className='my-2'>تاریخ تعطیلی</CardTitle>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md='6'>
                            <Label for='startCloseDate'>تاریخ شروع</Label>
                            <Controller
                                name='startCloseDate'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        id='startCloseDate'
                                        type='date'
                                        invalid={!!errors.startCloseDate}
                                    />
                                )}
                            />
                            {errors.startCloseDate && (
                                <FormFeedback>{errors.startCloseDate.message}</FormFeedback>
                            )}
                        </Col>

                        <Col md='6'>
                            <Label for='endCloseDate'>تاریخ پایان</Label>
                            <Controller
                                name='endCloseDate'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        id='endCloseDate'
                                        type='date'
                                        invalid={!!errors.endCloseDate}
                                    />
                                )}
                            />
                            {errors.endCloseDate && (
                                <FormFeedback>{errors.endCloseDate.message}</FormFeedback>
                            )}
                        </Col>

                        <Col md='12' className='mt-2'>
                            <Label for='closeReason'>علت بسته شدن</Label>
                            <Controller
                                name='closeReason'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        id='closeReason'
                                        type='text'
                                        placeholder='علت بسته شدن را وارد کنید'
                                        invalid={!!errors.closeReason}
                                    />
                                )}
                            />
                            {errors.closeReason && (
                                <FormFeedback>{errors.closeReason.message}</FormFeedback>
                            )}
                        </Col>

                        <div className='d-flex justify-content-between mt-3'>
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

export default AddModalCloseDate
