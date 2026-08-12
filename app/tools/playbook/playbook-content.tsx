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

const OUTREACH_VARIATIONS = [
  {
    label: "Variation 3 · very casual",
    pick: true,
    text: `Hey [Name], quick one — I've been working on a small AI automation around [specific problem] and thought of businesses like yours while building it.

I'm not looking to sell you anything. I'm actually trying to see whether I'm solving the right problem.

Would you be up for a quick 20-minute conversation? I'd love to hear how you currently handle [specific process] and show you what I built. Would be great to get your honest feedback.`,
  },
  {
    label: "Variation 5 · can I get your take",
    pick: true,
    text: `Hey [Name], I built something recently around [specific problem] and was hoping to get your take on it.

I work solo in AI and automation, and I'm looking at how [specific niche] businesses currently handle [specific process]. I'm not trying to sell you anything or push a service.

I'd mainly like to understand your current process, see where the actual bottlenecks are, and show you what I built.

Would you be open to a quick 20-minute chat?`,
  },
  {
    label: "Variation 1 · curiosity / feedback",
    pick: false,
    text: `Hey [Name], AJ here. I'm a solo AI/automation consultant and recently built a simple system around [specific problem] after noticing how often businesses end up handling it manually.

I'm not reaching out to sell you anything. I'm actually trying to learn how businesses like yours currently handle [specific process] and see if what I built makes sense in the real world.

Would you be open to a quick 20-minute chat? I'd love to hear how you currently do it and get your honest take on what I built.`,
  },
  {
    label: "Variation 2 · I built this",
    pick: false,
    text: `Hey [Name], I recently built something for [specific problem] that I think might be relevant to how you run [specific area of their business].

I'm a one-person AI/automation consultant, and honestly, I'm not trying to pitch anything here. I built it because I kept seeing the same process being handled manually.

I'd love to understand how you currently handle [specific process] and show you what I came up with.

Would you be open to a quick 20-minute chat sometime?`,
  },
  {
    label: "Variation 4 · research / learning",
    pick: false,
    text: `Hey [Name], I'm currently researching how [specific niche] businesses handle [specific process].

I'm a solo AI consultant, and I recently built a small tool around [specific problem] based on some patterns I've been seeing.

Rather than guessing whether it's actually useful, I'd rather talk to someone who deals with this in the real world.

Would you be open to a quick 20-minute chat? I'd love to learn how you handle it today and show you what I built.`,
  },
];

const CALL_TIMELINE = [
  { time: "0 to 2", what: "Set the frame. I am here to understand how you handle this, then I will show you what I built." },
  { time: "2 to 10", what: "Their process, questions 1 to 6" },
  { time: "10 to 14", what: "Pain and what it costs, questions 7 to 10" },
  { time: "14 to 18", what: "Show only the part that matches what they just described, question 11" },
  { time: "18 to 20", what: "Feedback and next step, questions 12 to 15" },
];

const CALL_QUESTIONS = [
  { q: "So to start, can you walk me through your business process from the moment a new lead comes in?", why: "Then stop talking and let them explain." },
  { q: "Where do those leads usually come from?", why: "Facebook, website, Google, phone, Instagram, referrals, ads, forms." },
  { q: "Once a new lead comes in, what happens next?", why: "This is where the real workflow gets mapped." },
  { q: "Who normally handles that part of the process?", why: "Owner, salesperson, VA, receptionist, marketing, or already automated." },
  { q: "Which parts of that process are still done manually?", why: "One of the most important questions on the call." },
  { q: "Where does the process usually slow down or get messy?", why: "Do not suggest the answer. Let them name the bottleneck." },
  { q: "Are there situations where a lead does not get followed up with, gets forgotten, or falls through the cracks?", why: "This is where the financial impact starts showing." },
  { q: "What have you tried so far to solve that?", why: "Tells me what they bought, what failed, and what they will pay for." },
  { q: "When that happens, what does it usually mean for the business?", why: "Let them quantify it. Their number beats my pitch." },
  { q: "If you could change one part of that process and make it work exactly how you wanted, what would you change?", why: "The best product-discovery question on the list." },
  { q: "That is close to the problem I was trying to solve when I built this.", why: "Only now show it, and only the part connected to what they said." },
  { q: "Looking at this, what part would actually be useful, and what part would not?", why: "Much better than asking whether they like it." },
  { q: "What is missing from this that you would need before you would actually use it?", why: "Gold for deciding what to build next." },
  { q: "If this handled [their problem], how would you want it to fit into your current process?", why: "Designing around their workflow instead of my assumptions." },
  { q: "This was really helpful. Would it be okay if I followed up once I have improved it based on what I learned?", why: "Keeps the door open without turning discovery into a hard close." },
];

