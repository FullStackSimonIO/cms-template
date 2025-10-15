type ImageProps = {
  src: string;
  alt?: string;
};

type Detail = {
  url?: string;
  label: string;
  description: string;
};

type Tag = {
  url: string;
  label: string;
};

type Props = {
  heading: string;
  description: string;
  details: Detail[];
  tags: Tag[];
  image: ImageProps;
};

export type PortfolioHeader8Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const PortfolioHeader8 = (props: PortfolioHeader8Props) => {
  const { heading, description, tags, details, image } = {
    ...PortfolioHeader8Defaults,
    ...props,
  };
  return (
    <section id="relume" className="relative px-[5%]">
      <div className="absolute inset-0 z-0">
        <img
          src={image.src}
          alt={image.alt}
          className="size-full object-cover"
        />
        <span className="absolute inset-0 z-10 bg-black/50" />
      </div>
      <div className="relative z-10 flex min-h-svh items-end justify-center">
        <div className="container">
          <div className="grid grid-cols-1 items-start gap-12 py-16 md:grid-cols-[1.5fr_1fr] md:items-end md:py-24 lg:gap-x-20 lg:py-28">
            <div>
              <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
                {heading}
              </h1>
              <p className="text-text-alternative md:text-md">{description}</p>
              <ul className="mt-5 flex flex-wrap gap-2 md:mt-6">
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
            <div className="grid grid-cols-2 gap-8 text-text-alternative">
              {details.map((detail, index) => (
                <div key={index}>
                  <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                    {detail.label}
                  </h3>
                  {detail.url ? (
                    <a href={detail.url} className="underline">
                      {detail.description}
                    </a>
                  ) : (
                    <p>{detail.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const PortfolioHeader8Defaults: Props = {
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
  details: [
    {
      label: "Client",
      description: "Full name",
    },
    {
      label: "Date",
      description: "March 2023",
    },
    {
      label: "Role",
      description: "Role name",
    },
    {
      url: "#",
      label: "Website",
      description: "www.relume.io",
    },
  ],
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Relume placeholder image 1",
  },
};
