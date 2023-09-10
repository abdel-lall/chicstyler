import "./button.scss";

const Button = ({ text, className, dark, ...otherProps }) => {
  return (
    <button
      className={`generic-button ${dark ? "dark" : ""} ${className}`}
      {...otherProps}
    >
      {text}
    </button>
  );
};

export default Button;
