<script lang="ts">
  import type { CvTemplateIntroContent } from '$lib/types';

  export let content: CvTemplateIntroContent;
</script>

<div class="cv-block-grid">
  <div class="cv-block-col-75">
    <h1>{content.heading}</h1>
    <p>{content.text}</p>
  </div>
  <div class="cv-block-col-25 image-container">
    <img
      src={content.image.src}
      alt={content.image.alt}
      width={1000}
      height={1000}
    />
  </div>
</div>

<style>
  .image-container {
    flex: 0 0 auto;
  }

  img {
    display: block;
    border-radius: 100%;
    max-width: 100%;
    height: 100%;
  }
</style>