// Short forms of the same fifteen questions, for ticking during the call.
const CALL_ITEMS = [
  "Walk me through your process from the start",
  "Where do leads come from?",
  "What happens once a lead comes in?",
  "Who handles that part?",
  "Which parts are still manual?",
  "Where does it slow down or get messy?",
  "Do leads ever get forgotten or missed?",
  "What have you already tried?",
  "What does it cost when that happens?",
  "If you could change one thing, what?",
  "Show only the matching part of my build",
  "What here is useful, what is not?",
  "What is missing before you would use it?",
  "How would it fit your current process?",
  "Ask to follow up once improved",
];

const TIERS = [
  {
    name: "Build & Learn",
    kind: "Education + setup",
    price: "$500 to $900 one-time",
    effort: "1 to 3 days",
    forWho: "An owner who wants to understand the system and eventually run it themselves",
    includes: [
      "Lead follow-up strategy",
      "GHL workflow setup",
      "One lead capture source",
      "Automated SMS and email follow-up",
      "Basic AI response logic",
      "Booking integration",
      "60 to 90 minute training session",
      "Documentation",
    ],
    excludes: ["Ongoing optimization", "Multiple campaigns", "Complex integrations", "Monthly support", "Custom development"],
    outcome: "They leave with a working lead follow-up system they understand.",
    valuePoint: "You own the system and know how it works.",
  },
  {
    name: "Audit & Optimization",
    kind: "Project",
    price: "$1,000 to $2,000",
    effort: "3 to 7 days",
    forWho: "A business already running GHL, automations or funnels that knows something is not working",
    includes: [
      "Full workflow audit",
      "Lead journey mapping",
      "Trigger and condition review",
      "Pipeline review",
      "Follow-up sequence optimization",
      "AI prompt optimization",
      "Missed-lead analysis",
      "Automation fixes and testing",
      "Loom walkthrough",
      "Recommendations",
    ],
    excludes: ["Unlimited development", "Ongoing support", "Full CRM rebuild", "New SaaS development", "Unlimited workflows"],
    outcome: "Their existing system gets cleaner, more reliable, and more effective.",
    valuePoint:
      "Instead of rebuilding everything, I find where your current system is leaking leads and fix the highest-impact problems.",
  },
  {
    name: "Automation Partner",
    kind: "Monthly retainer",
    price: "$1,500 to $3,000 / month",
    effort: "About 5 to 10 hours a month",
    forWho: "A business that values automation but does not want to hire a full-time specialist",
    includes: [
      "Monthly automation optimization",
      "Workflow maintenance",
      "GHL management",
      "AI prompt improvements",
      "New automation builds",
      "Troubleshooting",
      "Funnel and CRM optimization",
      "Integration support",
      "Monthly performance review",
      "Priority support",
    ],
    excludes: ["Unlimited development", "Full-time availability", "Major SaaS development", "Unrelated technical work"],
    outcome: "They get an external automation specialist without hiring one.",
    valuePoint:
      "You do not have to figure out every automation problem yourself. Someone is continuously improving the system.",
  },
];

