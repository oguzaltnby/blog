<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type { Repository } from "../types/Response/GitHub"

interface Project {
  title: string
  description: string
  href?: string
  to?: string
  icon?: string
}

interface Experience {
  title: string
  url: string
  position: string
  date: string
  isHidden?: boolean
}

interface ExperienceObject {
  jobs: Experience[]
  education: Experience[]
}

export default Vue.extend({
  data() {
    return {
      showModal: false,
      showExtra: {
        jobs: false,
        education: false,
      },
      repos: [] as Repository[],
      experiences: {
        jobs: [
          {
            title: "Kumport Port Services Inc.",
            url: "https://kumport.com.tr",
            position: "Information Technologies",
            date: "2023-2024",
          },

        ],
        education: [
          {
            title: "Borusan Asım Kocabıyık Vocational and Technical Anatolian High School",
            url: "https://borusan.meb.k12.tr",
            position: "Information Technologies",
            date: "2020-2024",
          },
          {
            title: "Istanbul Arel University",
            url: "https://arel.edu.tr",
            position: "Computer Engineering",
            date: "2024-",
          },
        ],

      } as ExperienceObject,
      cards: {
        me: [
          {
            title: "Repositories",
            description:
              "Want to see and/or contribute to my code and public repositories?",
            href: "/me/repos",
          },
          {
            title: "Songs",
            description:
              "Trust your taste? Compare your favourite songs and artists with mine!",
            href: "/me/songs",
          },
          {
            title: "Contact",
            description:
              "Need help with anything? Want to get in touch? Send me a message!",
            href: "/me/contact",
          },
        ],
        pages: [
          {
            title: "Blog",
            description:
              "sleep tight. i'm under your bed!",
            href: "/blog",
          },
          {
            title: "Projects",
            description:
              "My projects and contributions to the open-source community.",
            href: "/projects",
          },
          {
            title: "Daily Songs",
            description:
              "Fresh, cool and great song recommendations from me each day",
            href: "/daily",
          },
          // {
          //   title: "Donate",
          //   description:
          //     "do you have money bro? i don't.",
          //   href: "/me/donate",
          // },

        ],
      },
      skills: [
        {
          title: "Development",
          items: [
            "TypeScript",
            "Javascript",
            "C#",
            "Vue.js",
            "Node.js",
            "Python",
            "PHP",
            "Dart",

            //"Sass",
          ],
        },
        {
          title: "Apps",
          items: [
            {
              title: "VS Code",
              iconPack: "IconBrand",
            },
            {
              title: "Figma",
            },

            {
              title: "Illustrator",
            },
            {
              title: "Photoshop",
            },
          ],
        },
        {
          title: "Services",
          items: [
            {
              title: "GitHub",
              iconPack: "IconBrand",
            },
            {
              title: "Discord"
            },
            {
              title: "Firebase",
            },
            {
              title: "Netlify",
              iconPack: "IconBrand",
            },
          ],
        },
      ],
    }
  },
  head: {
    title: "Home",
  },
  methods: {
    async scrollToSection(id: string) {
      if (this.$route.hash === id)
        await this.$router.replace({
          hash: "",
        })

      await this.$router.replace({
        hash: id,
      })
    },
  },
})
</script>

<template>
  <div class="space-y-24 mb-10 max-w-4xl mx-auto px-4">
    <header
      class="rounded-md flex flex-col-reverse my-16 py-10 md:flex-row md:items-center md:justify-between justify-center">
      <div class="md:w-8/12">
        <div class="space-y-8">
          <div class="lg:space-y-4">
            <Status class="mt-4 flex justify-center md:justify-start" />
            <h1 class="font-semibold text-center text-lg md:text-xl md:text-left text-black/50 dark:text-white/50">
              Hi, I am
              <span class="text-black/90 dark:text-white/90">Oğuzhan</span>
            </h1>

            <h1
              class="font-semibold text-center text-4xl md:text-6xl md:text-left text-black/90 leading-normal dark:text-white/90">
              Full-stack <br class="md:hidden" /> web developer
            </h1>
          </div>

          <div class="flex items-center justify-center md:justify-start gap-x-3 gap-y-2 flex-wrap">
            <Button v-for="item in ['TypeScript', 'Javascript', 'C#']" :key="item" class="inline-block" v-tippy="{
              content: '{{ item }}',
            }">
              <IconDev :brand="item" class="h-5 w-5" />
              <span class="ml-2">{{ item }}</span>
            </Button>

            <Button v-tippy="{ content: 'More', placement: 'bottom' }" @click.native="scrollToSection('#technologies')">
              <IconEllipsis class="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div class="rounded-full mx-auto mb-4 md:mb-0">
        <img src="/assets/icons/memoji.png" class="rounded-full h-50 w-50" />
      </div>
    </header>

    <section id="pages">
      <Title>Pages</Title>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.description-link {
  @apply border-neutral-500 border-b-2 border-opacity-50 hover:border-opacity-75;
}
</style>
