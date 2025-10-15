"use client";

import type { ButtonProps } from "@relume_io/relume-ui";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  VideoIframe,
} from "@relume_io/relume-ui";
import { FaCirclePlay } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { BiCalendarAlt } from "react-icons/bi";

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
  video: string;
  category: string;
  date: Date;
  title: string;
  status: string | null;
  description: string;
  button: ButtonProps;
};

type FeaturedEvent = Omit<
  Event,
  "image" | "video" | "category" | "date" | "button"
> & {
  duration: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  event: Event;
  events: FeaturedEvent[];
  filters: ButtonProps[];
};

export type EventHeader5Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const EventHeader5 = (props: EventHeader5Props) => {
  const { tagline, heading, description, event, events, filters } = {
    ...EventHeader5Defaults,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="w-full max-w-lg">
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h1>
            <p className="md:text-md">{description}</p>
          </div>
        </div>
        <div className="mb-12 grid auto-cols-fr auto-rows-auto grid-cols-1 items-center gap-8 md:mb-18 md:gap-12 lg:mb-20 lg:grid-cols-2">
          <Dialog>
            <DialogTrigger className="relative flex w-full items-center justify-center">
              <img
                src={event.image.src}
                alt={event.image.alt}
                className="aspect-[3/2] size-full object-cover"
              />
              <span className="absolute inset-0 z-10 bg-black/50" />
              <p className="absolute left-4 top-4 z-20 bg-background-secondary px-2 py-1 text-sm font-semibold">
                {event.category}
              </p>
              <FaCirclePlay className="absolute z-20 size-16 text-white" />
            </DialogTrigger>
            <DialogContent>
              <VideoIframe video={event.video} />
            </DialogContent>
          </Dialog>
          <div className="flex flex-col items-start">
            <div className="flex w-full flex-col items-start justify-start">
              <div className="mb-3 flex items-center gap-2 text-sm md:mb-4">
                <BiCalendarAlt className="size-6 flex-none" />
                {event.date.weekday} {event.date.day} {event.date.month}{" "}
                {event.date.year}
              </div>
              <a href={event.url} className="mb-3 md:mb-4">
                <h2 className="text-xl font-bold md:text-2xl">{event.title}</h2>
              </a>
              <p>{event.description}</p>
              <Button
                {...event.button}
                className="mt-5 flex items-center justify-center gap-x-2 md:mt-6"
              >
                {event.button.title}
              </Button>
            </div>
          </div>
        </div>
        <div className="no-scrollbar mb-12 ml-[-5vw] flex w-screen items-center overflow-auto pl-[5vw] md:ml-0 md:w-full md:overflow-hidden md:pl-0">
          {filters.map((filter, index) => (
            <Button key={index} className="px-4" {...filter.button}>
              {filter.button.title}
            </Button>
          ))}
        </div>
        {events.map((event, index) => (
          <FeaturedEvent key={index} {...event} />
        ))}
      </div>
    </section>
  );
};

const FeaturedEvent: React.FC<FeaturedEvent> = ({
  duration,
  status,
  url,
  title,
  description,
}) => {
  return (
    <div className="grid grid-cols-1 place-items-start gap-8 overflow-hidden border-t border-border-primary py-6 sm:grid-cols-[1fr_max-content] sm:place-items-center md:py-8">
      <div className="flex w-full flex-col items-start justify-start">
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <MdAccessTime className="size-6 flex-none" />
            <span>{duration} minutes</span>
          </div>
          {status && (
            <p className="bg-background-secondary px-2 py-1 text-sm font-semibold">
              {status}
            </p>
          )}
        </div>
        <a href={url} className="mb-4">
          <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
        </a>
        <p className="line-clamp-3">{description}</p>
      </div>
      <Button variant="link" size="link" className="flex">
        <FaCirclePlay className="block text-8xl" />
      </Button>
    </div>
  );
};

export const EventHeader5Defaults: Props = {
  tagline: "Tagline",
  heading: "Webinars",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  event: {
    url: "#",
    image: {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-video-thumbnail.svg",
      alt: "Relume placeholder image",
    },
    video: "https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW",
    category: "Category",
    date: {
      weekday: "Sat",
      day: "10",
      month: "Feb",
      year: "2024",
    },
    title: "Webinar title heading",
    status: null,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
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
      title: "Webinar title heading",
      duration: "45",
      status: "Coming soon",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
    {
      url: "#",
      title: "Webinar title heading",
      duration: "45",
      status: null,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
    {
      url: "#",
      title: "Webinar title heading",
      duration: "45",
      status: null,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
  ],
};
