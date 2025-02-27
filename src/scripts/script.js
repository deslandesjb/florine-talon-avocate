import Splitting from "splitting";
Splitting();

import {gsap} from "gsap/dist/gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
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

// animation navbar
const showAnim = gsap
	.from(".navbar", {
		yPercent: -100,
		paused: true,
		duration: 0.001,
	})
	.progress(1);

ScrollTrigger.create({
	start: "top top",
	end: "max",
	markers: false,
	onUpdate: (self) => {
		const navCheck = document.querySelector("#nav-check");
		const windowWidth = window.innerWidth;

		// Désactive l'animation uniquement si on est en mobile (<= 768px) ET que le menu est ouvert
		if (windowWidth <= 768 && navCheck.checked) {
			showAnim.progress(1); // Garde la navbar visible
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

// animation on load hp
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
				end: "top 50%",
				scrub: true,
				markers: false,
				toggleActions: "play play reverse reverse",
			},
		},
	);
});

// annimation-appear
let scrollAppear = gsap.utils.toArray(".scroll-appear");
scrollAppear.forEach((element) => {
	gsap.from(element, {
		opacity: 0,
		y: 100,
		duration: 0.1,
		scrollTrigger: {
			trigger: element,
			start: "top 90%",
			end: "top 75%",
			scrub: true,
			markers: false,
			toggleActions: "play play reverse reverse",
		},
	});
});

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
