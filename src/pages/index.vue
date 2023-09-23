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
            title: "Voco Inc.",
            url: "https://vocoapp.com",
            position: "Web Developer",
            date: "2023-",
          },
          {
            title: "Google Developer Student Clubs",
            url: "https://gdsc.community.dev/mus-alparslan-universitesi",
            position: "Core Team Member",
            date: "2022-",
          },
          {
            title: "KUKA Theater Associacion",
            url: "https://kukasahne.com",
            position: "Web Developer & Social Media Manager",
            date: "2022-",
          },
          {
            title: "Discord Templates",
            url: "https://discords.com/templates",
            position: "Web Developer & Co-Founder",
            date: "2020-2021",
          },
          {
            title: "IZM Game Studios",
            position: "Solution Partner",
            date: "2020-2021",
            isHidden: true,
          },
          {
            title: "TruckersMP",
            url: "https://truckersmp.com/user/1648033",
            position: "Community Moderator & Translator",
            date: "2020-2021",
            isHidden: true,
          },
          {
            title: "WA Web+ Extension",
            url: "https://wawplus.com",
            position: "Translator",
            date: "2020-2021",
            isHidden: true,
          },
          {
            title: "Batakköylü Düğün Salonu",
            url: "https://batakkoylu.netlify.app",
            position: "Web Developer",
            date: "2020-2020",
            isHidden: true,
          },
          {
            title: "EGGSY's Discord Bot",
            url: "https://top.gg/bot/eggsy",
            position: "Creator, Developer and Maintainer",
            date: "2017-2019",
          },
          {
            title: "Discord Bot List",
            url: "https://top.gg/user/162969778699501569",
            position: "Website Moderator",
            date: "2017-2018",
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
              "Will update soon",
            href: "/blog",
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
        <SmartImage src="/assets/images/memoji.png" class="rounded-full h-40 w-40" />
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
