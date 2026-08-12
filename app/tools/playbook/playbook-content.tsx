// Server component on purpose. Everything below is rendered only after the
// passcode check in page.tsx, so none of this text reaches a locked visitor
// or ends up in a client bundle. The interactive leaves receive their content
// as props for the same reason.
import Link from "next/link";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CallChecklist } from "./call-checklist";
import { CopyBlock } from "./copy-block";
import { lock } from "./actions";

const CALL_ITEMS = [
  "Ask them to walk the whole process, front to back",
  "Note every place they sigh, hesitate, or call something annoying",
  "Find the FIRST real bottleneck, not the loudest complaint",
  "Name the one number this would move",
  "Get today's baseline for that number",
  "Agree what the number should be in 60 days",
  "Confirm who owns the data and the tools I would touch",
  "Ask what they have already tried, and why it stopped",
  "Book the next call before hanging up",
];

const TIERS = [
  {
    name: "Session",
    price: "$150 to $250 / hour",
    forWho: "Someone curious but not ready to commit",
    detail:
      "One call. I either teach the team to use AI on their real work, or set up their first workflow with them. Low risk for them, and I learn their business while I am in there.",
  },
  {
    name: "Audit",
    price: "$500 to $2,000 flat",
    forWho: "Someone who knows they have a problem but not where it is",
    detail:
      "Paid scoping. I map how work actually moves through the business, mark what is worth automating, and hand back findings plus a proposal for the first build.",
  },
  {
    name: "Build",
    price: "$2,500 to $8,000 / project",
    forWho: "Someone with one clear, agreed problem",
    detail:
      "One scoped automation, shipped end to end. Priced against what the manual version costs them every week, not against my hours.",
  },
  {
    name: "Retainer",
    price: "$3,000 to $8,000 / month",
    forWho: "Someone whose systems I already run",
    detail:
      "Ongoing monitoring, maintenance, and new builds as they come up. This is where the income gets predictable, and it only makes sense after a build has proven itself.",
  },
];

const QUOTE_BLANKS = [
  "This work is meant to bring in more customers / make each customer worth more / cut cost. Pick exactly one.",
  "The number it moves is ______.",
  "That number today is ______.",
  "In 60 days I expect it to be ______.",
];

const OUTREACH_PROMPT = `Act as a B2B outreach copywriter. Write a casual, friendly first-touch message for [X warm contact].

I'm a one-person AI consultant. I recently built [specific thing] because I noticed it could solve a problem businesses like theirs often have.

My goal isn't to pitch or sell anything. I simply want to get on a quick 20-minute call, learn more about their business, understand how they currently handle [specific process], and show them what I built.

Keep it under 100 words. No corporate language, buzzwords, "synergy," "leverage," or generic sales phrases.

Make it sound like a real person who actually built something and genuinely wants feedback, not a salesperson trying to book a demo.

Prioritize curiosity and relevance over selling. If appropriate, end with a low-pressure question about whether they'd be open to a quick chat.`;

const SCOPING_PROMPT = `Act as a B2B outreach copywriter and product strategist.

I'm targeting [specific niche], and they commonly struggle with [specific problem].

First, help me scope the smallest valuable product I could realistically build and ship in two weeks as a solo founder.

Give me:

1. The single core feature that solves 80% of the pain.
2. The features I should explicitly NOT build in V1, even if they seem useful.
3. The simplest tech stack you'd recommend for a non-technical founder using AI coding tools such as Claude Code.
4. The fastest path to a working MVP, including the key workflow from user input to processing to result.
5. What I should manually handle instead of automating in V1.
6. The clearest way to validate demand before spending significant time building.

Keep the recommendation practical and ruthless about scope. Optimize for speed to first users and actual value, not technical complexity or feature count.`;

const PRICING_PROMPT = `Act as a B2B pricing strategist for a one-person AI automation consultancy.

I'm a solo AI consultant offering [X service] to [X type of customer]. They currently solve this problem by doing [X manual alternative].

Help me create three pricing tiers using psychological anchoring and clear value-based positioning.

The tiers should map to:

1. Education + Setup - teach the client how it works and set up the initial system.
2. Project Audit - audit and improve one existing project, workflow, or system.
3. Monthly Retainer - ongoing optimization, automation, maintenance, and support.

For each tier, give me:

- Package name
- Ideal customer
- Exact deliverables
- What is explicitly NOT included
- Recommended price or price range
- Estimated delivery/effort
- The main outcome the client gets
- The single most important value point to communicate
- Why the pricing makes sense compared with the other tiers

Use psychological anchoring without making the pricing feel manipulative.

Make the tiers clearly differentiated so the middle and higher tiers feel meaningfully more valuable, not simply "more features."

Optimize the offer for a solo consultant: high perceived value, low operational complexity, repeatable delivery, and healthy margins.

Challenge my assumptions if a different packaging or pricing structure would make more sense.`;

function Section({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <ScrollReveal>
      <section className="mb-14">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow">
          {kicker}
        </p>
        <h2 className="mb-4 text-xl font-bold leading-tight text-white sm:text-2xl">
          {title}
        </h2>
        <div className="space-y-4 text-[14.5px] leading-relaxed text-white/65">
          {children}
        </div>
      </section>
    </ScrollReveal>
  );
}

