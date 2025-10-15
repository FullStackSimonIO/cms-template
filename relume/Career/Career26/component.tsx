import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { LuMapPin } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";

type ImageProps = {
  src: string;
  alt?: string;
};

type PositionProps = {
  url: string;
  title: string;
  department: string;
  description: string;
  location: string;
  contractType: string;
  button: ButtonProps;
};

type PositionCardProps = {
  position: PositionProps;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  image: ImageProps;
  positions: PositionProps[];
};

export type Career26Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Career26 = (props: Career26Props) => {
  const { tagline, heading, description, image, positions } = {
    ...Career26Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid items-start md:grid-cols-2 md:gap-x-12 md:gap-y-16 lg:gap-16">
          <div>
            {positions.map((position, index) => (
              <PositionCard key={index} position={position} />
            ))}
          </div>
          <div className="relative aspect-square">
            <img
              src={image.src}
              className="size-full object-cover"
              alt={image.alt}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const PositionCard: React.FC<PositionCardProps> = ({ position }) => {
  return (
    <div className="border-t border-border-primary py-8">
      <div className="mb-3 flex items-center gap-4 md:mb-4">
        <a href={position.url}>
          <h3 className="text-xl font-bold md:text-2xl">{position.title}</h3>
        </a>
        <p className="bg-background-secondary px-2 py-1 text-sm font-semibold">
          {position.department}
        </p>
      </div>
      <p className="mb-5 md:mb-6">{position.description}</p>
      <div className="flex flex-wrap gap-y-3">
        <div className="mr-6 flex items-center">
          <div className="mr-3 flex-none">
            <LuMapPin className="flex size-6 flex-col items-center justify-center" />
          </div>
          <span className="md:text-md">{position.location}</span>
        </div>
        <div className="mr-6 flex items-center">
          <div className="mr-3 flex-none">
            <MdAccessTime className="flex size-6 flex-col items-center justify-center" />
          </div>
          <span className="md:text-md">{position.contractType}</span>
        </div>
      </div>
      <div className="mt-6 md:mt-8">
        <Button {...position.button} asChild>
          <a href={position.url}>{position.button.title}</a>
        </Button>
      </div>
    </div>
  );
};

const position = {
  url: "#",
  title: "Job Title",
  department: "Department",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  location: "Location",
  contractType: "Contract Type",
  button: {
    title: "Apply Now",
    variant: "secondary",
    size: "sm",
  },
};

export const Career26Defaults: Props = {
  tagline: "Tagline",
  heading: "Open Positions",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
    alt: "Relume placeholder image",
  },
  positions: [position, position, position],
};
