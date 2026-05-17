import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, HelpCircle, TableProperties } from "lucide-react";
import { aeoPages, type AeoPageId } from "@/lib/aeoContent";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45 },
  }),
};

type AeoPageProps = {
  pageId: AeoPageId;
};

function buildFaqJsonLd(page: (typeof aeoPages)[AeoPageId]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function buildWebPageJsonLd(page: (typeof aeoPages)[AeoPageId]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.h1,
    url: `https://www.sirinx.co${page.path}`,
    description: page.directAnswer,
    inLanguage: "th-TH",
    isPartOf: {
      "@type": "WebSite",
      name: "SIRINX",
      url: "https://www.sirinx.co",
    },
    dateModified: page.lastUpdated,
  };
}

export default function AeoPage({ pageId }: AeoPageProps) {
  const page = aeoPages[pageId];
  const faqJsonLd = buildFaqJsonLd(page);
  const webPageJsonLd = buildWebPageJsonLd(page);

  return (
    <div>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(webPageJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <section className="relative overflow-hidden bg-background pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--accent-glow),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.12),transparent_28%)]" />
        <div className="container relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-4xl">
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-5">
              {page.h1}
            </h1>
            <p className="text-lg lg:text-xl text-text-secondary leading-relaxed mb-5">
              {page.directAnswer}
            </p>
            <p className="text-sm lg:text-base text-text-muted leading-relaxed max-w-3xl">
              {page.summary}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 lg:py-20 section-alt">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center gap-3 mb-6">
              <TableProperties className="w-5 h-5 text-accent-primary" />
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">ข้อมูลสำคัญ</h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-border-subtle bg-surface-elevated">
              <table className="w-full text-left text-sm">
                <tbody>
                  {page.facts.map((fact) => (
                    <tr key={fact.label} className="border-b border-border-subtle last:border-b-0">
                      <th scope="row" className="w-[38%] px-4 py-4 align-top font-display text-foreground">
                        {fact.label}
                      </th>
                      <td className="px-4 py-4 text-text-secondary">{fact.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="p-6 rounded-xl border border-border-subtle bg-surface-elevated"
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">ปัญหาที่เจอ</h2>
              <p className="text-text-secondary leading-relaxed">{page.problem}</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="p-6 rounded-xl border border-border-accent bg-accent-glow"
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">แนวทางของ SIRINX</h2>
              <p className="text-text-secondary leading-relaxed">{page.solution}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 section-alt">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-5">
                {page.audienceTitle}
              </h2>
              <ul className="space-y-3">
                {page.audience.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-5">
                {page.featuresTitle}
              </h2>
              <div className="grid gap-3">
                {page.features.map((item) => (
                  <div key={item} className="rounded-lg border border-border-subtle bg-surface-elevated px-4 py-3 text-sm text-text-secondary">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {page.terms ? (
        <section className="py-14 lg:py-20 bg-background">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">คำศัพท์สำคัญ</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {page.terms.map((item) => (
                  <div key={item.term} className="p-5 rounded-xl border border-border-subtle bg-surface-elevated">
                    <h3 className="font-display font-semibold text-foreground mb-2">{item.term}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.meaning}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ) : null}

      <section className="py-14 lg:py-20 bg-background">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-5 h-5 text-accent-primary" />
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">FAQ</h2>
            </div>
            <div className="space-y-4">
              {page.faqs.map((faq) => (
                <article key={faq.question} className="p-5 rounded-xl border border-border-subtle bg-surface-elevated">
                  <h3 className="font-display font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 lg:py-20 section-alt">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-center"
          >
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
                ขั้นตอนถัดไป
              </h2>
              <p className="text-sm text-text-secondary">
                อัปเดตล่าสุด {page.lastUpdated} เลือกอ่านหน้าที่เกี่ยวข้อง หรือส่งข้อมูลเพื่อให้ทีม SIRINX ประเมินระบบจากพื้นที่จริง
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              {page.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 font-display font-semibold btn-accent rounded-lg text-sm"
                >
                  {link.label} <ArrowRight className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
