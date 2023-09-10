import JumboCard from "./jumbo-card/jumbo.card.component";
import Image from "next/image";
import "./jumbotron.scss";
const Jumbotron = ({ currentImage, mobile }) => {
  const styles = {
    backgroundColor: currentImage.color,
  };
  return (
    <div className="jumbotron-div" style={styles}>
      <Image
        src={mobile ? currentImage.srcMobile : currentImage.src}
        alt={currentImage.title}
        className="jumbotron-image"
      />
      <JumboCard
        cardTitle={currentImage.cardTitle}
        cardMessage={currentImage.cardMessage}
        textColor={currentImage.textColor}
        link={currentImage.link}
      />
    </div>
  );
};
export default Jumbotron;
