// ** React Imports
import { useState, useEffect } from 'react'

import Select from 'react-select'

import { useQuery } from 'react-query'
// ** Custom Components
import Avatar from '@components/avatar'
import Breadcrumbs from '@components/breadcrumbs'
import jMoment from 'moment-jalaali'
import { FaExclamationCircle } from 'react-icons/fa';
import { useFormik } from 'formik'
import * as Yup from 'yup'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Form, Label, Input,FormFeedback, Button,Spinner,Alert  } from 'reactstrap'

// ** Styles
import '@styles/react/libs/editor/editor.scss'
import '@styles/base/plugins/forms/form-quill-editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/base/pages/page-blog.scss'
import { useParams,Link, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css'; 
import 'quill-emoji/dist/quill-emoji.css'; 

import Quill from 'quill';
import * as Emoji from 'quill-emoji';
import GetNewsById from '../../../core/Services/api/New/GetNewsById'
import { GetDetailUser } from '../../../core/Services/api/User/GetDetailUser'
import UpdateNews from '../../../core/Services/api/New/UpdateNews'
import toast from "react-hot-toast";
import GetCategoriesForNews from '../../../core/Services/api/New/GetCategoriesForNews'
Quill.register('modules/emoji', Emoji);

const BlogEdit = () => {
  const {id}=useParams()
  const { data: APIdata ,isLoading} = useQuery({queryKey: ['dataFromAPIEdit'], queryFn:async()=> await GetNewsById(id)});
  
  // ** States
  const [data, setData] = useState(null),
    [title, setTitle] = useState(''),
    [MiniDiscrip, setMiniDiscrip] = useState(''),
    [status, setStatus] = useState(),
    [clearAll, setclearAll] = useState(false),
    [content, setContent] = useState(''),
    [categories, setCategory] = useState([]),
    [featuredImg, setFeaturedImg] = useState(null),
    [titleGoogle, settitleGoogle] = useState(''),
    [imgPath, setImgPath] = useState(null),
    [userData, setUserData] = useState(null),
    [descGoogle, setdescGoogle] = useState(''),
    [saveMiniPic, setsaveMiniPic] = useState(''),
    [savePic, setsavePic] = useState(''),
    [errorContent, seterrorContent] = useState(''),
    [blogCategories, setBlogCategories] = useState([]);

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, false] }],
          [{ 'font': [] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'align': [] }],
          ['link'],
          ['blockquote'],
          ['clean'],
          ['direction'],
        ],
        'emoji-textarea': true,
        'emoji-shortname': true,
      };

    const getDetail =async ()=>{
        if(isLoading!=null && !isLoading && APIdata){
          
            var imageName=null
            var imageNameMini=null
    
            if(APIdata.detailsNewsDto.currentImageAddress){
                 imageName= APIdata.detailsNewsDto.currentImageAddress.split("\\").pop();
            }
            if(APIdata.detailsNewsDto.currentImageAddressTumb){
                imageNameMini= APIdata.detailsNewsDto.currentImageAddressTumb.split("\\").pop();
            }
            setData(APIdata.detailsNewsDto)
            setTitle(APIdata.detailsNewsDto.title)
            setCategory({ value: APIdata.detailsNewsDto.newsCatregoryId, label:APIdata.detailsNewsDto.newsCatregoryName })
            setMiniDiscrip(APIdata.detailsNewsDto.miniDescribe)
            setImgPath(imageName)
            setsavePic(APIdata.detailsNewsDto.currentImageAddress)
            setsaveMiniPic(APIdata.detailsNewsDto.currentImageAddressTumb)
            setdescGoogle(APIdata.detailsNewsDto.googleDescribe)
            settitleGoogle(APIdata.detailsNewsDto.googleTitle)
            setContent(APIdata.detailsNewsDto.describe)
            setFeaturedImg(APIdata.detailsNewsDto.currentImageAddress)
            setStatus(APIdata.detailsNewsDto.active)
            
            let dataUser = await GetDetailUser(APIdata.detailsNewsDto.userId);
            let getCategory=await GetCategoriesForNews()


            for (let category of getCategory) {
              setBlogCategories(prevCategories => {
                return [...prevCategories, { value: category.id, label: category.categoryName }];
              });
            }
            setUserData(dataUser)
        }
    }
    useEffect(() => {
        getDetail()
        setclearAll(false);
    }, [APIdata,clearAll])

    const navigate = useNavigate()

    const onSubmit =async(value)=>{
      if(value.content!="" && !errorContent){
        let massage=await UpdateNews(savePic,value.titleGoogle,value.descGoogle,status,value.title,value.descMini,value.content,categories.value,APIdata)
          toast.success(massage.message)
          navigate(`/News/view/${id}`)
       }else if(value.content==""){

        seterrorContent("فیلد اجباریست")
      }
    }

  const validationSchema = Yup.object({
    title: Yup.string().min(10, 'عنوان باید حداقل 5۰ کاراکتر باشد').max(120, 'عنوان نمی‌تواند بیش از ۱۲۰ کاراکتر باشد').required('فیلد اجباریست'),
    descMini: Yup.string().min(10, 'عنوان باید حداقل ۱۰ کاراکتر باشد').max(200, 'عنوان نمی‌تواند بیش از 200 کاراکتر باشد').required('فیلد اجباریست'),
    titleGoogle: Yup.string().min(40, 'عنوان باید حداقل 40 کاراکتر باشد').max(70, 'عنوان نمی‌تواند بیش از 70 کاراکتر باشد').required('فیلد اجباریست'),
    descGoogle: Yup.string().min(70, 'عنوان باید حداقل 70 کاراکتر باشد').max(150, 'عنوان نمی‌تواند بیش از 150 کاراکتر باشد').required('فیلد اجباریست'),

  })

  const formik = useFormik({
    initialValues: {
      title: title,
      content: content,
      descMini:MiniDiscrip,
      titleGoogle:titleGoogle,
      descGoogle:descGoogle
    },
    validationSchema: validationSchema,
    enableReinitialize:true,
    onSubmit: (values) => {
      onSubmit(values)
    },
  })

    if(id==1){
      return <Alert color='danger'>
        <h4 className='alert-heading'> خبر یا مقاله پیدا نشد </h4>
        <div className='alert-body'>
          خبر یا مقاله مورد نظر یافت نشد ، خبر یا مقاله مورد نظر را از <Link to='/News/list'>  لیست اخبار و مقالات </Link> انتخاب کنید

        </div>
      </Alert>
    }else
    if (userData==null) {
      return <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '80vh' }}><Spinner color="primary" style={{ width: '5rem', height: '5rem' }}/></div>
    } 

  const onChange = e => {
    const reader = new FileReader();
    const files = e.target.files; 
    setsavePic(files[0]);
    setImgPath(files[0].name)
    reader.onload = function () {
      setFeaturedImg(reader.result)
    }
    reader.readAsDataURL(files[0])
  }
  
  const handleTitleChange = (e) => formik.setFieldValue('title', e.target.value)
  const handleContentChange = (value) => {
    formik.setFieldValue('content', value);
    var cleanHTML = value.replace(/<\/?p>|<br\s*\/?>/g, ''); 
    if(cleanHTML==""){
      seterrorContent('فیلد اجباریست')
    }else if(cleanHTML.length<=40){
      seterrorContent('توضیحات باید حداقل 40 کاراکتر باشد')
    }else{
      seterrorContent("")
    };  
  }
  const handleDescMiniChange = (e) => formik.setFieldValue('descMini', e.target.value)
  const handleDescTitleGoogle = (e) => formik.setFieldValue('titleGoogle', e.target.value)
  const handleDescdescGoogle = (e) => formik.setFieldValue('descGoogle', e.target.value)


  return (
    <div className='blog-edit-wrapper'>
      {data !== null ? (
        <Row>
          <Col sm='12'>
            <Card>
              <CardBody>
                <div className='d-flex'>
                  <div>
                    <Avatar className='me-75' img={userData.currentPictureAddress} imgWidth='38' imgHeight='38' />
                  </div>
                  <div>
                    <h6 className='mb-25'>{userData.fName} {userData.lName}</h6>
                    <CardText>{(jMoment(data.insertDate).locale('fa').format('jYYYY jMMMM jD'))}</CardText>
                  </div>
                </div>
                <Form className='mt-2' onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-title'>
                        عنوان
                      </Label>
                      <Input
                        id="blog-edit-title"
                        name="title"
                        value={formik.values.title}
                        onChange={handleTitleChange}
                        onBlur={formik.handleBlur}
                        invalid={formik.errors.title ? true : false}
                      />
                      {formik.errors.title && <FormFeedback>{formik.errors.title}</FormFeedback>}
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-title'>
                        عنوان در گوگل
                      </Label>
                      <Input
                        id="blog-edit-titleGoogle"
                        name="titleGoogle"
                        value={formik.values.titleGoogle}
                        onChange={handleDescTitleGoogle}
                        onBlur={formik.handleBlur}
                        invalid={formik.errors.titleGoogle ? true : false}
                      />
                      {formik.errors.titleGoogle && <FormFeedback>{formik.errors.titleGoogle}</FormFeedback>}
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-category'>
                      دسته‌بندی
                      </Label>
                      <Select
                        id='blog-edit-category'
                        isClearable={false}
                        theme={selectThemeColors}
                        value={categories}
                        options={blogCategories}
                        className='react-select'
                        classNamePrefix='select'
                        onChange={data => {setCategory(data)}}
                      />
                    </Col>
                    <Col md='6' className='mb-2'>
                      <Label className='form-label' for='blog-edit-status'>
                        وضعیت
                      </Label>
                      <Input
                        type='select'
                        id='blog-edit-status'
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                      >
                        <option value="true">فعال</option>
                        <option value="false">غیر فعال</option>
                      </Input>
                    </Col>
                    <Col sm='12' className='mb-2'>
                      <Label className='form-label' for='blog-edit-slug'>
                        توضیح کوتاه در گوگل
                      </Label>
                      <Input
                        id="blog-edit-descGoogle"
                        name="descGoogle"
                        value={formik.values.descGoogle}
                        onChange={handleDescdescGoogle}
                        onBlur={formik.handleBlur}
                        invalid={formik.errors.descGoogle ? true : false}
                      />
                      {formik.errors.descGoogle && <FormFeedback>{formik.errors.descGoogle}</FormFeedback>}
                    </Col>
                    <Col sm='12' className='mb-2'>
                      <Label className='form-label' for='blog-edit-slug'>
                        توضیح کوتاه
                      </Label>
                      <Input
                        id="blog-edit-slug"
                        name="descMini"
                        value={formik.values.descMini}
                        onChange={handleDescMiniChange}
                        onBlur={formik.handleBlur}
                        invalid={formik.errors.descMini ? true : false}
                      />
                      {formik.errors.descMini && <FormFeedback>{formik.errors.descMini}</FormFeedback>}
                    </Col>
                    
                    <Col sm='12' className='mb-2'>
                      <Label className='form-label'>توضیحات</Label>
                      <ReactQuill
                        theme="snow"
                        name="content"
                        value={formik.values.content}
                        onChange={handleContentChange}
                        modules={modules}
                       />
                      <Label className='text-danger'>{errorContent && <FaExclamationCircle className="me-2" />}{errorContent}</Label>
                    </Col>
                    <Col className='mb-2' sm='12'>
                      <div className='border rounded p-2'>
                        <h4 className='mb-1'>تصویر اصلی</h4>
                        <div className='d-flex flex-column flex-md-row'>
                          <img
                            className={`rounded me-2 mb-1 mb-md-0${featuredImg ? "" : " bg-warning"}`}
                            src={featuredImg}
                            alt=''
                            width='170'
                            height='110'
                          />
                          <div>
                            <small className='text-muted'> عکس نمی تواند بیشتر از 10 مگابایت باشد </small>

                            <p className='my-50'>
                              <a href='/' onClick={e => e.preventDefault()}>
                                {`${imgPath ? `C:/fakepath/${imgPath}`: 'هیچ عکسی موجود نیست'}`}
                              </a>
                            </p>
                            <div className='d-inline-block'>
                              <div className='mb-0'>
                                <Input
                                  type='file'
                                  id='exampleCustomFileBrowser'
                                  name='customFile'
                                  onChange={onChange}
                                  accept='.jpg, .png, .gif'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col className='mt-50'>
                      <Button color='primary' className='me-1' type='submit' >
                          اعمال تغییرات
                      </Button>
                      <Button color='secondary' type='button' onClick={(e) => {e.preventDefault();setclearAll(!clearAll);}} >
                          لغو تغیرات
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </div>
  )
  
}

export default BlogEdit
