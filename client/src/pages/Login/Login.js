import {useState} from "react";
import {useDispatch} from "react-redux";
import * as actions from "../../store/actions/UI";
import styles from "./Login.module.scss";
import {login} from "../../api/auth";
import Form from "../../components/Form/Form";
import {Status} from "../../components/UI/UI";
import {withRouter} from "react-router-dom";

function Login(props) {
    const dispatch = useDispatch();

    const [formData , setFormData] = useState({
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
      login(formData).then(response=>{
        if(response.error){
          setStatus({
            type: "warning",
            message: response.message
          });
          dispatch(actions.endLoading());
        }else{
          setStatus({
            type: "success",
            message: "Logged in successfully."
          });
          localStorage.setItem("user", JSON.stringify({
           ...response.user,
           token: response.token
          }))
          dispatch(actions.endLoading());
          props.history.push("/");
        }
      })
    }

    return (
      <main className={styles.main}>
        <div className={styles.Login}>
          <h3>Login</h3>
          <Status status={status}/>
          <Form formSubmitHandler={formSubmitHandler} formChangeHandler={formChangeHandler} formData={formData}/>
          <div className={styles.line}></div>
        </div>
      </main>
    );
  }
  
  export default withRouter(Login);