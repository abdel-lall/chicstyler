import { cookies } from "next/headers";
import { headers } from "next/headers";

export const SSRfetching = async (method, URLpath, body) => {
  const cookieStore = cookies();
  const session = cookieStore.get("session");
  const headersInstance = headers();
  const host = headersInstance.get("host");

  const requestHeaders = new Headers({
    Host: host,
    Cookie: session ? `${session.name}=${session.value}` : null,
  });
  const requestOptions = {
    method: method,
    headers: requestHeaders,
  };

  if (method === "POST") {
    if (body) {
      requestOptions.body = JSON.stringify(body); // Add the body for POST requests
    } else {
      requestOptions.body = JSON.stringify({});
    }
  }

  const res = await fetch(
    `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/${URLpath}`,
    requestOptions
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
  //you need to set header host to "chickstyler.dev" because nginx has routing rules for this domain
  if (!res.ok) {
    // console.log(res);
  }
  return res.json();
};
