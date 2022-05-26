<script lang="ts">
  import type { PageData } from '$lib/types';

  export let data: PageData;
  export let body: string;
</script>

<main class="page-body">
  {@html body}
</main>

<style lang="scss">
  main {
    padding: var(--page-padding);
    padding-top: 0;
    gap: 7.5rem;
    max-width: var(--page-width-narrow);
    width: 100%;
    margin: 0 auto;
  }
</style>
