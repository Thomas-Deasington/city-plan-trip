import { error } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private'
import type { TripType } from '../../../types/trip.type.ts';

export async function POST ({ request }) {
  const body: TripType = await request.json()
  const { city, description } = body

  // validate input
  if (!city || !description) {
    return error(400, 'Missing required parameters')
  }

  const config = new Configuration({
    apiKey: OPENAI_API_KEY
  })

  const openapi = new OpenAIApi(config)

  const res = await openapi.createCompletion({
    model: "text-davinci-002",
    prompt: `I want to go to ${city}. This is the description of my desired journey ${description}. Make me a plan for this trip.`,
    temperature: 0.2,
    max_tokens: 256
  })

  return new Response(JSON.stringify(res.data), { status: 200 })
}