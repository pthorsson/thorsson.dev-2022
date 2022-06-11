<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const hydrate = false;
  export const prerender = true;

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

  import IntroBlock from './_IntroBlock.svelte';
  import ExperiencesBlock from './_ExperiencesBlock.svelte';
  import TextBlock from './_TextBlock.svelte';

  const templates = {
    intro: IntroBlock,
    experiences: ExperiencesBlock,
    text: TextBlock
  };

  export let cv: CvData;
</script>

<svelte:head>
  <title>{cv.meta.title}</title>
  <meta name="description" content={cv.meta.description} />
</svelte:head>

<div class="cv-body">
  {#each cv.sections as { template, content }}
    {#if templates[template]}
      <svelte:component this={templates[template]} {content} />
    {:else}
      {console.error('Invalid block template for page', template)}
    {/if}
  {/each}
</div>

<a
  rel="external"
  href={cv.meta.fileName}
  download={cv.meta.fileName}
  aria-label="Download CV as .pdf"
>
  <svg fill="none" viewBox="0 0 46 46">
    <path
      d="M37 13.993V40a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16.007a2 2 0 0 1 1.415.586l7.992 7.992A2 2 0 0 1 37 13.993Z"
    />
    <path d="M27.5 3.75V12a1.5 1.5 0 0 0 1.5 1.5h8.25M14 36h18" />
    <path d="M17.938 24.937 23 30l5.063-5.063M23 15.59v13.928" class="arrow" />
  </svg>
</a>

<style lang="scss">
  @import 'src/lib/scss/breakpoints';

  a {
    position: fixed;
    right: var(--page-padding);
    bottom: var(--page-padding);

    &::after {
      content: 'Download as .pdf';
      position: absolute;
      pointer-events: none;
      top: 110%;
      right: 50%;
      transform: translate3d(50%, 0, 0);
      white-space: nowrap;
      font-size: 1.2rem;
      opacity: 0;
      transition: all var(--transition-duration);
    }

    &:hover {
      .arrow {
        transform: translate3d(0, 1.5px, 0);
      }
      &::after {
        transform: translate3d(50%, 1.5px, 0);
        opacity: 1;
      }
    }
  }

  .arrow {
    transition: all var(--transition-duration);
  }

  svg {
    width: 4rem;
    height: 4rem;

    path {
      stroke: currentColor;
      stroke-width: 2;
    }
  }

  .cv-body {
    display: flex;
    flex-direction: column;
    gap: 7.5rem;
    max-width: var(--page-width-narrow);
    width: 100%;
    margin: 0 auto;
    line-height: 2em;
    padding: 0 var(--page-padding) 10rem var(--page-padding);

    :global(h1) {
      font-size: 3.2rem;
      font-weight: 600;
      margin: 0 0 1em 0;
    }

    :global(h2) {
      font-size: 2.6rem;
      font-weight: 600;
      margin: 0 0 1.5em 0;
    }

    :global(h3) {
      font-size: 1.7rem;
      font-weight: 600;
      margin: 0;
    }

    :global(p) {
      margin: 0;
    }

    :global(a) {
      font-weight: 600;
      color: var(--color-foreground-action);
    }

    :global(a:hover) {
      font-weight: 600;
      color: var(--color-foreground-active);
    }
  }
</style>
