import fetch from 'node-fetch'
import { APIGatewayProxyHandler } from 'aws-lambda'
import parseLinkHeader from 'parse-link-header'

const API_ENDPOINT = 'https://libraries.io/api/bower-search?'

type QueryParameters = {
  q?: string
  page?: string
  per_page?: string
}

const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    const queryParameters = (event.queryStringParameters ?? {}) as QueryParameters;

    const queryParametersString = [
      queryParameters.q ? `q=${queryParameters.q}` : undefined,
      queryParameters.page ? `page=${queryParameters.page}` : undefined,
      queryParameters.per_page ? `per_page=${queryParameters.per_page}` : undefined,
    ].filter(Boolean).join('&')

    const url = API_ENDPOINT + queryParametersString
    const response = await fetch(url);
    const links = parseLinkHeader(response.headers.get('link') ?? '');
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        data,
        pagination: links,
      })
    }
  } catch(e) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: e.message
      })
    }
  }
}

export { handler }
