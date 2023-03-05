import { writable, type Writable } from 'svelte/store';
import type { TripPlanType, TripType } from '../../types/trip.type';

export const trip: Writable<TripType> = writable({
  city: 'Tokyo',
  description: ''
})

// export const tripPlan: Writable<TripPlanType> = writable({
//   title: '',
//   description: '',
//   pointsOfInterest: []
// })

// TMP: Hardcoded trip plan for styling
export const tripPlan: Writable<TripPlanType> = writable({
  "title": "2 Days in Hakone to Discover Nature and Temples",
  "description": "This two-day journey to Hakone will take you to some of the most beautiful natural and cultural sites in Japan. From the stunning views of Mt. Fuji to the ancient temples and shrines, you will be able to experience the best of Hakone's culture and nature.",
  "pointsOfInterest": [
      {
          "title": "Lake Ashi",
          "description": "Lake Ashi is a stunning lake located in the Hakone region of Japan. It is known for its beautiful views of Mt. Fuji and its many hot springs. Visitors can take a boat ride around the lake and enjoy the views of the surrounding mountains and forests."
      },
      {
          "title": "Hakone Shrine",
          "description": "Hakone Shrine is a Shinto shrine located in the Hakone region of Japan. It is known for its beautiful architecture and its many festivals. Visitors can explore the shrine grounds and take part in various rituals and ceremonies."
      },
      {
          "title": "Owakudani Valley",
          "description": "Owakudani Valley is a volcanic valley located in the Hakone region of Japan. It is known for its stunning views of Mt. Fuji and its many hot springs. Visitors can take a cable car ride up to the valley and enjoy the views of the surrounding mountains and forests."
      }
  ]
})
