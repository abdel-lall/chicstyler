"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearUser, updateUser } from "@/store/authSlice";
import "@/styles/account.scss";
import InputEdit from "@/components/input-edit/input.edit.jsx";
import SigninForm from "@/components/signin-form/signin.form.component";
import SignupForm from "@/components/signup-form/signup.form.component";
import Button from "@/components/button/button.component";
import ProductOrdered from "@/components/products/product-orderd/product.ordered.jsx";
import FormInput from "@/components/form-input/form.input.component";

const Account = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("profile");
  const [addProduct, setAddProduct] = useState({
    brand: "",
    name: "",
    description: "",
    category: "",
    color: "",
    size: "",
    price: "",
    image: "",
    stock: "",
    gender: "",
  });

  const [orders, setOrders] = useState([
    {
      id: "1",
      brand: "boss",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
      quantity: 1,
      size: "large",
      price: "$219.99",
      imageSrc: "/assets/images/coat.jpg",
    },
    {
      id: "2",
      brand: "prada",
      description: "amet, consectetur adipisicing Lorem ipsum dolor sit .",
      quantity: 1,
      size: "small",
      price: "$189.99",
      imageSrc: "/assets/images/coat.jpg",
    },
  ]);

  const profileInputs = [
    { name: "first name" },
    { lastName: "last name" },
    { address: "address" },
    { city: "city" },
    { state: "state" },
    { country: "country" },
    { phoneNumber: "phone number" },
    { email: "email" },
    { password: "password" },
    { confirmPassword: "confirm password" },
  ];

  const [profileValues, setProfileValues] = useState({
    name: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [editedData, setEditedData] = useState({});

  const [profileEdits, setProfileEdits] = useState({
    name: false,
    lastName: false,
    address: false,
    city: false,
    state: false,
    country: false,
    phoneNumber: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [profileEditsAlert, setProfileEditsAlert] = useState("");

  useEffect(() => {
    if (user !== null) {
      setProfileValues((prev) => ({
        ...prev,
        ...user,
        password: "",
      }));
    }
  }, [user]);

  const handleProfileInputChange = (name, value) => {
    setProfileValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileEdits = (name) => {
    setProfileEdits((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleAddProductInput = (key, value) => {
    setAddProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const logout = () => {
    axios
      .post("/api/users/signout")
      .then((response) => {
        if (response.status === 200) {
          dispatch(clearUser());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveProfileUpdate = () => {
    if (Object.keys(editedData).length === 0) {
      setProfileEditsAlert("you have not made any changes");
    } else if (
      editedData.hasOwnProperty("password") &&
      editedData.Password !== editedData.confirmPassword
    ) {
      setProfileEditsAlert("password and confirm password do not match");
    } else {
      setProfileEditsAlert("");
      axios
        .post("/api/users/editprofile", editedData)
        .then((response) => {
          if (response.status === 200) {
            dispatch(updateUser(response.data));
          }
        })
        .catch((error) => {
          setProfileEditsAlert(error.response.data?.errors[0]?.message);
        });
    }
  };

  return isAuthenticated ? (
    <div className="account-container">
      <div className="account-options-menu">
        <div className="account-option-profile">
          <button
            className={`account-option-profile-btn${
              selectedOption === "profile" ? ` account-option-selected` : ""
            }`}
            onClick={() => setSelectedOption((prev) => "profile")}
          >
            Profile
          </button>
        </div>
        <div className="account-option-orders">
          <button
            className={`account-option-orders-btn${
              selectedOption === "orders" ? ` account-option-selected` : ""
            }`}
            onClick={() => setSelectedOption((prev) => "orders")}
          >
            order history
          </button>
        </div>
        {user.role === "manager" && (
          <div className="account-option-add-products">
            <button
              className={`account-option-add-products-btn${
                selectedOption === "addProducts"
                  ? ` account-option-selected`
                  : ""
              }`}
              onClick={() => setSelectedOption((prev) => "addProducts")}
            >
              add products
            </button>
          </div>
        )}
      </div>
      <div className="account-profile-orders-container">
        {selectedOption === "profile" && (
          <>
            <div className="account-profile-orders-container-title-section">
              <div className="account-profile-orders-container-title">
                edit your personal info
              </div>
              <Button
                text={"logout"}
                className={"log-out-btn"}
                onClick={logout}
              />
            </div>
            <div className="account-profile-container">
              <div className="account-profile-input-container">
                {profileInputs.map((inputObject) => {
                  const [key, value] = Object.entries(inputObject)[0];
                  return (
                    <InputEdit
                      key={key}
                      name={value}
                      dataName={key}
                      value={profileValues[key]}
                      edit={profileEdits[key]}
                      hanldeChange={handleProfileInputChange}
                      hanldeEdit={handleProfileEdits}
                    />
                  );
                })}
              </div>

              <div className="profile-edit-form-alert">{profileEditsAlert}</div>
              <Button
                text="save changes"
                id="save-changes-btn"
                onClick={saveProfileUpdate}
              />
            </div>
          </>
        )}
        {selectedOption === "orders" && (
          <>
            <div className="account-profile-orders-container-title-section">
              <div className="account-profile-orders-container-title">
                your order history
              </div>
              <Button
                text={"logout"}
                className={"log-out-btn"}
                onClick={logout}
              />
            </div>
            <div className="account-orders-container">
              {orders.map((order) => (
                <ProductOrdered
                  key={order.id}
                  id={order.id}
                  brand={order.brand}
                  description={order.description}
                  showQuntityChange={false}
                  showRemoveBtn={false}
                  quantity={order.quantity}
                  size={order.size}
                  price={order.price}
                  imageSrc={order.imageSrc}
                />
              ))}
            </div>
          </>
        )}
        {selectedOption === "addProducts" && (
          <>
            <div className="account-profile-orders-container-title-section">
              <div className="account-profile-orders-container-title">
                your order history
              </div>
              <Button
                text={"logout"}
                className={"log-out-btn"}
                onClick={logout}
              />
            </div>
            <div className="account-add-products-container">
              {Object.keys(addProduct).map((key) => {
                return (
                  <FormInput
                    key={key}
                    value={addProduct[key]}
                    onChange={(e) => handleAddProductInput(key, e.target.value)}
                    data-id={key}
                    placeholder={key}
                  />
                );
              })}
            </div>
            <div className="account-add-products-btn-container">
              <Button text="Add product" id="add-product-btn" />
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    <div className="signin-signup-wrapper">
      <div className="signin-signup-container">
        <SigninForm />
        <SignupForm />
      </div>
    </div>
  );
};

export default Account;
