import {useDispatch} from "react-redux";
import * as actions from "../../store/actions/UI"
import styles from "./UI.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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

export function ErrorModal(props){
    const dispatch = useDispatch();

    return (
        <>
            {props.errorOccured.flag?
            <div className={styles.ErrorModal}>
                <p>{props.errorOccured.message}</p>
                <FontAwesomeIcon className={styles.icon} icon={faTimes} onClick={()=>dispatch(actions.stopError())}/>
                <Button type="danger" click={()=>dispatch(actions.stopError())}>CLOSE</Button>
            </div>:null}
        </>
    )
}

export function Container(props){
    return (
        <div className={styles.Container}>
            {props.children}
        </div>
    )
}

export function Button(props){
    return (
        <button className={props.type=="warning"?`${styles.btn} ${styles.btnWarning}`:`${styles.btn} ${styles.btnDanger}`} onClick={props.click}>
            {props.children}
        </button>
    )
}