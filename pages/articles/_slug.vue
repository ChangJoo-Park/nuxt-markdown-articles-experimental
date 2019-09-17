<template>
  <div v-html="html"></div>
</template>

<script>
export default {
  async asyncData ({ app, params }) {
    const fileContent = await import(`~/articles/${app.i18n.locale}/${params.slug}.md`)
    const { attributes, html } = fileContent
    return { html }
  }
}
</script>

<style>

</style>
