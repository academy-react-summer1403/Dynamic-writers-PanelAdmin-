import { Fragment, useState,useEffect,useRef } from 'react'
import {
  Row,
  Col,
  Modal,
  Label,
  ModalBody,
  ModalHeader,
} from 'reactstrap'
import jMoment from 'jalali-moment'
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DetailModal = ({showValue,setshowValue,information}) => {

  const [show, setShow] = useState(showValue)
  const [AddressValue, setAddressValue] = useState(null)

  const markerIconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
  
const showMap = (lat,long) => {
  
  const coordinates = [lat,long];
  const markerIcon = new L.Icon({
    iconUrl: markerIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
 
 
  return (
    <div style={{ height: "300px",width:"100%" }}>
      <MapContainer center={coordinates}  zoom={15} style={{ height: "100%", width: "100%" }} touchZoom={true} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordinates} icon={markerIcon} interactive={false}></Marker>
      </MapContainer> 
    </div>
  );
};

  const Address=async()=>{
    try{
     
        const {data} = await axios.get(`https://map.ir/reverse?lat=${information.latitude}&lon=${information.longitude}`, {
            headers: {
            'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYxMTU1NzUxYjA2MjExY2Y5MWIxYjQyYTU5YjY3NTAyNWI1MTFhMzg3MzcxODY5MGU5ZGU3OTZiOTNhNzgxZWMxMzFlNGEwYTZkZDUxMjliIn0.eyJhdWQiOiIyOTgzOCIsImp0aSI6ImYxMTU1NzUxYjA2MjExY2Y5MWIxYjQyYTU5YjY3NTAyNWI1MTFhMzg3MzcxODY5MGU5ZGU3OTZiOTNhNzgxZWMxMzFlNGEwYTZkZDUxMjliIiwiaWF0IjoxNzMzMDAxMDY0LCJuYmYiOjE3MzMwMDEwNjQsImV4cCI6MTczNTUwNjY2NCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.jtmOr1yqf6iaWHYiub1NTE7xS4r0qs9kWYgtWsGLVvEo-Eukc-R_8j9t154mHu0J_JhwUROwpW9dRJmR7QHzMZD6e9FFdClJsH-MRcDRNIeahPYEFDCq0h8bJH2hs9Db67yCGdvc-WM_u9aUg9RwtuScsPsLLdlW6qPhPvIWXlk02fSfrLnhAvU85m7YHRFBC8i6DQ5jkr4EbLq-Zd8TT8vUKtRydDjA87W_gSsGPLvYa9Khz-pqmLoRfEK1YUHNf7ZEdE9W2ZedhVcHvIbxCmHEaIXM7b6WCmQqGCfm8MCm3aYMVanrhEoiEucG4RWsDDN3uZO0J4Zfl_xZZ3dczA'
            }
        });
        if((Number(information.latitude)>40 || Number(information.latitude)<24) || (Number(information.longitude)>63 || Number(information.longitude)<44)){
          setAddressValue("خارج از محدوده")
        }else{
          setAddressValue(data.address)

        }
    }catch (error) {
        if (error.response && error.response.status === 404) {
            setAddressValue("خارج از محدوده")
        }
      }
    };
  useEffect(() => {
    Address()
  }, [])
  
  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => {setShow(null);setTimeout(() => setshowValue(null),600)}}
        className='modal-dialog-centered iranSans'
      >
        <ModalHeader className='bg-transparent' toggle={() => {setShow(null);setTimeout(() => setshowValue(null),600)}}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <h1 className='text-center mb-1'>اطلاعات ساختمان</h1>
          <Row className='gy-1 gx-2 mt-75'>
          <Col xs={12}>
              <Label className='form-label' style={{fontSize:"20px",color:"blue"}} for='credit-card'>
                 مکان ساختمان بر روی نقشه
              </Label>
              <div className='text-right' style={{fontSize:"18px"}}>
                {showMap(information.latitude,information.longitude)}
              </div>
            </Col>
            <hr className='my-1'></hr>
            <Col xs={12}>
              <Label className='form-label' style={{fontSize:"20px",color:"blue"}} for='credit-card'>
                نام ساختمان
              </Label>
              <div className='text-right' style={{fontSize:"18px"}}>
                {information.buildingName}
              </div>
            </Col>
            <hr className='my-1'></hr>
            <Col xs={12}>
              <Label className='form-label' style={{fontSize:"20px",color:"blue"}} for='credit-card'>
                طبقه
              </Label>
              <div className='text-right' style={{fontSize:"18px", overflow: 'hidden', textOverflow: 'ellipsis'}}>
              {information.floor}
              </div>
            </Col>
            <hr className='my-1'></hr>
            <Col xs={12}>
              <Label className='form-label' style={{fontSize:"20px",color:"blue"}} for='credit-card'>
                آدرس 
              </Label>
              <div className='text-right' style={{fontSize:"18px", overflow: 'hidden', textOverflow: 'ellipsis'}}>
              {AddressValue}
              </div>
            </Col>
            <hr className='my-1'></hr> 
            <Col xs={12} style={{direction:"rtl"}}>
              <Label className='form-label ' style={{fontSize:"20px",color:"blue"}} for='credit-card'>بارگذاری شده در </Label>
              <span>{ "   "+ jMoment(information.workDate).locale('fa').format('jD jMMMM jYYYY')}</span>
            </Col>      
            <hr className='my-1'></hr>
      
            <Col xs={12}>
              <Label className='form-label' style={{fontSize:"20px",color:"blue"}} for='credit-card'>
                وضعیت
              </Label>
              <span className={`text-right ${information.active?"bg-success":"bg-danger"} px-1 text-white ms-2 rounded-4`} style={{fontSize:"14px", overflow: 'hidden', textOverflow: 'ellipsis'}}>
              {information.active==true?"فعال":"غیر فعال"}
              </span>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default DetailModal
