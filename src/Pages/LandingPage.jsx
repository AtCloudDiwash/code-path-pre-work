import styles from "../Styles/landingpage.module.css";
import ShowAllCreator from "../Pages/ShowAllCreator";
import RotatingGlobe from "../Components/RotatingGlobe";
import {Button, RevertedButton} from "../Components/Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage(){
    const creatorListRef = useRef(null);
    const navigate = useNavigate();

    return(
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <span>CreatorVerse</span>
                <ul>
                    <li><u>TakeQuiz</u></li>
                </ul>
            </nav>
            <section className={styles.landingSection}>
                <RotatingGlobe/>
                <h1 className={styles.heroText}>CREATOR VERSE</h1>
                <div className={styles.userActionBtns}>
                    <Button bTitle = "Explore Creators" type="primary" onResponse={()=>{creatorListRef.current?.scrollIntoView({behavior:"smooth", bock: "start"})}}/>
                    <RevertedButton bTitle= "Add Creators" type="primary" onResponse={()=>navigate(`/new`)}/>
                </div>
            </section>
            <section ref = {creatorListRef}>
                <ShowAllCreator/>
            </section>
        </div>
    )
}