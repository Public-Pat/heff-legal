// WHO CAN EDIT: Senior

import styles from "./Video.module.scss";

const Video = ({ video }) => {
  return (
    <video className={styles.Video} autoPlay muted loop>
      <source src={video.url} type="video/mp4" />
    </video>
  );
};

export default Video;
