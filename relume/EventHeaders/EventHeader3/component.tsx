import * as React from "react";
import type { ButtonProps } from "@relume_io/relume-ui";
import { Button } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import { BiMap, BiCalendarAlt } from "react-icons/bi";

type ImageProps = {
  src: string;
  alt?: string;
};

type Date = {
  weekday: string;
  day: string;
  month: string;
  year: string;
};

type Event = {
  url: string;
  image: ImageProps;
  category: string;
  status: string | null;
  title: string;
  date: Date;
  location: string;
  description: string;
  button: ButtonProps;
};

type FeaturedEvent = Omit<Event, "category">;

type Props = {
  tagline: string;
  heading: string;
  description: string;
  event: Event;
  featuredEvents: FeaturedEvent[];
};

export type EventHeader3Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const EventHeader3 = (props: EventHeader3Props) => {
  const { tagline, heading, description, event, featuredEvents } = {
    ...EventHeader3Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="w-full">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h1>
            <p className="md:text-md">{description}</p>
          </div>
        </div>
        <div className="grid auto-cols-fr auto-rows-auto grid-cols-1 items-start gap-8 lg:grid-cols-2">
          <div>
            <a
              href={event.url}
              className="relative mb-6 block aspect-[3/2] size-full max-w-full"
            >
              <img
                src={event.image.src}
                alt={event.image.alt}
                className="absolute size-full object-cover"
              />
              <p className="absolute right-4 top-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                {event.category}
              </p>
            </a>
            <div className="flex flex-col items-start">
              <div className="mb-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <BiCalendarAlt className="size-6 flex-none" />
                  {event.date.weekday} {event.date.day} {event.date.month}{" "}
                  {event.date.year}
                </div>
                <div className="flex items-center gap-2">
                  <BiMap className="size-6 flex-none" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="mb-2 flex flex-wrap items-center gap-4">
                <a className="block" href={event.url}>
                  <h2 className="text-xl font-bold md:text-2xl">
                    {event.title}
                  </h2>
                </a>
                {event?.status && (
                  <p className="bg-background-secondary px-2 py-1 text-sm font-semibold">
                    {event.status}
                  </p>
                )}
              </div>
              <p>{event.description}</p>
              <Button {...event.button} className="mt-5 md:mt-6">
                {event.button.title}
              </Button>
            </div>
          </div>
          <div>
            {featuredEvents.map((event, index) => (
              <FeaturedEvent key={index} {...event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedEvent: React.FC<FeaturedEvent> = ({
  url,
  image,
  status,
  date,
  title,
  location,
  description,
  button,
}) => {
  return (
    <div className="grid grid-cols-1 items-center gap-6 border-t border-border-primary py-6 last-of-type:border-b md:grid-cols-[0.5fr_1fr] md:gap-8 md:py-4 lg:gap-6">
      <a
        href={url}
        className="relative block aspect-[3/2] w-full md:aspect-square"
      >
        <img
          src={image.src}
          alt={image.alt}
          className="absolute size-full object-cover"
        />
      </a>
      <div>
        <div className="flex flex-wrap items-center gap-4">
          <a className="block" href={url}>
            <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
          </a>
          {status && (
            <p className="bg-background-secondary px-2 py-1 text-sm font-semibold">
              {status}
            </p>
          )}
        </div>
        <div className="mb-2 flex items-center text-sm">
          <span>
            {date.weekday} {date.day} {date.month} {date.year}
          </span>
          <span className="mx-2">&bull;</span>
          <span>{location}</span>
        </div>
        <p>{description}</p>
        <Button {...button} className="mt-5 md:mt-6">
          {button.title}
        </Button>
      </div>
    </div>
  );
};

export const EventHeader3Defaults: Props = {
  tagline: "Tagline",
  heading: "Events",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  event: {
    url: "#",
    image: {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 1",
    },
    category: "Category",
    status: null,
    date: {
      weekday: "Sat",
      day: "10",
      month: "Feb",
      year: "2024",
    },
    location: "Location",
    title: "Event title heading",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    button: {
      title: "View event",
      variant: "link",
      size: "link",
      iconRight: <RxChevronRight />,
    },
  },
  featuredEvents: [
    {
      url: "#",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Relume placeholder image 2",
      },
      status: "Sold out",
      date: {
        weekday: "Fri",
        day: "09",
        month: "Feb",
        year: "2024",
      },
      location: "Location",
      title: "Event title heading",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      button: {
        title: "View event",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
    {
      url: "#",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Relume placeholder image 3",
      },
      status: null,
      date: {
        weekday: "Fri",
        day: "09",
        month: "Feb",
        year: "2024",
      },
      location: "Location",
      title: "Event title heading",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      button: {
        title: "View event",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
    {
      url: "#",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Relume placeholder image 4",
      },
      status: null,
      date: {
        weekday: "Fri",
        day: "09",
        month: "Feb",
        year: "2024",
      },
      location: "Location",
      title: "Event title heading",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      button: {
        title: "View event",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
  ],
};
