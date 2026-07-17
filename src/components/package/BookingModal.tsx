"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Package } from "@/types";

interface BookingModalProps {
    pkg: Package;
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    customerName: string;
    phone: string;
    email: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export const BookingModal = ({ isOpen, onClose, pkg }: BookingModalProps) => {
    const [formData, setFormData] = useState<FormData>({
        customerName: "",
        phone: "",
        email: "",
    });
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    // Reset on open
    useEffect(() => {
        if (isOpen) {
            setFormData({ customerName: "", phone: "", email: "" });
            setStatus("idle");
            setErrorMsg("");
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const isValid = formData.customerName.trim().length >= 2 && formData.phone.replace(/\D/g, "").length >= 10;

    const handleSubmit = async () => {
        if (!isValid || status === "submitting") return;

        setStatus("submitting");
        setErrorMsg("");

        try {
            const payload: any = {
                tenantId: process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID as string,
                inquiryType: "package",
                customerName: formData.customerName.trim(),
                phone: `+91-${formData.phone.replace(/\D/g, "")}`,
                additionalFields: {
                    packageId: pkg.id,
                    packageTitle: pkg.title,
                    packagePrice: pkg.price,
                },
            };

            // Only include email if provided
            const email = formData.email.trim();
            if (email) {
                payload.email = email;
            }

            console.log("[BookingModal] Submitting inquiry:", payload);

            // Use same endpoint as flight form (/api/inquiries) for consistency
            const res = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            console.log("[BookingModal] Response status:", res.status);

            const result = await res.json().catch(() => ({}));

            if (!res.ok) {
                console.error("[BookingModal] Error response:", result);
                throw new Error(result.error || `Request failed (${res.status})`);
            }

            console.log("[BookingModal] Success:", result);
            setStatus("success");
        } catch (err: any) {
            console.error("[BookingModal] Catch error:", err);
            const message = err.name === "AbortError"
                ? "Request timed out. Please try again."
                : err.message || "Something went wrong. Please try again.";
            setStatus("error");
            setErrorMsg(message);
        }
    };

    const handleClose = () => {
        if (status === "submitting") return;
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 30, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 30, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 400 }}
                        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden flex shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Left Side: Brand Visual */}
                        <div className="hidden md:block w-5/12 relative bg-gray-100">
                            {pkg.images?.[0] && (
                                <Image src={pkg.images[0]} alt={pkg.title} fill className="object-cover" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white z-10 max-w-[85%]">
                                <h2 className="text-4xl font-bold font-display italic mb-2">10k+</h2>
                                <p className="opacity-90 font-medium tracking-widest text-[10px] uppercase">Happy Travellers</p>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="flex-1 flex flex-col justify-center p-8 md:p-10 relative">
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-20 cursor-pointer"
                            >
                                <X size={20} className="text-slate-900" />
                            </button>

                            {status === "success" ? (
                                /* Success State */
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h3>
                                    <p className="text-gray-500 mb-6">We will contact you shortly.</p>
                                    <button
                                        onClick={handleClose}
                                        className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-all"
                                    >
                                        Done
                                    </button>
                                </motion.div>
                            ) : (
                                /* Form State */
                                <>
                                    <div className="mb-8">
                                        <p className="text-xs uppercase tracking-widest text-color-text-tertiary mb-1">Enquire about</p>
                                        <h2 className="text-2xl font-bold font-display text-color-text-primary line-clamp-2">{pkg.title}</h2>
                                    </div>

                                    <div className="space-y-5">
                                        {/* Name */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-color-text-secondary">
                                                Name <span className="text-primary">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.customerName}
                                                onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                                                placeholder="Rahul Sharma"
                                                className="w-full h-12 px-4 border border-border rounded-md text-base font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 dark:bg-slate-900 transition-colors placeholder:text-color-text-tertiary/40"
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-color-text-secondary">
                                                Phone <span className="text-primary">*</span>
                                            </label>
                                            <div className="flex gap-2">
                                                <div className="w-16 h-12 flex items-center justify-center border border-border rounded-md bg-muted text-sm font-medium text-color-text-secondary">
                                                    +91
                                                </div>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                                                    placeholder="98765 43210"
                                                    className="flex-1 h-12 px-4 border border-border rounded-md text-base font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 dark:bg-slate-900 transition-colors placeholder:text-color-text-tertiary/40"
                                                />
                                            </div>
                                        </div>

                                        {/* Email (Optional) */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-color-text-secondary">
                                                Email <span className="text-color-text-tertiary/60">(optional)</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                placeholder="rahul@example.com"
                                                className="w-full h-12 px-4 border border-border rounded-md text-base font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 dark:bg-slate-900 transition-colors placeholder:text-color-text-tertiary/40"
                                            />
                                        </div>

                                        {/* Error Message */}
                                        {errorMsg && (
                                            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 px-4 py-2 rounded-md">{errorMsg}</p>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!isValid || status === "submitting"}
                                            className="w-full h-12 bg-primary hover:bg-primary-hover text-white rounded-md font-semibold text-base shadow-brand hover:shadow-brand-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            {status === "submitting" ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} />
                                                    Send Enquiry
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};