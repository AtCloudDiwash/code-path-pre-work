import styles from "../Styles/card.module.css";
import {EditLogo, InfoLogo, XLogo, InstagramLogo, YtLogo} from "../utils/iconProvider";
import { useNavigate } from "react-router-dom";

export default function Card({creatorId, creatorName, creatorDescription, urls, imageUrl}){

    const navigate = useNavigate();

    return(
        <div className={styles.container} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(12, 8, 23, 0.99)), url(${imageUrl})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
            <div className={styles.userActionButtons}>
  
                    <InfoLogo onClick={()=> navigate(`/view/${creatorId}`)}/>
                    <EditLogo onClick={()=> navigate(`/edit/${creatorId}`)}/>
            </div>
            <div className={styles.creatorDetails}>
                <h1 className={styles.creatorName}>{creatorName || "John Doe"}</h1>
                <div className={styles.socialMediaLinks}>
                    <a href={`${urls.X}`}>
                        <XLogo/>
                    </a>
                    <a href={`${urls.Instagram}`}>
                        <InstagramLogo/>
                    </a>
                    <a href={`${urls.Youtube}`}>
                        <YtLogo/>
                    </a>
                </div>
                <p className={styles.creatorDescription}>  {creatorDescription? creatorDescription.length > 400? (<>{creatorDescription.slice(0, 500)} {" "}<br/><a style={{opacity: .7, fontSize: "12px", cursor: "pointer"}}><u onClick={()=>navigate(`/view/${creatorId}`)}>(Read More)</u></a></>): creatorDescription
                        : "John Doe is here"}
                </p>
            </div>
        </div>
    );
}