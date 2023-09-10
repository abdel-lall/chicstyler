"use client";
import Image from "next/image";
import SearchIcon from "../../../public/assets/images/searchbtn.svg";
import Link from "next/link";
import Bag from "../../../public/assets/images/bag.svg";
import "./nav.header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setSearchWord } from "@/store/productsSlice";

const NavHeader = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchKeyword, setsearchKeyword] = useState("");
  const bagcount = useSelector((state) => state.orders.bagCount);

  const handleSearch = () => {
    dispatch(setSearchWord(searchKeyword));
    router.push(`/products/search`);
  };

  return (
    <div className="nav-header-container">
      <div className="nav-header-section">
        <div className="myaccount-section">
          <Link className="myaccount-link" href="/account">
            my account
          </Link>
        </div>
        <div className="search-section">
          <input
            type="search"
            className="search-input"
            placeholder="search"
            value={searchKeyword}
            onChange={(e) => {
              setsearchKeyword(e.target.value);
            }}
          />
          <button className="serach-btn" onClick={handleSearch}>
            <Image
              alt="search icon"
              src={SearchIcon}
              className="search-btn-icon"
            />
          </button>
        </div>
        <div className="cart-section">
          <Link className="cart-button" href="/bag">
            <Image
              alt="cart icon"
              src={Bag}
              className="cart-icon"
              height={24}
              width={24}
              style={{
                color: "white",
              }}
            />
            <span className="cart-item-count">
              {bagcount === 0 ? "" : bagcount}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
