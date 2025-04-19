// importando bibliotecas necessários 
import { faChartLine, faBalanceScale, faInfo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// importando components e assets necessários
import Button from '../Buttons/Button/Button';
import logoIcon from '../../assets/logos/LOGOSVG.svg';



import styles from './Sidebar.module.css';

const Sidebar = () => {
  
  const navigate = useNavigate();

  const handleClick = (route) => {
    return (
      navigate(route)
    )
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logoIcon} alt="" />
      </div>  

      <div className={styles.mainButtons}>
        <Button variant={'Btn-icon'} icon={faChartLine} iconClassname={styles.navButtonIcon} className={styles.navButton} onClick={() => handleClick('/statistics')} />
        <Button variant={'Btn-icon'} icon={faBalanceScale} iconClassname={styles.navButtonIcon} className={styles.navButton} onClick={() => handleClick('/comparison')} />
      </div>

      <Button variant={'Btn-icon'} icon={faInfo} iconClassname={styles.infoIcon} className={styles.infoButton} onClick={() => handleClick('/about')}/>
    </div>
  );
};

export default Sidebar;