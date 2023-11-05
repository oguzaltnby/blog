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
            date: "2023-",
          },

        ],
        education: [
          {
            title: "Borusan Asım Kocabıyık Vocational and Technical Anatolian High School",
            url: "https://borusan.meb.k12.tr",
            position: "Information Technologies",
            date: "2020-",
          },
        ],

      } as ExperienceObject,
      cards: {
        me: [
          {
            title: "Repositories",
            description:
            "you won't steal my projects, will you? we're friends.",
            href: "/me/repos",
          },
          {
            title: "Songs",
            description:
              "please don't listen to phonk, it's really bad",
            href: "/me/songs",
          },
          {
            title: "Contact",
            description:
              "do you have any questions bro?",
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
            title: "Donate",
            description:
              "do you have money bro? i don't.",
            href: "/me/donate",
          },

        ],
      },
      skills: [
        {
          title: "Development",
          items: [
            "Javascript",
            "Python",
            "PHP",
            "Dart",
            //"Vue.js",
            "Node.js",
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
})
</script>

<template>
  <div class="space-y-24 mb-10">
    <header
      class="rounded-md flex flex-col-reverse my-16 py-10 md:(flex-row items-center justify-between) justify-center">
      <div class="md:w-8/12">
        <div class="space-y-6">
          <Status class="mt-4 flex justify-center md:justify-start" />

          <h1
            class="font-semibold text-center text-4xl md:(text-6xl text-left) text-black/90 leading-normal dark:text-white/90">
            Software Developer
          </h1>

          <div class="flex items-center justify-center md:justify-start gap-x-3 gap-y-2 flex-wrap">
            <Button v-for="item in ['Javascript', 'Python', 'PHP', ]" :key="item" class="inline-block">
              <IconDev :brand="item" class="h-5 w-5" />
            </Button>

            <Button v-tippy="{ content: 'More', placement: 'bottom' }" href="#technologies">
              <IconEllipsis class="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div class="rounded-full mx-auto mb-4 md:mb-0">
        <img src="/assets/icons/memoji.png" class="rounded-full h-40 w-40" />
      </div>
    </header>

    <section id="pages">
      <Title>Pages</Title>

      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <Card v-for="(card, index) in   cards.pages" :key="`card-p-${index}`" :title="card.title" :href="card.href">
          {{ card.description }}
        </Card>
      </div>
    </section>

    <section id="me">
      <Title>Me</Title>

      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <Card v-for="(card, index) in   cards.me" :key="`card-m-${index}`" :title="card.title" :href="card.href">
          {{ card.description }}
        </Card>
      </div>
    </section>

    <section id="experiences" class="grid gap-x-8 gap-y-24 md:grid-cols-2">
      <div>
        <div class="flex items-center gap-4 justify-between">
          <Title>Experience</Title>
          <button
            type="button"
            class="text-black/50 text-sm hover:underline dark:text-white/30"
            @click="showExtra.jobs = !showExtra.jobs"
          >
            {{ showExtra.jobs ? "show less" : "show more" }}
          </button>
        </div>

        <div class="mt-4 grid gap-2">
          <CardExperience
            v-for="(experience, index) in experiences.jobs"
            v-show="experience.isHidden ? showExtra.jobs : true"
            :key="`experience-job-${index}`"
            :title="experience.title"
            :url="experience.url"
            :hidden-badge="experience.isHidden"
            :date="experience.date"
            :position="experience.position"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center gap-4 justify-between">
          <Title>Education</Title>
          <button type="button" class="text-black/50 text-sm hover:underline dark:text-white/30"
            @click="showExtra.education = !showExtra.education">
            {{ showExtra.education ? "show less" : "show more" }}
          </button>
        </div>

        <div class="mt-4 grid gap-2">
          <CardExperience v-for="(experience, index) in   experiences.education"
            v-show="experience.isHidden ? showExtra.education : true" :key="`experience-education-${index}`"
            :title="experience.title" :url="experience.url" :hidden-badge="experience.isHidden" :date="experience.date"
            :position="experience.position" />
        </div>
      </div>
    </section>

    <section id="technologies">
      <Title>Technologies I use</Title>

      <div class="flex flex-col space-y-6 mt-8">
        <section v-for="category in   skills" :key="category.title">
          <h5
            class="text-sm uppercase text-black/50 pb-2 mb-4 border-b border-black/5 dark:(text-white/30 border-white/5)">
            {{ category.title }}
          </h5>

          <div class="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4 gap-x-2 gap-y-2">
            <CardSkill v-for="(skill, index) in   category.items" :key="`skill-${index}`"
              v-bind="typeof skill === 'object' ? skill : { title: skill }" />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.description-link {
  @apply border-neutral-500 border-b-2 border-opacity-50 hover: border-opacity-75;
}
</style>
