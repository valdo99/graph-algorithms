import Grid from '../components/grid/Grid'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.HomeContainer} >
      <Grid height={13} width={13}/>
    </div>
  )
}
