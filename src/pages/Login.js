// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, NavLink, useNavigate } from "react-router-dom";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { EmailLogin } from "../core/Services/Login/Email";
import { PasswordLogin } from "../core/Services/Login/Password";
import { RememberMe } from "../core/Services/Login/RememberMe";
import { PostLogin } from "../core/Services/api/Login";
import { useQuery } from "@tanstack/react-query";
import { setItem } from "../core/Services/common/storage";
import toast from "react-hot-toast";
import { useState } from "react";

const Login = () => {
  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const navigate = useNavigate()

  const [ EmailVaLid, setEmailValid ] = useState('')
  const [ PasswordVaLid, setPasswordValid ] = useState('')

  const validationEmail = (value) => {
    setEmailValid(value)
  }
  const validationPassword = (value) => {
    setPasswordValid(value)
  }

  const login = async () => {
    // const { isPending, error, data, isFetching } = useQuery({
    //   queryKey: ['repoData'],
    //   queryFn: PostLogin
    // })
    const response = await PostLogin()
    console.log(response)
    if(response.success === true){
      if(response.roles.includes('Administrator')) {
        navigate('/')
        setItem('token', response.token)
      }
      else{
        toast.error(' شما ادمین نیستید 🤣🤣')
      }
    }
    else{
      toast.error(response.message)
    }
  }

  return (
    <div className="auth-wrapper auth-cover" dir="ltr">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: "currentColor" }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  ></polygon>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  ></polygon>
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1"> Dynamic Writers </h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col dir="rtl"
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1" dir="rtl">
              به پنل ادمین خوش آمدی! 👋
            </CardTitle>
            <CardText className="mb-2">
            لطفا وارد حساب کاربری خود شوید و ماجراجویی را شروع کنید
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  ایمیل یا شماره همراه
                </Label>
                <Input
                  type="email"
                  id="login-email"
                  placeholder="ایمیل یا شماره همراه خود را وارد کنید"
                  autoFocus
                  onChange={(e) =>{ EmailLogin(e.target.value), validationEmail(e.target.value)}}
                  valid={EmailVaLid.match('@') && EmailVaLid.match('.com') ? true : false}
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    رمز عبور
                  </Label>
                  <Link to="/forgot-password">
                    {/* <small>فراموشی رمز عبور</small> */}
                  </Link>
                </div>
                <InputPasswordToggle
                  className=""
                  id="login-password"
                  onChange={(e) => {PasswordLogin(e.target.value), validationPassword(e.target.value)}}
                  valid={PasswordVaLid.length > 3 ? true : false}
                />
              </div>
              <div className="form-check mb-1">
                <Input onClick={(e) => RememberMe(e.target.value)} type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  مرا به خاطر بسپار
                </Label>
              </div>
              <Button tag={Link} onClick={login} color="primary" block>
                ورود
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">حساب کاربری ندارید؟</span>
              <Link to="/register">
                <span>ایجاد حساب کاربری</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">یا</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
