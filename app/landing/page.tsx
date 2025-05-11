"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaMicrophone, FaBolt, FaRobot, FaChartLine, FaRedo } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.action";

export default function LandingPage() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden px-4">
      {/* Hero Card with Glassmorphism */}
      <div className="relative z-10 flex flex-col items-center gap-4 mb-8 mt-16 w-full max-w-lg mx-auto text-center bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8">
        <Image src="/logo.svg" alt="EchoHire Logo" width={60} height={50} />
        <h1 className="text-5xl sm:text-6xl font-extrabold text-primary-100 drop-shadow-lg tracking-tight">
          EchoHire
        </h1>
        <p className="text-xl sm:text-2xl text-primary-100/80 max-w-2xl font-light mb-2">
          AI-Powered Mock Interviews. Real Feedback. Real Growth.
        </p>
        {/* Static Robot Illustration */}
        <div className="my-2">
          <Image src="/robot.png" alt="EchoHire Robot" width={220} height={220} className="drop-shadow-2xl mx-auto" />
        </div>
        {/* Call to Action */}
        <Button
          asChild
          className="btn-primary px-10 py-4 text-xl rounded-full shadow-xl transition-transform hover:scale-105 focus:scale-105 mx-auto"
        >
          <Link href="/sign-up">Get Started</Link>
        </Button>
        <span className="text-light-400 text-base mt-2">
          Already have an account?{' '}
          <Link href="/sign-in" className="underline text-primary-100">Sign in</Link>
        </span>
      </div>

      {/* Feature Highlights */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-16 w-full max-w-5xl mx-auto">
        {/* Top row */}
        <FeatureCard icon={<FaMicrophone size={28} />} title="AI Voice Interviews" desc="Practice with realistic AI-powered voice agents." />
        <FeatureCard icon={<FaBolt size={28} />} title="Instant Feedback" desc="Get actionable feedback right after your interview." />
        <FeatureCard icon={<FaRobot size={28} />} title="Realistic Scenarios" desc="Experience real-world interview questions and flow." />
        {/* Bottom row: center the two cards */}
        {/*<FeatureCard icon={<FaChartLine size={28} />} title="Track Progress" desc="Monitor your improvement over time." className="lg:col-start-2" />*/}
        {/*<FeatureCard icon={<FaRedo size={28} />} title="Redo Interviews" desc="Revisit and retake interviews to sharpen your skills and boost confidence." className="lg:col-start-3" />*/}
      </div>

      {/* Built With Bar */}
      <div className="flex flex-row items-center gap-6 mt-12 opacity-70 relative z-10 justify-center w-full">
        <span className="text-light-400 text-sm">Built with:</span>
        <Image src="/Next.js.svg" alt="Next.js" width={32} height={32} />
        <Image src="/Firebase.svg" alt="Firebase" width={32} height={32} />
        <Image src="/tailwind.svg" alt="Tailwind CSS" width={32} height={32} />
      </div>
    </section>
  );
}

// Add types to FeatureCard
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
}

function FeatureCard({ icon, title, desc, className = "" }: FeatureCardProps) {
  return (
    <div className={`flex flex-col items-center justify-center bg-dark-200 rounded-2xl p-6 shadow-md w-[250px] min-h-[180px] text-center transition-shadow duration-200 hover:shadow-[0_0_24px_4px_rgba(34,197,94,0.25)] ${className}`}>
      <div className="mb-2 flex items-center justify-center rounded-full border border-primary-100/40 shadow-[0_0_8px_2px_rgba(34,197,94,0.15)] bg-dark-200 p-3">
        <span className="text-primary-100">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-primary-100 mb-1">{title}</h3>
      <p className="text-light-100 text-center text-sm">{desc}</p>
    </div>
  );
}