import Spline from '@splinetool/react-spline';
import styles from "../Styles/rotatingglobe.module.css";

export default function RotatingGlobe() {
  return (
    <Spline scene="https://prod.spline.design/KYMSzv-Lz0uDukG6/scene.splinecode" className={styles.globe}/>
  );
}
