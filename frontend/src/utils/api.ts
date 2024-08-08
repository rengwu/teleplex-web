import { Payload } from '@/types/common/schemas-to-ts/Payload';
import { fetchAllImages } from './static';

const apiHost = process.env.NEXT_PUBLIC_STRAPI_API_URL;

type ErrorResponse = {
  success: false;
  status: 'error';
  message: string;
};

type SuccessResponse = {
  success: true;
  status: 'success';
};

export async function strapiRequest<T>(
  url: string,
  params: any = {},
  method = 'GET',
): Promise<(Payload<T> & SuccessResponse) | ErrorResponse> {
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
  ``;
  const response = await fetch(apiHost + url, options);

  if (response.status !== 200) {
    return generateErrorResponse(
      'The server responded with an unexpected status.',
    );
  }

  let result = await response.json();

  // fetch static CMS images on production build
  if (process.env.NODE_ENV === 'production') {
    result = await fetchAllImages(result);
  }
  return { ...result, status: 'success', success: true };
}

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
}

function generateErrorResponse(message: string): ErrorResponse {
  return {
    success: false,
    status: 'error',
    message,
  };
}
