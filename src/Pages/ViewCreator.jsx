import {useNavigate, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../Styles/viewcreator.module.css";
import {EditLogo, XLogo, InstagramLogo, YtLogo, DeleteIcon} from "../utils/iconProvider";
import {Button} from "../Components/Button";
import ErrorBox from "../Components/ErrorBox";
import {supabase} from "../client";
import DialogBox from "../Components/DialogBox";

export default function ViewCreator({creatorName, creatorDescription, imageUrl, urls}) {


    const navigate = useNavigate();
    const {creatorId} = useParams();

    const [creatorDetail, setCreatorDetail] = useState({});
    const [loading, setLoading] = useState(null);
    const [set, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(()=>{
        async function getCreatorDetails(){
            setLoading("Loading...");
            setError(null);
            const { data, error } = await supabase.from("creators").select("*").eq("id", creatorId).single();

            if(error){
                setError("There was an error getting creator's details");
                setLoading(null);
            } else {
                setCreatorDetail(data);
                setLoading(null);
            }
        }
        getCreatorDetails();
    }, []);

    async function handleDeleteCreator(){
        setDeleteError(null);
        const { error } = await supabase.from("creators").delete("*").eq("id", creatorId);

        if(error){
            setDeleteError("Experienced an Error while deleting the deatils, Please refresh");
            setTimeout(()=>{
                setDeleteError("");
            }, 2000)
            setShowDialog(false);
            return;
        }
        setShowDialog(false);
        setSuccessMsg("Deleted the creator. Heading to main page...");
        headBackToMainPage();
    }

    // Extracting account name from the url
    function extractAccountName(url) {
    try {
        const { pathname } = new URL(url);

        let handle = pathname.split("/").filter(Boolean)[0];

        if (!handle) return null;

        //Adds @ if not present
        return handle.startsWith("@") ? handle : `@${handle}`;
    } catch {
        return null;
    }
    }

    function headBackToMainPage(){
        setTimeout(()=>{
            navigate("/");
        }, 2000);
    }

    // Handlers

    function handleDialogResponse(response){
        switch(response){
            case "yes":
                handleDeleteCreator();
                break;
            case "no":
                setShowDialog(false);
                break;

            case "close":
                setShowDialog(false);
                break;
            default:
                console.log("Hey this is me")
        }

    }

    function handleDeleteResponse(){
        setShowDialog(true);
    }

    return (
        <>
        
            {successMsg && <ErrorBox message= {successMsg}/>}
            {deleteError && <ErrorBox message= {deleteError}/>}

            {showDialog && <DialogBox description = "Do you want to continue this action ?" onResponse = {handleDialogResponse}/>}
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <div className={styles.shape}>

                </div>
                <div className={styles.imageWrapper}>
                    <img src={creatorDetail.imageURL} alt="Creator's Image" className={styles.creatorImg}/>
                </div>
            </div>

            <div className={styles.rightSection}>
                <h1 className={styles.creatorName}>{creatorDetail.name || loading}</h1>
                <div className={styles.socialMediaLinks} target = "_blank">
                    <div>
                        <a href={`${creatorDetail.url&&JSON.parse(creatorDetail.url).X}`}>
                            <XLogo className={styles.socialLogo}/> <span className={styles.socialLabel}>{extractAccountName(creatorDetail.url&&JSON.parse(creatorDetail.url).X) || "X account name"}</span>
                        </a>
                    </div>
                    <div>
                        <a href={`${creatorDetail.url&&JSON.parse(creatorDetail.url).Instagram}`} target = "_blank">
                            <InstagramLogo  className={styles.socialLogo}/> <span className={styles.socialLabel}>{extractAccountName(creatorDetail.url&&JSON.parse(creatorDetail.url).Instagram) || "Ig account name"}</span>
                        </a>
                    </div>
                    <div>
                        <a href={`${creatorDetail.url&&JSON.parse(creatorDetail.url).Youtube}`} target = "_blank">
                            <YtLogo className={styles.socialLogo}/> <span className={styles.socialLabel}>{extractAccountName(creatorDetail.url&&JSON.parse(creatorDetail.url).Youtube) || "Yt channel name"}</span>
                        </a>
                    </div>
                </div>
                <p className={styles.creatorDescription}>  
                    {loading || creatorDetail.description}
                </p>
                <div className={styles.userActions}>
                    <div><Button bTitle={"Delete"} Icon = {DeleteIcon} type="danger" onResponse={handleDeleteResponse}/></div>
                    <div><Button bTitle={"Edit"} Icon = {EditLogo} type="primary" onResponse={()=>{navigate(`/edit/${creatorId}`)}}/></div>
                </div>
            </div>

        </div>

    </>
    );
}