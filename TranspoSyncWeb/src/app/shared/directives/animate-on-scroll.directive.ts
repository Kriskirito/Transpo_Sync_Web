import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({ selector: '[appAnimateOnScroll]', standalone: true })
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
    @Input() appAnimateOnScroll: 'fadeInUp' | 'fadeInLeft' | 'fadeIn' = 'fadeInUp';
    private observer!: IntersectionObserver;

    constructor(private el: ElementRef<HTMLElement>) {}

    ngOnInit(): void {
        const el = this.el.nativeElement;
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        if (this.appAnimateOnScroll === 'fadeInUp') {
            el.style.transform = 'translateY(24px)';
        } else if (this.appAnimateOnScroll === 'fadeInLeft') {
            el.style.transform = 'translateX(-24px)';
        }

        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = '1';
                    el.style.transform = 'translate(0, 0)';
                    this.observer.unobserve(el);
                }
            },
            { threshold: 0.12 }
        );
        this.observer.observe(el);
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}
