import {
  Button,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxPlus } from "react-icons/rx";

type JobProps = {
  title: string;
  location: string;
  description: string;
  button: ButtonProps;
  url: string;
};

type JobDepartmentProps = {
  title: string;
  jobs: JobProps[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  jobDepartments: JobDepartmentProps[];
};

export type Career8Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Career8 = (props: Career8Props) => {
  const { tagline, heading, description, jobDepartments } = {
    ...Career8Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 w-full md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <Accordion
          type="multiple"
          className="grid items-start justify-stretch gap-6"
        >
          {jobDepartments.map((jobDepartment, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border-primary px-6 md:px-8"
            >
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="text-2xl md:py-5 md:text-3xl md:leading-[1.3] lg:text-4xl [&[data-state=open]>svg]:rotate-45"
              >
                {jobDepartment.title}
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                {jobDepartment.jobs.map((job, index) => (
                  <div
                    key={index}
                    className="border-t border-border-primary py-6 md:py-8"
                  >
                    <div className="mb-5 sm:flex sm:items-start sm:justify-between md:mb-6">
                      <div className="mb-5 sm:mb-0">
                        <h3 className="text-xl font-bold md:text-2xl">
                          {job.title}
                        </h3>
                        <p className="md:text-md">{job.location}</p>
                      </div>
                      <div>
                        <Button {...job.button} asChild>
                          <a href={job.url}>{job.button.title}</a>
                        </Button>
                      </div>
                    </div>
                    <p className="w-full max-w-lg">{job.description}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

const job = {
  title: "Job Title",
  location: "Location",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  url: "#",
  button: {
    title: "Apply Now",
    variant: "secondary",
    size: "sm",
  },
};

export const Career8Defaults: Props = {
  tagline: "Tagline",
  heading: "Job Openings",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  jobDepartments: [
    {
      title: "Job Department",
      jobs: [job, job, job],
    },
    {
      title: "Job Department",
      jobs: [job, job, job],
    },
    {
      title: "Job Department",
      jobs: [job, job, job],
    },
  ],
};
