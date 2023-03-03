<div class="">
  <header>
    <Form />
  </header>
  <main class="flex mt-4">
    <TripDescription />
    <TripMap />
  </main>
  <footer>
    City Plan Trip, made by <a class="underline" href="https://github.com/Thomas-Deasington" target="_blank" rel="noreferrer">tdeasington</a>
  </footer>
</div>

<script lang="ts">
  import Form from '$lib/components/Form.svelte';
  import TripDescription from '$lib/components/TripDescription.svelte';
  import TripMap from '$lib/components/TripMap.svelte';

</script>
