import Image from 'next/image';

export default async function Home() {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/projects?populate=*`,
    options,
  );
  const { data: projects } = await response.json();

  // console.log(projects[0].attributes.media.data[0].attributes);
  return (
    <div>
      Home{' '}
      <Image
        src={`${process.env.NEXT_PUBLIC_STRAPI_MEDIA_ORIGIN}${projects[0].attributes.media.data[1].attributes.url}`}
        alt="lol"
        width={100}
        height={100}
      />
    </div>
  );
}
