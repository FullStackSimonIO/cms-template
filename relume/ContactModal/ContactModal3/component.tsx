"use client";

import { useState } from "react";
import type { ButtonProps } from "@relume_io/relume-ui";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  Input,
  Label,
  Checkbox,
  Textarea,
  Button,
  SheetClose,
} from "@relume_io/relume-ui";

type Props = {
  heading: string;
  description: string;
  button: ButtonProps;
};

export type ContactModal3Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const ContactModal3 = (props: ContactModal3Props) => {
  const { heading, description, button } = {
    ...ContactModal3Defaults,
    ...props,
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState<boolean | "indeterminate">(
    false
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, email, message, acceptTerms });
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg text-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button>Open modal</Button>
          </SheetTrigger>
          <SheetContent className="h-screen border-none">
            <SheetClose />
            <div className="mb-8 text-center md:mb-10 lg:mb-12">
              <h2 className="mb-3 text-5xl font-bold md:mb-4 md:text-7xl lg:text-8xl">
                {heading}
              </h2>
              <p className="md:text-md">{description}</p>
            </div>
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
              <div className="grid w-full grid-cols-1 items-center">
                <Label htmlFor="name" className="mb-2">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid w-full grid-cols-1 items-center">
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid w-full grid-cols-1 items-center">
                <Label htmlFor="message" className="mb-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Type your message..."
                  className="min-h-[11.25rem] overflow-auto"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="mb-3 flex items-center md:mb-4">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={setAcceptTerms}
                  className="mr-2"
                />
                <Label htmlFor="terms" className="cursor-pointer text-sm">
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
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};

export const ContactModal3Defaults: Props = {
  heading: "Contact us",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  button: { title: "Submit" },
};
