import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Formik } from 'formik';
import axios from 'axios';
import https from 'https';

import config from './config.js';

function App() {

  const [data, setData] = useState(null);

  if (data === null) {

    return (
      <div className="col-6 mx-auto">
        
          <h2 style={{color:"#989898"}} className="pt-2 border-bottom"><img src={logo}/><span className="ml-2 font-weight-bold">ARGO</span> Messaging Registration</h2>
          <br/>
          <br/>
          <br/>
          <Formik
        initialValues={{ name: '', first_name: '', last_name: '', organization: '', description: '', email: '' }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
  
          if (!values.first_name) {
            errors.name = 'Required';
          }
  
          if (!values.last_name) {
            errors.name = 'Required';
          }
  
          if (!values.organization) {
            errors.name = 'Required';
          }
  
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("cliked");
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            axios.post(config.apiURL, 
            values
            ,
        {
         httpsAgent: new https.Agent({
          rejectUnauthorized: false
          })})
        .then((ams_resp) => {
            // alert(JSON.stringify(ams_resp.data,null,2));
            setData(ams_resp.data);
        }, (error) => {
          console.log(error);
          alert("error");
        });
  
  
        setSubmitting(false);
          }, 400);
        }
      }
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
           
            <div className="form-group">
            <label htmlFor="ams-name">Username:</label>
            <input
              id="ams-name"
              className="form-control"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <small id="nameHelp" className="form-text text-muted">Please enter a distinct username</small>
            {errors.name && touched.name }
            </div>
            <div className="form-row">
            <div className="form-group col-md-6">
            <label htmlFor="ams-name">First Name:</label>
            <input
              id="ams-firstname"
              className="form-control"
              name="first_name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.first_name}
            />
            <small id="firstnameHelp" className="form-text text-muted">User's first name</small>
            {errors.first_name && touched.first_name }
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="ams-lastname">Last Name:</label>
            <input
              id="ams-lastname"
              className="form-control"
              name="last_name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.last_name}
            />
            <small id="lastnameHelp" className="form-text text-muted">User's last name</small>
            {errors.last_name && touched.last_name }
            </div>
            </div>
            <div className="form-group">
            <label htmlFor="ams-organization">Organization:</label>
            <input
              id="ams-organization"
              className="form-control"
              name="organization"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.organization}
            />
            {errors.organization && touched.organziation }
            <small id="nameOrganization" className="form-text text-muted">Enter the name of the organization the user belongs to</small>
            </div>
            <div className="form-group">
            <label htmlFor="ams-description">Description:</label>
            <input
              id="ams-description"
              className="form-control"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            <small id="nameDescription" className="form-text text-muted">Enter a description</small>
            {errors.description && touched.description }
            </div>
            <label htmlFor="ams-email">Email:</label>
            <input
              id="ams-email"
              className="form-control"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <small id="emailHelp" className="form-text text-muted">Please enter a vaild email</small>
            {errors.email && touched.email }
            <br/>
            <button className="btn btn-primary" type="submit" >
              Submit
            </button>
            
          </form>
        )}
      </Formik>
  
        
      </div>
      );

  } else {

    return (
      <div className="col-6 mx-auto">
        
          <h2 style={{color:"#989898"}} className="pt-2 border-bottom"><img src={logo}/><span className="ml-2 font-weight-bold">ARGO</span> Messaging Registration</h2>
          <br/>
          <br/>
          <h4>✅ Registration Succesfull!</h4>
          <br/>
          <span className="font-weight-bold">Name:</span>{data.name}<br/>
          <span className="font-weight-bold">First Name:</span>{data.first_name}<br/>
          <span className="font-weight-bold">Last Name:</span>{data.last_name}<br/>
          <span className="font-weight-bold">Organization:</span>{data.organization}<br/>
          <span className="font-weight-bold">Description:</span>{data.description}<br/>
          <span className="font-weight-bold">Registered at:</span>{data.registered_at}<br/>
          <span className="font-weight-bold">Status:</span>{data.status}<br/>
          <br/>

          <button className="btn btn-primary" onClick={() => setData(null)} >
              Return
          </button>
          
  
        
      </div>
      );
  }

  
  
}

export default App;
