"use client";

import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pb-24 pt-24 md:pt-36">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Blog
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          Nothing here yet. Check back soon.
        </motion.p>
      </section>
    </div>
  );
}
