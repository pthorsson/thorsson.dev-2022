<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, params }) => {
    const slug = params.slug === '' ? 'index' : params.slug;
    const res = await fetch(`/${slug}.json`);
    const { data, body } = await res.json();

    return {
      props: {
        data,
        body
      }
    };
  };
</script>

<script lang="ts">
  import type { PageData } from '$lib/types';
  import TextRevealHandler from '$lib/components/TextRevealHandler.svelte';

  import ContentLayout from './_ContentLayout.svelte';
  import CollectionLayout from './_CollectionLayout.svelte';
  import LandingLayout from './_LandingLayout.svelte';

  const layouts = {
    content: ContentLayout,
    collection: CollectionLayout,
    landing: LandingLayout
  };

  export let data: PageData;
  export let body: string;
</script>

<svelte:head>
  <title>{data.meta.title}</title>
</svelte:head>

<TextRevealHandler enabled={data.animateTextReveals} />

{#if layouts[data.layout]}
  <svelte:component this={layouts[data.layout]} {body} {data} />
{:else}
  {console.error('Invalid layout for page', data.layout)}
{/if}
