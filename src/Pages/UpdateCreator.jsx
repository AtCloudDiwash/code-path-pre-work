import '@picocss/pico/css/pico.min.css';
import { useState, useRef } from "react";
import { InstagramLogo, XLogo, YtLogo } from "../utils/iconProvider"
import styles from "../Styles/addcreator.module.css";
import DialogBox from "../Components/DialogBox";
import {Button} from '../Components/Button';


export default function UpdateCreator() {

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
    const [showDialog, setShowDialog] = useState(false);

    const handleDialogResponse = (answer) => {
        if (answer === "yes") {
            console.log("Going back to home");
        } else if (answer === "no") {
            console.log("Staying on error page");
        } else if (answer === "close") {
            console.log("Dialog closed");
        }
        setShowDialog(false);
    };

    async function handleAddCreator(e) {
        e.preventDefault();

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

        setShowDialog(true);
        setTimeout(() => {
            setShowDialog(false);
        }, 2000);
    }


    return (
        <>
            {
                showDialog && (
                    <DialogBox
                        description="Would you like to return to the homepage?"
                        onResponse={handleDialogResponse}
                    />
                )
            }
            <div className={styles.wrapper}>
                <form className={styles.container}>
                    <div className={styles.pageTitleWrapper}>
                        <h2 className={styles.pageTitle}> Update Your Creator Here </h2>
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
                    <Button bTitle={"Add Creator"}/>
                </form>
            </div>

        </>
    )
}