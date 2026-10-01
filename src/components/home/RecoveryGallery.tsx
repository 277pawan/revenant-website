import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { AmbientMotion } from "../ui/AmbientMotion";

const SCENES = [
    {
        image: "/film/01-cli.png",
        alt: "Developer workstation representing a Revenant CLI restore drill",
        label: "Run a drill",
        title: "Start from the command line",
        detail: "Run the same verification locally or from your CI pipeline.",
    },
    {
        image: "/film/02-sandbox.png",
        alt: "Isolated server environment representing a temporary restore sandbox",
        label: "Isolated sandbox",
        title: "Restore away from production",
        detail: "A temporary AWS environment keeps recovery checks separate from live data.",
    },
    {
        image: "/film/03-checks.png",
        alt: "Server indicators representing recovery validation checks",
        label: "Validate recovery",
        title: "Test the data that came back",
        detail: "Schema, row counts, relationships, and golden queries verify the restore.",
    },
    {
        image: "/film/04-notify.png",
        alt: "A mobile notification representing a completed recovery drill alert",
        label: "Notify the team",
        title: "Share results where work happens",
        detail: "Send outcomes to the channels your team already uses.",
    },
    {
        image: "/film/05-evidence.png",
        alt: "Prepared documents representing a signed recovery evidence report",
        label: "Prove the outcome",
        title: "Keep signed recovery evidence",
        detail: "Each drill produces evidence with its results and measured recovery time.",
    },
    {
        image: "/film/06-cloud.png",
        alt: "Operations room representing recovery visibility across cloud workflows",
        label: "Monitor every workflow",
        title: "See recovery health across your fleet",
        detail: "Review recent results, stale workflows, and recovery-time trends.",
    },
];

export function RecoveryGallery() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const reduceMotion = useReducedMotion();
    const activeScene = SCENES[activeIndex];

    useEffect(() => {
        if (paused || reduceMotion) return;
        const timer = window.setInterval(() => {
            setActiveIndex((index) => (index + 1) % SCENES.length);
        }, 3000);
        return () => window.clearInterval(timer);
    }, [paused, reduceMotion]);

    return (
        <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-20">
            <AmbientMotion variant="architecture" />
            <div className="relative z-10 mx-auto max-w-7xl">
                <header className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
                    <div className="max-w-2xl">
                        <p className="ui-section-label">Recovery in practice</p>
                        <h2 className="ui-heading mt-2 text-3xl sm:text-4xl">
                            From first command to signed evidence.
                        </h2>
                        <p className="mt-3 ui-body">
                            One recovery workflow, from the first restore to proof your team can use.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setPaused((value) => !value)}
                        disabled={!!reduceMotion}
                        className="ui-button ui-button-surface mb-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={
                            reduceMotion
                                ? "Gallery autoplay disabled by reduced-motion preference"
                                : paused
                                    ? "Play gallery"
                                    : "Pause gallery"
                        }
                        title={
                            reduceMotion
                                ? "Gallery autoplay disabled by reduced-motion preference"
                                : paused
                                    ? "Play gallery"
                                    : "Pause gallery"
                        }
                    >
                        {paused || reduceMotion ? <Play size={16} /> : <Pause size={16} />}
                    </button>
                </header>

                <div className="grid items-stretch gap-7 lg:grid-cols-[minmax(0,1.55fr)_minmax(17rem,0.7fr)] lg:gap-10">
                    <figure className="min-w-0">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-surface-elevated">
                            <motion.img
                                key={activeScene.image}
                                src={activeScene.image}
                                alt={activeScene.alt}
                                className="h-full w-full object-cover"
                                loading="eager"
                                initial={reduceMotion ? false : { opacity: 0.55, scale: 1.015 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
                            />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-black/75 px-5 py-4 sm:px-7 sm:py-5">
                                <figcaption className="max-w-xl text-white">
                                    <p className="text-sm font-medium text-white/80">
                                        {activeScene.label}
                                    </p>
                                    <p className="mt-1 text-xl font-semibold sm:text-2xl">
                                        {activeScene.title}
                                    </p>
                                </figcaption>
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-foreground-subtle">
                            Illustrative imagery. Product behavior is shown in the restore demo above.
                        </p>
                    </figure>

                    <div className="flex flex-col border-y border-border-subtle">
                        {SCENES.map((scene, index) => {
                            const selected = index === activeIndex;
                            return (
                                <button
                                    key={scene.image}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() => setActiveIndex(index)}
                                    className={`group grid flex-1 grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 border-b border-border-subtle py-3 text-left last:border-b-0 sm:grid-cols-[6.5rem_minmax(0,1fr)] ${selected ? "text-foreground" : "text-foreground-muted"
                                        }`}
                                >
                                    <img
                                        src={scene.image}
                                        alt=""
                                        className={`aspect-[4/3] h-auto w-full rounded-sm object-cover transition-opacity duration-200 ${selected ? "opacity-100" : "opacity-55 group-hover:opacity-85"
                                            }`}
                                        loading="lazy"
                                    />
                                    <span>
                                        <span className="block text-sm font-semibold">
                                            {scene.label}
                                        </span>
                                        <span className="mt-1 block text-xs leading-relaxed text-foreground-subtle">
                                            {scene.detail}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}