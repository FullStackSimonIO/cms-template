import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@relume_io/relume-ui";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiCheck, BiEnvelope } from "react-icons/bi";
import { GrReturn } from "react-icons/gr";
import { MdAccessTime } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

const formSchema = z.object({
  quality: z.string().min(1, { message: "This field is required" }),
  like: z.string().min(1, { message: "This field is required" }),
  areas: z
    .array(z.string())
    .nonempty({ message: "At least one option must be selected" }),
  about_us: z.string().min(1, { message: "This field is required" }),
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

interface StepProps {
  form: ReturnType<typeof useForm<FormValues>>;
}

export const MultiForm36 = () => {
  const [step, setStep] = useState(0);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quality: "",
      like: "",
      areas: [],
      about_us: "",
      email: "",
    },
    mode: "onChange",
  });
  const onSubmit = (values: FormValues) => {
    console.log(values);
    // Handle form submission here
  };
  const steps = [
    { component: StepIntro, fields: null },
    { component: StepOne, fields: ["quality"] },
    { component: StepTwo, fields: ["like"] },
    { component: StepThree, fields: ["areas"] },
    { component: StepFour, fields: ["about_us"] },
    { component: StepFive, fields: ["email"] },
  ] as const;
  const Step = steps[step].component;
  const currentFields = steps[step].fields;
  const totalSteps = steps.length;
  const isLastStep = step === steps.length - 1;
  const isFirstStep = step === 0;
  const handleNext = async () => {
    const proceedToNextStep = () => setStep((prev) => prev + 1);

    if (isFirstStep) {
      proceedToNextStep();
    } else {
      const output = await form.trigger(currentFields ?? []);

      if (output) {
        if (isLastStep) {
          form.handleSubmit(onSubmit)();
        } else {
          proceedToNextStep();
        }
      }
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [step, form, currentFields]);

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[40rem]">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isLastStep) {
                handleNext();
              } else {
                form.handleSubmit(onSubmit)();
              }
            }}
          >
            {step > 0 && <ProgressBar step={step} totalSteps={totalSteps} />}
            <Step form={form} />
            <StepAction
              step={step}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </form>
        </Form>
      </div>
    </section>
  );
};

const ProgressBar = ({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps: number;
}) => {
  return (
    <div className="relative mb-8 flex justify-between before:absolute before:left-0 before:top-1/2 before:-z-10 before:h-px before:w-full before:-translate-y-1/2 before:bg-border-primary">
      {Array.from({ length: totalSteps - 1 }, (_, index) => (
        <div
          key={index}
          className={clsx(
            "flex size-8 items-center justify-center rounded-full border border-border-primary",
            step >= index + 1
              ? "bg-background-alternative text-text-alternative"
              : "bg-white text-text-primary"
          )}
        >
          {step > index + 1 ? <BiCheck className="size-6" /> : index + 1}
        </div>
      ))}
    </div>
  );
};

const StepAction = ({
  step,
  isFirstStep,
  isLastStep,
  handlePrev,
  handleNext,
}: {
  step: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  handlePrev: () => void;
  handleNext: () => void;
}) =>
  step === 0 ? (
    <div className="mt-14 flex flex-col items-center gap-3 md:mt-16">
      <div className="relative">
        <Button onClick={handleNext}>Get started</Button>
        <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-full pl-4 lg:block">
          <p className="hidden text-sm md:flex md:items-center">
            Press
            <span className="ml-1 mr-0.5 font-semibold">Enter</span>
            <GrReturn />
          </p>
        </div>
      </div>
      <p className="flex items-center gap-x-1.5 text-sm">
        <MdAccessTime />
        Takes 1 minute
      </p>
    </div>
  ) : (
    <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
      <Button
        onClick={handlePrev}
        type="button"
        variant="secondary"
        disabled={isFirstStep}
      >
        Back
      </Button>
      <Button type="submit">{isLastStep ? "Submit" : "Next"}</Button>
      <p className="hidden text-sm md:flex md:items-center">
        Press
        <span className="ml-1 mr-0.5 font-semibold">Enter</span>
        <GrReturn />
      </p>
    </div>
  );

