import React from "react";
import { ParticleNetwork } from "@/components/animations/ParticleNetwork";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEMO_CATALOG } from "@/data/demos";

export default function DemosGallery() {
  return (
    <main className="relative min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <ParticleNetwork />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-4">
            Innovation Showcase
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our portfolio of high-performance web and mobile solutions tailored for the modern digital era.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_CATALOG.map((demo) => (
            <Link
              key={demo.slug}
              href={demo.href}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${demo.gradient} mb-4 text-white shadow-lg`}>
                <demo.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {demo.title}
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                {demo.description}
              </p>
              <div className="flex items-center text-white/60 text-sm font-medium group-hover:text-white transition-colors">
                View Demo <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
