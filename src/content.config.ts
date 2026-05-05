import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const heroSchema = z.object({
  layout: z.literal('hero'),
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  pill: z
    .object({
      text: z.string(),
      icon: z.enum(['smart-ppe-radar']).optional(),
    })
    .optional(),
  decoration: z.enum(['globe']).optional(),
});

const timelineSchema = z.object({
  layout: z.literal('timeline'),
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  items: z.array(
    z.object({
      year: z.string(),
      desc: z.string(),
    }),
  ),
});

const bigNumberSchema = z.object({
  layout: z.literal('big-number'),
  eyebrow: z.string(),
  number: z.string(),
  title: z.string(),
  bullets: z.array(z.string()),
  decoration: z.enum(['signal-rings']).optional(),
});

const statsGridSchema = z.object({
  layout: z.literal('stats-grid'),
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
  ),
  tags: z.array(z.string()).optional(),
});

const demandSchema = z.object({
  layout: z.literal('demand'),
  eyebrow: z.string(),
  title: z.string(),
  bullets: z.array(z.string()),
  decoration: z.enum(['barrier']).optional(),
});

const networkSchema = z.object({
  layout: z.literal('network'),
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      tone: z.enum(['lime', 'teal']).default('lime'),
    }),
  ),
  decoration: z.enum(['network']).optional(),
});

const opportunitySchema = z.object({
  layout: z.literal('opportunity'),
  eyebrow: z.string(),
  title: z.string(),
  items: z.array(
    z.object({
      text: z.string(),
      value: z.string(),
    }),
  ),
  conclusion: z.object({
    label: z.string(),
    value: z.string(),
    caption: z.string(),
  }),
});

const closingSchema = z.object({
  layout: z.literal('closing'),
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  body: z.string().optional(),
  cta: z
    .object({
      label: z.string(),
      href: z.string().url(),
    })
    .optional(),
  decoration: z.enum(['growth-line']).optional(),
});

const slideSchema = z.discriminatedUnion('layout', [
  heroSchema,
  timelineSchema,
  bigNumberSchema,
  statsGridSchema,
  demandSchema,
  networkSchema,
  opportunitySchema,
  closingSchema,
]);

export const collections = {
  slides: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/slides' }),
    schema: slideSchema,
  }),
};

export type SlideData = z.infer<typeof slideSchema>;
