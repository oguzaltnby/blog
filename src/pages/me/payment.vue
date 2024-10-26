<script lang="ts">
import Vue from "vue"

/* Interfaces */
import type { SponsorLinks } from "~/@types/runtimeConfig"
import type { ISponsor } from "@/types/Response/Sponsors"

export default Vue.extend({
  data() {
    return {
      sponsors: [] as ISponsor[],
      accounts: [
        {
          image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Garanti_Bank_logo.png",
          name: "Garanti",
          iban: "TR12 0006 2001 1510 0006 8787 43",
          revealed: false,
        },
      ],
      banks: [
        {
          name: "Ziraat Bankası",
          image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Ziraat_Bank_logo.png",
          transferUrl: "https://www.ziraatbank.com.tr/en/personal-banking/transactions/money-transfer"
        },
        {
          name: "İş Bankası",
          image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Isbank_logo.png",
          transferUrl: "https://www.isbank.com.tr/en/money-transfer"
        },
        {
          name: "Akbank",
          image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Akbank_logo.png",
          transferUrl: "https://www.akbank.com/en-us/individual/Pages/money-transfer.aspx"
        },
        {
          name: "Yapı Kredi",
          image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Yapi_Kredi_logo.png",
          transferUrl: "https://www.yapikredi.com.tr/en/personal-banking/transactions/money-transfer"
        },
        {
          name: "DenizBank",
          image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/DenizBank_logo.png",
          transferUrl: "https://www.denizbank.com/en/personal-banking/transactions/money-transfer"
        }
      ]
    }
  },
  fetchOnServer: false,

  head() {
    const title = "Payment"
    const description =
      "You can make your payments to me through the following banks"

    return {
      title,
      meta: this.$prepareMeta({
        title,
        description,
        keywords: "donate",
        url: "https://schwefel.tech/me/donate",
      }),
      link: [
        {
          rel: "canonical",
          href: "https://schwefel.tech/me/donate",
        },
      ],
    }
  },

})
</script>

<template>
  <PageLayout
    title="Payment"
    :description="[ `P.S. Use 'Oğuzhan ALTUNBEY' as the name of your transactions.` ]"
    class="space-y-12"
  >
    <section class="space-y-4">
      <Title>Bank Accounts</Title>

      <div class="grid gap-4">
        <div
          v-for="(account, index) in accounts"
          :key="`account-${index}`"
          class="flex h-full space-x-4 items-center rounded-lg card-base"
        >
          <div class="rounded-lg">
            <img :src="account.image" class="rounded-lg h-12 w-12" />
          </div>

          <div class="rounded-tr rounded-br flex h-full">
            <div>
              <h3 class="font-medium text-lg">
                {{ account.name }}
              </h3>

              <span
                class="text-black/30 dark:text-white/30"
                :class="!account.revealed && 'hover:underline cursor-pointer select-none'"
                @click="account.revealed = true"
              >
                {{ account.revealed ? account.iban : "Click to Reveal" }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <Title>Transfer from Your Bank</Title>

      <div class="grid gap-4">
        <div
          v-for="(bank, index) in banks"
          :key="`bank-${index}`"
          class="flex h-full space-x-4 items-center rounded-lg card-base"
        >
          <div class="rounded-lg">
            <img :src="bank.image" class="rounded-lg h-12 w-12" />
          </div>

          <div class="rounded-tr rounded-br flex h-full">
            <div>
              <h3 class="font-medium text-lg">
                {{ bank.name }}
              </h3>

              <a
                :href="bank.transferUrl"
                target="_blank"
                class="text-blue-500 hover:underline ml-2"
              >
                Transfer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
</template>
