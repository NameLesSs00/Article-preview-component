"use client";

import { useState } from "react";
import Image from "next/image";

// Types
import { StaticImageData } from "next/image";

interface SocialIcon {
  icon: StaticImageData;
  name: string;
}

interface ProductType {
  productImage: StaticImageData;
  title: string;
  text: string;
  author: {
    image: StaticImageData;
    name: string;
    date: string;
  };
  socialIcons: SocialIcon[];
}

// Components
const ShareIcon = () => (
  <div className="flex-auto p-3 cursor-pointer z-50">
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13">
      <path
        fill="currentColor"
        d="M15 6.495L8.766.014V3.88H7.441C3.33 3.88 0 7.039 0 10.936v2.049l.589-.612C2.59 10.294 5.422 9.11 8.39 9.11h.375v3.867L15 6.495z"
      />
    </svg>
  </div>
);

const Author = ({
  onClick,
  product,
  clazz,
}: {
  onClick: () => void;
  product: ProductType;
  clazz: string;
}) => (
  <div className="group flex h-[8em] items-center space-x-4 bg-white px-10 rounded-br-lg text-[hsl(217,19%,35%)]">
    <div className="relative h-10 w-10 flex-none">
      <Image
        src={product.author.image}
        alt={`Profile picture of ${product.author.name}`}
        fill
        className="rounded-full object-cover"
      />
    </div>
    <div className="flex-auto">
      <p>{product.author.name}</p>
      <p className="text-[11px] opacity-50">{product.author.date}</p>
    </div>
    <div className={`rounded-full ${clazz}`} onClick={onClick}>
      <ShareIcon />
    </div>
  </div>
);

const DesktopShare = ({
  onClick,
  product,
}: {
  onClick: () => void;
  product: ProductType;
}) => (
  <div className="w-full">
    {/* Desktop version */}
    <div className="hidden md:block">
      <div className="relative">
        <div className="absolute right-[-4.5em] top-[-2em] flex items-center rounded-lg bg-[hsl(217,19%,35%)] px-8 py-4 shadow-[0_20px_30px_rgba(0,0,0,0.1)] after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-[hsl(217,19%,35%)]">
          <span className="mr-4 tracking-[0.4em] text-[hsl(212,23%,69%)]">
            SHARE
          </span>
          {product.socialIcons.map((icon, index) => (
            <div key={index} className="ml-4 relative h-5 w-5">
              <Image
                src={icon.icon}
                alt={`Icon for ${icon.name}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <Author
          onClick={onClick}
          product={product}
          clazz="bg-[hsl(214,17%,51%)] text-white"
        />
      </div>
    </div>

    {/* Mobile version */}
    <div className="md:hidden flex items-center bg-[hsl(217,19%,35%)] px-10 text-white h-[8em]">
      <span className="tracking-[0.4em] text-[hsl(212,23%,69%)]">SHARE</span>
      {product.socialIcons.map((icon, index) => (
        <div key={index} className="ml-4 relative h-5 w-5">
          <Image
            src={icon.icon}
            alt={`Icon for ${icon.name}`}
            fill
            className="object-contain"
          />
        </div>
      ))}
      <div
        className="ml-auto rounded-full bg-[hsl(214,17%,51%)]"
        onClick={onClick}
      >
        <ShareIcon />
      </div>
    </div>
  </div>
);

const Product = ({ product }: { product: ProductType }) => {
  const [showAuthor, setShowAuthor] = useState(true);

  return (
    <div className="flex min-h-screen min-w-full items-center justify-center">
      <article
        className="w-mobile shadow-[0_20px_30px_rgba(0,0,0,0.1)] md:w-desktop"
        aria-labelledby="title"
      >
        <div className="grid grid-cols-1 gap-0 md:grid-cols-[40%_auto]">
          <div className="relative h-[200px] w-full md:h-full">
            <Image
              src={product.productImage}
              alt={product.title}
              fill
              className="object-cover object-left rounded-l-lg"
            />
          </div>
          <div>
            <section
              className="space-y-5 bg-white px-10 pb-6 pt-10 rounded-tr-lg"
              aria-describedby="product-info"
            >
              <h1 className="text-[16px] font-bold md:text-[22px]" id="title">
                {product.title}
              </h1>
              <h2 className="text-[14px] opacity-50" id="product-info">
                {product.text}
              </h2>
            </section>
            <section aria-live="polite">
              {showAuthor ? (
                <Author
                  onClick={() => setShowAuthor(false)}
                  product={product}
                  clazz="bg-[hsl(210,46%,95%)] text-[hsl(214,17%,51%)]"
                />
              ) : (
                <DesktopShare
                  onClick={() => setShowAuthor(true)}
                  product={product}
                />
              )}
            </section>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Product;