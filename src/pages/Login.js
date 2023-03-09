import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";

const Login = ()=> {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [validation,setValidation] = useState([]);

    useEffect(()=>{
        if (localStorage.getItem('token')) {
            navigate('/dashboard');
        }
    }, []);

    /**
     * loginHandler
     * @param {*} e 
     */
    const loginHandler =async function (e) {
        e.preventDefault();
        const formData = new FormData();
    
        formData.append('email',email);
        formData.append('password',password);
    
        await axios.post('http://127.0.0.1:8000/api/login',formData)
            .then((res)=>{
                localStorage.setItem('token',res.data.token)
                navigate('/dashboard');
            })
            .catch((error)=>{
                setValidation(error.response.data);
            })
    }

    return (
        <div className={"hold-transition login-page"}>
        <div className={"login-box"}>
        <div className={"card card-outline card-primary"}>
            <div className={"card-header text-center"}>
            <Link to={""} className={"h1"}><b>Admin</b>LTE</Link>
            </div>
            <div className={"card-body"}>
            <p className={"login-box-msg"}>Silahkan Login</p>

                {
                    validation.message && (
                        <div classNameName={"alert alert-danger"}>
                            {validation.message}
                        </div>
                    )
                }

            <form onSubmit={loginHandler}>
                <div className={"input-group mb-3"}>
                <input type="email" className={"form-control"} placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                {
                    validation.email && (
                        <div classNameName={"alert alert-danger"}>
                            {validation.email[0]}
                        </div>
                    )
                }
                <div className={"input-group-append"}>
                    <div className={"input-group-text"}>
                    <span className={"fas fa-envelope"}></span>
                    </div>
                </div>
                </div>
                <div className={"input-group mb-3"}>
                <input type="password" className={"form-control"} placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
                {
                    validation.password && (
                        <div classNameName={"alert alert-danger"}>
                            {validation.password[0]}
                        </div>
                    )
                }
                <div className={"input-group-append"}>
                    <div className={"input-group-text"}>
                    <span className={"fas fa-lock"}></span>
                    </div>
                </div>
                </div>
                <div className={"row"}>
                <div className={"col-8"}>
                    <div className={"icheck-primary"}>
                    <input type="checkbox" id="remember"/>
                    <label>
                        Remember Me
                    </label>
                    </div>
                </div>

                <div className="col-4">
                    <button type="submit" className={"btn btn-primary btn-block"}>Sign In</button>
                </div>
                
                </div>
            </form>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Login;