import styles from "../Styles/statebox.module.css";
import { TickIcon } from "../utils/iconProvider";

export default function SuccessBox({ message }) {
    return(
        <div className={`${styles.wrapper} ${styles.primary}`}>
            <div className={styles.iconContainer}>
                <TickIcon />
            </div>
            <div className={styles.messageContainer}>
                <span>{message?message: "Creator Added Successfully"}</span>
            </div>
        </div>
    )
}