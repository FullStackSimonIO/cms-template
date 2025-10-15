type Tag = {
  url: string;
  label: string;
};

type Props = {
  heading: string;
  description: string;
  tags: Tag[];
};

export type PortfolioHeader9Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const PortfolioHeader9 = (props: PortfolioHeader9Props) => {
  const { heading, description, tags } = {
    ...PortfolioHeader9Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%]">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-6 py-16 md:grid-cols-2 md:gap-x-12 md:py-24 lg:gap-20 lg:py-28">
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
      </div>
    </section>
  );
};

export const PortfolioHeader9Defaults: Props = {
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
};
