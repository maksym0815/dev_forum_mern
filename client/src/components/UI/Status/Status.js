import styles from "./Status.module.scss";

function Status(props) {
    return (
         <div className={props.status.type===""?`${styles.statusBox}`:`${styles.statusBox} ${styles.visible}`}>
            <div className={props.status.type==="success"?styles.successLine:styles.errorLine}></div>
            {props.status.message}
          </div>
    );
  }
  
  export default Status;