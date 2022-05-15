<script lang="ts">
  import type { PageData } from '$lib/types';

  export let data: PageData;
  export let body: string;
</script>

<main>
  {@html body}
  <h2>Collection</h2>
  {#each data.collection as { slug, data }}
    <a href={slug}>
      {JSON.stringify(data, null, 2)}
    </a>
  {/each}
</main>

<style>
  main {
    padding: var(--page-padding);
    padding-top: 0;
    display: flex;
    flex-direction: column;
  }

  a {
    display: block;
    padding: 20px;
    background-color: #f5f5f5;
    text-decoration: none;
    margin-top: 20px;
  }
</style>
