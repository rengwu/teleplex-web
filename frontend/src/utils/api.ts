const apiHost = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export async function strapiRequest(
  url: string,
  params: any = {},
  method = 'GET',
) {
  const options: any = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  };

  if (params) {
    if (method === 'GET') {
      url += '?' + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  const response = await fetch(apiHost + url, options);

  if (response.status !== 200) {
    return generateErrorResponse(
      'The server responded with an unexpected status.',
    );
  }

  const result = await response.json();

  return result;
}

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
}

function generateErrorResponse(message: string) {
  return {
    status: 'error',
    message,
  };
}
