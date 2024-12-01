import { useState } from 'react'
import { Modal, ModalHeader, ModalBody, Button, Input, Form, FormGroup, Label, FormFeedback } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AddColors } from '../../core/Services/api/SiteSettings/AddColor'

const AddModal = ({ show, setShow, refetch }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onChange'
  })

  const onSubmit = async (data) => {
    const colorPallet = data.colorData

    const response = await AddColors(colorPallet)

    if (response.success === true) {
      toast.success('رنگ جدید با موفقیت اضافه شد.')
      refetch()
      setShow(false)
      reset() 
    }
  }

  return (
    <Modal isOpen={show} toggle={() => setShow(!show)} className='iranSans' centered>
      <ModalHeader toggle={() => setShow(!show)}>ساخت رنگ جدید</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="colorData">رنگ‌ها</Label>
            <Controller
              id="colorData"
              name="colorData"
              control={control}
              defaultValue=""
              rules={{
                required: "لطفا حداقل یک رنگ وارد کنید.",
                pattern: {
                  value: /^\[([a-zA-Z]+(,\s*[a-zA-Z]+)*)?\]$/,
                  message: "فرمت رنگ‌ها باید به صورت [red, green, blue] باشد."
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="[red, green, blue]"
                  invalid={errors.colorData && true}
                />
              )}
            />
            {errors.colorData && <FormFeedback>{errors.colorData.message}</FormFeedback>}
          </FormGroup>
          
          <div className="d-flex justify-content-between">
            <Button color="primary" type="submit">
              {'ایجاد رنگ'}
            </Button>
            <Button color="secondary" outline onClick={() => setShow(false)}>
              لغو
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default AddModal
