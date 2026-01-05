import '@picocss/pico/css/pico.min.css';
import { useState, useRef, useEffect } from "react";
import { InstagramLogo, XLogo, YtLogo } from "../utils/iconProvider"
import styles from "../Styles/addcreator.module.css";
import DialogBox from "../Components/DialogBox";
import {Button} from '../Components/Button';
import { supabase } from '../client';
import { useParams } from 'react-router-dom';
import ErrorBox from '../Components/ErrorBox';
import SuccessBox from '../Components/SuccessBox';


export default function AddCreator({purpose = "add"}) {


    const {creatorId} = useParams();

    const mediaUrls = useRef({
        X: "",
        Youtube: "",
        Instagram: ""
    });
    const creatorNameRef = useRef(null);
    const creatorDescriptionRef = useRef(null);
    const imageUrlRef = useRef(null);
    const xLinkRef = useRef(null);
    const ytLinkRef = useRef(null);
    const instagramLinkRef = useRef(null);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showTransitState, setShowTransitState] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const handleDialogResponse = (answer) => {
        if (answer === "yes") {
            handleEditCreator();
            setShowDialog(false);
        } else if (answer === "no") {
            console.log("no");
            setShowDialog(false)
        } else if (answer === "close") {
            setShowDialog(false);
        }
    };

    async function handleAddCreator() {
        mediaUrls.current = {
            X: xLinkRef.current.value,
            Youtube: ytLinkRef.current.value,
            Instagram: instagramLinkRef.current.value,
        };

        const { error } = await supabase
            .from("creators")
            .insert({
                name: creatorNameRef.current.value,
                description: creatorDescriptionRef.current.value,
                url: mediaUrls.current,
                imageURL: imageUrlRef.current.value,
            });

        if (error) {
            if (error.code === "23505") {
                setErrorMsg("Creator already exists. Try a different creator.");
            } else {
                setErrorMsg("Cannot add creator. An error occurred. Try again.");
            }
            setSuccessMsg("");
        } else {
            setSuccessMsg("You have added the creator successfully!");
            setErrorMsg("");
        }
    }

    function handleUpdateCreator(){
        setShowDialog(true);
    }

    async function handleEditCreator(e) {

        setShowDialog(false);

        mediaUrls.current = {
            X: xLinkRef.current.value,
            Youtube: ytLinkRef.current.value,
            Instagram: instagramLinkRef.current.value,
        };

        const { error } = await supabase
            .from("creators")
            .update({
                name: creatorNameRef.current.value,
                description: creatorDescriptionRef.current.value,
                url: mediaUrls.current,
                imageURL: imageUrlRef.current.value,
            }).eq("id", creatorId);

        if (error) {
            setErrorMsg("Cannot update creator. An error occurred. Try again.");
            setShowTransitState("error");
            setSuccessMsg("");
            setTimeout(()=>{
                setErrorMsg("");
            }, 2000);
        } else {
            setSuccessMsg("You have updated the creator successfully!");
            setShowTransitState("success");
            setErrorMsg("");
            setTimeout(()=>{
                setSuccessMsg("");
            }, 2000);
        }
    }


    useEffect(()=>{

        if(purpose === "add") return;

        async function getCreatorDetails(){
            setErrorMsg(null);
            const { data, error } = await supabase.from("creators").select("*").eq("id", creatorId).single();

            if(error){
                setErrorMsg("There was an error getting creator's details");
            } else {
                creatorNameRef.current.value = data.name;
                creatorDescriptionRef.current.value = data.description;
                imageUrlRef.current.value = data.imageURL;
                mediaUrls.current.value = JSON.parse(data.url);
                xLinkRef.current.value = mediaUrls.current.value.X
                ytLinkRef.current.value = mediaUrls.current.value.Youtube;
                instagramLinkRef.current.value = mediaUrls.current.value.Instagram;
            }
        }
        getCreatorDetails();
    }, [purpose]);


    return (
        <>
            {errorMsg && <ErrorBox message={errorMsg}/>}
            {successMsg && <SuccessBox message={successMsg}/>}
            {showDialog && <DialogBox description = "Do you want to continue this action ?" onResponse = {handleDialogResponse}/>}

            <div className={styles.wrapper}>
                <form className={styles.container}>
                    <div className={styles.pageTitleWrapper}>
                        <h2 className={styles.pageTitle}>{purpose != "add"? `${purpose} Your Creator`:"Add Your Creator"}</h2>
                    </div>
                    <div>
                        <label>Name</label>
                        <input ref={creatorNameRef} type="text" placeholder="Enter your name" />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea ref={creatorDescriptionRef} placeholder="Write a description"></textarea>
                    </div>
                    <div>
                        <label>Image Link</label>
                        <input ref={imageUrlRef} type="text" placeholder="Paste Creator's image link" />
                    </div>
                    <div>
                        <label>X Link <XLogo /></label>
                        <input ref={xLinkRef} type="text" placeholder="Paste X profile's link" />
                    </div>
                    <div>
                        <label>Youtube Link <YtLogo /></label>
                        <input ref={ytLinkRef} type="text" placeholder="Paste Youtube profile's link" />
                    </div>
                    <div>
                        <label>Instagram Link <InstagramLogo /></label>
                        <input ref={instagramLinkRef} type="text" placeholder="Paste Instagram profile's link" />
                    </div>
                    <Button bTitle={purpose === "Update"? "Update Creator":"Add Creator"} onResponse={purpose === "Update"?handleUpdateCreator: handleAddCreator}/>
                </form>
            </div>

        </>
    )
}