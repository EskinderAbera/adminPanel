import styles from "./Container.module.scss";

const Container = ({  content }) => {
  return (
    <div className={styles.container}>
      {content}
    </div>
  );
};

export default Container;
