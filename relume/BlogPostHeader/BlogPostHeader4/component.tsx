import React from "react";
import { Button, type ButtonProps } from "@relume_io/relume-ui";
import { RxChevronLeft } from "react-icons/rx";

type ImageProps = {
  src: string;
  alt?: string;
};

type PostDetails = {
  title: string;
  description: string;
};

type Props = {
  button: ButtonProps;
  category: string;
  readTime: string;
  heading: string;
  image: ImageProps;
  postDetails: PostDetails[];
};

export type BlogPostHeader4Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const BlogPostHeader4 = (props: BlogPostHeader4Props) => {
  const { button, category, readTime, heading, image, postDetails } = {
    ...BlogPostHeader4Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid gap-x-20 gap-y-12 md:grid-cols-[.5fr_1fr]">
          <div className="mx-auto flex size-full max-w-lg flex-col items-start justify-start">
            <div className="rb-12 flex flex-col items-start justify-start">
              <Button {...button} className="mb-6 md:mb-8" asChild>
                <a>{button.title}</a>
              </Button>
              <div className="rb-4 mb-5 flex w-full items-center justify-start md:mb-6">
                <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                  {category}
                </p>
                <p className="inline text-sm font-semibold">{readTime}</p>
              </div>
              <h1 className="text-5xl font-bold md:text-7xl lg:text-8xl">
                {heading}
              </h1>
            </div>
            <div className="mt-6 flex size-full flex-col items-start md:mt-8">
              <div className="rb-4 flex items-center sm:mb-8 md:mb-0">
                {postDetails.map((detail, index) => (
                  <div key={index} className="mr-8 md:mr-10 lg:mr-12">
                    <p className="text-sm">
                      {detail.title} {detail.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mx-auto w-full overflow-hidden">
            <img
              src={image.src}
              className="aspect-[3/2] size-full object-cover"
              alt={image.alt}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const BlogPostHeader4Defaults: Props = {
  button: {
    title: "All Posts",
    variant: "link",
    size: "link",
    iconLeft: <RxChevronLeft />,
  },
  category: "Category",
  readTime: "5 min read",
  heading: "Blog title heading will go here",
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Relume placeholder image",
  },
  postDetails: [{ title: "Published on", description: "11 Jan 2022" }],
};
