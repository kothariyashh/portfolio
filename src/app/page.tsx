import Preloader from "@/components/effects/Preloader";
import ScrollProgress from "@/components/effects/ScrollProgress";
import CursorFX from "@/components/effects/CursorFX";
import Spotlight from "@/components/effects/Spotlight";
import Orbs from "@/components/effects/Orbs";
import AIDivider from "@/components/effects/AIDivider";
import WelcomeToast from "@/components/effects/WelcomeToast";
import ChatBot from "@/components/ChatBot";
import Tour from "@/components/Tour";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import CodingActivity from "@/components/CodingActivity";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Engineering from "@/components/Engineering";
import Projects from "@/components/Projects";
import Awards from "@/components/Awards";
import WhyMe from "@/components/WhyMe";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <CursorFX />
      <Spotlight />
      <Orbs />
      <div className="grain pointer-events-none fixed inset-0 z-[950]" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <CodingActivity />
        <AIDivider />
        <Experience />
        <AIDivider />
        <Skills />
        <AIDivider />
        <Engineering />
        <Projects />
        <AIDivider />
        <Awards />
        <WhyMe />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ChatBot />
      <Tour />
      <WelcomeToast />
    </>
  );
}
