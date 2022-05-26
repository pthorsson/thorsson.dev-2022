<script lang="ts">
  import { page } from '$app/stores';
  import type { MetaData } from '$lib/types';

  export let data: MetaData['navigation'];

  let show = false;
</script>

<div class="header-border" />

<header>
  <div class="brand">
    <a sveltekit:prefetch href="/">
      <span class="-tt">{data.indexLinkText.main}</span>
      <i class="-tt" data-reveal-delay={data.indexLinkText.main.length}>
        {data.indexLinkText.suffix}
      </i>
    </a>
  </div>
  <button
    class="toggle-nav"
    class:show
    on:click={() => (show = !show)}
    aria-label={show ? 'Close menu' : 'Open menu'}
  />
  <nav class:show>
    {#each data.links as { href, text }, i}
      <a
        {href}
        sveltekit:prefetch
        data-text={text}
        class:active={$page.url.pathname === href}
        class="-tt"
        style={`--stagger-duration: ${150 * (i + 2)}ms`}
      >
        {text}
      </a>
    {/each}
  </nav>
</header>

<div class="header-spacer" />

<style lang="scss">
  @import 'src/lib/scss/breakpoints';

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px var(--page-padding);
    align-items: center;
    font-size: 1.25em;
    background: var(--color-background-primary);
    height: 6rem;
    z-index: 500;

    @media ($fromM) {
      height: 8rem;
    }

    @media ($fromL) {
      position: sticky;
      height: 6rem;
      margin-top: -14rem;
      padding-top: 2rem;
    }
  }

  .header-border {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 6rem;
    margin-top: 6rem;

    &::before {
      content: '';
      position: fixed;
      background: var(--color-background-primary);
      border-bottom: 1px solid var(--color-light-grey);
      box-shadow: 0px -15px 3px 15px rgba(0, 0, 0, 0.05);
      top: 0;
      left: 0;
      width: 100%;
      height: 6.1rem;
    }

    &::after {
      content: '';
      position: absolute;
      background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0) 0%,
        var(--color-background-primary) 100%
      );
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    @media ($fromM) {
      height: 8rem;
      margin-top: 8rem;

      &::before {
        height: 8.1rem;
      }
    }
  }

  .header-spacer {
    display: none;

    @media ($fromL) {
      display: block;
      height: 10rem;
    }
  }

  nav {
    @media ($untilL) {
      display: flex;
      position: fixed;
      background: rgba(0, 0, 0, 0.7);
      top: -200%;
      left: 0;
      width: 100%;
      height: 100%;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
      padding: 10rem var(--page-padding);
      gap: 0.5em;
      z-index: 1000;
      transition: top 0ms var(--transition-duration),
        opacity var(--transition-duration) 0ms;
      opacity: 0;
      font-size: 1.5em;

      a {
        display: block;
        padding: 0.3em 0.5em;
        background: var(--color-background-primary);
        opacity: 0;
        transform: translate3d(0px, -15px, 0px);
        transition: opacity var(--transition-duration),
          transform var(--transition-duration);
      }

      &.show {
        transition: top 0ms 0ms, opacity var(--transition-duration) 0ms;
        top: 0;
        opacity: 1;

        a {
          opacity: 1;
          transform: translate3d(0px, 0px, 0px);
          transition: opacity var(--stagger-duration),
            transform var(--stagger-duration);
        }
      }
    }

    @media ($fromL) {
      display: flex;
      position: relative;
      padding: 0;
      margin: 0px -0.5em;
      list-style: none;
      flex-direction: row;
      gap: 1em;
    }
  }

  .toggle-nav {
    @media ($untilL) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.4em;
      border: 0;
      padding: 0;
      margin: 0;
      height: 2.5em;
      width: 2.5em;
      border-radius: 0.2em;
      transition: background var(--transition-duration),
        gap var(--transition-duration) var(--transition-duration);
      z-index: 1001;
      background: transparent;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      &::before,
      &::after {
        display: block;
        content: '';
        background: var(--color-foreground-primary);
        width: 75%;
        height: 2px;
        border-radius: 2px;
        transition: transform var(--transition-duration) 0ms;
      }

      &.show {
        transition: background var(--transition-duration),
          gap var(--transition-duration) 0ms;
        gap: 0px;

        &::before,
        &::after {
          transition: transform var(--transition-duration)
              var(--transition-duration),
            width var(--transition-duration) var(--transition-duration);
          width: 60%;
          background: var(--color-background-primary);
        }

        &::before {
          transform: rotate(45deg);
          margin-bottom: -1px;
        }

        &::after {
          transform: rotate(-45deg);
          margin-top: -1px;
        }
      }
    }

    @media ($fromL) {
      display: none;
    }
  }

  a {
    display: block;
    color: var(--color-foreground-primary);
    text-decoration: none;
    padding: 0.25em 0.5em;
    border-radius: 10px;

    &:hover {
      color: var(--color-foreground-secondary);
    }

    &.active {
      font-weight: var(--font-weight-bold);
      color: var(--color-foreground-primary);
    }
  }

  .brand {
    margin: 0px -0.5em;

    a {
      display: flex;
      font-weight: var(--font-weight-bold);

      i {
        font-style: normal;
        color: var(--color-foreground-secondary);
        font-weight: var(--font-weight-normal);
      }
    }
  }
</style>
