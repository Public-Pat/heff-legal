import Link from "next/link";
import styles from "./ErrorPage.module.scss";

export default function ErrorPage({ title = "Error — Page Not Found" }) {
  return (
    <div className={styles.Holder}>
      <h1>{title}</h1>
      <Link href="/public">Return to Home</Link>
    </div>
  );
}
