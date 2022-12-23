<script lang="ts">
  import type { PageData } from '$lib/types';

  export let data: { pageData: PageData; body: string };
</script>

<svelte:head>
  <title>{data.pageData.meta.title}</title>
  <meta name="description" content={data.pageData.meta.description} />
</svelte:head>

<main class="page-body">
  {@html data.body}
  {#if data.pageData.collection?.length}
    {#each data.pageData.collection as { slug, pageData }}
      <a class="collection-item" href={slug}>{JSON.stringify(pageData.meta)}</a>
    {/each}
  {/if}
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

  .collection-item {
    display: block;
    padding: 10px;
    margin-bottom: 5px;
    background: #f5f5f5;
  }
</style>
