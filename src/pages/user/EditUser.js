import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link,useNavigate,useParams} from "react-router-dom";
import Swal from "sweetalert2";
import { Form } from "react-bootstrap";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Button from "react-bootstrap/Button";


const EditUser = () => {

    const navigate = useNavigate();

    const {id} = useParams();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [level,setLevel] = useState("");
    const [validationError,setValidationError] = useState({});

    useEffect(()=>{
        fetchDataUser()
    },[])

    const fetchDataUser = async ()=>{
        await axios.get(`http://127.0.0.1:8000/api/users/show/${id}`)
            .then(({data})=>{
                const {id,name,email,level} = data.data;
                setName(name);
                setEmail(email);
                setPassword(password);
                setLevel(level);
            })
            .catch(({response:{data}})=>{
                Swal.fire({
                    text : data.message,
                    icon : "error"
                })
            })
    }

    const updateUser = async (e)=>{
        e.preventDefault();

        const formData = new FormData();

        formData.append('_method','PATCH');
        formData.append('name',name);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('level',level);

        await axios.post(`http://127.0.0.1:8000/api/users/update/${id}`,formData)
            .then(({data})=>{
                Swal.fire({
                    icon : "success",
                    text : data.message
                });

                navigate("/user");
            })
            .catch(({response})=>{
                if (response.status===422) {
                    setValidationError(response.data.errors)
                }else{
                    Swal.fire({
                        text : response.data.message,
                        icon : "error"
                    });
                }
            })

    }

    return (
        <div className={"wrapper"}>
        <Header/>
        <Sidebar/>
        <div className={"content-wrapper"}>

        <section className={"content-header"}>
        <div className={"container-fluid"}>
            <div className={"row mb-2"}>
            <div className={"col-sm-6"}>
                <h1>User</h1>
            </div>
            <div className={"col-sm-6"}>
                <ol className={"breadcrumb float-sm-right"}>
                <li className={"breadcrumb-item"}><Link to={"/"}>Home</Link></li>
                <li className={"breadcrumb-item active"}>User</li>
                </ol>
            </div>
            </div>
        </div>
        </section>
    
    
        <section className={"content"}>
        <div className={"container-fluid"}>
            <div className={"row"}>
            <div className={"col-12"}>
                <div className={"card"}>
                <div className={"card-header bg-primary"}>
                    <h3 className={"card-title"}>Create Data User</h3>
                </div>

                {
                    Object.keys(validationError).length > 0 && (
                        <div className={"row"}>
                            <div className={"col-12"}>
                                <div className={"alert alert-danger"}>
                                    <ul className={"mb-0"}>
                                        {
                                            Object.entries(validationError).map(([key,value])=>{
                                                <li key={key}>{value}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }

                <Form onSubmit={updateUser}>  
                    <div className={"card-body"}>
                        <Form.Group className={"form-group"}>
                            <Form.Label>Nama Lengkap</Form.Label>
                            <Form.Control type="text" placeholder="Nama Lengkap" value={name} name="name" onChange={(event)=>setName(event.target.value)} required></Form.Control>
                        </Form.Group>
                        
                        <Form.Group className={"form-group"}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={email} name="email" onChange={(event)=>setEmail(event.target.value)} required></Form.Control>
                        </Form.Group>

                        <Form.Group className={"form-group"}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} name="password" onChange={(event)=>setPassword(event.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group className={"form-group"}>
                            <Form.Label>Level</Form.Label>
                            <select className={"form-control"} value={level} name="value" onChange={(event)=>setLevel(event.target.value)} required>
                                <option value={""} hidden>--- Pilih Level ----</option>
                                <option value={"admin"} >Admin</option>
                                <option value={"user"} >User</option>
                            </select>
                        </Form.Group>
                    
                    </div>

                    <div className={"card-footer"}>
                        <Button className={"btn btn-sm btn-primary"} type="submit"><i className="fa fa-save"></i>&nbsp;Save Changes</Button>&nbsp;&nbsp;
                        <Link className={"btn btn-sm btn-danger"} to={"/user"}><i className={"fa fa-undo"}></i>&nbsp;Undo</Link>
                    </div>
                </Form>
                </div>
            
            </div>
            
            </div>
        
        </div>
        
        </section>
        
        </div>
        <Footer/>
    </div>
    )
}

export default EditUser;