<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/data/meta.json');
    const metaData = await res.json();

    return {
      props: {
        metaData
      }
    };
  };
</script>

<script lang="ts">
  import type { MetaData } from '$lib/types';
  import Header from '$lib/components/Header.svelte';
  import '../app.scss';

  export let metaData: MetaData;
</script>

<Header data={metaData.navigation} />

<slot />
