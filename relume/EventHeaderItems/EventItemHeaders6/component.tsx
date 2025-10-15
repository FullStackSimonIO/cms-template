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
import { BiMap, BiCalendarAlt, BiUser } from "react-icons/bi";

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
  speakers: string;
};

export type EventItemHeader6Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const EventItemHeader6 = (props: EventItemHeader6Props) => {
  const {
    breadcrumbs,
    heading,
    description,
    image,
    buttons,
    date,
    location,
    speakers,
  } = {
    ...EventItemHeader6Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2">
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
            <div className="mt-5 flex flex-wrap gap-4 text-sm md:mt-6">
              <div className="flex items-center gap-2">
                <BiCalendarAlt className="size-6 flex-none" />
                {date.weekday} {date.day} {date.month} {date.year}
              </div>
              <div className="flex items-center gap-2 ">
                <BiMap className="size-6 flex-none" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 items-center">
                  <BiUser size={23} />
                </div>
                <span>{speakers}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <div className="relative aspect-square">
              <img
                src={image.src}
                className="size-full object-cover"
                alt={image.alt}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const EventItemHeader6Defaults: Props = {
  breadcrumbs: [
    { url: "#", title: "Events" },
    { url: "#", title: "Event title" },
  ],
  heading: "Event title heading",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
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
  location: "Location",
  speakers: "Speakers",
};
