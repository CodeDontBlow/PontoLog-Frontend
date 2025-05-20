// importando bibliotecas necessários 
import { faChartLine, faBalanceScale, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// importando components e assets necessários
import Button from '../Buttons/Button/Button';
import logoIcon from '../../assets/logos/LOGOSVG.svg';
import logoIconPink from '../../assets/logos/LOGOSVG_BASEPINK.svg';

import styles from './Sidebar.module.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (route) => {
    return (
      navigate(route)
    )
  };

  return (
    <div className={styles.sidebar}>
      {/*  O conteúdo da sidebar foi colocado em um elemento filho de '.sidebar' para que possa grudar na parte de cima da tela enquanto ocupa 100vh  */}
      <div className={styles.sidebarContent}>
        <div className={styles.logo}>
          <Link to={'/'}>
           <img src={logoIcon} alt="" />
          </Link>
        </div>
        <div className={styles.mainButtons}>
          <Button variant={'Btn-icon'} icon={faChartLine} iconClassname={styles.navButtonIcon} className={`${styles.navButton} ${location.pathname.startsWith('/statistics') ? styles.active : ''}`} onClick={() => handleClick('/statistics')}/>
          <Button variant={'Btn-icon'} icon={faBalanceScale} iconClassname={styles.navButtonIcon} className={`${styles.navButton} ${location.pathname.startsWith('/comparison') ? styles.active : ''}`} onClick={() => handleClick('/comparison')} active={location.pathname.startsWith('/comparison')}/>
        </div>
        <Button variant={'Btn-icon'} icon={faInfo} iconClassname={styles.infoIcon} className={`${styles.infoButton} ${location.pathname === '/about' ? styles.active : ''}`} onClick={() => handleClick('/about')} />
      </div>
    </div>
  );
};

export default Sidebar;