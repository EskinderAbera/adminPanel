import styles from "./Spline.module.scss";
import {Link} from 'react-router-dom'

const Spline = ({ titles }) => {
  
  return (
    <div className={styles.chart}>
      <div className={styles.canvas_wrapper} >
        <h1>{`Manage ${titles}`}</h1>
      </div>
    </div>
  );
};

export default Spline;
