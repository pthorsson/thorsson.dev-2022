<script lang="ts">
  import type { CvTemplateExperiencesContent } from '$lib/types';

  export let content: CvTemplateExperiencesContent;

  function getDuration(from: string, to?: string) {
    const now = new Date();
    const [yearFrom, monthFrom] = from.split('.');
    const [yearTo, monthTo] = to
      ? to.split('.')
      : [now.getFullYear(), now.getMonth() + 1];

    const dateFrom = new Date(+yearFrom, +monthFrom);
    const dateTo = to ? new Date(+yearTo, +monthTo) : new Date();

    const totalMonths =
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear()) +
      1;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const duration: string[] = [];

    if (years > 0) {
      duration.push(String(years));
      duration.push(years > 1 ? ' years' : ' year');
    }

    if (months > 0) {
      duration.push(String(months));
      duration.push(months > 1 ? ' months' : ' month');
    }

    if (years === 0 && months === 0) {
      duration.push('less than a month');
    }

    return duration.join(' ');
  }
</script>

<div>
  <h2>{content.heading}</h2>
  <div class="experiences">
    {#each content.items as { from, to, company, role, description }}
      <div class="cv-block-grid">
        <div class="cv-block-col-25 time-info">
          <div class="time-span">
            <div>{from}</div>
            <div class="arrow" />
            <div>{to || 'present'}</div>
          </div>
          <div class="duration" class:hide-in-print={!to}>
            {getDuration(from, to)}
          </div>
        </div>
        <div class="cv-block-col-75">
          <h3>{@html company} — {@html role}</h3>
          <p>{@html description}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .experiences {
    display: flex;
    flex-direction: column;
    gap: 5rem;
  }

  .time-info {
    color: var(--color-foreground-secondary);
  }

  .time-span {
    display: flex;
    align-items: center;
    align-self: flex-start;
    gap: 1rem;
  }

  .arrow {
    display: flex;
    align-items: center;
    position: relative;
    height: 1em;
    width: 2.4rem;
    margin-top: 2px;

    &::before {
      display: block;
      content: '';
      height: 0.15rem;
      width: 100%;
      background: currentColor;
    }

    &::after {
      position: absolute;
      display: block;
      content: '';
      height: 0.55rem;
      width: 0.55rem;
      border-right: 0.15rem solid currentColor;
      border-top: 0.15rem solid currentColor;
      transform: rotate(45deg);
      right: 0;
    }
  }
</style>
