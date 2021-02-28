import styles from "./Loader.module.scss";

function Loader() {
    return (
        <div className={styles.loader}>
            <div className={styles.dot}></div>
        </div>
    );
  }
  
  export default Loader;