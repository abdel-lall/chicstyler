import Link from "next/link";
import "./menu.scss";

import React from "react";

const Menu = () => {
  return (
    <div className="menu">
      <Link className="menu-item" href="/products/men">
        men
      </Link>
      <Link className="menu-item" href="/products/women">
        women
      </Link>
      <Link className="menu-item" href="/products/shoes">
        shoes
      </Link>
      <Link className="menu-item" href="/products/shirts">
        shirts
      </Link>
      <Link className="menu-item" href="/products/pants">
        pants
      </Link>
      <Link className="menu-item" href="/products/watches">
        watches
      </Link>
    </div>
  );
};

export default Menu;
