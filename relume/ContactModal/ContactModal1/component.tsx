"use client";

import { useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Label,
  Textarea,
  Dialog,
  DialogContent,
  DialogTrigger,
  useMediaQuery,
} from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type Props = {
  heading: string;
  description: string;
  button: ButtonProps;
};

export type ContactModal1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const ContactModal1 = (props: ContactModal1Props) => {
  const { heading, description, button } = {
    ...ContactModal1Defaults,
    ...props,
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState<boolean | "indeterminate">(
    false
  );
  const isTablet = useMediaQuery("(max-width: 767px)");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, email, message, acceptTerms });
  };

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
            <form className="grid gap-6" onSubmit={handleSubmit}>
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
              <div className="rb-4 mb-4 flex items-center">
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
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export const ContactModal1Defaults: Props = {
  heading: "Contact us",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  button: { title: "Submit" },
};
