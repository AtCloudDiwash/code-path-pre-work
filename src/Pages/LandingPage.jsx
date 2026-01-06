import styles from "../Styles/landingpage.module.css";
import ShowAllCreator from "../Pages/ShowAllCreator";
import RotatingGlobe from "../Components/RotatingGlobe";
import { Button, RevertedButton } from "../Components/Button";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowIcon } from "../utils/iconProvider";
import gsap from "gsap";

export default function LandingPage() {
    const creatorListRef = useRef(null);
    const navigate = useNavigate();

    const curtainRef = useRef();
    const arrowRef = useRef();
    const heroRef = useRef();

    useEffect(() => {

        const tl = gsap.timeline();

        tl.to(arrowRef.current, {
            x: window.innerWidth / 2,
            duration: 1,
        })
            .to(arrowRef.current, {
                rotation: -90,
                duration: 0.5,
            })
            .to(arrowRef.current, {
                x: window.innerWidth / 2,
                y: (window.innerHeight / 2) * .95,
                duration: .6,
            }).to(curtainRef.current, {
                y: -window.innerHeight*2,
                duration: .5
            }).from(`.${styles.char}`, {
                y: 40,
                opacity: 0,
                stagger: 0.06,
                duration: 0.6,
                ease: "power3.out",
            });

        return () => tl.kill();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.curtain} ref={curtainRef}>
                <div className={styles.arrowWrapper}>
                    <ArrowIcon ref={arrowRef} />
                </div>

            </div>
            <nav className={styles.navbar}>
                <span>CreatorVerse</span>
                <ul>
                    <li onClick={() => navigate("/takequiz")}><u>TakeQuiz</u></li>
                </ul>
            </nav>
            <section className={styles.landingSection}>
                <RotatingGlobe />
                <h1 ref={heroRef} className={styles.heroText}>
                    {"CREATOR VERSE".split("").map((char, i) => (
                        <span key={i} className={styles.char}>
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </h1>
                <div className={styles.userActionBtns}>
                    <Button bTitle="Explore Creators" type="primary" onResponse={() => { creatorListRef.current?.scrollIntoView({ behavior: "smooth", bock: "start" }) }} />
                    <RevertedButton bTitle="Add Creators" type="primary" onResponse={() => navigate(`/new`)} />
                </div>
            </section>
            <section ref={creatorListRef}>
                <ShowAllCreator />
            </section>
        </div>
    )
}