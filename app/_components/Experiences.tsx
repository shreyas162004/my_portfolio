'use client';
import SectionTitle from '../../components/SectionTitle';
import { MY_EXPERIENCE } from '../../lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef, useState } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Experiences = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredExperience, setHoveredExperience] = useState<string | null>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 50%',
                    end: 'bottom 20%',
                    scrub: 1,
                },
            });

            tl.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    const handleExperienceHover = (title: string) => {
        setHoveredExperience(title);
    };

    const handleExperienceLeave = () => {
        setHoveredExperience(null);
    };

    return (
        <section className="py-section" id="my-experience">
            <div className="container" ref={containerRef}>
                <SectionTitle title="My Experience" />

                <div className="group/experiences grid gap-14">
                    {MY_EXPERIENCE.map((item) => (
                        <div 
                            key={item.title} 
                            className={`experience-item transition-all duration-300 cursor-pointer group ${
                                hoveredExperience && hoveredExperience !== item.title
                                    ? 'opacity-30 scale-95 blur-[1px]'
                                    : hoveredExperience === item.title
                                    ? 'opacity-100 scale-105'
                                    : 'opacity-100 scale-100'
                            }`}
                            onMouseEnter={() => handleExperienceHover(item.title)}
                            onMouseLeave={handleExperienceLeave}
                        >
                            <p className="text-xl text-muted-foreground">
                                {item.company}
                            </p>
                            <p className="text-5xl font-anton leading-none mt-3.5 mb-2.5 transition-all duration-700 bg-gradient-to-r from-primary to-foreground from-[50%] to-[50%] bg-[length:200%] bg-right bg-clip-text text-transparent group-hover:bg-left">
                                {item.title}
                            </p>
                            <p className="text-lg text-muted-foreground">
                                {item.duration}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experiences;
