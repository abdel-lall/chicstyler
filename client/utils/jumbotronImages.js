const images = [
  {
    id: 1,
    title: "women",
    src: require("@/public/assets/images/women.jpg"),
    srcMobile: require("@/public/assets/images/women_mobile.jpg"),
    displaySide: "left",
    color: "#1b1b1b",
    contrast: "light",
    textColor: "#FFFFFF",
    cardTitle: "for her",
    cardMessage:
      "our favorite styles right now feature pants, shirts and dresses",
    link: "/products/women",
  },
  {
    id: 2,
    title: "men",
    src: require("../public/assets/images/men.jpg"),
    srcMobile: require("@/public/assets/images/men_mobile.jpg"),
    displaySide: "left",
    color: "#1c1a31",
    contrast: "light",
    textColor: "#FFFFFF",
    cardTitle: "office ready",
    cardMessage: "Explore our line of luxury suits for men",
    link: "/products/men",
  },
  {
    id: 3,
    title: "shoes",
    src: require("../public/assets/images/shoes.jpg"),
    srcMobile: require("@/public/assets/images/shoes_mobile.jpg"),
    displaySide: "right",
    color: "#d8c593",
    textColor: "#000000",
    contrast: "dark",
    cardTitle: "prada",
    cardMessage: "the fall 2023 collection",
    link: "/products/shoes",
  },
  {
    id: 4,
    title: "watches",
    src: require("../public/assets/images/watches.jpg"),
    srcMobile: require("@/public/assets/images/watches_mobile.jpg"),
    displaySide: "right",
    color: "#191611",
    textColor: "#FFFFFF",
    contrast: "light",
    cardTitle: "watches",
    cardMessage: "Shop the latest designer watches from today’s top designers",
    link: "/products/watches",
  },
];
export default images;
