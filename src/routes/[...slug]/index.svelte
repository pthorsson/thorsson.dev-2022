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

  export let data: PageData;
  export let body: string;
</script>

<svelte:head>
  <title>{data.meta.title}</title>
</svelte:head>

<TextRevealHandler enabled={data.animateTextReveals} />

{#if data.layout === 'landing'}
  <LandingLayout {body} {data} />
{:else if data.layout === 'content'}
  <ContentLayout {body} />
{:else if data.layout === 'collection'}
  <CollectionLayout {body} {data} />
{/if}
