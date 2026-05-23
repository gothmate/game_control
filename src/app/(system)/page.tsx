import styles from "./page.module.sass";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Home</h1>
        <input type="button" className={styles.btn} value="Iniciar um jogo" />
      </main>
    </div>
  );
}
