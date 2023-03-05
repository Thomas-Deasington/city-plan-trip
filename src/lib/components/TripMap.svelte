<div class="w-1/2 h-[500px] border border-l-0 border-white rounded-sm rounded-l-none">
  <Map accessToken={PUBLIC_MAPBOX_TOKEN}
    style="mapbox://styles/mapbox/outdoors-v11" knekln
    bind:this={mapComponent} 
    on:ready={onReady}
  >
    {#each $tripPlan.pointsOfInterest as place}
      {#if place.latitude && place.longitude}
        <Marker lat={place.latitude} lng={place.longitude} label={place.title} color="rgb(129,140,248)" />
      {/if}
    {/each}
  </Map>
</div>

<script lang="ts">
  import { Map, Marker } from '@beyonk/svelte-mapbox'
  import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public'
  import { tripPlan, selectedPointOfInterestIndex, isTripPlanLoading } from '$lib/stores/main';

  let mapComponent: any
  $: selectedPointOfInterest = $tripPlan.pointsOfInterest?.[$selectedPointOfInterestIndex] || null

  $: if (selectedPointOfInterest) {
    try {
      mapComponent.setCenter([selectedPointOfInterest.longitude, selectedPointOfInterest.latitude])
      mapComponent.flyTo({ center: [selectedPointOfInterest.longitude, selectedPointOfInterest.latitude] })
      mapComponent.setZoom(12)
    } catch {
      setDefaultCenter()
    }
  }

  // TODO: add the flyTo animation to the map and set the center only the first time

  function setDefaultCenter() {
    mapComponent.setCenter([139.7521, 35.6825])
    mapComponent.flyTo({ center: [139.7521, 35.6825] })
  }

  function onReady() {
    setDefaultCenter()
  }

</script>
