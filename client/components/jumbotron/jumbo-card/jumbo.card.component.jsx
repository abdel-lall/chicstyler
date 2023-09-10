import Link from "next/link";
import "./jumbo.card.scss";

const JumboCard = ({ cardTitle, cardMessage, textColor, link }) => {
  return (
    <div className="jumbo-card" style={{ color: textColor }}>
      <div className="jumbo-card-title">{cardTitle}</div>
      <div className="jumbo-card-message">{cardMessage}</div>
      <Link href={link} className="jumbo-card-button">
        shop now
      </Link>
    </div>
  );
};

export default JumboCard;
