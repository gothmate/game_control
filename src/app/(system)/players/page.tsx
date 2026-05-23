import styles from '../page.module.sass'
import Footer from '@/components/Footer'
import Player from '@/components/Player'

export default function Players() {
    return (
        <div className={styles.page}>
            <Player />
            <Footer />
        </div>
    )
}