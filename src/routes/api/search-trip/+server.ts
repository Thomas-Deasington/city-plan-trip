import { Configuration, OpenAIApi } from 'openai';
import { env } from '$env/dynamic/private';
import type { TripType } from '../../../types/trip.type';

export async function POST({ request }: any): Promise<Response> {
  const body: TripType = await request.json();
  const { city, description } = body;

  // validate input
  if (!city || !description) {
    return new Response(JSON.stringify({ message: 'Missing required parameters' }), {
      status: 400
    });
  }

  const config = new Configuration({
    apiKey: env.OPENAI_API_KEY
  });

  const openapi = new OpenAIApi(config);

  try {
    const res = await openapi.createCompletion({
      model: 'text-davinci-003',
      prompt: `I want to go to ${city}. This is the description of the kind of places I want to visit ${description}. Make me a plan for this trip. Start by a title. Then do a little description of the trip. Then list the points of interest (between 1 to 10). Return these statements as a JSON Object with the structure {“title”:“...”,“description”:“...”,“pointsOfInterest”:[{“title”:“...”,“description”:“...”,latitude:“...”,longitude:“...”}}]}. Be careful to return a valid JSON and correct geolocation.`,
      temperature: 0.5,
      max_tokens: 2048
    });

    return new Response(JSON.stringify(res.data), { status: 200 });
  } catch (err: any) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
    return new Response(JSON.stringify(err.response.data), { status: 500 });
  }
}
