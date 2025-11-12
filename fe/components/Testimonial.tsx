"use client";

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
  {
    name: "Sarah Chen",
    role: "Photographer",
    text: "The speed is unbelievable. What used to take me a full day of batch processing now takes less than an hour with Pumpkin AI. A genuine game-changer for my workflow.",
  },
  {
    name: "Ben Miller",
    role: "Small Business Owner",
    text: "As a non-designer, I needed something simple. Pumpkin AI's intuitive interface and powerful, one-click fixes made me look like a pro without any training.",
  },
  {
    name: "Omar Khalfan",
    role: "Film Editor",
    text: "The output quality is indistinguishable from high-end studio work. It handles color grading and noise reduction flawlessly, elevating every project I put through it.",
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
          <div key={i} className="relative">
            {/* Dark Dot Matrix Background */}
            <div
              className="absolute inset-0 rounded-lg z-0"
              style={{
                backgroundColor: '#0a0a0a',
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
                  radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
                `,
                backgroundSize: '10px 10px',
                imageRendering: 'pixelated',
              }}
            />
            
            {/* Card with transparent background to show dots */}
            <div className="relative z-10 border-gray-800 shadow-md rounded-lg p-5">
              <div>
                <div className="text-white text-lg">{t.name}</div>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm leading-relaxed">{t.text}</p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}