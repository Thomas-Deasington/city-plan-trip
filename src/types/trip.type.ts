export type TripType = {
  city: string
  description: string
}

export type TripPlanType = {
  title: string
  description: string
  pointsOfInterest: {
    title: string
    description: string
  }[]
}