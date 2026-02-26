"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";

interface WorkEntry {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  tags: string[];
  description: string[];
}

const workHistory: WorkEntry[] = [
  {
    title: "Founder / Developer",
    company: "Frontdeskify Inc",
    location: "Toronto, ON",
    startDate: "Jan 2024",
    endDate: "Present",
    tags: [
      "SaaS",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Stripe",
      "PayPal",
      "Tailwind",
    ],
    description: [
      "Built full-stack SaaS from zero to live product in 6 months, now serving 200+ businesses.",
      "Conducted customer discovery with 10 service business owners to shape product direction.",
      "Architected multi-tenant platform with white-label websites, custom domains, and payment processing (Stripe, PayPal, Apple Pay, Google Pay).",
      "Built email infrastructure on AWS SES with scheduling, bounce handling, and compliance (GDPR, CAN-SPAM).",
    ],
  },
  {
    title:
      "Product Team Lead / Director of Shared Infrastructure / Server Developer",
    company: "GameHive Corporation",
    location: "Toronto, ON",
    startDate: "Jul 2018",
    endDate: "Dec 2023",
    tags: [
      "Python",
      "Kubernetes",
      "GCP",
      "AWS",
      "PostgreSQL",
      "Redis",
      "Terraform",
    ],
    description: [
      "Proposed and built two new teams from scratch: a 5-developer product team and a DevOps-focused Shared Infrastructure team.",
      "Led product team to launch a new mobile game title in 4 months, capitalizing on first-mover advantage.",
      "Took company from zero BI to full analytics and A/B testing capability, then hired a dedicated BI team to scale and own the function.",
      "Saved $40K+/month through backend optimization of legacy services.",
      "Built scalable game server infrastructure handling 300k+ DAU with 99.99% uptime and sub-3-minute deployments.",
    ],
  },
  {
    title: "Software Developer",
    company: "Apple Inc",
    location: "Cupertino, CA",
    startDate: "Sep – Dec 2016; May – Aug 2017",
    endDate: "",
    tags: ["Python", "Swift", "Objective-C"],
    description: [
      "Authored ApplePay terminal certification spec, adopted by 2 major payment terminal manufacturers.",
      "Designed distributed async testing architecture, adopted by 8 internal teams.",
      "Authored test plan for new iOS accessory platform, accepted for implementation.",
    ],
  },
  {
    title: "Firmware Engineer",
    company: "Otto LLC",
    location: "Burlingame, CA",
    startDate: "Sep 2015",
    endDate: "Dec 2015",
    tags: ["C", "FreeRTOS", "I2C", "SPI", "HomeKit"],
    description: [
      "Wrote low-level I2C, SPI and peripheral drivers for an IoT product on FreeRTOS.",
      "Implemented Bonjour, IPv6, and MFi Authentication for Apple HomeKit integration.",
      "Architected and built an automated testing platform.",
    ],
  },
  {
    title: "Software Designer",
    company: "Evertz Microsystems Inc",
    location: "Burlington, ON",
    startDate: "May - Sep 2014; Jan – May 2015",
    endDate: "",
    tags: ["Python", "Linux", "Bash"],
    description: [
      "Reduced automated build time from 30 minutes to 2 minutes.",
      "Developed a wrapper for KVM hypervisor for VM cluster management.",
      "Implemented features in Python control layer for high-performance video replay device (used at 2015 Super Bowl).",
      "Owned Continuous Integration platform and development servers.",
    ],
  },
  {
    title: "Software Developer",
    company: "Autodesk Inc",
    location: "Montreal, QC",
    startDate: "Sep 2013",
    endDate: "Dec 2013",
    tags: ["C++", "Qt", "Python", "Perl"],
    description: [
      "Pioneered CI and build automation system scalable to 100+ Autodesk products.",
      "Built internal tools for developer productivity in C++/Qt.",
    ],
  },
  {
    title: "Software Developer",
    company: "EXO U Inc",
    location: "Montreal, QC",
    startDate: "Feb 2013",
    endDate: "May 2013",
    tags: ["Jenkins", "Bash", "Javascript", "PHP"],
    description: [
      "Implemented cloud solution for distributed automated testing.",
      "Owned CI, automated building, and Git migration.",
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Bio */}
      <section className="pb-16 pt-24 md:pb-20 md:pt-36">
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
        >
          About Me
        </motion.h1>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          <p>
            Generalist engineer with 10+ years of experience across SaaS
            startups, distributed systems, and game infrastructure. I’ve built
            and operated backends serving 300k+ daily active users, with a focus
            on reliability, scalability, and thoughtful design.
          </p>
          <p>
            I enjoy learning and applying new technologies, while keeping a
            strong respect for mature, battle-tested tools. My goal is simple:
            build systems that are practical, resilient, and pleasant to use.
          </p>
        </motion.div>
      </section>

      {/* Work History */}
      <section className="pb-16 md:pb-20">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-display text-2xl font-semibold tracking-tight"
        >
          Work History
        </motion.h2>

        <div className="mt-10 space-y-0">
          {workHistory.map((entry, i) => (
            <motion.div
              key={`${entry.company}-${entry.startDate}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="relative border-l-2 border-border pb-10 pl-8 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-foreground bg-background" />

              <div className="grid gap-1 sm:grid-cols-[1fr_auto]">
                <h3 className="font-display text-lg font-semibold">
                  {entry.company}
                </h3>
                <span className="shrink-0 text-sm tabular-nums text-muted-foreground sm:self-center">
                  {entry.endDate ? (
                    <>
                      {entry.startDate} &ndash; {entry.endDate}
                    </>
                  ) : (
                    entry.startDate
                  )}
                </span>
                <p className="text-sm text-muted-foreground sm:col-span-2">
                  {entry.title} &middot; {entry.location}
                </p>
              </div>

              {entry.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <ul className="mt-3 space-y-1.5">
                {entry.description.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="pb-24">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-display text-2xl font-semibold tracking-tight"
        >
          Education
        </motion.h2>

        <div className="mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative border-l-2 border-border pl-8"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-foreground bg-background" />

            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold">
                  Bachelor of Applied Science in Mechatronics Engineering
                </h3>
                <p className="text-sm text-muted-foreground">
                  University of Waterloo, Co-operative Program &middot; With
                  Distinction
                </p>
              </div>
              <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                Sep 2012 &ndash; May 2018
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
