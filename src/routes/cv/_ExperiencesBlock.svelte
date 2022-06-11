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
      <div class="experience">
        <div class="time-info">
          <div class="time-span">
            <div>{from}</div>
            <div class="arrow" />
            <div>{to || 'present'}</div>
          </div>
          <div class="time-duration" class:hide-in-print={!to}>
            {getDuration(from, to)}
          </div>
        </div>
        <h3>{@html company} — {@html role}</h3>
        <p>{@html description}</p>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @import 'src/lib/scss/breakpoints';

  .experiences {
    display: flex;
    flex-direction: column;
    gap: 5rem;
  }

  .experience {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 4rem;
    break-inside: avoid-page;
    grid-template-areas:
      'heading'
      'time'
      'text';

    @media ($fromL) {
      grid-template-columns: 1fr 3fr;
      grid-template-areas:
        'time heading'
        'time text';
    }
  }

  h3 {
    grid-area: heading;
    padding: 0.25em 0;
  }

  p {
    grid-area: text;
  }

  .time-info {
    display: flex;
    grid-area: time;
    color: var(--color-foreground-secondary);

    @media ($untilL) {
      gap: 1rem;
      font-size: 1.2rem;
      font-weight: 600;
    }

    @media ($fromL) {
      flex-direction: column;
    }
  }

  .time-span {
    display: flex;
    align-items: center;
    align-self: flex-start;
    gap: 1rem;
  }

  .time-duration {
    display: flex;
    flex-direction: row;

    @media ($untilL) {
      &::before {
        content: '(';
      }

      &::after {
        content: ')';
      }
    }
  }

  .arrow {
    display: flex;
    align-items: center;
    position: relative;
    height: 1em;
    width: 1rem;

    @media ($fromL) {
      margin-top: 2px;
      width: 2.4rem;
    }

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