const ANCHOR_ROWS = [
  { offer: "Build & Learn", price: "$750", buying: "Knowledge", line: "Teach me and set it up." },
  { offer: "Audit & Optimize", price: "$1,500", buying: "Expertise", line: "Find what is wrong and fix it." },
  { offer: "Automation Partner", price: "$2,000 / mo", buying: "Continuity", line: "You handle this for me going forward." },
];

const QUOTE_BLANKS = [
  "This work is meant to bring in more customers / make each customer worth more / cut cost. Pick exactly one.",
  "The number it moves is ______.",
  "That number today is ______.",
  "In 60 days I expect it to be ______.",
];

const DENTAL_DONT_BUILD = [
  "Full CRM",
  "Custom dashboard",
  "Mobile app",
  "Complex analytics",
  "AI voice agent",
  "Multi-location management",
  "Custom billing",
  "Twenty integrations",
  "An agent with fifteen tools",
  "Admin portal",
  "White-label SaaS",
];

const DENTAL_MANUAL = [
  "Client onboarding",
  "Workflow configuration",
  "Prompt adjustments",
  "AI response review",
  "Edge cases",
  "Reporting",
  "Support",
  "Custom integrations",
  "Initial campaign setup",
];

const DENTAL_FLOW = `Lead submits form
      |
GHL creates / updates contact
      |
Workflow triggers
      |
AI determines inquiry type
      |
Personalized response  ->  SMS / Email
      |
    Wait
      |
Did they book?
   /        \\
 YES         NO
  |           |
Stop      Follow up
              |
          Still no?
              |
        Final follow-up

First version can literally be:
GHL -> n8n -> Claude -> GHL`;

