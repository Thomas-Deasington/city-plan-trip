<div class="w-1/2 h-[500px] bg-black p-6 leading-9 italic border border-r-0 border-white rounded-sm rounded-r-none overflow-y-auto">
  {#if tripPlanIsEmpty }
    <p>Try search for...</p><br>
    <p><mark>Kyoto</mark> + <mark>1 day trips with temples and foods by bike</mark></p>
    <p><mark>Vancouver</mark> + <mark>2 day road trip with kids and pets</mark></p>
    <p><mark>San Francisco</mark> + <mark>5 things to do in the city</mark></p>
  {:else}
      <h2 class="text-xl font-bold">{@html $tripPlan.title}</h2>
      <div class="my-5 border border-b-0 border-indigo-300"></div> 
      <p>{@html $tripPlan.description}</p>
      <div class="mt-5">
        <h3 class="text-lg font-bold mb-2">Points of interest :</h3>
        <ul class="ml-6">
          {#each $tripPlan.pointsOfInterest as pointsOfInterest}
            <li class="mb-2">
              <mark class="cursor-pointer font-bold">{@html pointsOfInterest.title} :</mark> {@html pointsOfInterest.description}
            </li>
          {/each}
        </ul>
      </div>
  {/if}
</div>

<script lang="ts">
  import { tripPlan } from '$lib/stores/main';

  $: tripPlanIsEmpty = Object.values($tripPlan).every(x => x !== null && x.length === 0)
</script>

<style lang="scss">
  mark {
    @apply bg-indigo-700 text-white px-1 rounded;
  }
</style>
