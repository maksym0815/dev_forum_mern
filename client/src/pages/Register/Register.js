import {useState} from "react";
import styles from "./Register.module.scss";
import {signup} from "../../api/auth"

function Register() {
    const [formData , setFormData] = useState({
      username: "",
      email: "",
      password: ""
    });
    const [status, setStatus] = useState("");

    const formChangeHandler = (e)=>{
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
      setStatus("");
    }

    const formSubmitHandler = (e)=>{
      e.preventDefault();
      signup(formData).then(response=>{
        if(response.error){
          setStatus(response.message);
        }else{
          setStatus("Registered successfully. Please login to continue.");
          setFormData({
          username: "",
          email: "",
          password: ""
           });
        }
      })
    }

    return (
      <main>
        <div className={styles.Register}>
          <h3>Register</h3>
          <div className={status===""?`${styles.statusBox}`:`${styles.statusBox} ${styles.visible}`}>
            <div className={status==="Registered successfully. Please login to continue."?styles.successLine:styles.errorLine}></div>
            {status}
          </div>
          <form onSubmit={e=>formSubmitHandler(e)}>
            <div className="username">
              <label htmlFor="username">
                <input type="text" name="username" id="username" value={formData.username} onChange={e=> formChangeHandler(e)} placeholder="Username"/>
              </label>
            </div>
            <div className="email">
              <label htmlFor="email">
                <input type="email" name="email" id="email" value={formData.email} onChange={e=> formChangeHandler(e)} placeholder="Email"/>
              </label>
            </div>
            <div className="password">
              <label htmlFor="password">
                <input type="password" name="password" id="password" value={formData.password}  onChange={e=> formChangeHandler(e)} placeholder="Password"/>
              </label>
            </div>
            <button type="submit">SUBMIT</button>
          </form>
          <div className={styles.line}></div>
        </div>
      </main>
    );
  }
  
  export default Register;