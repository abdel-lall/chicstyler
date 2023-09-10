
import "./brand.scss";
import Link from 'next/link';
const Brand = () => {
  return (
    <div className={`brand-section`}>
      <h1 className="brand">
        <Link href={"/"} className="brand-link">
          chicstyler
        </Link>
      </h1>
    </div>
  );
};

export default Brand;
