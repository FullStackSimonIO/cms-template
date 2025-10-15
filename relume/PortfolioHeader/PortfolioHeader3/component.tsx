type ImageProps = {
  src: string;
  alt?: string;
};

type Tag = {
  url: string;
  label: string;
};

type Props = {
  heading: string;
  description: string;
  tags: Tag[];
  image: ImageProps;
};

export type PortfolioHeader3Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const PortfolioHeader3 = (props: PortfolioHeader3Props) => {
  const { heading, description, tags, image } = {
    ...PortfolioHeader3Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
            {heading}
          </h1>
          <p className="md:text-md">{description}</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2 md:mt-6">
            {tags.map((tag, index) => (
              <li key={index} className="flex">
                <a
                  href={tag.url}
                  className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                >
                  {tag.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <img src={image.src} alt={image.alt} className="w-full" />
        </div>
      </div>
    </section>
  );
};

export const PortfolioHeader3Defaults: Props = {
  heading: "Project name here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  tags: [
    {
      label: "Tag one",
      url: "#",
    },
    {
      label: "Tag two",
      url: "#",
    },
    {
      label: "Tag three",
      url: "#",
    },
  ],
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
    alt: "Relume placeholder image 1",
  },
};
