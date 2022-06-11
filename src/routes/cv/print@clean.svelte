<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const prerender = true;
  export const hydrate = false;

  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/data/cv.json');
    const cv = await res.json();

    return {
      props: {
        cv
      }
    };
  };
</script>

<script lang="ts">
  import type { CvData } from '$lib/types';
  import CvPage from './index.svelte';

  export let cv: CvData;
</script>

<CvPage {cv} />
