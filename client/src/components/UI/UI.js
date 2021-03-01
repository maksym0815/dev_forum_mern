import styles from "./UI.module.scss";

export function Loader(props) {
    return (
        <>
            {props.isLoading?
            <div className={styles.loader}>
                <div className={styles.dot}></div>
            </div>:null}
        </>
    );
  }

export function Status(props) {
    return (
        <div className={props.status.type===""?`${styles.statusBox}`:`${styles.statusBox} ${styles.visible}`}>
            <div className={props.status.type==="success"?styles.successLine:styles.errorLine}></div>
            {props.status.message}
        </div>
    );
}