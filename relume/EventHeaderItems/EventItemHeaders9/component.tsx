import * as React from "react";
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type ImageProps = {
  src: string;
  alt?: string;
};

type BreadcrumbProps = {
  url: string;
  title: string;
};

type Date = {
  weekday: string;
  day: string;
  month: string;
  year: string | null;
};

type Props = {
  breadcrumbs: BreadcrumbProps[];
  heading: string;
  description: string;
  image: ImageProps;
  buttons: ButtonProps[];
  date: Date;
  location: string;
  speaker: string;
  type: string;
};

export type EventItemHeader9Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const EventItemHeader9 = (props: EventItemHeader9Props) => {
  const {
    breadcrumbs,
    heading,
    description,
    image,
    buttons,
    date,
    location,
    speaker,
    type,
  } = {
    ...EventItemHeader9Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div className="flex flex-col items-start">
            <Breadcrumb className="flex w-full items-center">
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={item.url}>
                        {item.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="mt-8 text-5xl font-bold md:text-7xl lg:text-8xl">
              {heading}
            </h1>
            <p className="mt-5 text-base md:mt-6 md:text-md">{description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h6 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                Date
              </h6>
              {date.weekday} {date.day} {date.month} {date.year}
            </div>
            <div>
              <h6 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                Location
              </h6>
              {location}
            </div>
            <div>
              <h6 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                Speaker
              </h6>
              {speaker}
            </div>
            <div>
              <h6 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                Type
              </h6>
              {type}
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-18 lg:mt-20">
          <div className="relative aspect-video">
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

export const EventItemHeader9Defaults: Props = {
  breadcrumbs: [
    { url: "#", title: "Events" },
    { url: "#", title: "Event title" },
  ],
  heading: "Event title heading",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg",
    alt: "Relume placeholder image",
  },
  buttons: [
    { title: "Save my spot" },
    { title: "View event", variant: "secondary" },
  ],
  date: {
    weekday: "Sat",
    day: "10",
    month: "Feb",
    year: "2024",
  },
  location: "Sydney, Australia",
  speaker: "Full name",
  type: "In-person",
};
