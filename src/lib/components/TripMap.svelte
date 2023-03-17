<script lang="ts">
  import { Map, Marker } from '@beyonk/svelte-mapbox';
  import { env } from '$env/dynamic/public';
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
    accessToken={env.PUBLIC_MAPBOX_TOKEN}
    style="mapbox://styles/mapbox/outdoors-v11"
    bind:this={mapComponent}
    on:ready={onReady}
  >
    {#each $tripPlan.pointsOfInterest as place, index}
      {#key $selectedPointOfInterestIndex}
        <Marker
          lat={place.latitude}
          lng={place.longitude}
          label={place.title}
          color={$selectedPointOfInterestIndex === index ? 'rgb(67,55,201)' : 'rgb(129,140,248)'}
        />
      {/key}
    {/each}
  </Map>
</div>
