import styles from "../Styles/dialog.module.css";
import {Button} from "./Button";

export default function DialogBox({ description, onResponse }) {

    return (

        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.closeContainer}>
                    <span className={styles.close} onClick={()=>onResponse("close")}><u>Close</u></span>
                </div>
                <div>
                    <h3 className={styles.description}>{description}</h3>
                </div>
                <div className={styles.userActionBtns}>
                    <Button bTitle={"No"} type="danger" onResponse={()=> onResponse("no")} />
                    <Button bTitle={"Yes"} type="primary" onResponse={()=> onResponse("yes")}/>
                </div>

            </div>
        </div>
    )
}