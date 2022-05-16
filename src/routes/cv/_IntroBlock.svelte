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
  @import 'src/lib/breakpoints';

  .wrapper {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 4rem;
    grid-template-areas:
      'image'
      'heading'
      'text';

    @media ($fromL) {
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
  }

  p {
    grid-area: text;
  }

  .image {
    display: flex;
    flex: 0 0 auto;
    grid-area: image;

    @media ($untilL) {
      justify-content: center;
      padding-bottom: 5rem;
    }
  }

  img {
    display: block;
    border-radius: 100%;
    width: 220px;
    aspect-ratio: 1;

    @media ($fromL) {
      width: 100%;
    }
  }
</style>
