<div class="w-1/2 h-[500px] border border-l-0 border-white rounded-sm rounded-l-none">
  <Map accessToken={PUBLIC_MAPBOX_TOKEN}
    style="mapbox://styles/mapbox/outdoors-v11" knekln
    bind:this={mapComponent} 
    on:ready={onReady}
  >
    <Marker lat=35.6825 lng=139.7521 label="TKY" color="rgb(129,140,248)" />
  </Map>
</div>

<script lang="ts">
  import { Map, Marker } from '@beyonk/svelte-mapbox'
  import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public'

  let mapComponent:any

  function onReady() {
    mapComponent.setCenter([139.7521, 35.6825])
    mapComponent.flyTo({ center: [139.7521, 35.6825] })
  }

  // https://api.mapbox.com/geocoding/v5/mapbox.places/imperial%20palace%20japa.json?proximity=ip&access_token=YOUR_MAPBOX_ACCESS_TOKEN
</script>
