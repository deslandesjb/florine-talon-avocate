import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Splitting from "splitting";
Splitting();
gsap.registerPlugin(ScrollTrigger);

// navbar effect
// ScrollTrigger.create({
// 	start: "top -80",
// 	end: 99999,
// 	toggleClass: {className: "navbar--scrolled", targets: ".navbar"},
// });
// loading-appear
// let loadingApprear = gsap.utils.toArray(".loading-appear span");
// loadingApprear.forEach((element) => {
// 	gsap.from(element, {
// 		y: 100,
// 		duration: 0.3,
// 		stagger: 1,
// 	});
// });

document.addEventListener("astro:page-load", () => {
	// animation navbar
	const showAnim = gsap
		.from(".navbar", {
			yPercent: -100,
			paused: true,
			duration: 0.001,
		})
		.progress(1);

	ScrollTrigger.create({
		start: "top -64",
		end: "max",
		markers: false,
		onUpdate: (self) => {
			const navCheck = document.querySelector("#nav-check");
			const windowWidth = window.innerWidth;
			const scrollY = window.scrollY;

			if (scrollY < 64) {
				showAnim.progress(1);
				return;
			}

			if (windowWidth <= 768 && navCheck.checked) {
				showAnim.progress(1);
				return;
			}

			self.direction === -1 ? showAnim.play() : showAnim.reverse();
		},
	});

	// animation on load hp
	gsap.from(".loading-appear", {
		y: 100,
		duration: 0.3,
		stagger: 0.1,
	});

	// animation on menu mobile
	const navCheck = document.querySelector("#nav-check");

	navCheck.addEventListener("change", () => {
		const windowWidth = window.innerWidth;

		if (navCheck.checked && windowWidth <= 768) {
			gsap.from(".loading-menu", {
				y: 100,
				duration: 0.3,
				stagger: 0.1,
				delay: 0.4,
			});
		}
	});

	// animation-char
	const results = Splitting({
		target: ".reveal-type",
		by: "chars",
	});

	results.forEach((splitResult) => {
		gsap.fromTo(
			splitResult.chars,
			{
				opacity: 0.2,
			},
			{
				opacity: 1,
				duration: 0.03,
				stagger: 0.02,
				scrollTrigger: {
					trigger: splitResult.el,
					start: "top 90%",
					end: "top 30%",
					scrub: true,
					markers: false,
					toggleActions: "play play reverse reverse",
				},
			},
		);
	});

	// annimation-appear
	let scrollAppear = gsap.utils.toArray(".scroll-appear");
	scrollAppear.forEach((element, index) => {
		gsap.from(element, {
			opacity: 0,
			y: 100,
			duration: 0.2,
			// stagger: 0.2,
			delay: index * 0.03,
			scrollTrigger: {
				trigger: element,
				start: "top 90%",
				end: "top 75%",
				scrub: false,
				markers: false,
				// toggleActions: "play none none reverse",
				toggleActions: "play none none none",
			},
		});
	});

	// annimation-appear OLD (without delay)
	// let scrollAppear = gsap.utils.toArray(".scroll-appear");
	// scrollAppear.forEach((element, index) => {
	// 	gsap.from(element, {
	// 		opacity: 0,
	// 		y: 100,
	// 		duration: 0.1,
	// 		stagger: 0.2,
	// 		delay: index * 0.2,
	// 		scrollTrigger: {
	// 			trigger: element,
	// 			start: "top 90%",
	// 			end: "top 75%",
	// 			scrub: true,
	// 			markers: false,
	// 			toggleActions: "play play reverse reverse",
	// 		},
	// 	});
	// });

	// let scrollAppearReview = gsap.utils.toArray(".scroll-appear-review");
	// scrollAppearReview.forEach((element) => {
	// 	gsap.from(element, {
	// 		opacity: 0,
	// 		y: 100,
	// 		duration: 0.1,
	// 		stagger: 0.02,
	// 		scrollTrigger: {
	// 			trigger: element,
	// 			start: "top 90%",
	// 			end: "top 75%",
	// 			scrub: true,
	// 			markers: false,
	// 			toggleActions: "play play reverse reverse",
	// 		},
	// 	});
	// });

	// const navLinks = document.querySelector(".nav-links");
	// function onToggleMenu(e) {
	// 	e.name = e.name === "menu" ? "close" : "menu";
	// 	navLinks.classList.toggle("top-[9%]");
	// }

	// Animation parcours-slide-right
	const parcoursSlideRight = document.querySelector(".parcours-slide-right");
	if (parcoursSlideRight) {
		gsap.to(".parcours-slide-right", {
			xPercent: -100,
			duration: 0.3,
			stagger: 0.1,
			scrollTrigger: {
				trigger: ".parcours-slide-right",
				start: "top 90%",
				end: "top 75%",
				scrub: false,
				markers: false,
				toggleActions: "play play reverse reverse",
			},
		});
	}

	// Animation parcours-slide-left
	const parcoursSlideLeft = document.querySelector(".parcours-slide-left");
	if (parcoursSlideLeft) {
		gsap.to(".parcours-slide-left", {
			xPercent: 100,
			duration: 0.3,
			stagger: 0.1,
			scrollTrigger: {
				trigger: ".parcours-slide-left",
				start: "top 90%",
				end: "top 75%",
				scrub: false,
				markers: false,
				toggleActions: "play play none none",
			},
		});
	}

	// Gestion des liens du menu
	const menuLinks = document.querySelectorAll("a");

	if (menuLinks && navCheck) {
		menuLinks.forEach((link) => {
			link.addEventListener("click", () => {
				if (navCheck.checked) {
					navCheck.checked = false;
				}
			});
		});
	}
});
