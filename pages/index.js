import Grid from '../components/grid/Grid'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.HomeContainer} >
      <Grid height={10} width={10}/>
    </div>
  )
}
