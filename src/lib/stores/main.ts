import { writable, type Writable } from 'svelte/store';
import type { TripPlanType, TripType } from '../../types/trip.type';

export const trip: Writable<TripType> = writable({
  city: 'Tokyo',
  description: ''
})

export const tripPlan: Writable<TripPlanType> = writable({
  title: '',
  description: '',
  pointsOfInterest: []
})
