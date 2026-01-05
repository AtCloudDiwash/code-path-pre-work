import styles from "../Styles/statebox.module.css";
import {ErrorIcon} from "../utils/iconProvider";

export default function ErrorBox({message}){
    return(
        <div className={`${styles.wrapper} ${styles.danger}`}>
            <div className={styles.iconContainer}>
                <ErrorIcon/>
            </div>
            <div className={styles.messageContainer}>
                <span>{message?message: "Unknown Error Occured"}</span>
            </div>
        </div>
    )
}