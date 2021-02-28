import {useState} from "react";
import styles from "./Login.module.scss";
import {login} from "../../api/auth";
import Form from "../../components/Form/Form";
import Status from "../../components/UI/Status/Status";
import Loader from "../../components/UI/Loader/Loader";
import {withRouter} from "react-router-dom";

function Login(props) {

    const [formData , setFormData] = useState({
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
      login(formData).then(response=>{
        console.log(response)
        if(response.error){
          setStatus({
            type: "warning",
            message: response.message
          });
          setLoading(false);
        }else{
          setStatus({
            type: "success",
            message: "Logged in successfully."
          });
          localStorage.setItem("user", JSON.stringify({
           ...response.user,
           token: response.token
          }))
          setLoading(false);
          props.history.push("/");
        }
      })
    }

    return (
      <main>
        {loading?<Loader/>:null}
        <div className={styles.Register}>
          <h3>Login</h3>
          <Status status={status}/>
          <Form formSubmitHandler={formSubmitHandler} formChangeHandler={formChangeHandler} formData={formData}/>
          <div className={styles.line}></div>
        </div>
      </main>
    );
  }
  
  export default withRouter(Login);