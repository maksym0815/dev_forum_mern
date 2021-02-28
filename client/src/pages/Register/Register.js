import {useState} from "react";
import {useDispatch} from "react-redux";
import * as actions from "../../store/actions/UI";
import styles from "./Register.module.scss";
import {signup} from "../../api/auth";
import Form from "../../components/Form/Form";
import Status from "../../components/UI/Status/Status";

function Register() {
    const dispatch = useDispatch();

    const [formData , setFormData] = useState({
      username: "",
      email: "",
      password: ""
    });

    const [status, setStatus] = useState({
      type: "", 
      message: ""
    });

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
      dispatch(actions.startLoading());
      signup(formData).then(response=>{
        if(response.error){
          setStatus({
            type: "warning",
            message: response.message
          });        
        dispatch(actions.endLoading());
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
           dispatch(actions.endLoading());
        }
      })
    }

    return (
      <main>
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