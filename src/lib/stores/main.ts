import { writable, type Writable } from 'svelte/store';
import type { TripPlanType, TripType } from '../../types/trip.type';

export const trip: Writable<TripType> = writable({
  city: 'Tokyo',
  description: ''
})

export const tripPlan = writable<TripPlanType>({
  title: '',
  description: '',
  pointsOfInterest: []
})

export const isTripPlanLoading = writable<boolean>(false)

export const selectedPointOfInterestIndex = writable<number>(0)

// TODO export only one object with all the data
