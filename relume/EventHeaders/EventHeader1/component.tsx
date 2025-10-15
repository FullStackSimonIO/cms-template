import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
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
  title: string;
  category: string;
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
  events: FeaturedEvent[];
  event: Event;
  filters: ButtonProps[];
};

export type EventHeader1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const EventHeader1 = (props: EventHeader1Props) => {
  const { tagline, heading, description, event, events, filters } = {
    ...EventHeader1Defaults,
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
        <div className="mb-16 grid auto-cols-fr auto-rows-auto grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
          <a href={event.url} className="relative block w-full max-w-full">
            <div className="w-full overflow-hidden">
              <img
                src={event.image.src}
                alt={event.image.alt}
                className="aspect-[3/2] size-full object-cover"
              />
            </div>
            <EventDate {...event.date} className="absolute left-4 top-4" />
          </a>
          <div className="flex flex-col items-start">
            <div className="flex w-full flex-col items-start justify-start">
              <p className="mb-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
                {event.category}
              </p>
              <a href={event.url}>
                <h2 className="text-xl font-bold md:text-2xl">{event.title}</h2>
              </a>
              <p className="mb-2">{event.location}</p>
              <p>{event.description}</p>
              <Button
                {...event.button}
                className="mt-6 flex items-center justify-center gap-x-2"
              >
                {event.button.title}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <div className="no-scrollbar mb-12 ml-[-5vw] flex w-screen items-center overflow-auto pl-[5vw] md:ml-0 md:w-full md:overflow-hidden md:pl-0">
            {filters.map((filter, index) => (
              <Button key={index} {...filter.button}>
                {filter.button.title}
              </Button>
            ))}
          </div>
          {events.map((event, index) => (
            <FeaturedEvent key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
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

const FeaturedEvent: React.FC<FeaturedEvent> = ({
  date,
  url,
  title,
  location,
  status,
  description,
  button,
}) => {
  return (
    <div className="grid grid-cols-1 items-center gap-4 overflow-hidden border-t border-border-primary py-6 last-of-type:border-b md:grid-cols-[max-content_1fr_max-content] md:gap-8 md:py-8">
      <EventDate
        weekday={date.weekday}
        day={date.day}
        month={date.month}
        year={date.year}
        className="border border-border-primary text-base"
      />
      <div className="flex w-full flex-col items-start justify-start">
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
        <p className="mb-4 text-sm">{location}</p>
        <p className="line-clamp-3">{description}</p>
      </div>
      <Button {...button} className="flex items-center justify-center gap-x-2">
        {button.title}
      </Button>
    </div>
  );
};

export const EventHeader1Defaults: Props = {
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
      weekday: "Sat",
      day: "10",
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
      variant: "secondary",
      size: "primary",
      title: "Save my spot",
    },
  },
  filters: [
    {
      button: {
        variant: "secondary",
        title: "View all",
        size: "sm",
      },
    },
    {
      button: {
        variant: "link",
        title: "Category one",
        size: "sm",
      },
    },
    {
      button: {
        variant: "link",
        title: "Category two",
        size: "sm",
      },
    },
    {
      button: {
        variant: "link",
        title: "Category three",
        size: "sm",
      },
    },
    {
      button: {
        variant: "link",
        title: "Category four",
        size: "sm",
      },
    },
  ],
  events: [
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
        variant: "secondary",
        size: "sm",
        title: "Save my spot",
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
        variant: "secondary",
        size: "sm",
        title: "Save my spot",
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
        variant: "secondary",
        size: "sm",
        title: "Save my spot",
      },
    },
  ],
};
