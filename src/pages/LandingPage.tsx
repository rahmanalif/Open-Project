import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Compass,
  Gauge,
  Menu,
  Moon,
  Orbit,
  Sparkles,
  Sun,
  Waypoints
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

const NAV_ITEMS = [
  { label: 'Signal', href: '#signal' },
  { label: 'Chemistry', href: '#chemistry' },
  { label: 'Flow', href: '#flow' },
  { label: 'FAQ', href: '#faq' }
];

const TRUST_MARKERS = [
  'Built for early-stage founders and multidisciplinary builders',
  'Project-first matching with chemistry, pace, and craft in view',
  'Structured for serious collaboration without marketplace noise'
];

const HERO_SIGNAL_STEPS = [
  {
    label: 'Project brief',
    title: 'State the work clearly',
    body: 'Describe the role gap, pace, and project shape once so the system can read intent with more precision.'
  },
  {
    label: 'Chemistry read',
    title: 'See why the fit holds',
    body: 'Matches arrive with working-style context, not just overlapping titles or skills.'
  },
  {
    label: 'Calm outreach',
    title: 'Start with shared context',
    body: 'The first message begins closer to alignment, which lowers friction for thoughtful builders.'
  }
];

const MATCH_SIGNALS = [
  {
    label: 'Project shape',
    value: 'Experimental product studio with a strong systems lens'
  },
  {
    label: 'Open roles',
    value: 'Founding designer, frontend engineer, narrative strategist'
  },
  {
    label: 'Working cadence',
    value: 'Async decisions daily, two deliberate sync sessions weekly'
  },
  {
    label: 'Chemistry cues',
    value: 'High initiative, low ego, visually opinionated, product-minded'
  }
];

const PRINCIPLES = [
  {
    title: 'Signal before self-promotion',
    body: 'Nexus reads the shape of the work, the seriousness of the brief, and the way people like to collaborate before it puts anyone in a room together.'
  },
  {
    title: 'Chemistry beyond surface fit',
    body: 'Role alignment matters, but so do pace, communication style, ambition level, and how a team actually wants to make decisions.'
  },
  {
    title: 'Momentum built into the intro',
    body: 'Every introduction starts with enough shared context to move quickly, ask better questions, and avoid the usual first-call fog.'
  }
];

const CHEMISTRY_POINTS = [
  {
    title: 'Creative compatibility',
    body: 'Taste, references, and decision style surface early so the work feels aligned, not negotiated from scratch.'
  },
  {
    title: 'Execution rhythm',
    body: 'Availability, responsiveness, and preferred working tempo are treated as first-order signals.'
  },
  {
    title: 'Founding energy',
    body: 'Nexus is tuned for people who want to build with care, contribute deeply, and keep moving when the project gets real.'
  }
];

const FLOW_STEPS = [
  {
    index: '01',
    title: 'Frame the project clearly',
    body: 'Define the work, the missing roles, and the real constraints so the platform can read what kind of collaborator will actually help.'
  },
  {
    index: '02',
    title: 'See high-fit people first',
    body: 'Nexus surfaces collaborators with strong overlap in craft, timing, and working style, not just matching labels.'
  },
  {
    index: '03',
    title: 'Begin with shared context',
    body: 'Introductions arrive with chemistry notes, role relevance, and project direction already in view.'
  }
];

const BUILDER_TYPES = [
  'Founder assembling a small core team around an early conviction',
  'Designer seeking technical counterparts who understand product taste',
  'Engineer looking for creative partners with real follow-through',
  'Multidisciplinary maker building a project that needs sharper company'
];

const FAQ_ITEMS = [
  {
    question: 'Is Nexus a freelance marketplace?',
    answer:
      'No. It is designed for collaboration on meaningful products and creative work, not one-off gigs, bidding loops, or transactional sourcing.'
  },
  {
    question: 'What makes the matching feel different?',
    answer:
      'Nexus looks at role fit alongside timing, working rhythm, intent, and team chemistry so matches feel viable in practice, not just correct on paper.'
  },
  {
    question: 'Who gets the most value from it?',
    answer:
      'Early-stage builders, design-conscious founders, and multidisciplinary creators who care about who they build with as much as what they build.'
  },
  {
    question: 'Do I need a polished company or shipped product first?',
    answer:
      'No. Nexus is meant for serious work in motion, including promising early ideas that need the right collaborators to become real.'
  }
];

