<div class="w-full block sm:flex">
  <Input placeholder="City" className="w-full sm:w-1/6" bind:value={$trip.city} />
  <Input placeholder="Give a short description about your trip" className="w-full sm:w-5/6 mt-2 sm:mt-0 sm:ml-2" bind:value={$trip.description} />
</div>

{#if !loading}
  <button
    class="w-full mt-2 bg-indigo-400 text-white rounded-md p-2"
    on:click={toggleLoading}
    disabled={!isFormValid}
  >
    Plan it ✍️
  </button>
{:else}
  <button
    class="w-full mt-2 bg-indigo-400 text-white rounded-md p-2"
    disabled
  >
    <div class="flex justify-center">
      <Spinner />
      Loading...
    </div>
  </button>
{/if}

<script lang="ts">
  import { trip } from '$lib/stores/main';
  import Input from '$lib/components/Input.svelte';
  import Spinner from '$lib/components/Spinner.svelte';

  let loading = false
  $: isFormValid = $trip.city && $trip.description

  function toggleLoading () {
    loading = !loading
  }
</script>
