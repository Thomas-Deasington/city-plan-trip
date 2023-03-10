<script>
  import '../app.css';
  import { SvelteToast } from '@zerodevx/svelte-toast';

  const options = {
    reversed: true,
    intro: {
      y: 192
    }
  };
</script>

<slot />
<SvelteToast {options} />

<style>
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 2rem;
    --toastContainerLeft: calc(50vw - 8rem);
  }
</style>
