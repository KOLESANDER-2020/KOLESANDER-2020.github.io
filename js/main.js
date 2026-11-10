document.addEventListener("DOMContentLoaded", () => {
	const burger = document.querySelector(".js-burger");
	const nav = document.querySelector(".js-nav");
	const body = document.body;
	const desktop = window.matchMedia("(min-width: 1024px)");

	// Mobile menu
	const toggleMenu = (isOpen) => {
		nav.classList.toggle("open", isOpen);
		body.classList.toggle("menu-open", isOpen);
		burger.setAttribute("aria-expanded", isOpen);
		burger.setAttribute("aria-label", isOpen ? burger.dataset.labelClose : burger.dataset.labelOpen);
	};

	if (burger && nav) {
		burger.addEventListener("click", () => {
			toggleMenu(!nav.classList.contains("open"));
		});

		nav.querySelectorAll("a").forEach((link) => {
			link.addEventListener("click", () => toggleMenu(false));
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && nav.classList.contains("open")) {
				toggleMenu(false);
				burger.focus();
			}
		});

		desktop.addEventListener("change", (e) => {
			if (e.matches) toggleMenu(false);
		});
	}

	// Smooth scroll to sections (CSS scroll-behavior is the fallback)
	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	document.querySelectorAll('a[href^="#"]').forEach((link) => {
		link.addEventListener("click", (e) => {
			const id = link.getAttribute("href");
			if (id.length < 2) return;

			const target = document.querySelector(id);
			if (!target) return;

			e.preventDefault();
			target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
			history.pushState(null, "", id);
		});
	});

	// Current year in footer
	const year = document.querySelector(".js-year");
	if (year) year.textContent = new Date().getFullYear();
});
