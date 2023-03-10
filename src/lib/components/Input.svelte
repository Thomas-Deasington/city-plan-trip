<script lang="ts">
  export let placeholder: string;
  export let className: string;
  export let value: string;
</script>

<input type="text" {placeholder} class={className} bind:value />

<style lang="scss">
  input {
    @apply border border-white rounded-lg p-2 text-white bg-black placeholder-indigo-300;
  }
</style>
