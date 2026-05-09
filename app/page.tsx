import Link from "next/link";
import {
  IconArrowRight,
  IconBrain,
  IconFileCertificate,
  IconFileDescription,
  IconFiles,
  IconGitBranch,
  IconMicrophone,
  IconSignature,
} from "@tabler/icons-react";

import DockitButton from "@/components/dockit/DockitButton";
import Logo from "@/components/dockit/Logo";

const steps = [
  {
    title: "Input Meeting",
    description: "Record, upload, or paste client discussion.",
    icon: IconMicrophone,
  },
  {
    title: "Generate PRD",
    description: "Turn notes into structured requirements.",
    icon: IconFileDescription,
  },
  {
    title: "Review Flowchart",
    description: "Confirm user flow and architecture.",
    icon: IconGitBranch,
  },
  {
    title: "Create Documents",
    description: "Generate project legal documents.",
    icon: IconFiles,
  },
  {
    title: "Share & Sign",
    description: "Send client-ready signing link.",
    icon: IconSignature,
  },
];

const features = [
  {
    title: "Smart PRD Builder",
    description:
      "AI extracts requirements from your meeting and builds a structured PRD with scope, features, and timeline.",
    icon: IconBrain,
  },
  {
    title: "Auto Flowchart",
    description:
      "Instantly generate user flow and architecture diagrams you can share with clients.",
    icon: IconGitBranch,
  },
  {
    title: "Legal Documents",
    description:
      "Generate BAST, contracts, NDA, SOW, and invoices - pre-filled and ready to sign.",
    icon: IconFileCertificate,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-dockit-text">
      <header className="sticky top-0 z-40 border-b-[0.5px] border-dockit-border bg-white">
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-5">
          <Logo />
          <nav className="hidden items-center gap-7 text-[14px] text-dockit-muted md:flex">
            {["Features", "How it works", "Pricing", "Docs"].map((item) => (
              <Link
                key={item}
                href={item === "How it works" ? "#how-it-works" : "#features"}
                className="transition-colors duration-150 hover:text-dockit-heading"
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden text-[14px] font-medium text-dockit-muted transition-colors duration-150 hover:text-dockit-heading sm:inline"
            >
              Log in
            </Link>
            <DockitButton href="/dashboard" size="sm">
              Get started free
            </DockitButton>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-[1100px] px-5 pb-20 pt-16 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex h-8 items-center rounded-md border-[0.5px] border-dockit-blue bg-white px-3 text-[13px] font-medium text-dockit-blue">
              Built for freelance developers
            </span>
            <h1 className="mt-6 text-[40px] font-semibold leading-[1.08] text-dockit-heading sm:text-[56px]">
              From talk to contract.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[18px] leading-8 text-dockit-muted sm:text-[20px]">
              Dockit turns your client meeting into a PRD, flowchart, and signed
              contract - automatically.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <DockitButton href="/project/new/input" size="lg">
                Start for free
                <IconArrowRight className="size-4" stroke={1.8} />
              </DockitButton>
              <Link
                href="#how-it-works"
                className="inline-flex h-11 items-center gap-2 text-[15px] font-medium text-dockit-heading transition-colors duration-150 hover:text-dockit-blue"
              >
                See how it works
                <IconArrowRight className="size-4" stroke={1.8} />
              </Link>
            </div>
            <p className="mt-4 text-[13px] text-dockit-muted">
              No credit card required &middot; Free forever for solo devs
            </p>
          </div>

          <div className="mt-14 rounded-[10px] border-[0.5px] border-dockit-border-emphasis bg-white p-2">
            <div className="grid overflow-hidden rounded-[8px] border-[0.5px] border-dockit-border bg-dockit-secondary lg:grid-cols-[220px_1fr]">
              <aside className="hidden border-r-[0.5px] border-dockit-border bg-dockit-secondary p-4 lg:block">
                <Logo href="/" />
                <div className="mt-8 space-y-2">
                  {["Dashboard", "Projects", "Documents"].map((item, index) => (
                    <div
                      key={item}
                      className={
                        index === 0
                          ? "h-9 rounded-md border-l-2 border-dockit-blue bg-dockit-hover px-3 py-2 text-[13px] text-dockit-heading"
                          : "h-9 rounded-md px-3 py-2 text-[13px] text-dockit-muted"
                      }
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </aside>
              <div className="min-h-[430px] bg-white p-5 sm:p-8">
                <div className="flex items-center justify-between border-b-[0.5px] border-dockit-border pb-5">
                  <div>
                    <p className="text-[24px] font-medium text-dockit-heading">
                      E-Commerce Redesign
                    </p>
                    <p className="mt-1 text-[13px] text-dockit-muted">
                      PT Maju Jaya &middot; 3 documents ready
                    </p>
                  </div>
                  <span className="rounded-md bg-[#E8F6F3] px-2 py-1 text-[12px] font-medium text-dockit-green">
                    Approved
                  </span>
                </div>
                <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_300px]">
                  <div className="space-y-4">
                    <div className="rounded-[10px] border-[0.5px] border-dockit-border p-5">
                      <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-dockit-muted">
                        Product Requirements Document
                      </p>
                      <h3 className="mt-3 text-[18px] font-medium text-dockit-heading">
                        Project Overview
                      </h3>
                      <p className="mt-2 text-[14px] leading-6 text-dockit-muted">
                        Mobile-first redesign with product catalog, Midtrans
                        checkout, admin dashboard, and order tracking.
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {["PRD", "Flowchart", "BAST"].map((item) => (
                        <div
                          key={item}
                          className="rounded-[10px] border-[0.5px] border-dockit-border bg-dockit-secondary p-4"
                        >
                          <p className="text-[13px] font-medium text-dockit-heading">
                            {item}
                          </p>
                          <p className="mt-1 text-[12px] text-dockit-muted">
                            Ready to share
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[10px] border-[0.5px] border-dockit-border bg-white p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-[13px] font-medium text-dockit-heading">
                        Document Preview
                      </p>
                      <span className="text-[12px] text-dockit-blue">Open</span>
                    </div>
                    <div className="min-h-[260px] border border-dockit-border bg-white p-5 text-[12px] leading-5 text-dockit-muted">
                      <p className="text-center text-[14px] font-bold text-dockit-heading">
                        BERITA ACARA SERAH TERIMA
                      </p>
                      <p className="mt-6">
                        Dokumen ini menyatakan pekerjaan proyek telah selesai
                        sesuai PRD dan siap ditandatangani kedua belah pihak.
                      </p>
                      <div className="mt-16 grid grid-cols-2 gap-8 text-center">
                        <span className="border-t-[0.5px] border-dockit-heading pt-2">
                          Developer
                        </span>
                        <span className="border-t-[0.5px] border-dockit-heading pt-2">
                          Client
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-t-[0.5px] border-dockit-border bg-dockit-secondary py-20">
          <div className="mx-auto max-w-[1100px] px-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-dockit-blue">
              How it works
            </p>
            <h2 className="mt-3 text-[24px] font-medium text-dockit-heading">
              5 steps from meeting to contract
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-5">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative">
                    {index < steps.length - 1 && (
                      <span className="absolute left-10 top-5 hidden w-full border-t-[0.5px] border-dashed border-dockit-border-emphasis md:block" />
                    )}
                    <div className="relative z-10 grid size-10 place-items-center rounded-full border-[0.5px] border-dockit-border-emphasis bg-white text-dockit-blue">
                      <Icon className="size-5" stroke={1.8} />
                    </div>
                    <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.06em] text-dockit-muted">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-2 text-[15px] font-medium text-dockit-heading">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-5 text-dockit-muted">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-[1100px] px-5 py-20">
          <h2 className="max-w-2xl text-[24px] font-medium leading-8 text-dockit-heading">
            Everything you need before writing a single line of code
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="rounded-[10px] border-[0.5px] border-dockit-border bg-white p-6"
                >
                  <Icon className="size-6 text-dockit-blue" stroke={1.8} />
                  <h3 className="mt-5 text-[18px] font-medium text-dockit-heading">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-dockit-muted">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-y-[0.5px] border-dockit-border bg-dockit-secondary px-5 py-20">
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="text-[24px] font-medium leading-10 text-dockit-heading">
              &quot;I used to spend 3 days after every client meeting just preparing
              docs. Dockit does it in 10 minutes.&quot;
            </blockquote>
            <figcaption className="mt-5 text-[14px] text-dockit-muted">
              Andika Wijaya, freelance full-stack developer
            </figcaption>
          </figure>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-2 text-[13px] text-dockit-muted">
            From talk to contract.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-[13px] text-dockit-muted">
          {["Features", "Pricing", "Blog", "Privacy", "Terms"].map((item) => (
            <Link key={item} href="#" className="hover:text-dockit-heading">
              {item}
            </Link>
          ))}
        </div>
        <p className="text-[13px] text-dockit-muted">
          &copy; 2025 Dockit. Made for developers.
        </p>
      </footer>
    </div>
  );
}
