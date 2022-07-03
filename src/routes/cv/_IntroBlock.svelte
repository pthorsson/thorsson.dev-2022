<script lang="ts">
  import type { CvTemplateIntroContent } from '$lib/types';

  export let content: CvTemplateIntroContent;
</script>

<div class="wrapper">
  <h1>{content.heading}</h1>
  <p>{content.text}</p>
  <div class="image">
    <img src={content.image.src} alt={content.image.alt} />
  </div>
</div>

<style lang="scss">
  @import 'src/lib/scss/breakpoints';

  .wrapper {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 4rem;
    break-inside: avoid-page;
    grid-template-areas:
      'image'
      'heading'
      'text';

    @media print, ($fromL) {
      grid-template-columns: 3fr 1fr;
      grid-template-areas:
        'heading image'
        'text image';
    }
  }

  h1 {
    grid-area: heading;

    @media ($untilL) and ($fromM) {
      text-align: center;
      padding-bottom: 3rem;
    }

    @media print {
      text-align: left;
      padding-bottom: 0;
    }
  }

  p {
    grid-area: text;
  }

  .image {
    grid-area: image;

    @media ($untilL) {
      justify-content: center;
      padding-bottom: 5rem;
    }

    @media print {
      text-align: flex-start;
      padding-bottom: 0;
    }
  }

  img {
    display: block;
    border-radius: 100%;
    width: 220px;
    aspect-ratio: 1;
    margin: 0 auto;

    @media print, ($fromL) {
      width: 100%;
    }
  }
</style>
