import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

const ListUser = ()=>{

    const [dataUser, setDataUser] = useState([]);
    useEffect(()=>{
        fetchDataUser();
    },[]);

    /**
     * Get Data User
     */
    const fetchDataUser = async ()=>{
        await axios.get('http://127.0.0.1:8000/api/users').then(({data})=>{
            setDataUser(data);
        });
    }


    const deleteUser = async (id)=>{
        console.log(id);
        const isConfirm = await Swal.fire({
            title   : 'Apakah kamu yakin?',
            text    : "Anda tidak dapat mengembalikan data yang telah dihapus!",
            icon    : 'warning',
            showCancelButton : true,
            confirmButtonColor : '#3085d6',
            cancelButtonColor   : '#d33',
            confirmButtonText   : 'Ya',
        }).then((result) => {
            return result.isConfirmed;
        })

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://127.0.0.1:8000/api/users/destroy/${id}`).then(({data})=>{
            Swal.fire({
                icon : 'success',
                text : data.message
            });
            fetchDataUser();
        }).catch(({data})=>{
            Swal.fire({
                text : data.message,
                icon : "error"
            });
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
                    <div className={"card-header"}>
                        <div className={"d-flex align-items-center"}>
                            <h3 className={"card-title"}>List User</h3>
                            <Link to={"/user/create"} className={"btn btn-primary btn-round ml-auto"}>
                                <i className={"fa fa-plus"}></i>
                                &nbsp; Tambah Data 
                            </Link>
                        </div>
                    </div>
                
                    <div className={"card-body"}>
                        <table id="example1" className={"table table-bordered table-striped"}>
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Level</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                dataUser.length > 0 && (
                                    dataUser.map((row,key) => {
                                        return(
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>{row.name}</td>
                                            <td>{row.email}</td>
                                            <td>{row.level}</td>
                                            <td>
                                                <Link to={`/user/edit/${row.id}`} className={"btn btn-xs btn-primary "}><i className={"fa fa-edit"}></i>&nbsp; Edit</Link>&nbsp;
                                                <Button className={"btn btn-xs btn-danger"} onClick={()=> deleteUser(row?.id)}><i className={"fa fa-trash"}></i>&nbsp;Hapus</Button>
                                            </td>
                                        </tr>
                                    )})
                                )
                            }
                        </tbody>
                        <tfoot>
                        <tr>
                            <th>Rendering engine</th>
                            <th>Browser</th>
                            <th>Platform(s)</th>
                            <th>Engine version</th>
                            <th>CSS grade</th>
                        </tr>
                        </tfoot>
                        </table>
                    </div>
                
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

export default ListUser;