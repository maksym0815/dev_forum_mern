import {useState} from "react";
import styles from "./Register.module.scss";
import {signup} from "../../api/auth";
import Form from "../../components/Form/Form";
import Status from "../../components/UI/Status/Status";
import Loader from "../../components/UI/Loader/Loader";

function Register() {

    const [formData , setFormData] = useState({
      username: "",
      email: "",
      password: ""
    });

    const [status, setStatus] = useState({
      type: "", 
      message: ""
    });

    const [loading, setLoading] = useState(false);

    const formChangeHandler = (e)=>{
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
      setStatus({
        type: "", 
        message: ""
      });
    }

    const formSubmitHandler = (e)=>{
      e.preventDefault();
      setLoading(true);
      signup(formData).then(response=>{
        if(response.error){
          setStatus({
            type: "warning",
            message: response.message
          });
          setLoading(false);
        }else{
          setStatus({
            type: "success",
            message: "Registered successfully. Please login to continue."
          });
          setFormData({
            username: "",
            email: "",
            password: ""
           });
           setLoading(false);
        }
      })
    }

    return (
      <main>
        {loading?<Loader/>:null}
        <div className={styles.Register}>
          <h3>Register</h3>
          <Status status={status}/>
          <Form formSubmitHandler={formSubmitHandler} formChangeHandler={formChangeHandler} formData={formData}/>
          <div className={styles.line}></div>
        </div>
      </main>
    );
  }
  
  export default Register;