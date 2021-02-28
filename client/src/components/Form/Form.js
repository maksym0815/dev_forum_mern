import styles from "./Form.module.scss";

const Form = (props)=>{
    return (
        <form className={styles.form} onSubmit={e=>props.formSubmitHandler(e)}>
            {props.formData.username!=null?<div className="username">
              <label htmlFor="username">
                <input type="text" name="username" id="username" value={props.formData.username} onChange={e=> props.formChangeHandler(e)} placeholder="Username"/>
              </label>
            </div>:null}
            <div className="email">
              <label htmlFor="email">
                <input type="email" name="email" id="email" value={props.formData.email} onChange={e=> props.formChangeHandler(e)} placeholder="Email"/>
              </label>
            </div>
            <div className="password">
              <label htmlFor="password">
                <input type="password" name="password" id="password" value={props.formData.password}  onChange={e=> props.formChangeHandler(e)} placeholder="Password"/>
              </label>
            </div>
            <button type="submit">SUBMIT</button>
          </form>
    )
}

export default Form;