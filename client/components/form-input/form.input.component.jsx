import "./form.input.scss";

const FormInput = ({ placeholder, className, ...otherProps }) => {
  return (
    <input
      {...otherProps}
      className={`form-input-field${className ? ` ${className}` : ""}`}
      placeholder={placeholder}
    />
  );
};
export default FormInput;
