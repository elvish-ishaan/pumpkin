"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Designer",
      text: "Pumpkin AI has completely changed the way I edit. It saves me hours of work and gives me results that feel professional every time.",
    },
    {
      name: "Maria Gomez",
      role: "Content Creator",
      text: "I love how easy it is to just type what I need and get stunning results instantly. No more complex editing tools for me!",
    },
    {
      name: "David Lee",
      role: "Marketer",
      text: "Pumpkin AI makes my campaigns stand out. The AI enhancements are so smart, I can focus on creativity instead of tedious edits.",
    },
  ];

  return (
    <section id="testimonials" className="max-w-6xl mx-auto px-6 md:px-12 mt-24 mb-20">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-white">
        What Our Users Say
      </h2>
      <p className="text-center text-gray-400 mt-4 max-w-2xl mx-auto">
        Creators, marketers, and designers around the world trust Pumpkin to transform their ideas into stunning visuals.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {testimonials.map((t, i) => (
          <Card key={i} className="bg-[#11141B] border-none shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-white text-lg">{t.name}</CardTitle>
              <p className="text-sm text-gray-500">{t.role}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm leading-relaxed">“{t.text}”</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}