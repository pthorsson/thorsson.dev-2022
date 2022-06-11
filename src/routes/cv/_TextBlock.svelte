<script lang="ts">
  import type { CvTemplateTextContent } from '$lib/types';

  export let content: CvTemplateTextContent;
</script>

<div>
  <h2>{@html content.heading}</h2>
  <p>{@html content.text}</p>
</div>

<style lang="scss">
  div {
    break-after: avoid-page;
  }
</style>
