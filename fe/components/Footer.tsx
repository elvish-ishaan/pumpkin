"use client";

import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0B0E13] text-gray-400 px-6 md:px-12 py-12 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-white text-lg font-semibold">Pumpkin</h2>
          <p className="mt-4 text-sm text-gray-500 max-w-xs">
            AI-powered image editing that’s simple, fast, and built for creators.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-medium mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-medium mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#docs" className="hover:text-white">Documentation</a></li>
            <li><a href="#blog" className="hover:text-white">Blog</a></li>
            <li><a href="#support" className="hover:text-white">Support</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-medium mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-500 mb-4">Get the latest updates and news from Pumpkin.</p>
          <form className="flex w-full max-w-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-l-md bg-[#11141B] border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <Button type="submit" className="rounded-l-none rounded-r-md bg-blue-600 hover:bg-blue-700 text-white px-4">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Pumpkin. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#privacy" className="hover:text-white">Privacy Policy</a>
          <a href="#terms" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}