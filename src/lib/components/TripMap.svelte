<script lang="ts">
  import { Map, Marker } from '@beyonk/svelte-mapbox';
  import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';
  import { tripPlan, selectedPointOfInterestIndex } from '$lib/stores/main';

  let mapComponent: any;
  $: selectedPointOfInterest = $tripPlan.pointsOfInterest?.[$selectedPointOfInterestIndex] || null;

  $: if (selectedPointOfInterest) {
    mapComponent.setZoom(12);
    mapComponent.flyTo({
      center: [selectedPointOfInterest.longitude, selectedPointOfInterest.latitude]
    });
  }

  // TODO: Try to improve the precision of markers
  // TODO: Add google link to the marker tooltip
  // TODO: Add image in the place of the marker

  function setDefaultCenter() {
    mapComponent.setCenter([139.7521, 35.6825]);
    mapComponent.flyTo({ center: [139.7521, 35.6825] });
  }

  function onReady() {
    setDefaultCenter();
  }
</script>

<div class="w-1/2 h-[500px] border border-l-0 border-white rounded-sm rounded-l-none">
  <Map
    accessToken={PUBLIC_MAPBOX_TOKEN}
    style="mapbox://styles/mapbox/outdoors-v11"
    bind:this={mapComponent}
    on:ready={onReady}
  >
    {#each $tripPlan.pointsOfInterest as place}
      {#if place.latitude && place.longitude}
        <Marker
          lat={place.latitude}
          lng={place.longitude}
          label={place.title}
          color="rgb(129,140,248)"
        />
      {/if}
    {/each}
  </Map>
</div>
