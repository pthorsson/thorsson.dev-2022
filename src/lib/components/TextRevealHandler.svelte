<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { triggerTextReveals } from '$lib/helpers/triggerTextReveals';

  export let enabled: boolean;

  afterNavigate(() => {
    triggerTextReveals(enabled);
  });
</script>

<svelte:head>
  {#if enabled}
    <style>
      .-tt {
        white-space: pre-wrap;
        opacity: 0;
        transition: opacity 200ms;
      }

      .-tt span {
        position: relative;
        display: inline-block;
        opacity: 0;
      }

      .-tt span::after {
        content: attr(data-mask);
        position: absolute;
        top: 0;
        left: 0;
        background: var(--color-background-primary);
      }

      .-tt span.-ttv {
        opacity: 1;
        transition: opacity 800ms;
      }
    </style>
  {/if}
</svelte:head>
