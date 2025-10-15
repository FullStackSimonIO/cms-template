"use client";

import { useState } from "react";
import type { ButtonProps } from "@relume_io/relume-ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  RadioGroup,
  RadioGroupItem,
  Input,
  Label,
  Checkbox,
  Textarea,
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  useMediaQuery,
} from "@relume_io/relume-ui";

type Props = {
  heading: string;
  description: string;
  button: ButtonProps;
};

export type ContactModal2Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const ContactModal2 = (props: ContactModal2Props) => {
  const { heading, description, button } = {
    ...ContactModal2Defaults,
    ...props,
  };

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");

  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  const [selectedItem, setSelectedItem] = useState("");
  const [selectedRadio, setSelectedRadio] = useState("");

  const [messageInput, setMessageInput] = useState("");
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
      selectedRadio,
      messageInput,
      acceptTerms,
    });
  };

  const selectItems = [
    { value: "first-choice", label: "First Choice" },
    { value: "second-choice", label: "Second Choice" },
    { value: "third-choice", label: "Third Choice" },
  ];

  const radioItems = [
    { value: "first-choice", label: "First choice" },
    { value: "second-choice", label: "Second choice" },
    { value: "third-choice", label: "Third choice" },
    { value: "fourth-choice", label: "Fourth choice" },
    { value: "fifth-choice", label: "Fifth choice" },
    { value: "other", label: "Other" },
  ];
  const isTablet = useMediaQuery("(max-width: 767px)");

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg text-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open modal</Button>
          </DialogTrigger>
          <DialogContent
            closeIconPosition={isTablet ? "inside" : "outside"}
            overlayClassName="bg-black/25"
            className="fixed left-1/2 top-1/2 h-screen -translate-x-1/2 -translate-y-1/2 overflow-y-scroll border-t bg-neutral-white px-[5%] pb-28 pt-16 transition ease-in-out data-[state=closed]:duration-700 data-[state=open]:duration-700 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-bottom data-[state=open]:slide-in-from-left-1/2 md:h-auto md:max-h-[80vh] md:w-[90%] md:px-12 md:py-16 lg:w-full lg:max-w-lg lg:p-16"
          >
            <div className="mb-8 text-center md:mb-10 lg:mb-12">
              <h2 className="mb-3 text-5xl font-bold md:mb-4 md:text-7xl lg:text-8xl">
                {heading}
              </h2>
              <p className="md:text-md">{description}</p>
            </div>
            <form
              className="grid grid-cols-1 grid-rows-[auto_auto] gap-6"
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

                <div className="grid w-full grid-cols-1 items-center">
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
                <div className="grid w-full grid-cols-1 items-center">
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
                <div className="grid w-full grid-cols-1 items-center">
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
              <div className="grid w-full grid-cols-1 items-center">
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
              <div className="grid w-full grid-cols-1 items-center py-3 md:py-4">
                <Label className="mb-3 md:mb-4">
                  Which best describes you?
                </Label>
                <RadioGroup
                  className="grid grid-cols-2 gap-x-6 gap-y-3.5"
                  onValueChange={setSelectedRadio}
                >
                  {radioItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={item.value} id={item.value} />
                      <Label htmlFor={item.value}>{item.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="grid w-full grid-cols-1 items-center">
                <Label htmlFor="message" className="mb-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Type your message..."
                  className="min-h-[11.25rem] overflow-auto"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
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
              <div className="text-center">
                <Button {...button}>{button.title}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export const ContactModal2Defaults: Props = {
  heading: "Contact us",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  button: { title: "Submit" },
};
