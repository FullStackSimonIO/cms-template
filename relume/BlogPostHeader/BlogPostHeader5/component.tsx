import React from "react";

type ImageProps = {
  src: string;
  alt?: string;
};

type AuthorDetailsProps = {
  avatar: ImageProps;
  fullName: string;
  date: string;
  readTime: string;
};

type Props = {
  category: string;
  heading: string;
  image: ImageProps;
  author: AuthorDetailsProps;
};

export type BlogPostHeader5Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const BlogPostHeader5 = (props: BlogPostHeader5Props) => {
  const { category, author, heading, image } = {
    ...BlogPostHeader5Defaults,
    ...props,
  };
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10 max-w-lg text-center">
        <p className="mb-3 text-sm font-semibold text-text-alternative md:mb-4">
          {category}
        </p>
        <h1 className="mb-5 text-5xl font-bold text-text-alternative md:text-7xl lg:text-8xl">
          {heading}
        </h1>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-12 ">
          <div className="rb-4 flex items-center">
            <div className="rb-4 flex flex-col items-center sm:mb-0">
              <div className=" mb-3 shrink-0 md:mb-4">
                <img
                  src={author.avatar.src}
                  alt={author.avatar.alt}
                  className="size-14 min-h-14 min-w-14 rounded-full object-cover"
                />
              </div>
              <div className="text-text-alternative">
                <h6 className="font-semibold">{author.fullName}</h6>
                <div className="mt-1 flex">
                  <p className="text-sm">{author.date}</p>
                  <span className="mx-2">•</span>
                  <p className="text-sm">{author.readTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src={image.src}
          className="size-full object-cover"
          alt={image.alt}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
};

export const BlogPostHeader5Defaults: Props = {
  category: "Category",
  heading: "Blog title heading will go here",
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Relume placeholder image",
  },
  author: {
    avatar: {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder avatar",
    },
    fullName: "Full name",
    date: "11 Jan 2022",
    readTime: "5 min read",
  },
};
