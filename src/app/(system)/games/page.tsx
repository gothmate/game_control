import styles from '../page.module.sass'
import Boardgames from '../../../components/Boardgames'
import Footer from '@/components/Footer'

export default function Games() {
    return (
        <div className={styles.page}>
            <Boardgames />
            <Footer />
        </div>
    )
}