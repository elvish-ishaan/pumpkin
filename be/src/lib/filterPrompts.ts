export const filters = [
  // Basic Adjustments
  { name: "brightness", label: "Brightness", prompt: "Increase the brightness of this image by 20% while keeping details intact." },
  { name: "contrast", label: "Contrast", prompt: "Enhance the contrast to make darks deeper and lights brighter for a bold look." },
  { name: "exposure", label: "Exposure", prompt: "Adjust exposure to correct underexposed areas without losing highlight details." },
  { name: "highlights", label: "Highlights", prompt: "Recover blown-out highlights and balance the tonal range naturally." },
  { name: "shadows", label: "Shadows", prompt: "Lift shadows to reveal hidden details without introducing noise." },
  { name: "saturation", label: "Saturation", prompt: "Boost saturation by 15% for vibrant colors, but keep skin tones natural." },
  { name: "vibrance", label: "Vibrance", prompt: "Increase vibrance to make muted colors pop while avoiding oversaturation." },
  { name: "warmth", label: "Warmth", prompt: "Add a warm golden-hour tint (+10 warmth) for a cozy, sunset-like feel." },

  // Color Filters
  { name: "sepia", label: "Sepia", prompt: "Apply a classic sepia tone with 80% intensity for a vintage photograph effect." },
  { name: "blackAndWhite", label: "Black & White", prompt: "Convert to high-contrast black and white with deep blacks and crisp whites." },
  { name: "vintage", label: "Vintage", prompt: "Give the image a 1970s film look with faded colors and slight grain." },
  { name: "duotone", label: "Duotone", prompt: "Apply a blue-orange duotone effect for a cinematic teal-and-orange style." },
  { name: "splitToning", label: "Split Toning", prompt: "Add cool blue shadows and warm golden highlights for a split-toned effect." },

  // Artistic Filters
  { name: "oilPainting", label: "Oil Painting", prompt: "Transform this photo into a textured oil painting with visible brushstrokes." },
  { name: "watercolor", label: "Watercolor", prompt: "Convert the image into a soft watercolor painting with subtle paper texture." },
  { name: "sketch", label: "Sketch", prompt: "Turn this into a detailed pencil sketch with cross-hatching for depth." },
  { name: "cartoon", label: "Cartoon", prompt: "Render the image in a bold, cel-shaded cartoon style with thick outlines." },
  { name: "popArt", label: "Pop Art", prompt: "Apply a Warhol-style pop art filter with high-contrast colors and halftone dots." },

  // Blurs & Sharpening
  { name: "gaussianBlur", label: "Gaussian Blur", prompt: "Apply a subtle 5px Gaussian blur to the background while keeping the subject sharp." },
  { name: "motionBlur", label: "Motion Blur", prompt: "Add a horizontal motion blur (10px) to simulate fast movement." },
  { name: "radialBlur", label: "Radial Blur", prompt: "Create a zoom blur effect radiating from the center for a dynamic look." },
  { name: "sharpen", label: "Sharpen", prompt: "Selectively sharpen edges and textures without introducing artifacts." },

  // Distortion
  { name: "pixelate", label: "Pixelate", prompt: "Pixelate the background (10px blocks) while keeping the subject crisp." },
  { name: "lensFlare", label: "Lens Flare", prompt: "Add a subtle anamorphic lens flare in the top-right corner (blue-purple tint)." },
  { name: "vignette", label: "Vignette", prompt: "Darken the edges with a smooth vignette (+30% intensity) for a vintage feel." },
  { name: "tiltShift", label: "Tilt-Shift", prompt: "Apply a miniaturized tilt-shift effect with a focused center and blurred edges." },
  { name: "fisheye", label: "Fisheye", prompt: "Warp the image into a dramatic fisheye lens effect with 120° curvature." },

  // Lighting Effects
  { name: "hdr", label: "HDR", prompt: "Merge exposures for an HDR effect with balanced highlights and shadows." },
  { name: "glow", label: "Glow", prompt: "Add a soft glow to light sources and edges for a dreamy atmosphere." },
  { name: "sunlight", label: "Sunlight", prompt: "Simulate golden-hour sunlight streaming from the top-left at 45°." },

  // Texture Overlays
  { name: "grain", label: "Grain", prompt: "Overlay fine 35mm film grain (20% opacity) for an analog feel." },
  { name: "lightLeaks", label: "Light Leaks", prompt: "Add warm, streaky light leaks along the edges for a retro camera effect." },
  { name: "paperTexture", label: "Paper Texture", prompt: "Overlay a subtle aged-paper texture with faint cracks and yellowing." },

  // Portrait Enhancers
  { name: "skinSmoothing", label: "Skin Smoothing", prompt: "Smooth skin texture while preserving pores and natural details (avoid plastic look)." },
  { name: "teethWhitening", label: "Teeth Whitening", prompt: "Brighten teeth naturally without over-whitening or losing texture." },
  { name: "eyeBrightening", label: "Eye Brightening", prompt: "Enhance iris clarity and add a subtle catchlight to the eyes." },

  // Vintage/Retro
  { name: "film70s", label: "70s Film", prompt: "Emulate Kodak Portra 400 film with muted greens and warm skin tones." },
  { name: "polaroid", label: "Polaroid", prompt: "Apply a Polaroid-style filter with washed-out colors and a white border." },
  { name: "lomo", label: "Lomo", prompt: "Give the image a Lomography look: high contrast, vignette, and saturated colors." },

  // Modern/Trendy
  { name: "matte", label: "Matte", prompt: "Desaturate slightly and add a matte finish with crushed blacks." },
  { name: "cyberpunk", label: "Cyberpunk", prompt: "Neon cyberpunk style: electric blues/pinks, high contrast, and glitch artifacts." },
  { name: "pastel", label: "Pastel", prompt: "Soft pastel tones with low contrast and a dreamy, muted palette." },

  // Special Effects
  { name: "doubleExposure", label: "Double Exposure", prompt: "Blend this portrait with a cityscape for a surreal double-exposure effect." },
  { name: "glitch", label: "Glitch", prompt: "Add RGB split glitch effects with horizontal scan lines (subtle distortion)." },
  { name: "bokeh", label: "Bokeh", prompt: "Create a creamy bokeh background with circular light spots (f/1.8 depth)." },

  // AI-Powered
  { name: "styleTransfer", label: "Style Transfer", prompt: "Redraw this photo in the style of Van Gogh's *Starry Night* with visible brushwork." },
  { name: "autoEnhance", label: "Auto Enhance", prompt: "AI-enhance this image: fix exposure, sharpen details, and remove noise." },
  { name: "backgroundRemoval", label: "Background Removal", prompt: "Isolate the subject and replace the background with a solid gradient (dark blue to purple)." }
];

