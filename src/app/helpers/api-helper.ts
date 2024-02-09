// El path sera todo lo que viene despues del la url del localpath
export const getStrapiURL = (path = "") => {
    return `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337" // NEXT_PUBLIC_STRAPI_API_URL es en donde va a estar alojado nuestro servidor, que en principio sera en VERCEL (al final del proyecto) . Pero lo guardaremos en un .env.local en nuestro proyecto front.
      }${path}`;
}