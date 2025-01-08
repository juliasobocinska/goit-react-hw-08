import DocumentTitle from '../../DocumentTitle';
import styles from "../../styles/HomePage.module.css"

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <div style={styles.container}>
        <h1 style={styles.title}>
        </h1>
      </div>
    </>
  );
}