import ProductDetail from "@/components/products/product-detail/product.detail.jsx";
import { SSRfetching } from "@/utils/SSRfetching";

// async function getData(sessionCookie, host) {
//   const headers = new Headers({
//     Host: host,
//     Cookie: `${sessionCookie.name}=${sessionCookie.value}`,
//   });
//   const requestOptions = {
//     method: "GET",
//     headers: headers,
//   };

//   const res = await fetch(
//     "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
//     requestOptions
//   );
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
//   // http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
//   //you need to set header host to "chickstyler.dev" because nginx has routing rules for this domain
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     console.log(res);
//   }
//   console.log("is this on server -----------");
//   return res.json();
// }

const PoductDetailPage = ({ params, searchParams }) => {
  return <ProductDetail id={params.id} />;
};

export default PoductDetailPage;
