import React, { useRef, useState } from 'react';
import { Loader, ErrorToast, SuccessToast, SetSassion, cleanString } from '../../utils/common';
import session from '../../utils/session';
import SimpleReactValidator from 'simple-react-validator';

const Login = () => {

    const validatorLogin = useRef(new SimpleReactValidator());
    const validator = useRef(new SimpleReactValidator());

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [signupName, setSignupName] = useState('')
    let [signupEmail, setSignupEmail] = useState('')
    let [signupPassword, setSignupPassword] = useState('')
    let [cpassword, setCpassword] = useState('')
    let [rememberme, setRememberme] = useState('')
    let [isLogin, setIsLogin] = useState(true)

    

    // componentWillReceiveProps(nextProps){
    //   Loader(nextProps.requestProcess);
    //   if (nextProps.data && nextProps.data.status) {
    //       if (nextProps.data.status === 200) {
    //         let authData = nextProps.data.data;
    //         session.setSessionData(authData);
    //         SuccessToast(nextProps.data.message);
    //         SetSassion();
    //         if(this.props.fromHeader){
    //           this.props.successResponse(nextProps.data);
    //         }else{
    //           this.props.router.push('dashboard');
    //         }
    //       } else {
    //           ErrorToast(nextProps.data.message);
    //       }
    //     }
    // }

    // componentWillMount(){
    //   if(session.getSessionData() && this.props.router){
    //     this.props.router.push('dashboard');
    //   }
    // }

    const handleChange = (event) => {
      let name = event.target.name;
      let value = cleanString(event.target.value);
       this.setState({
         [name]: value,
       });

     };

    const doLogin = (event) => {

        event.preventDefault();
        if (this.validatorLogin.allValid()) {
          this.props._doLogin(this.state);
        } else {
          this.validatorLogin.showMessages();
          this.forceUpdate();
        }
     }

    const userSignup = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
          this.props._doSignup(this.state);
        } else {
          this.validator.showMessages();
          this.forceUpdate();
        }
    }

    console.log('isLogin', isLogin)

    return (
          <div className="login-wrapper">
            <div className="access-top-part">
                {!isLogin ?
                <div className="registration-part" id="register-content">
                    <div className="registration-title text-center">
                        <h6>Register</h6>
                        <button className="close-registraion-screen" onClick={()=>{setIsLogin(true)}}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.0001 29.3333C23.3639 29.3333 29.3334 23.3638 29.3334 16C29.3334 8.63616 23.3639 2.66663 16.0001 2.66663C8.63628 2.66663 2.66675 8.63616 2.66675 16C2.66675 23.3638 8.63628 29.3333 16.0001 29.3333Z"
                                    stroke="#AFB9C2" strokeWidth="2.66667" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <path d="M20 12L12 20" stroke="#AFB9C2" strokeWidth="2.66667" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <path d="M12 12L20 20" stroke="#AFB9C2" strokeWidth="2.66667" strokeLinecap="round"
                                    strokeLinejoin="round" />
                            </svg>

                        </button>
                    </div>
                    <form action="#" className="login-g-wrapper">
                        <div className="login-left">
                            <h5>Sign up to get your own <br />
                                personalized Upsocial experience!</h5>

                            <p>By having a Upsocial account, you can subscribe, <br />
                                vote, and comment on all your favorite Reddit <br />
                                content. Sign up in just seconds.</p>
                        </div>
                        <div className="login-right">
                            <div className="input-wrapper">
                                <label htmlFor="">Username</label>
                                <input type="text" className="form-control" />
                            </div>

                            <div className="input-wrapper">
                                <label htmlFor="">Email</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="">Password</label>
                                <input type="password" className="form-control" />
                            </div>
                        </div>
                        <div className="login-left flex">
                            <div className="ask-user">Already have an Account ? <a href="#" className="theme-color" onClick={()=>{setIsLogin(true)}}>Login
                                    Now</a>
                            </div>
                        </div>
                        <div className="login-right">
                            <div className="text-center">
                                <button type="submit" className="btn gradient-bg-one radius-30 register">Register Now</button>
                            </div>
                        </div>
                    </form>
                </div>
                :
                <div className="login-part" id="login-content">
                    <form action="#" className="login-g-wrapper">
                        <div className="login-left">
                            <h6>Hi There !</h6>
                            <h1>WELCOME BACK</h1>
                            <h1 className="opacity-one-times">WELCOME BACK</h1>
                            <h1 className="opacity-two-times">WELCOME BACK</h1>
                        </div>
                        <div className="login-right">
                            <div className="input-wrapper">
                                <label htmlFor="">Username</label>
                                <input type="text" className="form-control" />
                            </div>

                            <div className="input-wrapper">
                                <label htmlFor="">Email</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="login-left flex">
                            <div className="ask-user">Dont have an Account ? <a href="#" className="theme-color" onClick={()=>{setIsLogin(false) }}>Register Now</a>
                            </div>
                        </div>
                        <div className="login-right">
                            <div className="twin-btn d-flex align-items-center justify-content-between">
                                <a href="#"
                                    className="btn bg-transparent border border-primary radius-30 forgot-password">Forget
                                    Password</a>
                                <button type="submit" className="btn gradient-bg-one radius-30 login">Login Now</button>
                            </div>
                        </div>
                    </form>
                </div>
                }
            </div>
            <div className="access-bottom-part">
                <div className="policy-link">By signing up, you agree to our <a href="#" className="link theme-color">Terms</a> and
                    that you have read our <a href="#" className="link theme-color">Privacy Policy</a> and <a href="#"
                        className="link theme-color">Content Policy</a>.</div>
            </div>
        </div>
    );
}

export default Login;