const StepIntro = () => (
  <div className="text-center">
    <h2 className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
      Product Survey
    </h2>
    <p className="mt-3 md:mt-4">
      We have a few questions for you to help us improve our product.
    </p>
  </div>
);

const StepOne: React.FC<StepProps> = ({ form }) => (
  <React.Fragment>
    <h2 className="mb-6 text-2xl font-bold leading-[1.3] md:text-4xl">
      Overall quality — how would you rate the product?
    </h2>
    <div className="inline-flex flex-col">
      <FormField
        control={form.control}
        name="quality"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {[...Array(10)].map((_, index) => {
                  const value = (index + 1).toString();
                  return (
                    <Button
                      key={index}
                      className="size-[43px] p-0"
                      type="button"
                      variant={field.value === value ? "primary" : "secondary"}
                      onClick={() => field.onChange(value)}
                    >
                      {value}
                    </Button>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage className="text-base text-text-error" />
          </FormItem>
        )}
      />
      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <p>0: Poor</p>
        <p>10: Excellent</p>
      </div>
    </div>
  </React.Fragment>
);

const StepTwo: React.FC<StepProps> = ({ form }) => (
  <React.Fragment>
    <h2 className="mb-6 text-2xl font-bold leading-[1.3] md:text-4xl">
      What did you like most about it?
    </h2>
    <FormField
      control={form.control}
      name="like"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Input
              className={clsx({ "border-border-error": fieldState.invalid })}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-base text-text-error" />
        </FormItem>
      )}
    />
  </React.Fragment>
);

const StepThree: React.FC<StepProps> = ({ form }) => {
  const data = [
    {
      label: "Product features",
      value: "product-features",
    },
    {
      label: "Performance",
      value: "performance",
    },
    {
      label: "Accessibility",
      value: "accessibility",
    },
    {
      label: "Customer support",
      value: "customer-support",
    },
    {
      label: "Other",
      value: "other",
    },
  ];
  return (
    <React.Fragment>
      <h2 className="mb-6 text-2xl font-bold leading-[1.3] md:text-4xl">
        What areas do you think we should improve?
      </h2>
      <p className="mb-4">Choose as many as you like</p>
      <FormField
        control={form.control}
        name="areas"
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {data.map((item, index) => {
                    const selectedValues = field.value || [];
                    const isSelected =
                      selectedValues.indexOf(item.value) !== -1;
                    return (
                      <Button
                        key={index}
                        size="sm"
                        type="button"
                        variant={isSelected ? "primary" : "secondary"}
                        onClick={() => {
                          const updatedValues = isSelected
                            ? selectedValues.filter(
                                (val: string) => val !== item.value
                              )
                            : [...selectedValues, item.value];
                          field.onChange(updatedValues);
                        }}
                        className="px-4"
                      >
                        {item.label}
                      </Button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage className="text-base text-text-error" />
            </FormItem>
          );
        }}
      />
    </React.Fragment>
  );
};

const StepFour: React.FC<StepProps> = ({ form }) => {
  const selectItems = [
    { value: "first-choice", label: "First Choice" },
    { value: "second-choice", label: "Second Choice" },
    { value: "third-choice", label: "Third Choice" },
  ];
  return (
    <React.Fragment>
      <h2 className="mb-6 text-2xl font-bold leading-[1.3] md:text-4xl">
        How did you hear about us?
      </h2>
      <FormField
        control={form.control}
        name="about_us"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={clsx({
                    "border-border-error": fieldState.invalid,
                  })}
                >
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
            </FormControl>
            <FormMessage className="text-base text-text-error" />
          </FormItem>
        )}
      />
    </React.Fragment>
  );
};

const StepFive: React.FC<StepProps> = ({ form }) => (
  <React.Fragment>
    <h2 className="mb-6 text-2xl font-bold leading-[1.3] md:text-4xl">
      Finally, add your email to get an exclusive discount
    </h2>
    <FormField
      control={form.control}
      name="email"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder="hello@relume.io"
              iconPosition="left"
              icon={<BiEnvelope className="size-6" />}
              className={clsx({ "border-border-error": fieldState.invalid })}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-base text-text-error" />
        </FormItem>
      )}
    />
  </React.Fragment>
);
