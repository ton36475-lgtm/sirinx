/**
 * SIRINX About — Second Pass Refinement
 * Tighter spacing, Solar Carport in milestones, trust-first CEO section
 */
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { trackSolutionVisit } from "@/components/HeroSlideshow";
import { usePageTranslation } from "@/i18n";
import "@/i18n/pages/about"; // Register translations
import {
  ArrowRight, Target, Eye, Cpu, Users, ShieldCheck, Phone, Mail, MapPin,
  Car, Zap
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv";
const LOGO_URL = `${CDN}/photo_2026-03-24_06-45-58_293d121c.jpg`;
const HERO = `${CDN}/hero-about-3Trik9L6DrdCwCcjCt2KVz.webp`;

export default function About() {
  const { t } = usePageTranslation("about");
  useEffect(() => { trackSolutionVisit("solar-carport"); }, []);

  const values = [
    { icon: Cpu, title: t("value_1_title"), desc: t("value_1_desc") },
    { icon: ShieldCheck, title: t("value_2_title"), desc: t("value_2_desc") },
    { icon: Target, title: t("value_3_title"), desc: t("value_3_desc") },
    { icon: Users, title: t("value_4_title"), desc: t("value_4_desc") },
  ];

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="SIRINX Team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/50" />
        </div>
        <div className="container relative z-10 pt-20">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="max-w-2xl">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">{t("hero_span")}</span>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">
              {t("hero_title")}
            </h1>
            <p className="text-text-secondary leading-relaxed">
              {t("hero_desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== VISION & MISSION ===== */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-5 h-5 text-accent-primary" />
                <h2 className="font-display text-xl font-bold text-foreground">{t("vision_title")}</h2>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t("vision_desc")}
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-accent-secondary" />
                <h2 className="font-display text-xl font-bold text-foreground">{t("mission_title")}</h2>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t("mission_desc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CORE VALUES ===== */}
      <section className="py-14 lg:py-20 section-alt">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-8">
            <span className="text-xs font-medium text-accent-secondary tracking-widest uppercase mb-3 block">{t("values_span")}</span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">{t("values_title")}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="p-5 rounded-xl border border-border-subtle hover:border-border-accent transition-colors bg-surface-elevated">
                <v.icon className="w-6 h-6 text-accent-primary mb-3" />
                <h3 className="font-display font-semibold text-foreground text-sm mb-1.5">{v.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
