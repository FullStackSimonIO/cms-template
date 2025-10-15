import type { ButtonProps } from "@relume_io/relume-ui";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  VideoIframe,
} from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
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
  date: Date;
  title: string;
  speakers: ImageProps[];
  description: string;
  button: ButtonProps;
};

type FeaturedEvent = Omit<Event, "date"> & { duration: string };

type Props = {
  tagline: string;
  heading: string;
  description: string;
  event: Event;
  featuredEvents: FeaturedEvent[];
};

export type EventHeader6Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const EventHeader6 = (props: EventHeader6Props) => {
  const { tagline, heading, description, event, featuredEvents } = {
    ...EventHeader6Defaults,
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
        <div className="mb-16 grid auto-cols-fr auto-rows-auto grid-cols-1 items-center border border-border-primary lg:grid-cols-2">
          <Dialog>
            <DialogTrigger asChild>
              <button className="relative flex w-full items-center justify-center">
                <img
                  src={event.image.src}
                  alt={event.image.alt}
                  className="aspect-[4/3] size-full object-cover"
                />
                <span className="absolute inset-0 z-10 bg-black/50" />
                <p className="absolute left-4 top-4 z-20 flex items-center gap-2 bg-background-secondary px-2 py-1 text-sm font-semibold">
                  <BiCalendarAlt className="size-6 flex-none" />
                  <span>
                    {event.date.weekday} {event.date.day} {event.date.month}{" "}
                    {event.date.year}
                  </span>
                </p>
                <FaCirclePlay className="absolute z-20 size-16 text-white" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <VideoIframe video={event.video} />
            </DialogContent>
          </Dialog>
          <div className="flex flex-col items-start p-6 md:p-12">
            <a className="mb-4 block" href={event.url}>
              <h2 className="text-xl font-bold md:text-2xl">{event.title}</h2>
            </a>
            {event.speakers?.length > 0 && (
              <div className="mb-3 space-y-2 md:mb-4">
                <h4 className="font-semibold">Speakers</h4>
                <div className="flex items-center">
                  {event.speakers.map((speaker, index) => (
                    <img
                      key={index}
                      src={speaker.src}
                      alt={speaker.alt}
                      className="-ml-2 block size-10 rounded-full border-2 border-white first-of-type:ml-0"
                    />
                  ))}
                </div>
              </div>
            )}
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
  video,
  duration,
  title,
  speakers,
  description,
  button,
}) => {
  return (
    <div className="flex flex-col border border-border-primary">
      <Dialog>
        <DialogTrigger className="relative aspect-[3/2]">
          <div className="absolute inset-0 flex w-full max-w-full items-center justify-center">
            <img
              src={image.src}
              className="size-full object-cover"
              alt={image.alt}
            />
            <FaCirclePlay className="absolute z-20 size-16 text-white" />
            <span className="absolute inset-0 z-10 bg-black/50" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <VideoIframe video={video} />
        </DialogContent>
      </Dialog>
      <div className="p-6">
        <div className="mb-4 flex items-center gap-2 text-sm">
          <MdAccessTime className="size-6 flex-none" />
          <span>{duration} minutes</span>
        </div>
        <a className="mb-2 block" href={url}>
          <h3 className="text-xl font-bold md:text-2xl">{title}</h3>
        </a>
        <p className="mb-2">{description}</p>
        <div className="mb-4 flex items-center gap-2">
          <h4 className="font-semibold">Speakers:</h4>
          {speakers.length > 0 && (
            <div className="flex items-center">
              {speakers.map((speaker, index) => (
                <img
                  key={index}
                  src={speaker.src}
                  alt={speaker.alt}
                  className="-ml-2 block size-10 rounded-full border-2 border-white first-of-type:ml-0"
                />
              ))}
            </div>
          )}
        </div>
        <Button {...button} className="mt-5 md:mt-6">
          {button.title}
        </Button>
      </div>
    </div>
  );
};

export const EventHeader6Defaults: Props = {
  tagline: "Tagline",
  heading: "Webinars",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  event: {
    url: "#",
    image: {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 1",
    },
    video: "https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW",
    date: {
      weekday: "Sat",
      day: "10",
      month: "Feb",
      year: "2024",
    },
    title: "Webinar title heading",
    speakers: [
      {
        src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
        alt: "Speaker 1",
      },
      {
        src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
        alt: "Speaker 2",
      },
      {
        src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
        alt: "Speaker 3",
      },
      {
        src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
        alt: "Speaker 4",
      },
    ],
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
      video: "https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW",
      duration: "45",
      title: "Webinar title heading",
      speakers: [
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 1",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 2",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 3",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 4",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      button: {
        title: "Register now",
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
      video: "https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW",
      duration: "45",
      title: "Webinar title heading",
      speakers: [
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 1",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 2",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 3",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 4",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      button: {
        title: "Register now",
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
      video: "https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW",
      duration: "45",
      title: "Webinar title heading",
      speakers: [
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 1",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 2",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 3",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 4",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      button: {
        title: "Register now",
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
      video: "https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW",
      duration: "45",
      title: "Webinar title heading",
      speakers: [
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 1",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 2",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 3",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 4",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      button: {
        title: "Register now",
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
      video: "https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW",
      duration: "45",
      title: "Webinar title heading",
      speakers: [
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 1",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 2",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 3",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 4",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      button: {
        title: "Register now",
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
      video: "https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW",
      duration: "45",
      title: "Webinar title heading",
      speakers: [
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 1",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 2",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 3",
        },
        {
          src: "https://assets-global.website-files.com/624380709031623bfe4aee60/631035b9698714c1fee46997_Placeholder Small Image.svg",
          alt: "Speaker 4",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      button: {
        title: "Register now",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight />,
      },
    },
  ],
};
