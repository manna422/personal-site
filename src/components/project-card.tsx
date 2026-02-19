"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { VideoDialog } from "./video-dialog";

export interface Project {
  title: string;
  description: string;
  image: string;
  video?: string;
  href?: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-300 hover:shadow-lg md:flex-row"
    >
      {/* Preview area */}
      <div className="relative overflow-hidden md:w-[45%] md:shrink-0">
        {project.video ? (
          <VideoDialog
            posterSrc={project.image}
            videoSrc={project.video}
            posterAlt={project.title}
            aspectRatio="16/9"
            className="md:h-full md:aspect-auto"
          />
        ) : (
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg md:h-full md:aspect-auto">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5 md:py-6 md:px-6">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold tracking-tight">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        {project.href ? (
          <Link
            href={project.href}
            target={project.href.startsWith("http") ? "_blank" : undefined}
            rel={
              project.href.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            className={cn(
              "inline-flex items-center gap-1.5 text-sm font-medium",
              "text-foreground underline-offset-4 hover:underline",
              "transition-colors"
            )}
          >
            View project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </div>
    </motion.article>
  );
}
