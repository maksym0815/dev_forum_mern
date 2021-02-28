import styles from "./Loader.module.scss";

function Loader(props) {
    return (
        <>
            {props.isLoading?
            <div className={styles.loader}>
                <div className={styles.dot}></div>
            </div>:null}
        </>
    );
  }
  
  export default Loader;