<script lang="ts">
  import { onMount } from 'svelte';

  let indicator: HTMLDivElement;
  let pane: HTMLDivElement;
  let disablePreviousButton = true;
  let disableNextButton = false;
  let loaded = false;

  function scrollHandler() {
    const { scrollLeft, scrollWidth, clientWidth, children } = pane;
    const slideWidthPercentage = children[0].clientWidth / clientWidth;
    const progress = Math.min(
      1,
      Math.max(0, scrollLeft / (scrollWidth - clientWidth))
    );

    indicator.style.setProperty('--progress', String(progress));

    disablePreviousButton = progress < slideWidthPercentage * 0.2;
    disableNextButton = progress > 1 - slideWidthPercentage * 0.2;
  }

  function changeSlideHandler(direction: number) {
    const slideWidth = pane.children[0].clientWidth;

    pane.scrollBy({
      left: slideWidth * direction,
      behavior: 'smooth'
    });
  }

  onMount(() => {
    setTimeout(() => {
      loaded = true;
    }, 700);
  });
</script>

<div class="wrapper">
  <div class="pane" bind:this={pane} on:scroll={scrollHandler}>
    <slot />
  </div>
  <div class="footer" class:loaded>
    <button
      class="prev"
      disabled={disablePreviousButton}
      on:click={() => changeSlideHandler(-1)}
    />
    <div class="indicator" bind:this={indicator} />
    <button
      class="next"
      disabled={disableNextButton}
      on:click={() => changeSlideHandler(1)}
    />
  </div>
</div>

<style lang="scss">
  @import 'src/lib/scss/breakpoints';

  .wrapper {
    position: relative;

    --carousel-align: center;
    --carousel-visible-items: 1.1;

    @media ($fromM) {
      --carousel-visible-items: 2;
      --carousel-align: start;
    }

    @media ($fromL) {
      --carousel-visible-items: 3;
      --carousel-align: start;
    }

    --carousel-bleed: var(--page-padding);
    --carousel-gap: calc(var(--page-padding) / 2);
    --carousel-item-width: calc(
      calc(100% / var(--carousel-visible-items)) -
        (
          var(--carousel-bleed) * 2 / var(--carousel-visible-items) +
            var(--carousel-gap) * (var(--carousel-visible-items) - 1) /
            var(--carousel-visible-items)
        )
    );
  }

  .footer {
    position: absolute;
    bottom: calc(var(--page-padding) - 36px);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    opacity: 0;
    transition: all 700ms;
    width: 100%;
    gap: 0.8rem;

    &.loaded {
      opacity: 1;
    }

    @media ($untilL) {
      display: none;
    }
  }

  .indicator {
    width: 100px;
    height: 2px;
    background: var(--color-background-secondary);

    &::before {
      display: block;
      content: '';
      width: 100%;
      height: 2px;
      background: var(--color-foreground-primary);
      transform: scale3d(var(--progress, 0), 1, 1);
      transform-origin: left;
    }
  }

  button {
    position: relative;
    display: flex;
    align-items: center;
    height: 0px;
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    color: var(--color-foreground-primary);
    transition: color 300ms, transform 300ms;
    padding: 15px 0px;

    &::before {
      display: block;
      content: '';
      height: 2px;
      width: 50px;
      background: currentColor;
    }

    &::after {
      position: absolute;
      display: block;
      content: '';
      height: 10px;
      width: 10px;
      border-left: 2px solid currentColor;
      border-top: 2px solid currentColor;
    }

    &.prev {
      &:not(:disabled):hover {
        cursor: pointer;
        transform: translate3d(-5px, 0px, 0px);
      }

      &::after {
        left: 1px;
        transform: rotate(-45deg);
      }
    }

    &.next {
      &:not(:disabled):hover {
        cursor: pointer;
        transform: translate3d(5px, 0px, 0px);
      }

      &::after {
        right: 1px;
        transform: rotate(135deg);
      }
    }

    &:disabled {
      color: var(--color-background-secondary);
    }
  }

  .pane {
    width: calc(100% + var(--page-padding) * 2);
    margin: 0px calc(var(--carousel-bleed) * -1);
    display: flex;
    flex-direction: row;
    gap: var(--carousel-gap);
    scroll-padding: var(--page-padding);
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    flex-wrap: nowrap;
    scrollbar-width: none;
    overscroll-behavior-x: none;
    padding-bottom: var(--padding-bottom, 0px);
    padding-top: var(--padding-top, 0px);
    scrollbar-width: none;

    > :global(*) {
      width: var(--carousel-item-width);
      flex: 0 0 auto;
      scroll-snap-align: var(--carousel-align);
    }

    > :global(*:last-child) {
      scroll-snap-align: end;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    &::before,
    &::after {
      display: block;
      content: '';
      flex: 0 0 auto;
    }

    &::before {
      width: calc(var(--page-padding) / 2);
    }

    &::after {
      width: calc(var(--page-padding) / 2);
    }
  }
</style>
