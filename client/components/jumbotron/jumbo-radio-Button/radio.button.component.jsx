
import "./radio.button.scss";
import Image from 'next/image';
import  CircleEmty  from "../../../public/assets/images/circle-empty.svg";
import Circlefull from "../../../public/assets/images/circle-full.svg";
const RadioButton = ({ selected, color, ...otherProps }) => {
  return (
    <div className="radio-button">
      {selected ? (
        <Image
        alt="circle full"
        src={Circlefull}
          className='radio-button-circle'
          {...otherProps}
          style={{
            transform: "scale(1.2)", // Initial scale value
          }}
        />
      ) : (
        <Image
        alt="circle empty"
        src={CircleEmty}
          className='radio-button-circle'
          {...otherProps}
        />
      )}
    </div>
  );
};

export default RadioButton;
