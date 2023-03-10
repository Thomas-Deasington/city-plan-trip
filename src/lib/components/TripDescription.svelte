<script lang="ts">
  import { tripPlan, selectedPointOfInterestIndex } from '$lib/stores/main';
  import copy from 'copy-to-clipboard';
  import { toast } from '@zerodevx/svelte-toast';

  $: tripPlanIsEmpty = Object.values($tripPlan).every((x) => x !== null && x.length === 0);

  function selectPlace(index: number) {
    return () => {
      $selectedPointOfInterestIndex = index;
    };
  }

  function copyToClipboard() {
    const text =
      $tripPlan.title +
      '\n' +
      $tripPlan.description +
      '\n\n' +
      $tripPlan.pointsOfInterest.map((place) => `${place.title} : ${place.description}`).join('\n');
    copy(text);
    toast.push('Copied to clipboard ✅', {
      duration: 2000,
      theme: {
        '--toastColor': 'mintcream',
        '--toastBackground': '#4BB543',
        '--toastBarBackground': '#4BB543'
      }
    });
  }
</script>

<div
  class="w-1/2 h-[500px] bg-black p-6 leading-9 italic border border-r-0 border-white rounded-sm rounded-r-none overflow-y-auto"
>
  {#if tripPlanIsEmpty}
    <p>Try search for...</p>
    <br />
    <p><mark>Kyoto</mark> + <mark>1 day trips with temples and foods by bike</mark></p>
    <p><mark>Vancouver</mark> + <mark>2 day road trip with kids and pets</mark></p>
    <p><mark>San Francisco</mark> + <mark>5 things to do in the city</mark></p>
  {:else}
    <div class="flex justify-between">
      <h2 class="text-xl font-bold">{@html $tripPlan.title}</h2>
      <button on:click={copyToClipboard} class="hover:text-indigo-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
      </button>
    </div>
    <div class="my-5 border border-b-0 border-indigo-300" />
    <p>{@html $tripPlan.description}</p>
    <div class="mt-5">
      <h3 class="text-lg font-bold mb-2">Points of interest :</h3>
      <ul class="ml-6">
        {#each $tripPlan.pointsOfInterest as place, index}
          <li class="mb-2">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <mark on:click={selectPlace(index)} class="cursor-pointer font-bold">
              {@html place.title} :
            </mark>
            {@html place.description}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style lang="scss">
  mark {
    @apply bg-indigo-700 text-white px-1 rounded;
  }
</style>
