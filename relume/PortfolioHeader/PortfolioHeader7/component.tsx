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
  tags: Tag[];
  details: Detail[];
  image: ImageProps;
};

export type PortfolioHeader7Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const PortfolioHeader7 = (props: PortfolioHeader7Props) => {
  const { heading, description, tags, details, image } = {
    ...PortfolioHeader7Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start gap-12 md:mb-18 md:grid-cols-[1.5fr_1fr] lg:mb-20 lg:gap-x-20">
          <header>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              {heading}
            </h1>
            <p className="md:text-md">{description}</p>
            <ul className="mt-5 flex flex-wrap gap-2 md:mt-6">
              {tags.map((tag, startIndex) => (
                <li key={startIndex} className="flex">
                  <a
                    href={tag.url}
                    target="_blank"
                    rel="noopener"
                    className="bg-background-secondary px-2 py-1 text-sm font-semibold"
                  >
                    {tag.label}
                  </a>
                </li>
              ))}
            </ul>
          </header>
          <div className="grid grid-cols-2 gap-8">
            {details.map((detail, index) => (
              <div key={index}>
                <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                  {detail.label}
                </h3>
                {detail.url ? (
                  <a
                    href={detail.url}
                    target="_blank"
                    rel="noopener"
                    className="underline"
                  >
                    {detail.description}
                  </a>
                ) : (
                  <p>{detail.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <img
            src={image.src}
            className="w-full object-cover"
            alt={image.alt}
          />
        </div>
      </div>
    </section>
  );
};

export const PortfolioHeader7Defaults: Props = {
  heading: "Project name here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
    alt: "Relume placeholder image",
  },
  tags: [
    {
      url: "#",
      label: "Tag one",
    },
    {
      url: "#",
      label: "Tag two",
    },
    {
      url: "#",
      label: "Tag three",
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
};