const VALIDATION_STEPS = [
  "Find 20 clinics.",
  "Talk to 5 to 10 owners or managers.",
  "Ask how they currently follow up with people who inquire but do not book.",
  "Ask how often they think those leads get missed.",
  "Ask whether an automatic follow-up system would actually be useful.",
  "If yes, do not ask them to wait for a product. Offer to install the first version now.",
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

const ROLEPLAY_PROMPT = `Act as a realistic business owner/employer who needs help improving manual business processes.

I am an AI automation consultant. I will act as the consultant, and you will act as the business owner.

Your job is to simulate a realistic discovery call with me.

## Your Role

Choose a realistic business for yourself.

Examples: dental clinic, med spa, real estate agency, marketing agency, roofing company, HVAC company, law firm, accounting firm, gym, home service business, e-commerce business, coaching business, local service business.

Do NOT tell me the business type, problems, or bottlenecks upfront.

Instead, behave like a real business owner who has agreed to speak with an AI consultant because you know that some parts of your business are too manual, inefficient, or difficult to manage.

You should have:

* Several manual processes
* At least 2-3 genuine operational problems
* Some problems that are important but not immediately obvious
* Existing tools/software that you currently use
* Processes involving employees or contractors
* Some inefficiencies that could potentially be automated
* At least one problem that is NOT worth automating
* A realistic budget and buying hesitation
* A reason why you haven't already solved the problem

## Important Rule

Do NOT make the problems obvious.

Do not say things like "We need an AI chatbot," "We need lead follow-up automation," or "Our biggest problem is missed leads."

Instead, describe what actually happens in the business. For example: "Whenever someone fills out our form, Sarah gets a notification and usually responds when she has time."

Let me discover the underlying problem by asking questions.

## How You Should Answer

Answer as the business owner, not as an AI consultant. Keep your answers conversational and realistic. Don't give me a perfect answer every time.

Sometimes:

* Give incomplete information.
* Say "I'm not sure."
* Give approximate numbers.
* Mention something unrelated that happens in the business.
* Explain how your team currently handles something.
* Reveal a problem only when I ask the right question.
* Push back when an automation doesn't make sense.
* Tell me that something is already automated.
* Mention that you've tried a tool before and it didn't work.
* Have reasonable concerns about cost, complexity, or changing your team's workflow.

If I ask a vague question, answer naturally rather than helping me formulate a better question.

## Discovery Call Behavior

I want to practice discovering the business process myself.

Do not guide me toward the answer. Do not ask me discovery questions.

I am the consultant. You are the client. Wait for my questions and respond as the business owner.

Start the conversation by saying something like:

"Hey AJ, thanks for taking the time. I saw that you help businesses with AI and automation. We definitely have some things that are still pretty manual, so I'm interested to hear what you think."

Then stop and wait for me.

## Realism

Treat this like a real 20-minute discovery call.

I should have to uncover:

1. What the business does
2. How customers/leads come in
3. What happens after a lead comes in
4. Who handles each step
5. What software is being used
6. Which processes are manual
7. Where bottlenecks happen
8. Where mistakes happen
9. What gets forgotten
10. What costs the business time or money
11. What they have already tried
12. Why previous solutions didn't work
13. What the ideal process would look like
14. Whether automation is actually appropriate
15. What solution I could realistically propose

## Numbers

Don't automatically give me exact numbers. If I ask about volume, revenue, time, leads, conversion rates or costs, give me realistic approximate numbers. If I ask the right follow-up question, gradually reveal more.

For example, "How many leads do you normally get?" might get "Probably around 100-150 a month." Then "How quickly does someone respond to those leads?" might get "It depends. During business hours pretty quickly, but if someone submits something at night, it might not get touched until the next morning."

This should allow me to identify the opportunity myself.

## Don't Make Every Problem Automatable

Some problems should genuinely require hiring someone, better training, a process change, better documentation, different software, better management, or no change at all.

If I propose automation for something that doesn't make sense, challenge me. For example: "I don't think we'd want AI handling that part because our clients usually need a human."

This is important because I want to learn when NOT to automate.

## After the Roleplay

Do NOT interrupt the roleplay to give me feedback. Stay in character until I explicitly say "END ROLEPLAY".

Only then switch roles. After I say "END ROLEPLAY", act as an expert discovery-call coach and evaluate me. Give me:

### 1. Discovery Score
Score me from 1-10.

### 2. What I Did Well
Identify the strongest questions and behaviors.

### 3. What I Missed
Tell me which important information I failed to uncover.

### 4. Questions I Should Have Asked
Give me the exact questions I should have asked.

### 5. Sales Mistakes
Point out if I pitched too early, talked too much, jumped to a solution, assumed the problem, failed to quantify the impact, failed to understand the current process, asked leading questions, or tried to sell before establishing the problem.

### 6. Automation Opportunity
Based only on what I discovered during the call, identify the biggest bottleneck, the highest-value automation opportunity, what should remain manual, the simplest V1 solution, and what I should NOT build.

### 7. Commercial Opportunity
Estimate potential business impact, how urgent the problem appears, whether the client is likely to pay, what type of offer I should propose, and whether this should be a one-time project or a recurring retainer.

### 8. Better Discovery Path
Show me how an expert consultant could have navigated the conversation differently. Give me the ideal sequence of questions, but don't rewrite the entire conversation.

## Important

Do not make this roleplay easy. I want a realistic client who doesn't know exactly what they need.

My job is to discover the problem. Your job is to behave like the client.

Start the roleplay now.`;

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

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
        {title}
      </p>
      {children}
    </div>
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
            How I open a conversation, exactly what I ask on the first call, how I
            decide whether something is a real project, and what I charge. Written
            for me to read ten minutes before a call.
          </p>
        </header>

        <Section kicker="Step 01" title="Ways in">
          <p>
            The order matters. People who already know my name convert far better
            than strangers, so I work outward from there instead of pretending cold
            outreach is the starting point.
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
            Five versions of the same message. The two marked with a star are the
            ones that read least like a disguised sales pitch, so those are my
            defaults.
          </p>
          <div className="space-y-3">
            {OUTREACH_VARIATIONS.map((v) => (
              <CopyBlock
                key={v.label}
                label={v.pick ? `${v.label}  ★ my pick` : v.label}
                text={v.text}
              />
            ))}
          </div>
          <p>
            I aim to collect rejections early rather than chase a fast yes. Ten
            honest refusals teach me more about my offer than one polite maybe.
          </p>
          <CopyBlock label="Prompt: generate more variations" text={OUTREACH_PROMPT} />
        </Section>

        <Section kicker="Step 03" title="The discovery call">
          <p>
            The mistake is opening with what problems are you having. Instead I let
            them walk me through the process and the problems surface on their own.
            My job is to find the constraint, not the loudest complaint.
          </p>

          <Panel title="How the 20 minutes runs">
            <ul className="space-y-2">
              {CALL_TIMELINE.map((t) => (
                <li key={t.time} className="flex gap-3 text-[13.5px]">
                  <span className="w-16 shrink-0 font-bold text-yellow">{t.time}</span>
                  <span className="text-white/65">{t.what}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="The questions, in order">
            <ol className="space-y-4">
              {CALL_QUESTIONS.map((item, i) => (
                <li key={item.q} className="flex gap-3">
                  <span className="w-6 shrink-0 pt-0.5 text-[11px] font-bold text-yellow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[14px] leading-relaxed text-white/80">
                      {item.q}
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-relaxed text-white/40">
                      {item.why}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </Panel>

          <p>
            Same fifteen, shortened, so I can tick them off without breaking eye
            contact. If I cannot answer the number questions by the end, I have not
            earned the right to quote yet.
          </p>
          <CallChecklist items={CALL_ITEMS} />

          <p className="rounded-lg border border-persian/25 bg-persian/[0.07] p-4 text-white/70">
            Do not sell before understanding the workflow. Find how they work, where
            it breaks, what they have tried, what it costs, and what they wish
            existed. Then the build is a response to their words rather than a
            generic demo.
          </p>

          <p>
            <span className="font-semibold text-white">Practice on a fake client
            first.</span>{" "}
            Paste this into Claude and it plays a business owner who will not hand
            me the problem. It stays in character until I type END ROLEPLAY, then
            scores the call and tells me which questions I should have asked.
          </p>
          <CopyBlock
            label="Prompt: roleplay a discovery call, then score me"
            text={ROLEPLAY_PROMPT}
          />
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
            Recommended numbers I have not charged yet. Adjust once a few jobs are
            behind me.
          </div>

          <p>
            Not basic, pro and premium. Each tier is a different thing to buy, not
            the one below it with more features.
          </p>

          <div className="space-y-3 pt-1">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5"
              >
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-white">{t.name}</h3>
                  <span className="text-[13px] font-bold text-yellow">{t.price}</span>
                </div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                  {t.kind} &middot; {t.effort}
                </p>
                <p className="mb-4 text-[13.5px] leading-relaxed text-white/60">
                  {t.forWho}
                </p>

                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                      Included
                    </p>
                    <ul className="space-y-1">
                      {t.includes.map((d) => (
                        <li key={d} className="flex gap-2 text-[12.5px] text-white/60">
                          <span className="text-yellow">+</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                      Not included
                    </p>
                    <ul className="space-y-1">
                      {t.excludes.map((d) => (
                        <li key={d} className="flex gap-2 text-[12.5px] text-white/40">
                          <span>&minus;</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mb-2 text-[13px] text-white/55">{t.outcome}</p>
                <p className="border-l-2 border-yellow/50 pl-3 text-[13px] italic text-white/75">
                  {t.valuePoint}
                </p>
              </div>
            ))}
          </div>

          <Panel title="How I anchor it in conversation">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-white/35">
                    <th className="pb-2 pr-4 font-semibold">Offer</th>
                    <th className="pb-2 pr-4 font-semibold">Price</th>
                    <th className="pb-2 pr-4 font-semibold">Buying</th>
                    <th className="pb-2 font-semibold">In their words</th>
                  </tr>
                </thead>
                <tbody>
                  {ANCHOR_ROWS.map((r) => (
                    <tr key={r.offer} className="border-t border-white/[0.06]">
                      <td className="py-2.5 pr-4 font-semibold text-white">{r.offer}</td>
                      <td className="py-2.5 pr-4 font-bold text-yellow">{r.price}</td>
                      <td className="py-2.5 pr-4 text-white/70">{r.buying}</td>
                      <td className="py-2.5 text-white/50">{r.line}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <p>
            Whatever number I say, I assume the next question is how I got to it.
            For a build I anchor against what the manual version costs them every
            week, so the maths does the arguing for me.
          </p>
          <CopyBlock label="Prompt: rebuild these tiers for a new niche" text={PRICING_PROMPT} />
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
            where it breaks.
          </p>
          <Panel title="The order I want to grow in">
            <p className="text-[13.5px] leading-relaxed text-white/65">
              Find a painful manual process, build a tiny automation around it, put
              it in front of three to five businesses, charge for the
              implementation, watch what they keep asking for, turn the repeated
              workflow into a product, and only then build the software layer.
            </p>
            <p className="mt-3 text-[12.5px] font-semibold text-yellow">
              Consulting &rarr; productized service &rarr; automation product &rarr; SaaS
            </p>
          </Panel>
        </Section>

        <Section kicker="Worked example" title="Dental clinics, two-week MVP">
          <p>
            One niche taken all the way through, so the steps above have something
            concrete attached. Inquiries arrive from Facebook, the website, phone
            and Instagram, and staff answer and chase every one by hand.
          </p>

          <Panel title="The one feature">
            <p className="text-[14px] text-white/75">
              Automated lead-to-appointment follow-up. A lead arrives, the system
              works out what they want, replies, chases if they do not book, and
              stops the moment they do.
            </p>
            <p className="mt-2 text-[13px] text-white/45">
              That alone covers most of the pain. Nothing else ships in V1.
            </p>
          </Panel>

          <Panel title="Explicitly not in V1">
            <ul className="flex flex-wrap gap-1.5">
              {DENTAL_DONT_BUILD.map((d) => (
                <li
                  key={d}
                  className="rounded-md border border-white/[0.08] px-2 py-1 text-[12px] text-white/40 line-through"
                >
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[13px] text-white/50">
              None of it is needed to prove someone will pay.
            </p>
          </Panel>

          <Panel title="Stack, kept lean">
            <p className="text-[13.5px] leading-relaxed text-white/65">
              Next.js and Tailwind, Supabase for database and auth, GHL and n8n for
              the automation, Claude API, Vercel, Stripe, GitHub.
            </p>
            <p className="mt-3 rounded-lg border border-persian/25 bg-persian/[0.07] p-3 text-[13px] text-white/70">
              Do not build the frontend first. Use GHL as the operational interface
              and build the automation. The product UI only earns its place once
              customers prove they need it.
            </p>
          </Panel>

          <Panel title="The flow">
            <pre className="overflow-x-auto text-[12px] leading-relaxed text-white/60">
              {DENTAL_FLOW}
            </pre>
          </Panel>

          <Panel title="What I do by hand at first">
            <ul className="flex flex-wrap gap-1.5">
              {DENTAL_MANUAL.map((d) => (
                <li
                  key={d}
                  className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[12px] text-white/55"
                >
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[13px] text-white/50">
              This is the advantage, not the shortcut. Doing it manually is how I
              learn what is worth turning into software.
            </p>
          </Panel>

          <Panel title="Validate before building">
            <ol className="space-y-2">
              {VALIDATION_STEPS.map((s, i) => (
                <li key={s} className="flex gap-3 text-[13.5px]">
                  <span className="shrink-0 font-bold text-yellow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/65">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3 border-l-2 border-yellow/50 pl-3 text-[13px] italic text-white/75">
              The question is not can I get people interested. It is will someone
              let me install this and pay me to keep it running.
            </p>
          </Panel>
        </Section>

        <p className="border-t border-white/[0.06] pt-8 text-[13px] leading-relaxed text-white/35">
          My own notes, kept private because they include pricing. Everything here
          is meant to be edited as I learn what actually works.
        </p>
      </div>
    </PageTransition>
  );
}
