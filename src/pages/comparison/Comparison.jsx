import Button from '../../components/Buttons/Button/Button' 
import styles from './Comparison.module.css' 
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons'; 
import IconTitle from '../../components/IconTitle/IconTitle';
 
 
const Comparison = () => { 
  return ( 
    <div>

      <img src="src\assets\img\header.svg" alt="header" className={styles.header}/>       

      <div className={styles.contentArea}>
        <IconTitle icon={faBalanceScale} title={"Comparações"} size='titleRegular' color="var(--base-highlight)"></IconTitle>     
      
        <p className={styles.textMedium}>Os preços e condições dos produtos podem variar de um estado para outro devido a fatores como impostos, disponibilidade e regulamentações locais. </p> 
        
        <p className={styles.textMedium}>Nossa ferramenta de comparação permite que você avalie produtos entre diferentes estados, ajudando você a tomar decisões informadas. Seja para economizar ou entender melhor as variações do mercado, aqui você encontra as informações que precisa. Basta selecionar um produto e os estados que deseja comparar para visualizar um panorama completo.</p> 
        
        
        <div className={styles.redirectArea}>

          <img src="src\assets\img\comparison-example.png" className={styles.example}></img>

          <div>
            <h1 className={styles.titleRegular}>Comparação de Estado</h1>
            
            <p className={styles.labelMedium}>Selecione e compare dois estados entre si.</p>
            
            <Button label={"Comparar"} onClick={() => {window.location = "/comparison/statistics"}} ></Button>
          </div>

        </div>
      </div>    
    </div> 
  ) 
} 
 
export default Comparison 