import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import  './signup.css'
import axios from 'axios'
import logo from '../logo.jpg'
import endpoint from '../EndPoints/endpoint.json'

export default function Signup() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error:'false',
        success:false,
        errormessage:[]
      });
    
      const { name, email, password, confirmPassword ,error,errormessage,success} = formData;
    
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.id]: e.target.value });
 
      const onSubmit = async (e) => {
        e.preventDefault();
       
        setFormData({ ...formData,error:'false',errormessage:''})


    try {
        let res = await axios({
          method: 'post',
          url: endpoint.sysendpoint.login,
          data: formData
          
        });
    
        setFormData({ error:'false',errormessage:'',success:true,name:'',email:'',password:'',confirmPassword:''})
      
      } catch (error) {
        console.log(error.response); 
      
        setFormData({ ...formData,error:'true',success:false,errormessage:error.response.data.errors})
      
      }
             
      
    
    }

    return (

            <div className="divalign container"> 
            <form onSubmit={onSubmit}>
                <img src={logo}></img>
            <div className="form-group">
                <label >Name</label>
                <input type="text"  required={true} className="form-control" id="name" aria-describedby="emailHelp" placeholder="Name" value={name}
            onChange={onChange}/>
               
            </div>
            <div className="form-group">
                <label >Email address</label>
                <input type="email" required={true} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email}
            onChange={onChange}/>
                <small id="emailHelp"  className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label >Password</label>
                <input type="password" required={true} className="form-control" id="password" placeholder="Password" value={password}
            onChange={onChange}/>
            </div>
            <div className="form-group">
                <label >Confirm Password</label>
                <input type="password"   required={true} className="form-control" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword}
            onChange={onChange}/>
            </div>
    
            <button type="submit" className="btn btn-primary">Submit</button>
            <div> 

             <div> 
                {errormessage && errormessage.map((error, i) => <p key={i}> <div class="alert alert-danger py-3" role="alert">{error.msg}</div></p>)}
            
                {success ? <div class="alert alert-success py-3" role="alert">Thanks for Signing up. Please check your email for further instuctions.</div> :null}

             </div>
             </div>
            </form>
            </div>
      
    )
}
