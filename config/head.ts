import { NuxtOptionsHead } from "@nuxt/types/config/head"

/* Define constants */
const image = "https://i.pinimg.com/474x/37/35/c7/3735c7781f76b04bf5187ad103e1c1ce.jpg"
const description =
  "Young information technologies student from Turkey, interested in languages, gaming, skating and programming"

const Head: NuxtOptionsHead = {
  title: "Oguz",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      hid: "description",
      name: "description",
      content: description,
    },


    /* Others */
    {
      hid: "theme-color",
      name: "theme-color",
      content: "#171717",
    },
  ].map((i) => {
    // @ts-ignore-next-line
    if (i.name && !i.property) i.property = i.name
    return i
  }),
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "https://i.pinimg.com/474x/37/35/c7/3735c7781f76b04bf5187ad103e1c1ce.jpg",
    },
    {
      rel: "search",
      type: "application/opensearchdescription+xml",
      title: "Oguz's Blog",
      href: "https://oguzaltnby.netlify.app/opensearch.xml",
    },
  ],
}

export default Head
