import PageHeader from "@/app/components/PageHeader";
import { fetchApi } from "@/app/helpers/fetch-api";
import { formatDate } from "@/app/helpers/format-date-helper";
import { Post } from "@/app/interfaces/post";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Markdown from "react-markdown";

const getData = async (slug = "") => {
  const path = "/posts";
  const urlParamsObject = {
    populate: "image",
    filters: {
      slug: slug,
    },
  };
  const { data } = await fetchApi(path, urlParamsObject);
  return data[0];
};

interface Props {
  params: {
    slug: string;
  };
}

const Slug = async ({ params }: Props) => {
  const { slug } = params;
  const post: Post = await getData(slug);

  if (!post) {
    return notFound();
  }

  const { title, body, description, createdAt, image } = post.attributes;
  const { url, width, height } = image.data.attributes.formats.medium;

  return (
    <div className="space-y-8">
      <PageHeader text={title} />
      <p className="text-gray-500 mb-2">{formatDate(createdAt)}</p>
      <Image
        className="h-auto rounded-t-lg"
        src={url}
        alt={`image ${title}`}
        width={width}
        height={height}
      />

      <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
        {description}
      </p>
      <div className="prose">
        {/* Este error en particular está codificado en TypeScript. El equipo de React está trabajando con el equipo de TypeScript para resolver esto. */}
        {/* https://github.com/vercel/next.js/issues/42292 */}
        {/* @ts-expect-error Server Component */}

        <MDXRemote source={body} />
        {/* <Markdown>{body}</Markdown> */}
      </div>
    </div>
  );
};

export default Slug;
