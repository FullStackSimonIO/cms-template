"use client";

import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime, Duration } from "luxon";
import { Button, Input } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type Date = {
  weekday: string;
  day: string;
  month: string;
  year: string | null;
};

type CountdownValues = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type CountdownProps = {
  countdownIsoDate: string;
  className?: string;
  cellClassName?: string;
  dividerClassName?: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  date: Date;
  amountLeft: string;
  countdownIsoDate: string;
  button: ButtonProps;
  inputPlaceholder: string;
  termsAndConditions: string;
};

export type EventItemHeader2Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const EventItemHeader2 = (props: EventItemHeader2Props) => {
  const {
    tagline,
    heading,
    description,
    date,
    amountLeft,
    countdownIsoDate,
    inputPlaceholder,
    button,
    termsAndConditions,
  } = {
    ...EventItemHeader2Defaults,
    ...props,
  };
  const [emailInput, setEmailInput] = useState<string>("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      emailInput,
    });
  };
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
        <h4 className="font-semibold">{tagline}</h4>
        <h1 className="mt-3 text-5xl font-bold md:mt-4 md:text-7xl lg:text-8xl">
          {heading}
        </h1>
        <p className="mt-5 text-base md:mt-6 md:text-md">{description}</p>
        <div className="mt-5 text-base font-semibold md:mt-6 md:text-md">
          {date.weekday} {date.day} {date.month}
        </div>
        <p className="mt-4 bg-background-secondary px-2 py-1 text-sm font-semibold text-text-primary">
          {amountLeft} Spots left!
        </p>
        <Countdown countdownIsoDate={countdownIsoDate} className="mt-8" />
        <div className="mt-6 w-full max-w-sm md:mt-8">
          <form
            className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4"
            onSubmit={handleSubmit}
          >
            <Input
              id="email"
              type="email"
              placeholder={inputPlaceholder}
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="text-text-primary"
            />
            <Button {...button}>{button.title}</Button>
          </form>
          <div dangerouslySetInnerHTML={{ __html: termsAndConditions }} />
        </div>
      </div>
    </section>
  );
};

const Countdown: React.FC<CountdownProps> = ({
  countdownIsoDate,
  className,
  cellClassName,
  dividerClassName,
}) => {
  const [countdown, setCountdown] = useState<CountdownValues>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = DateTime.fromISO(countdownIsoDate);

    const updateCountdown = () => {
      const now = DateTime.now();
      const diff = targetDate.diff(now);

      if (diff.milliseconds <= 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const duration = Duration.fromObject(diff.toObject()).shiftTo(
        "days",
        "hours",
        "minutes",
        "seconds"
      );

      const padZero = (num: number): string => {
        return num < 10 ? `0${num}` : num.toString();
      };

      setCountdown({
        days: padZero(duration.days),
        hours: padZero(duration.hours),
        minutes: padZero(duration.minutes),
        seconds: padZero(Math.floor(duration.seconds)),
      });
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [countdownIsoDate]);

  const renderCell = (value: string, label: string) => (
    <div
      className={twMerge(
        clsx("flex min-w-18 flex-col items-center", cellClassName)
      )}
    >
      <span className="text-4xl font-bold leading-[1.2] md:text-5xl lg:text-6xl">
        {value}
      </span>
      <span>{label}</span>
    </div>
  );

  const renderDivider = () => (
    <div
      className={twMerge(
        clsx("hidden w-px bg-background-alternative sm:block", dividerClassName)
      )}
    />
  );

  return (
    <div
      className={twMerge(
        clsx(
          "flex flex-wrap justify-center gap-4 border border-border-primary px-4 py-4 sm:flex-nowrap sm:px-6",
          className
        )
      )}
    >
      {renderCell(countdown.days, "Days")}
      {renderDivider()}
      {renderCell(countdown.hours, "Hours")}
      {renderDivider()}
      {renderCell(countdown.minutes, "Mins")}
      {renderDivider()}
      {renderCell(countdown.seconds, "Secs")}
    </div>
  );
};

export const EventItemHeader2Defaults: Props = {
  tagline: "Tagline",
  heading: "Event title heading",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  date: {
    weekday: "Sat",
    day: "10",
    month: "Feb",
    year: null,
  },
  amountLeft: "10",
  countdownIsoDate: "2024-11-14T01:23:29.000+01:00",
  inputPlaceholder: "Enter your email",
  button: { title: "Save my spot" },
  termsAndConditions: `
  <p class='text-xs'>
    By clicking Save my spot you're confirming that you agree with our
    <a href='#' class='underline'>Terms and Conditions</a>.
  </p>
  `,
};