export function PlaybookContent() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-[820px] px-4 py-12 sm:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1 text-sm text-white/40 transition-colors hover:text-white/70"
          >
            &larr; Back to Tools
          </Link>

          <form action={lock}>
            <button
              type="submit"
              className="rounded-md border border-white/[0.10] px-3 py-1.5 text-[11px] font-semibold text-white/45 transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              Lock
            </button>
          </form>
        </div>

        <header className="mb-12">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
            Private working notes
          </p>
          <h1 className="mb-4 text-3xl font-black leading-tight text-white sm:text-4xl">
            From first message to <span className="text-yellow">retainer</span>
          </h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-white/60">
            How I open a conversation, what I ask on the first call, how I decide
            whether something is a real project, and what I charge. Written for me
            to read ten minutes before a call.
          </p>
        </header>

        <Section kicker="Step 01" title="Ways in">
          <p>
            The order matters. People who already know my name convert far better
            than strangers, so I work outward from there instead of pretending
            cold outreach is the starting point.
          </p>
          <p>
            <span className="font-semibold text-white">People I know.</span> Anyone
            I have worked with, studied with, or met properly. The message is not
            hire me. It is I built a thing, can I show you and hear what you think.
          </p>
          <p>
            <span className="font-semibold text-white">
              People already shopping.
            </span>{" "}
            Job boards and marketplaces where someone has posted that they want
            this work done. The intent is already there, so I am not spending the
            call convincing them the problem exists.
          </p>
          <p>
            <span className="font-semibold text-white">People who find me.</span>{" "}
            Posting what I build, publicly and regularly. Slowest to start, but the
            only one that compounds, and it doubles as proof when someone searches
            my name after a call.
          </p>
          <p className="rounded-lg border border-persian/25 bg-persian/[0.07] p-4 text-white/70">
            I do not open with a retainer. A small first engagement is an easier
            yes, and it is really discovery I am getting paid for, because I see
            where the work breaks while I am inside the business.
          </p>
        </Section>

        <Section kicker="Step 02" title="The first message">
          <p>
            Short, specific, and about them. I mention the thing I built, say
            plainly that I am not selling, and ask for twenty minutes to hear how
            they currently handle one particular process. No pitch deck, no
            capability list.
          </p>
          <p>
            I aim to collect rejections early rather than chase a fast yes. Ten
            honest refusals teach me more about my offer than one polite maybe, and
            it stops each reply from landing personally.
          </p>
          <CopyBlock label="Prompt: first-touch message" text={OUTREACH_PROMPT} />
        </Section>

        <Section kicker="Step 03" title="The discovery call">
          <p>
            My job is to find the constraint, not the annoyance. The loudest
            complaint is rarely the expensive one, so I make them walk me through
            the whole process in order and listen for where it actually sticks.
          </p>
          <p>
            I tick these off live while we talk. If I cannot answer the number
            questions by the end, I have not earned the right to quote yet.
          </p>
          <CallChecklist items={CALL_ITEMS} />
        </Section>

        <Section kicker="Step 04" title="Before I quote">
          <p>
            I have to finish all four of these sentences before I build anything.
            If one is still blank, it is not a project yet, it is a conversation.
          </p>
          <ol className="space-y-3 pl-1">
            {QUOTE_BLANKS.map((line, i) => (
              <li key={line} className="flex gap-3">
                <span className="shrink-0 text-[11px] font-bold text-yellow">
                  0{i + 1}
                </span>
                <span className="text-white/70">{line}</span>
              </li>
            ))}
          </ol>
          <p>
            The last one is a prediction, and being roughly wrong is fine. Having
            no prediction at all is what turns a build into something nobody can
            tell was worth paying for.
          </p>
          <CopyBlock
            label="Prompt: scope the smallest useful build"
            text={SCOPING_PROMPT}
          />
        </Section>

        <Section kicker="Step 05" title="What I charge">
          <div className="rounded-lg border border-yellow/30 bg-yellow/[0.08] p-4 text-[13px] text-yellow">
            Draft figures. A starting point, not my rates. Replace these with real
            numbers before quoting anyone.
          </div>

          <div className="space-y-3 pt-1">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5"
              >
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-white">{t.name}</h3>
                  <span className="text-[13px] font-bold text-yellow">
                    {t.price}
                  </span>
                </div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                  {t.forWho}
                </p>
                <p className="text-[13.5px] leading-relaxed text-white/60">
                  {t.detail}
                </p>
              </div>
            ))}
          </div>

          <p>
            Whatever number I say, I assume the next question is how I got to it.
            For a build I anchor against what the manual version costs them every
            week, so the maths does the arguing for me.
          </p>
          <CopyBlock label="Prompt: build my pricing tiers" text={PRICING_PROMPT} />
        </Section>

        <Section kicker="Step 06" title="Turning one job into the next">
          <p>
            The moment a build is live I write down the before and after number and
            ask for a short testimonial while they are still pleased. One sentence
            with real figures in it is worth more than anything I could say about
            myself.
          </p>
          <p>
            Then I look at who that client actually was, their industry, their
            size, their stage, and go find more that look exactly like them. The
            second build of the same shape ships faster because I already know
            where it breaks, and by the third I am speaking their language before
            they explain it.
          </p>
          <p className="rounded-lg border border-persian/25 bg-persian/[0.07] p-4 text-white/70">
            This is how the niche picks itself. I do not have to guess it up front,
            I just have to notice the same problem showing up three times.
          </p>
        </Section>

        <p className="border-t border-white/[0.06] pt-8 text-[13px] leading-relaxed text-white/35">
          My own notes, kept private because they include pricing. Everything here
          is meant to be edited as I learn what actually works.
        </p>
      </div>
    </PageTransition>
  );
}
