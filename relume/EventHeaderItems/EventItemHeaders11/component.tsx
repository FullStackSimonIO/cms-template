"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Label,
  Checkbox,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiMap, BiCalendarAlt, BiUser } from "react-icons/bi";

type Date = {
  weekday: string;
  day: string;
  month: string;
  year: string | null;
};

type BreadcrumbProps = {
  url: string;
  title: string;
};

type Props = {
  breadcrumbs: BreadcrumbProps[];
  heading: string;
  description: string;
  button: ButtonProps;
  date: Date;
  location: string;
  speakers: string;
};

export type EventItemHeader11Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const EventItemHeader11 = (props: EventItemHeader11Props) => {
  const {
    breadcrumbs,
    heading,
    description,
    button,
    date,
    location,
    speakers,
  } = {
    ...EventItemHeader11Defaults,
    ...props,
  };
  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [acceptTerms, setAcceptTerms] = useState<boolean | "indeterminate">(
    false
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      selectedItem,
      acceptTerms,
    });
  };

  const selectItems = [
    { value: "first-choice", label: "First Choice" },
    { value: "second-choice", label: "Second Choice" },
    { value: "third-choice", label: "Third Choice" },
  ];

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
          </div>
          <div>
            <form
              className="grid gap-6 border border-border-primary px-6 py-8 sm:p-8"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="grid w-full items-center">
                  <Label htmlFor="firstName" className="mb-2">
                    First name
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    value={firstNameInput}
                    onChange={(e) => setFirstNameInput(e.target.value)}
                  />
                </div>

                <div className="grid w-full items-center">
                  <Label htmlFor="lastName" className="mb-2">
                    Last name
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    value={lastNameInput}
                    onChange={(e) => setLastNameInput(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="grid w-full items-center">
                  <Label htmlFor="email" className="mb-2">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </div>

                <div className="grid w-full items-center">
                  <Label htmlFor="phone" className="mb-2">
                    Phone number
                  </Label>
                  <Input
                    type="text"
                    id="phone"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid w-full items-center">
                <Label className="mb-2">Choose a topic</Label>
                <Select onValueChange={setSelectedItem}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select one..." />
                  </SelectTrigger>
                  <SelectContent>
                    {selectItems.map((item, index) => (
                      <SelectItem key={index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-3 flex items-center space-x-2 text-sm md:mb-4">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={setAcceptTerms}
                />
                <Label htmlFor="terms" className="cursor-pointer">
                  I accept the{" "}
                  <a className="text-link-primary underline" href="#">
                    Terms
                  </a>
                </Label>
              </div>

              <div className="text-left">
                <Button {...button}>{button.title}</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export const EventItemHeader11Defaults: Props = {
  breadcrumbs: [
    { url: "#", title: "Events" },
    { url: "#", title: "Event title" },
  ],
  heading: "Event title heading",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  button: { title: "Save my spot" },
  date: {
    weekday: "Sat",
    day: "10",
    month: "Feb",
    year: "2024",
  },
  location: "Location",
  speakers: "Speakers",
};
