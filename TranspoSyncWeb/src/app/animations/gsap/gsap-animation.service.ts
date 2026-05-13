import { Injectable } from '@angular/core';
import gsap from 'gsap';

@Injectable({ providedIn: 'root' })
export class GsapAnimationService {
    animateCountUp(element: HTMLElement, endValue: number, duration = 1.8): void {
        const obj = { value: 0 };
        gsap.to(obj, {
            value: endValue,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
                element.textContent = Math.round(obj.value).toString();
            }
        });
    }

    fadeInUp(element: HTMLElement | HTMLElement[], delay = 0): void {
        gsap.fromTo(
            element,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, delay, ease: 'power3.out' }
        );
    }

    fadeInLeft(element: HTMLElement, delay = 0): void {
        gsap.fromTo(
            element,
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.6, delay, ease: 'power3.out' }
        );
    }

    fadeInRight(element: HTMLElement, delay = 0): void {
        gsap.fromTo(
            element,
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.6, delay, ease: 'power3.out' }
        );
    }

    staggerIn(elements: HTMLElement[] | NodeListOf<Element>, delay = 0): void {
        gsap.fromTo(
            Array.from(elements),
            { opacity: 0, y: 24, scale: 0.96 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.55, delay, stagger: 0.1,
                ease: 'back.out(1.2)'
            }
        );
    }

    pulse(element: HTMLElement): void {
        gsap.to(element, {
            scale: 1.04,
            duration: 0.25,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut'
        });
    }

    slideInFromBottom(element: HTMLElement, delay = 0): void {
        gsap.fromTo(
            element,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.8, delay, ease: 'expo.out' }
        );
    }
}
