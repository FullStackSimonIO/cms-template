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
  date: Date;
  title: string;
  speaker: string;
  location: string;
  description: string;
  button: ButtonProps;
};

type FeaturedEvent = Omit<Event, "speaker">;

type Props = {
  tagline: string;
  heading: string;
  description: string;
  event: Event;
  featuredEvents: FeaturedEvent[];
};

export type EventHeader2Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const EventHeader2 = (props: EventHeader2Props) => {
  const { tagline, heading, description, event, featuredEvents } = {
    ...EventHeader2Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h1>
            <p className="md:text-md">{description}</p>
          </div>
        </div>
        <div className="mb-16 grid auto-cols-fr auto-rows-auto grid-cols-1 items-center border border-border-primary lg:grid-cols-2">
          <a
            href={event.url}
            className="relative block aspect-[4/3] size-full max-w-full"
          >
            <img
              src={event.image.src}
              alt={event.image.alt}
              className="absolute size-full object-cover"
            />
            <p className="absolute left-4 top-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
              {event.category}
            </p>
          </a>
          <div className="flex flex-col items-start p-6 md:p-12">
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
            <a className="mb-2 block" href={event.url}>
              <h2 className="text-xl font-bold md:text-2xl">{event.title}</h2>
            </a>
            <div className="mb-4 space-y-2">
              <h4 className="font-semibold">Speaker</h4>
              <p>{event.speaker}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Details</h4>
              <p>{event.description}</p>
            </div>
            <Button
              {...event.button}
              className="mt-6 flex items-center justify-center gap-x-2"
            >
              {event.button.title}
            </Button>
          </div>
        </div>
        <div>
          <h2 className="mb-6 text-xl font-bold md:mb-8 md:text-2xl">
            Featured Events
          </h2>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
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
  category,
  date,
  title,
  location,
  description,
  button,
}) => {
  return (
    <div className="flex flex-col border border-border-primary">
      <a href={url} className="relative block aspect-[3/2] w-full">
        <img
          src={image.src}
          alt={image.alt}
          className="absolute size-full object-cover"
        />
        <p className="absolute left-4 top-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
          {category}
        </p>
      </a>
      <div className="p-6">
        <div className="mb-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <BiCalendarAlt className="size-6 flex-none" />
            {date.weekday} {date.day} {date.month} {date.year}
          </div>
          <div className="flex items-center gap-2">
            <BiMap className="size-6 flex-none" />
            <span>{location}</span>
          </div>
        </div>
        <a className="mb-2 block" href={url}>
          <h3 className="text-xl font-bold md:text-2xl">{title}</h3>
        </a>
        <p>{description}</p>
        <Button {...button} className="mt-5 md:mt-6">
          {button.title}
        </Button>
      </div>
    </div>
  );
};

export const EventHeader2Defaults: Props = {
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
    date: {
      weekday: "Sat",
      day: "10",
      month: "Feb",
      year: "2024",
    },
    location: "Location",
    title: "Event title heading",
    speaker: "Full name",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    button: {
      variant: "secondary",
      size: "primary",
      title: "Save my spot",
    },
  },
  featuredEvents: [
    {
      url: "#",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Relume placeholder image 2",
      },
      category: "Category",
      date: {
        weekday: "Fri",
        day: "09",
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
    {
      url: "#",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Relume placeholder image 3",
      },
      category: "Category",
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
    {
      url: "#",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Relume placeholder image 4",
      },
      category: "Category",
      date: {
        weekday: "Sun",
        day: "11",
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
    {
      url: "#",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Relume placeholder image 5",
      },
      category: "Category",
      date: {
        weekday: "Fri",
        day: "09",
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
    {
      url: "#",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Relume placeholder image 6",
      },
      category: "Category",
      date: {
        weekday: "Fri",
        day: "09",
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
    {
      url: "#",
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
        alt: "Relume placeholder image 7",
      },
      category: "Category",
      date: {
        weekday: "Fri",
        day: "09",
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
  ],
};
