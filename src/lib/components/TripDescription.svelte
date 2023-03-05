<div class="w-1/2 bg-black p-6 leading-9 italic border border-r-0 border-white rounded-sm rounded-r-none">
  {#if !$tripPlan.description }
    <p>Try search for...</p><br>
    <p><mark>Kyoto</mark> + <mark>1 day trips with temples and foods by bike</mark></p>
    <p><mark>Vancouver</mark> + <mark>2 day road trip with kids and pets</mark></p>
    <p><mark>San Francisco</mark> + <mark>5 things to do in the city</mark></p>
  {:else}
      {@html $tripPlan.description}
  {/if}
</div>

<script lang="ts">
  import { tripPlan } from '$lib/stores/main';
</script>

<style lang="scss">
  mark {
    @apply bg-indigo-700 text-white px-1 rounded;
  }
</style>
