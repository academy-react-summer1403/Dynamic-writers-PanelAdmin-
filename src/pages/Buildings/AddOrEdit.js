// ** React Imports
import { Fragment, useState,useEffect } from 'react'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Modal,
  Label,
  Input,
  Form,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  InputGroup,
  ModalHeader,
  FormFeedback,
} from 'reactstrap'

// ** Third Party Components
import { useFormik } from 'formik'
import * as Yup from 'yup'
// ** Images
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import toast from "react-hot-toast";
import markerIconUrl from 'leaflet/dist/images/marker-icon.png'; 
import jcbCC from '@src/assets/images/icons/payments/jcb-cc.png'
import amexCC from '@src/assets/images/icons/payments/amex-cc.png'
import uatpCC from '@src/assets/images/icons/payments/uatp-cc.png'
import visaCC from '@src/assets/images/icons/payments/visa-cc.png'
import dinersCC from '@src/assets/images/icons/payments/diners-cc.png'
import maestroCC from '@src/assets/images/icons/payments/maestro-cc.png'
import discoverCC from '@src/assets/images/icons/payments/discover-cc.png'
import mastercardCC from '@src/assets/images/icons/payments/mastercard-cc.png'

const cardsObj = {
  jcb: jcbCC,
  uatp: uatpCC,
  visa: visaCC,
  amex: amexCC,
  diners: dinersCC,
  maestro: maestroCC,
  discover: discoverCC,
  mastercard: mastercardCC
}

const defaultValues = {
  cardNumber: ''
}

const AddOrEdit = ({showValue,setshowValue,isEdit,information,refetch}) => {
  // ** States
  const [show, setShow] = useState(showValue)
  const markerIcon = new L.Icon({
    iconUrl: markerIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const hasCoordinates = information.latitude !== null && information.longitude !== null;

  const initialPosition = hasCoordinates ? [information.latitude, information.longitude] : [0, 0];
  const [position, setPosition] = useState(initialPosition);
  
  const [address, setAddress] = useState(hasCoordinates ? `Lat:${information.latitude},Lng:${information.longitude}` : '');
  const [popupVisible, setPopupVisible] = useState(false);   

  const updateMarkerPosition =async (event) => {
    const { lat, lng } = event.latlng; 
    if (Math.abs(lat.toFixed(5)) >120 || Math.abs(lng.toFixed(5)) >120){
      return notifyError("موقعیت مکانی نا معتبر است")
    }
    setPosition([lat, lng]);
    const newAddress = `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`; 
    setAddress(newAddress);
    // let massage=await UpdateLocationInProf(information,lat.toString(),lng.toString())
    // notifySuccess(massage.message)
    // setRerender(prev => !prev); 

  };

  const MapEventHandler = () => {
    useMapEvents({
      click: updateMarkerPosition, 
    });
    return null;
  };

  const onSubmit =async(value)=>{
    if(isEdit){

      let massage=await UpdateCategory(information.id,value.title,value.google,value.googleDesc)
      console.log(massage)
        toast.success(massage.message)
        setShow(!show);
        setTimeout(() => setshowValue(!show),600)
        refetch()

      }
      else{
        let massage=await AddCategory(information.id,value.title,value.google,value.googleDesc)
        console.log(massage)
          toast.success(massage.message)
          setShow(!show);
          setTimeout(() => setshowValue(!show),600)
          refetch()
      }
  }

const validationSchema = Yup.object({
  name: Yup.string().min(3, 'عنوان باید حداقل 3 کاراکتر باشد').max(80, 'عنوان نمی‌تواند بیش از 80 کاراکتر باشد').required('فیلد اجباریست'),
  floor:Yup.number().required('این فیلد الزامی است').max(100, 'مقدار نا معتبر').typeError('این مقدار باید عدد باشد'),

})

const formik = useFormik({
  initialValues: {
    name: information.buildingName,
    floor: information.floor,
  },
  validationSchema:validationSchema,
  enableReinitialize:true,
  onSubmit: (values) => {
    onSubmit(values)
  },
})
const handleNameChange = (e) => formik.setFieldValue('name', e.target.value)
const handleFloorChange = (e) => formik.setFieldValue('floor', e.target.value)

  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => {setShow(!show);setTimeout(() => setshowValue(!show),600)}}
        className='modal-dialog-centered iranSans modal-lg'
      >
        <ModalHeader className='bg-transparent' toggle={() => {setShow(!show);setTimeout(() => setshowValue(!show),600)}}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <h1 className='text-center mb-1'>{isEdit? "ویرایش اطلاعات ساختمان":"افزودن ساختمان"}</h1>
          <Form className='gy-1 gx-2 mt-75' onSubmit={formik.handleSubmit}>

          <Row className='gy-1 gx-2 mt-75'>
          <Col xs={12}>
              <Label className='form-label' for='credit-card'>
                مکان ساختمان 
              </Label>
               <div>
               <MapContainer 
                  center={position} 
                  
                  zoom={15} 
                  style={{ height: '500px', width: '100%' }} 
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  <MapEventHandler /> 
                  
                  <Marker position={position} icon={markerIcon}>
                    <Popup>
                      موقعیت انتخاب شده:<br />
                      {address} 
                    </Popup>
                  </Marker>

                  {popupVisible && (
                    <Marker position={position} icon={markerIcon}>
                      <Popup onClose={() => setPopupVisible(false)}>
                      </Popup>
                    </Marker>
                  )}
                </MapContainer>
               </div>
                {formik.errors.name && <FormFeedback>{formik.errors.name}</FormFeedback>}
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='credit-card'>
                نام ساختمان
              </Label>
              <Input
                  name="name"
                  placeholder='نام ساختمان را وارد کنید'
                  value={formik.values.name}
                  onChange={handleNameChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.errors.name ? true : false}
                />
                {formik.errors.name && <FormFeedback>{formik.errors.name}</FormFeedback>}
            </Col>
            <Col xs={6}>
              <Label className='form-label' for='credit-card'>
                طبقه
              </Label>
              <Input
                  name="floor"
                  placeholder=' طبقه را وارد کنید'
                  value={formik.values.floor}
                  onChange={handleFloorChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.errors.floor ? true : false}
                />
                {formik.errors.floor && <FormFeedback>{formik.errors.floor}</FormFeedback>}
            </Col>
            {/* <Col xs={12}>
              <Label className='form-label' for='credit-card'>
                توضیحات در گوگل
              </Label>
              <Input
                  type='textarea'
                  name="googleDesc"
                  placeholder='توضیحات دسته بندی در گوگل را وارد کنید'
                  value={formik.values.googleDesc}
                  style={{minHeight:"100px",maxHeight:"100px"}}
                  onChange={handleGoogleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.errors.googleDesc ? true : false}
                />
                {formik.errors.googleDesc && <FormFeedback>{formik.errors.googleDesc}</FormFeedback>}
            </Col>             */}
            <Col className='text-center mt-1' xs={12}>
              <Button type='submit' className='me-1' color='success'>
              {isEdit? "ویرایش":"افزودن"}
              </Button>
              <Button
                color='danger'
                outline
                onClick={() => {
                  setShow(!show)
                  setTimeout(() => setshowValue(!show),600)
                  reset()
                }}
              >
                لغو
              </Button>
            </Col>
          </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AddOrEdit
