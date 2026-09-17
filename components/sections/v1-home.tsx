// The version-1 homepage, extracted so both `/` and `/v1` can render it.
import { Hero } from "@/components/sections/hero";
import { TechStack } from "@/components/sections/tech-stack";
import { IntroVideo } from "@/components/sections/intro-video";
import { Vault } from "@/components/sections/vault";
import { Philosophy } from "@/components/sections/philosophy";
import { Services } from "@/components/sections/services";
import { FeaturedBuilds } from "@/components/sections/featured-builds";
import { ClientFunnels } from "@/components/sections/client-funnels";
import { Testimonials } from "@/components/sections/testimonials";
import { WorkflowScreens } from "@/components/sections/workflow-screens";
import { AutomationFlows } from "@/components/sections/automation-flows";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

function Divider() {
  return (
    <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />
  );
}

export function V1Home() {
  return (
    <>
      <Hero />
      <Divider />
      <TechStack />
      <Divider />
      <IntroVideo />
      <Divider />
      <Vault />
      <Divider />
      <Philosophy />
      <Divider />
      <FeaturedBuilds />
      <Divider />
      <ClientFunnels />
      <Divider />
      <Testimonials />
      <Divider />
      <WorkflowScreens />
      <Divider />
      <AutomationFlows />
      <Divider />
      <Services />
      <Divider />
      <FAQ />
      <Divider />
      <FinalCTA />
    </>
  );
}