export function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="premium-shell relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top,rgba(122,119,255,0.06),transparent_48%)]" />
        <div className="absolute left-[-10rem] top-[5rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(201,165,92,0.18),transparent_68%)] blur-3xl" />
        <div className="absolute right-[-8rem] top-[14rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(59,98,255,0.14),transparent_70%)] blur-3xl" />
        <div className="nexus-grid absolute inset-0 opacity-50" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-8 pt-5 sm:px-6 lg:px-8">
        <header className="premium-panel sticky top-4 z-30 rounded-[30px] px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[1.2rem] border border-[var(--border)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--accent)_82%,#f3ecdf),color-mix(in_srgb,var(--accent-strong)_72%,#1c2743))] text-sm font-semibold text-[var(--surface-0)] shadow-[0_20px_40px_rgba(40,56,104,0.18)]">
                NX
              </div>
              <div>
                <p className="premium-kicker mb-1">Nexus</p>
                <p className="text-sm text-[var(--text-muted)]">Collaboration matching for teams with taste</p>
              </div>
            </div>

            <nav className="hidden items-center gap-6 lg:flex">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <button onClick={toggleTheme} className="premium-button-secondary rounded-2xl p-3" aria-label="Toggle theme">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button onClick={onSignIn} className="premium-button-secondary rounded-2xl px-4 py-3 text-sm font-semibold">
                Sign In
              </button>
              <button onClick={onGetStarted} className="premium-button rounded-2xl px-4 py-3 text-sm font-semibold">
                Request access
              </button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button onClick={toggleTheme} className="premium-button-secondary rounded-2xl p-3" aria-label="Toggle theme">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="premium-button-secondary rounded-2xl p-3"
                aria-expanded={isMenuOpen}
                aria-label="Open navigation"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>

          <div
            className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out lg:hidden ${
              isMenuOpen ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="min-h-0">
              <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-4">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                  <button onClick={onSignIn} className="premium-button-secondary rounded-2xl px-4 py-3 text-sm font-semibold">
                    Sign In
                  </button>
                  <button onClick={onGetStarted} className="premium-button rounded-2xl px-4 py-3 text-sm font-semibold">
                    Request access
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <section className="grid gap-10 pb-14 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-end lg:gap-14 lg:pt-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[color:var(--bg-elevated)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)] shadow-[0_12px_28px_rgba(29,42,78,0.08)]">
                <Sparkles size={14} />
                Intelligent matching for creative and technical builders
              </div>

              <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.9rem,8vw,7.8rem)] leading-[0.9] text-[var(--text)]">
                Find collaborators with the right chemistry to actually build.
              </h1>

              <p className="mt-6 max-w-2xl text-[1.04rem] leading-8 text-[var(--text-muted)] sm:text-lg">
                Nexus helps founders, creators, and multidisciplinary teams discover people who fit the project, the pace, and the
                ambition. It feels more like intelligent project alignment than searching through profiles.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={onGetStarted} className="premium-button inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold">
                  Build your profile
                  <ArrowRight size={16} />
                </button>
                <a
                  href="#chemistry"
                  className="premium-button-secondary inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold"
                >
                  See the matching model
                  <Waypoints size={16} />
                </a>
              </div>

              <div className="mt-8 rounded-[30px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[0_20px_48px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:p-5">
                <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr] xl:items-start">
                  <div className="flex h-full flex-col justify-between rounded-[24px] border border-[var(--border)] bg-[color:var(--bg-elevated)]/80 p-4">
                    <div>
                      <p className="premium-kicker mb-2">Calmer first step</p>
                      <p className="max-w-sm text-base leading-7 text-[var(--text)]">
                        Nexus is designed to make serious collaboration feel easier to enter and easier to trust.
                      </p>
                    </div>
                    <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(82,110,202,0.18)] bg-[rgba(82,110,202,0.08)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                      <Orbit size={14} />
                      Lower social friction
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {HERO_SIGNAL_STEPS.map((item) => (
                      <article
                        key={item.label}
                        className="rounded-[24px] border border-[var(--border)] bg-[color:var(--bg-elevated)]/72 p-4 transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">{item.label}</p>
                        <h3 className="mt-3 text-base font-semibold leading-6 text-[var(--text)]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{item.body}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-3 md:grid-cols-3">
                {TRUST_MARKERS.map((item) => (
                  <div key={item} className="premium-soft-panel rounded-[24px] px-4 py-4">
                    <p className="text-sm leading-6 text-[var(--text)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="premium-panel relative overflow-hidden rounded-[36px] p-5 sm:p-6">
                <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.28),transparent_32%,rgba(58,86,169,0.08))]" />
                <div className="relative grid gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="premium-kicker mb-2">Live chemistry readout</p>
                      <h2 className="max-w-md text-[1.9rem] font-semibold leading-tight text-[var(--text)]">
                        A match view designed to feel like project intelligence.
                      </h2>
                    </div>
                    <div className="rounded-[1.3rem] border border-[var(--border)] bg-[color:var(--bg-elevated)] p-3 text-[var(--accent)]">
                      <Orbit size={22} />
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
                    <div className="nexus-orbit relative min-h-[320px] overflow-hidden rounded-[30px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(245,242,236,0.88),rgba(236,232,225,0.6))] p-5 dark:bg-[linear-gradient(180deg,rgba(17,22,33,0.88),rgba(17,22,33,0.62))]">
                      <div className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(84,106,160,0.18)]" />
                      <div className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(84,106,160,0.2)]" />
                      <div className="absolute left-1/2 top-1/2 h-[6.5rem] w-[6.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(84,106,160,0.22)]" />
                      <div className="absolute left-[18%] top-[20%] flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(84,106,160,0.28)] bg-[color:var(--surface-0)] text-xs font-semibold text-[var(--accent)] shadow-[0_16px_32px_rgba(51,71,122,0.14)]">
                        UI
                      </div>
                      <div className="absolute right-[16%] top-[28%] flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(84,106,160,0.28)] bg-[color:var(--surface-0)] text-xs font-semibold text-[var(--accent)] shadow-[0_16px_32px_rgba(51,71,122,0.14)]">
                        FE
                      </div>
                      <div className="absolute bottom-[18%] left-[22%] flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(84,106,160,0.28)] bg-[color:var(--surface-0)] text-xs font-semibold text-[var(--accent)] shadow-[0_16px_32px_rgba(51,71,122,0.14)]">
                        PM
                      </div>
                      <div className="absolute bottom-[22%] right-[18%] flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(84,106,160,0.28)] bg-[color:var(--surface-0)] text-xs font-semibold text-[var(--accent)] shadow-[0_16px_32px_rgba(51,71,122,0.14)]">
                        BR
                      </div>
                      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[rgba(84,106,160,0.34)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--accent)_70%,#eef1ff),color-mix(in_srgb,var(--accent-strong)_68%,#19213a))] text-center text-[var(--surface-0)] shadow-[0_22px_44px_rgba(41,58,109,0.22)]">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-[rgba(252,247,241,0.72)]">Match</span>
                        <span className="mt-1 text-2xl font-semibold">94%</span>
                      </div>
                      <div className="absolute bottom-5 left-5 rounded-full border border-[var(--border)] bg-[color:var(--surface-0)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        Chemistry confidence
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-[28px] border border-[var(--border)] bg-[color:var(--bg-elevated)] p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
                          <div>
                            <p className="text-sm font-semibold text-[var(--text)]">Matching lens</p>
                            <p className="mt-1 text-sm text-[var(--text-muted)]">Signal quality, role relevance, and working rhythm are all in frame.</p>
                          </div>
                          <div className="rounded-full border border-[rgba(82,110,202,0.18)] bg-[rgba(82,110,202,0.08)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                            High-fit
                          </div>
                        </div>

                        <div className="mt-4 space-y-3">
                          {MATCH_SIGNALS.map((item) => (
                            <div key={item.label} className="grid gap-1 border-b border-[var(--border)] pb-3 last:border-b-0 last:pb-0 sm:grid-cols-[120px_1fr]">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{item.label}</p>
                              <p className="text-sm leading-6 text-[var(--text)]">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[24px] border border-[var(--border)] bg-[color:var(--bg-elevated)] p-4">
                          <p className="premium-kicker mb-2">Best for</p>
                          <p className="text-sm leading-6 text-[var(--text)]">Teams assembling a serious early nucleus around one strong idea.</p>
                        </div>
                        <div className="rounded-[24px] border border-[var(--border)] bg-[color:var(--bg-elevated)] p-4">
                          <p className="premium-kicker mb-2">Why it clicks</p>
                          <p className="text-sm leading-6 text-[var(--text)]">The introduction starts closer to alignment, so momentum arrives faster.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="signal" className="border-y border-[var(--border)] py-16">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div className="max-w-xl">
                <p className="premium-kicker mb-3">Signal stack</p>
                <h2 className="font-display text-4xl leading-tight text-[var(--text)] sm:text-5xl">
                  Nexus makes trust legible before the first conversation.
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
                  Instead of optimizing for volume, the platform is tuned for credibility. Projects arrive with shape. Collaborators arrive
                  with intention. The result feels calm, selective, and ready to move.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {PRINCIPLES.map((item) => (
                  <article key={item.title} className="premium-panel rounded-[30px] p-5">
                    <p className="premium-kicker mb-3">Core principle</p>
                    <h3 className="text-lg font-semibold leading-7 text-[var(--text)]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="chemistry" className="py-16">
            <div className="grid gap-5 lg:grid-cols-[1.06fr_0.94fr]">
              <div className="premium-panel rounded-[36px] p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="premium-kicker mb-3">Chemistry engine</p>
                    <h2 className="font-display text-4xl leading-tight text-[var(--text)]">
                      Strong projects need more than skill overlap.
                    </h2>
                  </div>
                  <div className="rounded-[1.2rem] border border-[var(--border)] bg-[color:var(--bg-elevated)] p-3 text-[var(--accent)]">
                    <Gauge size={20} />
                  </div>
                </div>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-muted)]">
                  Nexus weighs how people build, not just what they can do. That means better first meetings, fewer false positives, and a
                  much cleaner path from interest to actual collaboration.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {CHEMISTRY_POINTS.map((item) => (
                    <article key={item.title} className="rounded-[26px] border border-[var(--border)] bg-[color:var(--bg-elevated)] p-5">
                      <h3 className="text-lg font-semibold text-[var(--text)]">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="premium-soft-panel rounded-[30px] p-5 sm:p-6">
                  <p className="premium-kicker mb-3">Who shows up well here</p>
                  <div className="space-y-3">
                    {BUILDER_TYPES.map((item, index) => (
                      <div key={item} className="flex gap-4 border-b border-[var(--border)] pb-3 last:border-b-0 last:pb-0">
                        <span className="pt-0.5 text-sm font-semibold text-[var(--accent)]">0{index + 1}</span>
                        <p className="text-sm leading-7 text-[var(--text)]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="premium-soft-panel rounded-[30px] p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-[1rem] border border-[var(--border)] bg-[color:var(--bg-panel)] p-3 text-[var(--accent)]">
                      <Compass size={18} />
                    </div>
                    <div>
                      <p className="premium-kicker mb-2">Design posture</p>
                      <p className="text-sm leading-7 text-[var(--text)]">
                        Nexus is intentional, structured, and quietly futuristic. It respects creative people without lapsing into startup theater.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="flow" className="py-4">
            <div className="premium-panel overflow-hidden rounded-[38px] p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="premium-kicker mb-3">How it flows</p>
                  <h2 className="font-display text-4xl leading-tight text-[var(--text)] sm:text-5xl">
                    A sharper path from discovery to making.
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-8 text-[var(--text-muted)]">
                    The product keeps the sequence clean: frame the work, surface the right people, then start with enough clarity to
                    actually build.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {FLOW_STEPS.map((step) => (
                    <article key={step.index} className="rounded-[30px] border border-[var(--border)] bg-[color:var(--bg-elevated)] p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">{step.index}</p>
                      <h3 className="mt-4 text-xl font-semibold text-[var(--text)]">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{step.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="faq" className="pb-16 pt-16">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
              <div className="max-w-lg">
                <p className="premium-kicker mb-3">FAQ</p>
                <h2 className="font-display text-4xl leading-tight text-[var(--text)] sm:text-5xl">
                  The first questions design-conscious builders usually ask.
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
                  Nexus is meant to feel clear, credible, and low-noise from the first screen. Here is the short version.
                </p>
              </div>

              <div className="grid gap-3">
                {FAQ_ITEMS.map((item, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <article key={item.question} className="premium-panel rounded-[28px] px-5 py-4">
                      <button
                        className="flex w-full items-center justify-between gap-4 text-left"
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        aria-expanded={isOpen}
                      >
                        <span className="text-base font-semibold leading-7 text-[var(--text)]">{item.question}</span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-[var(--accent)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <div
                        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
                          isOpen ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="min-h-0">
                          <p className="text-sm leading-7 text-[var(--text-muted)]">{item.answer}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <footer className="premium-panel rounded-[34px] px-5 py-6 sm:px-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="premium-kicker mb-3">Nexus</p>
              <h2 className="font-display text-3xl text-[var(--text)] sm:text-4xl">
                Find the people who make the project feel more possible.
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                For founders, creators, and builders who want strong fit, serious momentum, and a more intelligent way to start working together.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={onSignIn} className="premium-button-secondary rounded-2xl px-5 py-3 text-sm font-semibold">
                Sign In
              </button>
              <button onClick={onGetStarted} className="premium-button rounded-2xl px-5 py-3 text-sm font-semibold">
                Request access
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
