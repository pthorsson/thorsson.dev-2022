<script lang="ts">
  export let body: string;
</script>

<main>
  {@html body}
</main>

<style>
  main {
    padding: var(--page-padding);
    padding-top: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
</style>
