<div class="w-full block sm:flex">
  <Input placeholder="City" className="w-full sm:w-1/6" bind:value={$trip.city} />
  <Input placeholder="Give a short description about your trip" className="w-full sm:w-5/6 mt-2 sm:mt-0 sm:ml-2" bind:value={$trip.description} />
</div>

{#if !loading}
  <button
    class="w-full mt-2 bg-indigo-400 text-white rounded-md p-2"
    on:click={getTripPlan}
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
  import { trip, tripPlan } from '$lib/stores/main';
  import Input from '$lib/components/Input.svelte';
  import Spinner from '$lib/components/Spinner.svelte';
  import type { TripPlanType } from '../../types/trip.type';
  import { toast } from '@zerodevx/svelte-toast'

  let loading = false
  $: isFormValid = $trip.city && $trip.description

  async function getTripPlan () {
    loading = true
    const response = await fetch('/api/search-trip', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        city: $trip.city,
        description: $trip.description
      })
    })

    const json = await response.json()
    try {
      $tripPlan = JSON.parse(json.choices?.[0]?.text.replace(/(\r\n|\n|\r)/gm, "")) as TripPlanType
    } catch (e) {
      console.error(e)
      toast.push('Something went wrong, please try again later', {
        theme: {
          '--toastColor': 'mintcream',
          '--toastBackground': '#E26D69',
          '--toastBarBackground': '#E26D69'
        }
      })
    }
    loading = false
  }
</script>
