import logo from "../assets/favicon.png";
import DialogBox from "../Components/DialogBox";
import { useState } from "react";

export default function ErrorPage(){
    // const [showDialog, setShowDialog] = useState(true);
    //     const handleDialogResponse = (answer) => {
    //     if (answer === "yes") {
    //         console.log("Going back to home");
    //     } else if (answer === "no") {
    //         console.log("Staying on error page");
    //     } else if (answer === "close") {
    //         console.log("Dialog closed");
    //     }
    //     setShowDialog(false);
    // };
    return(
        <div style={{display: "flex", justifyContent: "center", background: "#000", width: "100%", height: "100vh", alignItems: "center"}}>
                <img src={logo} alt="Creator Verse Image" style={{width: "300px", height: "250px"}}/>
                <h1 style={{color: "#fff", fontFamily: "Popppins, sans-serif"}}>404 Page Not Found</h1>
{/* 
                {showDialog && (
                <DialogBox 
                    description="Would you like to return to the homepage?"
                    onResponse={handleDialogResponse}
                />
            )} */}
        </div>

    )
}