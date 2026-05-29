import styles from "./page.module.sass";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Home</h1><br />
        <a href="/playing" className={styles.btn}>Iniciar um jogo</a>
        <a href="/games" className={styles.btn}>Registrar um jogo</a>
        <a href="/players" className={styles.btn}>Registrar um jogador</a>
      </main>
    </div>
  );
}
