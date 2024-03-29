<script lang="ts">
  import type { LandingPageData } from './$types';
  import { onMount } from 'svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import PageLinkCard from '$lib/components/PageLinkCard.svelte';
  import TextRevealHandler from '$lib/components/TextRevealHandler.svelte';

  export let data: LandingPageData;

  let loaded = false;

  onMount(() => {
    setTimeout(() => {
      loaded = true;
    }, 2000);
  });
</script>

<svelte:head>
  <title>{data.metaData.title}</title>
  <meta name="description" content="{data.metaData.description}}" />
</svelte:head>

<TextRevealHandler enabled={true} />

<main>
  <div class="landing-body" class:loaded>
    <h1 class="-tt">{data.heading}</h1>

    <p>
      <span class="-tt">{data.firstSubHeading}</span>
      <br />
      <i class="-tt">{data.secondSubHeading}</i>
    </p>

    <ul>
      {#each data.links as { text, href }}
        <li>
          <a {href} class="-tt" target="_blank" rel="noreferrer">{text}</a>
        </li>
      {/each}
    </ul>
  </div>

  <div class="page-links">
    <Carousel --padding-bottom="var(--page-padding)">
      {#each data.promotedPages as { slug, pageData }, i}
        <PageLinkCard {slug} data={pageData.meta} revealDelay={i} />
      {/each}
    </Carousel>
  </div>
</main>

<style lang="scss">
  @import 'src/lib/scss/breakpoints';

  main {
    padding: 0 var(--page-padding);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: calc(100% - env(safe-area-inset-bottom));
  }

  .landing-body {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 1 0 auto;
    overflow: hidden;

    :global(h1) {
      text-align: left;
      font-size: 3.2rem;
      font-weight: 400;
      margin: 0;
    }

    :global(a) {
      color: var(--color-foreground-primary);

      &:hover {
        color: var(--color-foreground-secondary);
      }
    }

    :global(p) {
      text-align: left;
      font-size: 1.7rem;
      font-weight: 400;
      line-height: 1.5em;
    }

    :global(i) {
      color: var(--color-foreground-secondary);
      font-style: normal;
    }

    :global(ul) {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    :global(ul > li) {
      font-size: 1.7rem;
    }

    :global(ul > li > a) {
      display: inline-block;
      padding: 0.12em 0.25em;
    }

    :global(ul > li::before) {
      content: '→';
      display: inline-block;
      color: var(--color-foreground-secondary);
      padding: 0px 0.5em 0px 0px;
      opacity: 0;
      transition: all 1000ms;
      margin: 0;
    }

    &.loaded :global(ul > li::before) {
      opacity: 1;
    }

    @media ($fromM) {
      :global(h1) {
        font-size: 4rem;
      }

      :global(p) {
        font-size: 2.4rem;
      }

      :global(ul > li) {
        font-size: 2rem;
      }
    }

    @media ($fromL) {
      :global(h1) {
        font-size: 5.2rem;
      }

      :global(ul) {
        flex-direction: row;
      }

      :global(ul > li:first-child::before) {
        display: none;
      }

      :global(ul > li:not(:first-child)::before) {
        content: '/';
        display: inline-block;
        color: var(--color-foreground-secondary);
        padding: 0px 0.75em;
      }

      :global(p) {
        font-size: 2.8rem;
      }
    }
  }

  .page-links {
    padding-top: calc(var(--page-padding));
  }
</style>
