import Footer from "@/components/Footer"
import styles from "./page.module.sass"
import lastGameResult from "@/data/lastResult.json"

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Home</h1><br />
        <div className={styles.content}>
          <a href="/playing" className={styles.btn}>Iniciar um jogo</a>
          <a href="/games" className={styles.btn}>Registrar um jogo</a>
          <a href="/players" className={styles.btn}>Registrar um jogador</a>
        </div>

        <div>
          <h2>Resultado do Último Jogo</h2>
          <fieldset className={styles.field}>
            <legend>{lastGameResult.game.name}</legend>
            <ul className={styles.list}>
              <li>Viu mesa: {lastGameResult.game.played}</li>
              <li>Quando foi jogado: {lastGameResult.game.lastPlayed}</li>
              <li>Duração do jogo: {lastGameResult.game.lastGameDuration}</li>
              <li>Quem jogou: {lastGameResult.players.join(", ")}</li>
              <li>Vencedor: {lastGameResult.game.winner}</li>
            </ul>
          </fieldset>
        </div>
      </main>
      <Footer />
    </div>
  );
}
