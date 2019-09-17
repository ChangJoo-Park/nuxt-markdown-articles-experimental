<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        vmark-nuxt
      </h1>
      <h2 class="subtitle">
        My beautiful Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>

        <a href="/contents/something">Go</a>

        <nuxt-link to="/contents/something">Go _ Nuxt Link</nuxt-link>
        <nuxt-link :to="localePath({ name: 'contents-slug', params: { slug: 'something' } })">
          글로
        </nuxt-link>
      </div>
      <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
      <nuxt-link :to="switchLocalePath('ko')">한국어</nuxt-link>
      <div>
        <button @click="getAllMD">모두 가져오기</button>
      </div>
    </div>

    <button @click="currentLocale">CL</button>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  methods: {
    currentLocale() {
      console.log(this.$i18n.locale)
    },
    getAllMD() {
      async function asyncImport (slug) {
        const wholeMD = await import(`~/articles/${this.$i18n.locale}/${slug}.md`)
        return wholeMD.attributes
      }
      return Promise.all(blogs.map(blog => asyncImport(blog)))
      .then((res) => {
        console.log(res)
        return {
          blogs: res
        }
      })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
