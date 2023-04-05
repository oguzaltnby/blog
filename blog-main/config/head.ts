import { NuxtOptionsHead } from "@nuxt/types/config/head"

/* Define constants */
const image = "static/assets/icon.png"
const description =
  "Young information technologies student from Turkey, interested in languages, gaming, skating and programming"

const Head: NuxtOptionsHead = {
  title: "Nortonox",
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
      href: "static/assets/icons/icon.ico",
    },
    {
      rel: "search",
      type: "application/opensearchdescription+xml",
      title: "Nortonox's Blog",
      href: "https://nortonox.netlify.app/opensearch.xml",
    },
  ],
}

export default Head
