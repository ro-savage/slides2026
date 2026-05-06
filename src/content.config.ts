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

const pillarsSchema = z.object({
  layout: z.literal('pillars'),
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  pillars: z.array(
    z.object({
      label: z.string(),
      title: z.string(),
      desc: z.string(),
    }),
  ),
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
  todayLabel: z.string().optional(),
  projection: z
    .object({
      label: z.string(),
      stats: z.array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      ),
    })
    .optional(),
});

const demandSchema = z.object({
  layout: z.literal('demand'),
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  bullets: z.array(z.string()),
  decoration: z.enum(['barrier']).optional(),
});

const networkSchema = z.object({
  layout: z.literal('network'),
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  effects: z.array(
    z.object({
      headline: z.string(),
      body: z.string(),
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

const mechanicsSchema = z.object({
  layout: z.literal('mechanics'),
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  steps: z.array(
    z.object({
      label: z.string(),
      title: z.string(),
      desc: z.string(),
    }),
  ),
  pricing: z.array(
    z.object({
      amount: z.string(),
      label: z.string(),
    }),
  ),
});

const thesisSchema = z.object({
  layout: z.literal('thesis'),
  eyebrow: z.string(),
  title: z.string(),
  hypothesis: z.string(),
  steps: z.array(z.string()),
});

const trajectorySchema = z.object({
  layout: z.literal('trajectory'),
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  fillPercent: z.number().min(0).max(100),
  phases: z.array(
    z.object({
      eyebrow: z.string(),
      stat: z.string(),
      desc: z.string(),
      tone: z.enum(['past', 'present', 'future']).default('past'),
    }),
  ),
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

const raiseSchema = z.object({
  layout: z.literal('raise'),
  eyebrow: z.string(),
  title: z.string(),
  raise: z.object({
    amount: z.string(),
    valuation: z.string(),
  }),
  uses: z.array(
    z.object({
      headline: z.string(),
      label: z.string(),
    }),
  ),
  footer: z.string(),
});

const slideSchema = z.discriminatedUnion('layout', [
  heroSchema,
  pillarsSchema,
  timelineSchema,
  bigNumberSchema,
  statsGridSchema,
  demandSchema,
  networkSchema,
  opportunitySchema,
  mechanicsSchema,
  thesisSchema,
  trajectorySchema,
  closingSchema,
  raiseSchema,
]);

export const collections = {
  slides: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/slides' }),
    schema: slideSchema,
  }),
};

export type SlideData = z.infer<typeof slideSchema>;
