<template>
  <div>
    <h1>Hello World</h1>
    <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
    <nuxt-link :to="switchLocalePath('ko')">한국어</nuxt-link>
    <ul>
      <li v-for="link in links" :key="link.slug">
        <nuxt-link
          :to="localePath({ name: 'articles-slug', params: { slug: link.slug } })"
        >
          {{ link.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'articles-index',
  async asyncData({ app }) {
    const files = await import(`~/articles/${app.i18n.locale}.json`)
    const requests = files.default.map(path => (import(`~/${path}`)))
    const results = await Promise.all(requests)
    const links = results.map((result, index) => ({...result.attributes }))
    return { links }
  }
}
</script>

<style>

</style>
