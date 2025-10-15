import { BiCheck, BiX } from "react-icons/bi";

type ImageProps = {
  src: string;
  alt?: string;
};

type Feature = {
  text: string;
  items: React.ReactNode | string;
};

type Products = {
  image: ImageProps;
  productName: string;
  description: string;
  mainFeatures: Feature[];
  features: Feature[];
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  products: Products[];
};

export type Comparison15Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Comparison15 = (props: Comparison15Props) => {
  const { tagline, heading, description, products } = {
    ...Comparison15Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-xl">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Product = ({ product }: { product: Products }) => (
  <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
    <div>
      <div className="flex flex-col items-center text-center">
        <div className="rb-4 mb-6 flex max-w-[18rem] flex-col items-center md:mb-8">
          <img
            src={product.image.src}
            alt={product.image.alt}
            className="h-12"
          />
        </div>
      </div>
      <div className="grid grid-cols-1">
        {product.mainFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex justify-between gap-4 border-b border-border-primary py-6 first:border-t"
          >
            <p>{feature.text}</p>
            <h6 className="text-md font-bold leading-[1.4] md:text-lg md:leading-[1.4]">
              {feature.items}
            </h6>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-y-4 py-2 md:mt-8">
        {product.features.map((feature, index) => (
          <div key={index} className="flex self-start">
            <div className="mr-4 flex-none self-start">{feature.items}</div>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Comparison15Defaults: Props = {
  tagline: "Tagline",
  heading: "Short heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  products: [
    {
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg",
        alt: "Relume icon 1",
      },
      productName: "Product name",
      description: "Lorem ipsum dolor sit amet",
      mainFeatures: [
        { text: "Feature text goes here", items: "$19/mo" },
        { text: "Feature text goes here", items: "10" },
        { text: "Feature text goes here", items: "49%" },
        { text: "Feature text goes here", items: "N/A" },
      ],
      features: [
        {
          text: "Feature text goes here",
          items: <BiCheck className="size-6" />,
        },
        {
          text: "Feature text goes here",
          items: <BiCheck className="size-6" />,
        },
        { text: "Feature text goes here", items: <BiX className="size-6" /> },
        { text: "Feature text goes here", items: <BiX className="size-6" /> },
      ],
    },
    {
      image: {
        src: "https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg",
        alt: "Relume icon 2",
      },
      productName: "Product name",
      description: "Lorem ipsum dolor sit amet",
      mainFeatures: [
        { text: "Feature text goes here", items: "$29/mo" },
        { text: "Feature text goes here", items: "Unlimited" },
        { text: "Feature text goes here", items: "90%" },
        { text: "Feature text goes here", items: "+100" },
      ],
      features: [
        {
          text: "Feature text goes here",
          items: <BiCheck className="size-6" />,
        },
        {
          text: "Feature text goes here",
          items: <BiCheck className="size-6" />,
        },
        {
          text: "Feature text goes here",
          items: <BiCheck className="size-6" />,
        },
        {
          text: "Feature text goes here",
          items: <BiCheck className="size-6" />,
        },
      ],
    },
  ],
};
