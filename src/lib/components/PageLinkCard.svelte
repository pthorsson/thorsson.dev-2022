<script lang="ts">
  import type { PageData } from '$lib/types';
  import { onMount } from 'svelte';

  export let slug: string;
  export let data: PageData['meta'];
  export let revealDelay: number;

  let show = false;

  onMount(() => {
    setTimeout(() => {
      show = true;
    }, revealDelay * 100);
  });
</script>

<a data-sveltekit-preload-data href={slug} class:show>
  <div class="card-title">{data.title} [{slug}]</div>
  <div class="card-description">{data.description}</div>
</a>

<style lang="scss">
  a {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: var(--color-background-primary);
    background: var(--color-foreground-primary);
    padding: calc(var(--page-padding) / 4) calc(var(--page-padding) / 3);
    min-height: 170px;
    max-height: 300px;
    height: 30vh;
    opacity: 0;
    transform: translateY(100%);
    transition: transform 1000ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1);

    &.show {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  .card-title {
    font-size: 1.25em;
  }

  .card-description {
    font-size: 1em;
  }
</style>
