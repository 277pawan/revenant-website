import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const WORDS = [
    { label: "Restore", background: "#dcefe3", dot: "#2d8055" },
    { label: "Verify", background: "#e2ebf7", dot: "#436b9a" },
    { label: "Webhooks", background: "#f2e9d8", dot: "#947044" },
] as const;

export function AnimatedWordPill() {
    const [index, setIndex] = useState(0);
    const reduceMotion = useReducedMotion();
    const activeWord = WORDS[index];

    useEffect(() => {
        if (reduceMotion) return;
        const timer = window.setInterval(() => {
            setIndex((current) => (current + 1) % WORDS.length);
        }, 2400);
        return () => window.clearInterval(timer);
    }, [reduceMotion]);

    return (
        <motion.div
            layout
            role="img"
            aria-label={`Recovery capability: ${activeWord.label}`}
            className="animated-word-pill inline-flex h-8 min-w-[6rem] shrink-0 items-center justify-start gap-2 overflow-hidden rounded-full px-3 text-sm font-semibold leading-none text-slate-950"
            initial={false}
            animate={{ backgroundColor: activeWord.background }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        >
            <motion.span
                className="h-2 w-2 shrink-0 rounded-full"
                initial={false}
                animate={{ backgroundColor: activeWord.dot, scale: [1, 1.12, 1] }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="relative grid overflow-hidden">
                <AnimatePresence initial={false} mode="wait">
                    <motion.span
                        key={activeWord.label}
                        className="col-start-1 row-start-1"
                        initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={reduceMotion ? undefined : { y: "-110%", opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {activeWord.label}
                    </motion.span>
                </AnimatePresence>
            </span>
        </motion.div>
    );
}
