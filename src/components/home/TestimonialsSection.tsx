"use client";

import { motion } from "framer-motion";
import { Quote, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTestimonials } from "@/hooks/useTestimonials";

export function TestimonialsSection() {
  const { testimonials, isLoading } = useTestimonials();
  const items = testimonials.length
    ? testimonials.map((t) => ({
        id: t.id,
        name: t.customerName || t.author || "Traveler",
        location: t.city || t.location || "",
        image: t.avatar || "https://images.pexels.com/photos/3962265/pexels-photo-3962265.jpeg",
        text: t.shortReview || t.content || "",
      }))
    : [];

  if (isLoading && items.length === 0) {
    return (
      <section className="py-20 bg-black text-white relative overflow-hidden">
        <div className="2xl:container mx-auto px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-64 bg-white/10 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-[400px] rounded-2xl bg-white/10" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-black text-white relative overflow-hidden">
      <div className="2xl:container mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-medium mb-4">
            What people love <span className="text-red-600">❤️</span> <br />
            about us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {items.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer border border-white/10"
            >
              {/* Background Image */}
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-2/4 backdrop-blur-md z-10 pointer-events-none"
                style={{
                  maskImage: "linear-gradient(to top, black 80%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to top, black 60%, transparent 100%)",
                  transform: "translate3d(0,0,0)",
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start z-10">
                <Quote className="w-4 h-4 text-white/80 mb-3 fill-white/80" />
                <p className="text-white/90 text-xl leading-relaxed mb-4">
                  {testimonial.text}
                </p>
                <div className="w-full text-right">
                  <p className="text-base text-white/60">
                    -{testimonial.name}, {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Footer */}
        <div className="text-center relative">
          <h3 className="text-3xl md:text-4xl mb-8 font-light">View more on <span className="font-bold">our socials</span></h3>

          <div className="flex flex-col justify-center items-center gap-2">
            {/* Google Review Button */}
            <Link href="#" className="flex items-center gap-4 bg-[#202020] border border-white/10 rounded-2xl min-w-[200px] transition-colors group p-0.5">
              <div className="bg-white flex items-center gap-4  px-4 py-3 rounded-xl">
                <div className="bg-white rounded-full">
                  <img src="/images/google.png" alt="Google" className="w-14 h-14" />
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-1 text-xl font-bold text-black">
                    4.9/<span className="text-sm mt-1">5</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                      <path d="M18.3033 4.59232L20.6497 9.32392C20.9697 9.98257 21.8229 10.6143 22.5429 10.7353L26.7957 11.4477C29.5154 11.9048 30.1554 13.8942 28.1956 15.8567L24.8893 19.1903C24.3293 19.7549 24.0228 20.8437 24.196 21.6234L25.1426 25.7501C25.8892 29.0165 24.1693 30.2801 21.303 28.5729L17.3168 26.1937C16.5969 25.7635 15.4104 25.7635 14.677 26.1937L10.6909 28.5729C7.83784 30.2801 6.1047 29.003 6.85129 25.7501L7.79785 21.6234C7.97116 20.8437 7.66453 19.7549 7.10458 19.1903L3.79829 15.8567C1.85184 13.8942 2.47844 11.9048 5.19813 11.4477L9.451 10.7353C10.1576 10.6143 11.0108 9.98257 11.3308 9.32392L13.6772 4.59232C14.957 2.02489 17.0368 2.02489 18.3033 4.59232Z" fill="#D5F02A" stroke="#D5F02A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <div className="text-sm text-black/80">650+ reviews</div>
                </div>
              </div>
              <ArrowUpRight className="w-8 h-8 mr-2 text-white" />
            </Link>

            {/* Facebook Review Button */}
            <Link href="#" className="flex items-center gap-4 bg-[#202020] border border-white/10 rounded-2xl min-w-[200px] transition-colors group p-0.5">
              <div className="bg-white flex items-center gap-4  px-4 py-3 rounded-xl">
                <div className="bg-white rounded-full">
                  <img src="/images/fb.png" alt="fb" className="w-14 h-14" />
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-1 text-xl font-bold text-black">
                    4.9/<span className="text-sm mt-1">5</span>  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                      <path d="M18.3033 4.59232L20.6497 9.32392C20.9697 9.98257 21.8229 10.6143 22.5429 10.7353L26.7957 11.4477C29.5154 11.9048 30.1554 13.8942 28.1956 15.8567L24.8893 19.1903C24.3293 19.7549 24.0228 20.8437 24.196 21.6234L25.1426 25.7501C25.8892 29.0165 24.1693 30.2801 21.303 28.5729L17.3168 26.1937C16.5969 25.7635 15.4104 25.7635 14.677 26.1937L10.6909 28.5729C7.83784 30.2801 6.1047 29.003 6.85129 25.7501L7.79785 21.6234C7.97116 20.8437 7.66453 19.7549 7.10458 19.1903L3.79829 15.8567C1.85184 13.8942 2.47844 11.9048 5.19813 11.4477L9.451 10.7353C10.1576 10.6143 11.0108 9.98257 11.3308 9.32392L13.6772 4.59232C14.957 2.02489 17.0368 2.02489 18.3033 4.59232Z" fill="#D5F02A" stroke="#D5F02A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <div className="text-sm text-black/80">1200+ reviews</div>
                </div>
              </div>
              <ArrowUpRight className="w-8 h-8 mr-2 text-white" />
            </Link>
          </div>
        </div>
      </div>
      {/* Decorative Wavy Line (SVG) */}
      <svg xmlns="http://www.w3.org/2000/svg" width="796" height="653" viewBox="0 0 796 653" fill="none" className="absolute -bottom-20 left-0">
        <path d="M-582.99 11.5661L-443.951 8.0691C-371.949 6.25817 -303.699 40.1283 -261.595 98.5661L-241.497 126.463L-232.421 141.527C-221.828 159.11 -208.806 175.109 -193.738 189.049L35.2031 400.868C87.3899 449.152 159.843 468.954 229.334 453.925L373.153 422.821C448.825 406.456 527.499 431.452 579.848 488.493L789.678 717.129" stroke="#3F1919" stroke-width="16" />
      </svg>
    </section>
  );
}
