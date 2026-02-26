"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { ProjectCard, type Project } from "@/components/project-card";

const projects: Project[] = [
  {
    title: "HazelDesk",
    description:
      "An all-in-one business management platform for salons, spas, and wellness professionals. Built end-to-end as a solo founder, owning everything from product design and full-stack development to ad campaigns and customer support. Features scheduling, online booking, a website builder, e-commerce, and analytics.",
    image: "https://r2.deskfluence.com/landing/v2_0/hero_schedule.png",
    video: "https://r2.deskfluence.com/landing/meet_hazeldesk.mp4",
    href: "https://hazeldesk.com",
    tags: ["SaaS", "Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    title: "Ambient Hopecore ¯\\_(ツ)_/¯",
    description:
      "A small modular synth patch made in VCV rack. Randomly generated music and modular design; just a small hobby that combine my love of music production and coding.",
    image:
      "https://r2.deskfluence.com/personal-site/projects/vcv-36/preview.png",
    video:
      "https://r2.deskfluence.com/personal-site/projects/vcv-36/recording.mp4",
    tags: ["Music Production", "VCV Rack", "Modular Synths"],
  },
  {
    title: "SuperTeleSpear",
    description:
      "A technical platformer built in Godot. Throw your spear, then teleport to it. Chain movement to clear levels as fast as possible. Deterministic physics enable replays and ghost training for speedrunning.",
    image:
      "https://r2.deskfluence.com/personal-site/projects/telespear/screenshot.png",
    video:
      "https://r2.deskfluence.com/personal-site/projects/telespear/recording.mp4",
    href: "/projects/telespear",
    tags: ["Game Dev", "Godot", "GDScript"],
  },
  {
    title: "Wall Climbing Robot",
    description:
      "An autonomous robot built for UW's MTE380 in 2017. The challenge: get across a barrier and reach a destination without human input. Our team went with magnet-embedded wheels to climb over obstacles. An ambitious approach that pushed everything we'd learned to that point.",
    image:
      "https://r2.deskfluence.com/personal-site/projects/mte-380/preview.jpg",
    video:
      "https://r2.deskfluence.com/personal-site/projects/mte-380/mte-380.mp4",
    tags: ["Mechatronics", "Autonomous Robotics", "Arduino"],
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="flex flex-col-reverse items-center gap-8 pb-16 pt-24 md:flex-row md:items-center md:justify-between md:gap-12 md:pb-24 md:pt-36 md:px-10">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Nick Manna
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-4 max-w-xl text-lg text-muted-foreground md:text-xl"
          >
            Developer, designer, and coffee enthusiast.
            <br />I make things and sometimes write about them.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="shrink-0"
        >
          <Image
            src="/avatar-nick.png"
            alt="Nick Manna"
            width={176}
            height={176}
            priority
            className="rounded-full border-2 border-primary md:h-48 md:w-48"
          />
        </motion.div>
      </section>

      {/* Projects */}
      <section className="pb-24">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-display text-2xl font-semibold tracking-tight"
        >
          Projects
        </motion.h2>
        <div className="mt-8 grid gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
