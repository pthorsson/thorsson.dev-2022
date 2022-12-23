<script lang="ts">
  import type { SiteMetaData } from '$lib/types';
  import '../app.scss';
  import Header from '$lib/components/Header.svelte';

  export let data: SiteMetaData;
</script>

<Header data={data.navigation} />

<slot />
