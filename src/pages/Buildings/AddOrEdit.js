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
import { useRef } from 'react'; 
// ** Third Party Components
import { useFormik } from 'formik'
import jMoment, { now } from 'jalali-moment'
import Select from 'react-select'

import { selectThemeColors } from '@utils'


import * as Yup from 'yup'
// ** Images
import { Marker, Popup, useMapEvents,MapContainer,TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
// import './map.css'
import L from 'leaflet';
import styled from 'styled-components';
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
import { AddBuilding } from './../../core/Services/api/Buildings/AddBuilding';
import { UpdateBuilding } from './../../core/Services/api/Buildings/UpdateBuilding';
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

const AddOrEdit = ({showValue,setshowValue,isEdit,information,refetch}) => {

    // ** States
  const [statusBuilding, setstatusBuilding] = useState({"value":information.active,"label":information.active?"فعال":"غیر فعال"})
  const [show, setShow] = useState(showValue)
  const [nullValueForLocation, setnullValueForLocation] = useState(false)
  const markerIcon = new L.Icon({
    iconUrl: markerIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const hasCoordinates = information.latitude !== null && information.longitude !== null;

  const initialPosition = hasCoordinates ? [information.latitude, information.longitude] : [1, 181];
  const [position, setPosition] = useState(initialPosition);
  
  const [address, setAddress] = useState(hasCoordinates ? `Lat:${information.latitude},Lng:${information.longitude}` : '');
  const [popupVisible, setPopupVisible] = useState(false);   

  const updateMarkerPosition =async (event) => {
    const { lat, lng } = event.latlng; 
    if (lat.toFixed(5) >90 || lat.toFixed(5) <0 || lng.toFixed(5) >180 || lng.toFixed(5) <-100 ){
      return toast.error("موقعیت مکانی نا معتبر است")
    }
    setPosition([lat, lng]);
    const newAddress = `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`; 
    setAddress(newAddress);
    setnullValueForLocation(false)

  };

  const MapEventHandler = () => {
    useMapEvents({
      click: updateMarkerPosition, 
    });
    return null;
  };
  const onSubmit =async(value)=>{
    if(isEdit){
        let massage=await UpdateBuilding(information.id,value.name,information.workDate,value.floor,String(position[0]),String(position[1]),statusBuilding.value)
          toast.success(massage.message)
          setShow(!show);
          setTimeout(() => setshowValue(!show),600)
          refetch()
      }
      else{
        if(position[0]==1||position[1]==181){
          setnullValueForLocation(true)
          return
        }
        setnullValueForLocation(false)
        if(nullValueForLocation==false){
          console.log(jMoment(Date.now()).local('en').format("YYYY-MM-DDTHH:mm:ss"))
          let massage=await AddBuilding("1",value.name,jMoment(Date.now()).local('en').format("YYYY-MM-DDTHH:mm:ss"),value.floor,String(position[0]),String(position[1]))
            toast.success(massage.message)
            setShow(!show);
            setTimeout(() => setshowValue(!show),600)
            refetch()
        }
      }
  }

useEffect(() => {
  setTimeout(()=>{
    document.getElementById("modal-customize").style.setProperty("direction", "ltr", "important");
  },500)
}, [show])

const validationSchema = Yup.object({
  name: Yup.string().min(5, 'عنوان باید حداقل 5 کاراکتر باشد').max(50, 'عنوان نمی‌تواند بیش از 50 کاراکتر باشد').required('فیلد اجباریست'),
  floor:Yup.number().min(1, 'طبقه نمیتواند کمتر از 1 باشد').max(254, 'طبقه نمیتواند بیش از 254 باشد').required('این فیلد الزامی است').typeError('این مقدار باید عدد باشد'),
})
const AllstatusBuilding=[
  {value:false,label:"غیرفعال"},
  {value:true,label:"فعال"}
]
const formik = useFormik({
  initialValues: {
    name: information.buildingName,
    floor: information.floor,
    time:information.workDate
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
              <Label className='form-label fs-5' for='credit-card'>
                مکان ساختمان 
              </Label>
              <div style={{height:"300px",width:"100%"}}  id='modal-customize'>
                
              <MapContainer 
                center={position} 
                zoom={8} 
                style={{ height: '100% ',width:"100%"}} 
               
                zoomControl={true}
               
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
            {nullValueForLocation && <span className='text-danger'>موقعیت مکانی ساختمان را مشخص کنید</span>}            
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
            <Col xs={6}>
              <Label className='form-label' for='credit-card'>
                تاریخ افزودن
              </Label>
              <Input
                  name="time"
                  className='text-black'
                  value={jMoment(formik.values.time).locale('fa').format('jYYYY jMMMM jD')}  
                  readOnly                
                />
            </Col>
            {isEdit && <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-category'>
                    وضعیت  
                      </Label>
                      <Select
                        id='blog-edit-status'
                        isClearable={false}
                        theme={selectThemeColors}
                        value={statusBuilding}
                        options={AllstatusBuilding}
                        className='react-select'
                        classNamePrefix='select'
                        onChange={data => {setstatusBuilding(data)}}
                      />
                    </Col>}
            
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
  )
}

export default AddOrEdit
