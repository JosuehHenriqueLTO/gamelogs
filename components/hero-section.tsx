"use server";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// Ícones
import { ArrowRight, ChevronRight } from "lucide-react";

// Componentes UI
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { HeroHeader } from "./header";
import { auth } from "@/auth";
import { Header } from "./headerLogged";
// Variantes de transição
const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring", bounce: 0.3, duration: 1.5 },
    },
  },
};

export default async function HeroSection() {
  const session = await auth();

  return (
    <>
      {session && <HeroHeader />}
      {!session && <Header />}

      <main className="overflow-hidden">
        {/* --- Background decorativo --- */}
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="absolute left-0 top-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,transparent_80%)]" />
          <div className="absolute left-0 top-0 h-320 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,transparent_100%)] [translate:5%_-50%]" />
          <div className="absolute left-0 top-0 h-320 w-60 -translate-y-87.5 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,transparent_100%)]" />
        </div>

        {/* --- Seção principal --- */}
        <section>
          <div className="relative pt-24 md:pt-36">
            {/* Background animado */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: { transition: { delayChildren: 1 } },
                },
                item: {
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", bounce: 0.3, duration: 2 },
                  },
                },
              }}
              className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32"
            >
              <Image
                src="https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120"
                alt="Background noturno"
                className="hidden size-full dark:block"
                width={3276}
                height={4095}
                priority
              />
            </AnimatedGroup>

            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
            />

            {/* --- Conteúdo do Hero --- */}
            <div className="mx-auto max-w-7xl px-6 text-center lg:text-left">
              <AnimatedGroup variants={transitionVariants}>
                {/* Badge com link */}
              </AnimatedGroup>

              {/* Título e subtítulo */}
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="mx-auto mt-8 max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem]"
              >
                All your games, reunited
              </TextEffect>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mx-auto mt-8 max-w-2xl text-balance text-lg"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                explicabo;
              </TextEffect>

              {/* Botões */}
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
              >
                <div className="rounded-[calc(var(--radius-xl)+0.125rem)] border bg-foreground/10 p-0.5">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-xl px-5 text-base"
                  >
                    <Link href="#link">Start Building</Link>
                  </Button>
                </div>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="h-10.5 rounded-xl px-5"
                >
                  <Link href="#link">Request a demo</Link>
                </Button>
              </AnimatedGroup>
            </div>

            {/* --- Carrossel de exemplos --- */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.75 },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="mt-16">
                <h2 className="mb-6 text-center text-xl font-semibold">
                  Trending Games
                </h2>
                <Carousel opts={{ align: "start" }} className="w-full">
                  <CarouselContent>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <CarouselItem
                        key={index}
                        className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                      >
                        <div className="p-2">
                          <Card className="overflow-hidden">
                            <CardContent className="flex aspect-square items-center justify-center p-6 bg-muted">
                              <span className="text-3xl font-semibold">
                                {index + 1}
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </AnimatedGroup>
          </div>
        </section>
      </main>
    </>
  );
}
