import "./input.edit.scss";
import Image from "next/image";
import Edit from "@/public/assets/images/edit.svg";
import Save from "@/public/assets/images/save.svg";
import FormInput from "../form-input/form.input.component";
const InputEdit = ({
  value,
  edit,
  name,
  dataName,
  hanldeChange,
  hanldeEdit,
}) => {
  return edit ? (
    <div className="input-edit-container">
      <div className="input-edit">
        <FormInput
          id="input-edit-input"
          onChange={(e) => hanldeChange(dataName, e.target.value)}
          value={value}
          placeholder={name}
        />
        <button className="input-show-btn" onClick={() => hanldeEdit(dataName)}>
          <Image
            alt="save"
            src={Save}
            height={22}
            width={22}
            className="save-image"
          />
        </button>
      </div>
    </div>
  ) : (
    <div className="input-show-container">
      <div className="input-show">
        <div className="input-show-value">
          <span className="input-show-value-title">{`${name}: `}</span>
          {value}
        </div>
        <button className="input-edit-btn" onClick={() => hanldeEdit(dataName)}>
          <Image
            alt="edit"
            src={Edit}
            height={22}
            width={22}
            className="edit-image"
          />
        </button>
      </div>
    </div>
  );
};

export default InputEdit;
