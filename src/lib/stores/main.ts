import { writable } from 'svelte/store';

export const trip = writable({
  city: 'Tokyo',
  description: ''
})

export const tripPlan = writable({
  pointsOfInterest: [],
  description: ''
})