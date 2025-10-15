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

export type PortfolioHeader11Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const PortfolioHeader11 = (props: PortfolioHeader11Props) => {
  const { heading, description, tags, image } = {
    ...PortfolioHeader11Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start gap-6 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-20">
          <div>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              {heading}
            </h1>
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
          <p className="md:text-md">{description}</p>
        </div>
        <div>
          <img src={image.src} alt={image.alt} className="w-full" />
        </div>
      </div>
    </section>
  );
};

export const PortfolioHeader11Defaults: Props = {
  heading: "Project name here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
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
