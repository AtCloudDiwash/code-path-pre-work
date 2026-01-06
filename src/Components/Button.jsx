import styles from "../Styles/button.module.css";

export function Button({
  bTitle,
  Icon,
  type = "primary",
  onResponse = () => {},
}) {
  const typeClass =
    type === "danger" ? styles.danger : styles.primary;

  return (
    <button
      className={`${styles.btn} ${typeClass}`}
      onClick = {(e)=>{e.preventDefault(); onResponse("clicked");}}
    >
      {Icon && <Icon />}
      <span>{bTitle}</span>
    </button>
  );
}

export function RevertedButton({
  bTitle,
  Icon,
  type = "primary",
  onResponse = () => {},
}) {
  const revertedClass =
    type === "danger"
      ? styles.revertedDanger
      : styles.revertedPrimary;

  return (
    <button
      className={`${styles.btn} ${revertedClass}`}
      onClick={(e)=>{e.preventDefault(); onResponse("clicked");}}
    >
      {Icon && <Icon />}
      <span>{bTitle}</span>
    </button>
  );
}



