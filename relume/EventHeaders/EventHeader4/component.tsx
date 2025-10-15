import * as React from "react";
import type { ButtonProps } from "@relume_io/relume-ui";
import { Button } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  date: Date;
  category: string;
  title: string;
  status: string | null;
  location: string;
  description: string;
  button: ButtonProps;
};

type FeaturedEvent = Omit<Event, "image" | "category">;

type Props = {
  tagline: string;
  heading: string;
  description: string;
  event: Event;
  featuredEvents: FeaturedEvent[];
};

export type EventHeader4Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const EventHeader4 = (props: EventHeader4Props) => {
  const { tagline, heading, description, event, featuredEvents } = {
    ...EventHeader4Defaults,
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
        <div className="mb-16 grid auto-cols-fr auto-rows-auto grid-cols-1 items-start gap-8 lg:grid-cols-2">
          <div className="border border-border-primary">
            <a href={event.url} className="relative block w-full max-w-full">
              <div className="w-full overflow-hidden">
                <img
                  src={event.image.src}
                  alt={event.image.alt}
                  className="aspect-[3/2] size-full object-cover"
                />
              </div>
              <EventDate
                weekday={event.date.weekday}
                day={event.date.day}
                month={event.date.month}
                year={event.date.year}
                className="absolute right-4 top-4"
              />
            </a>
            <div className="flex flex-col items-start p-6">
              <p className="mb-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                {event.category}
              </p>
              <div className="flex w-full flex-col items-start justify-start">
                <div className="flex flex-wrap items-center gap-4">
                  <a href={event.url}>
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
                <p className="mb-2">{event.location}</p>
                <p>{event.description}</p>
                <Button {...event.button} className="mt-5 md:mt-6">
                  {event.button.title}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
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
  date,
  url,
  title,
  status,
  location,
  description,
  button,
}) => {
  return (
    <div className="flex flex-col items-center border border-border-primary px-4 py-6 md:flex-row md:py-4">
      <EventDate
        weekday={date.weekday}
        day={date.day}
        month={date.month}
        year={date.year}
        className="min-w-24 shrink-0 p-0 text-base md:px-1 md:py-3"
      />
      <div className="mt-6 flex flex-col items-start border-t border-border-primary pt-6 md:ml-6 md:mt-0 md:border-l md:border-t-0 md:pl-6 md:pt-0">
        <div className="flex flex-wrap items-center gap-4">
          <a href={url}>
            <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
          </a>
          {status && (
            <p className="bg-background-secondary px-2 py-1 text-sm font-semibold">
              {status}
            </p>
          )}
        </div>
        <p className="mb-2 text-sm">{location}</p>
        <p>{description}</p>
        <Button {...button} className="mt-5 md:mt-6">
          {button.title}
        </Button>
      </div>
    </div>
  );
};

const EventDate: React.FC<Date & { className?: string }> = ({
  weekday,
  day,
  month,
  year,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "flex min-w-28 flex-col items-center bg-background-primary px-1 py-3 text-sm",
          className
        )
      )}
    >
      <span>{weekday}</span>
      <span className="text-2xl font-bold md:text-3xl lg:text-4xl">{day}</span>
      <span>
        {month} {year}
      </span>
    </div>
  );
};

export const EventHeader4Defaults: Props = {
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
    date: {
      weekday: "Wed",
      day: "07",
      month: "Feb",
      year: "2024",
    },
    category: "Category",
    title: "Event title heading",
    status: null,
    location: "Location",
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
      date: {
        weekday: "Fri",
        day: "09",
        month: "Feb",
        year: "2024",
      },
      title: "Event title heading",
      status: "Sold out",
      location: "Location",
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
      date: {
        weekday: "Sat",
        day: "10",
        month: "Feb",
        year: "2024",
      },
      title: "Event title heading",
      status: null,
      location: "Location",
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
      date: {
        weekday: "Sun",
        day: "11",
        month: "Feb",
        year: "2024",
      },
      title: "Event title heading",
      status: null,
      location: "Location",
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
