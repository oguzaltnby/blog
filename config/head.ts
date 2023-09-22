import { NuxtOptionsHead } from "@nuxt/types/config/head"

/* Define constants */
const image = "https://schwefel.netlify.app/logo.png"
const description =
  "Young information technologies student from Turkey, interested in languages, gaming, skating and programming"

const Head: NuxtOptionsHead = {
  title: "Schwefel",
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
      href: "https://schwefel.netlify.app/logo.png",
    },
    {
      rel: "search",
      type: "application/opensearchdescription+xml",
      title: "Schwefel's Blog",
      href: "https://schwefel.netlify.app/opensearch.xml",
    },
  ],
}

export default Head
