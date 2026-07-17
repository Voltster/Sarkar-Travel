"use client";

import { Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function FloatingSupport() {
  const [showOptions, setShowOptions] = useState(false);
  const pathname = usePathname();

  // Hide on package details page and destination details page
  const isHiddenPage =
    pathname?.startsWith("/packages/") ||
    pathname?.startsWith("/destinations/");

  if (isHiddenPage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-16 right-0 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 min-w-[200px]"
          >
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-3">
              Need help? Chat with us!
            </p>
            <div className="space-y-2">
              <a
                href="https://api.whatsapp.com/send/?phone=917505545010&text=Hi%21+I%27m+interested+in+your+travel+packages.+Can+you+help+me%3F&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300 text-sm">
                    WhatsApp
                  </p>
                  <p className="text-xs text-green-600/70 dark:text-green-400/70">
                    Quick response
                  </p>
                </div>
              </a>
              
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300 text-sm">
                    Call Us
                  </p>
                  <p className="text-xs text-blue-600/70 dark:text-blue-400/70">
                    24/7 Support
                  </p>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowOptions(!showOptions)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 flex items-center justify-center"
      >
        {showOptions ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
}
