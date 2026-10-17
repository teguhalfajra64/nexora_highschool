/* =========================================================
   NEXORA HIGH SCHOOL
   JAVASCRIPT
   ========================================================= */


/* ================= MOBILE NAVBAR ================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


if (menuToggle && navMenu) {

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.addEventListener("click", () => {

        const open =
            navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(open)
        );

    });


    const navLinks =
        navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    document.addEventListener("click", (e) => {

        if (
            !navMenu.contains(e.target) &&
            !menuToggle.contains(e.target) &&
            navMenu.classList.contains("open")
        ) {
            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    document.addEventListener("keydown", (e) => {

        if (
            e.key === "Escape" &&
            navMenu.classList.contains("open")
        ) {
            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.focus();

        }

    });

}


/* ================= DARK MODE ================= */

const html =
    document.documentElement;

const themeToggle =
    document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.setAttribute(
        "aria-label",
        "Toggle dark mode"
    );

    themeToggle.addEventListener("click", () => {

        const isDark =
            html.classList.toggle("dark");

        localStorage.setItem(
            "nexora-theme",
            isDark ? "dark" : "light"
        );

        const meta =
            document.querySelector(
                'meta[name="theme-color"]'
            );

        if (meta) {
            meta.setAttribute(
                "content",
                isDark
                    ? "#252A2E"
                    : "#343A40"
            );

        }

    });

}


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }

    );


revealElements.forEach((el, idx) => {

    const parent =
        el.parentElement;

    const siblings =
        parent
            ? Array.from(
                parent.querySelectorAll(".reveal")
            )
            : [];

    const index =
        siblings.indexOf(el);

    if (index >= 0) {

        el.style.transitionDelay =
            index * 70 + "ms";

    }

    revealObserver.observe(el);

});


/* ================= SCROLL PROGRESS ================= */

const scrollProgressBar =
    document.getElementById("scrollProgress");

if (scrollProgressBar) {

    const updateProgress = () => {

        const max =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const pct =
            max > 0
                ? (window.scrollY / max) * 100
                : 0;

        scrollProgressBar.style.width =
            pct + "%";

    };

    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateProgress
    );

    updateProgress();

}


/* ================= BACK TO TOP ================= */

const backToTop =
    document.getElementById("backToTop");

if (backToTop) {

    const toggleBackToTop = () => {

        backToTop.classList.toggle(
            "show",
            window.scrollY > 520
        );

    };

    window.addEventListener(
        "scroll",
        toggleBackToTop,
        { passive: true }
    );

    toggleBackToTop();

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ================= NAVBAR ================= */

const navbar =
    document.getElementById("navbar");

if (navbar) {

    const updateNavbar = () => {

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 10
        );

    };

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();

}


/* ================= SCROLLSPY ================= */

const spyLinks =
    document.querySelectorAll(
        '.nav-menu a[href^="#"]'
    );

const spySections = [];

spyLinks.forEach(link => {

    const id =
        link.getAttribute("href");

    if (id && id.length > 1) {

        const section =
            document.querySelector(id);

        if (section) {

            spySections.push({
                link,
                section
            });

        }

    }

});

if (spySections.length) {

    const spyObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        spyLinks.forEach(l =>
                            l.classList.remove("active")
                        );

                        entry.target
                            ._link
                            ?.classList.add("active");

                    }

                });

            },

            {
                rootMargin: "-40% 0px -55% 0px",
                threshold: 0
            }

        );

    spySections.forEach(({ section }) => {

        section._link =
            spySections.find(
                s => s.section === section
            )?.link;

        spyObserver.observe(section);

    });

}


/* ================= FAQ ================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.setAttribute(
        "aria-expanded",
        "false"
    );

    question.addEventListener("click", () => {

        const faqItem =
            question.parentElement;

        const answer =
            faqItem.querySelector(
                ".faq-answer"
            );


        document.querySelectorAll(".faq-item")
            .forEach(item => {

                item.classList.remove("open");

                const q =
                    item.querySelector(
                        ".faq-question"
                    );

                if (q) {
                    q.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

                const otherAnswer =
                    item.querySelector(
                        ".faq-answer"
                    );

                if (otherAnswer) {
                    otherAnswer.style.maxHeight =
                        null;

                }

            });


        const willOpen =
            !faqItem.classList.contains("open");

        faqItem.classList.toggle("open");

        question.setAttribute(
            "aria-expanded",
            String(willOpen)
        );

        if (willOpen && answer) {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        } else if (answer) {

            answer.style.maxHeight =
                null;

        }

    });

});


window.addEventListener("resize", () => {

    document.querySelectorAll(
        ".faq-item.open .faq-answer"
    ).forEach(answer => {

        answer.style.maxHeight =
            answer.scrollHeight + "px";

    });

});


/* ================= REGISTRATION FORM ================= */

const registrationForm =
    document.getElementById("registrationForm");


if (registrationForm) {

    const formSteps =
        document.querySelectorAll(".form-step");

    const progressSteps =
        document.querySelectorAll(".progress-step");

    const progressBar =
        document.getElementById("progressBar");

    let currentStep = 0;


    function showStep(step) {

        formSteps.forEach(
            (formStep, index) => {

                formStep.classList.toggle(
                    "active",
                    index === step
                );

            }
        );


        progressSteps.forEach(
            (progressStep, index) => {

                progressStep.classList.toggle(
                    "active",
                    index <= step
                );

                progressStep.classList.toggle(
                    "done",
                    index < step
                );

            }
        );


        if (progressBar) {

            const percentage =
                step / Math.max(progressSteps.length - 1, 1);

            progressBar.style.width =
                percentage * 100 + "%";

        }


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }


    function validateCurrentStep() {

        const currentFormStep =
            formSteps[currentStep];


        if (!currentFormStep) {
            return true;
        }


        const requiredInputs =
            currentFormStep.querySelectorAll(
                "input[required], select[required], textarea[required]"
            );


        let valid = true;


        requiredInputs.forEach(input => {

            if (!input.checkValidity()) {

                input.reportValidity();

                valid = false;

                return;

            }

        });


        return valid;

    }


    document.querySelectorAll(".next-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                if (!validateCurrentStep()) {

                    return;

                }


                if (
                    currentStep <
                    formSteps.length - 2
                ) {

                    currentStep++;

                    showStep(currentStep);

                }

            });

        });


    document.querySelectorAll(".prev-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                if (currentStep > 0) {

                    currentStep--;

                    showStep(currentStep);

                }

            });

        });


    registrationForm.addEventListener(
        "submit",

        event => {

            event.preventDefault();


            if (!validateCurrentStep()) {

                return;

            }


            const registrationNumber =
                document.getElementById(
                    "registrationNumber"
                );


            const randomNumber =
                Math.floor(
                    1000 +
                    Math.random() * 9000
                );


            if (registrationNumber) {

                registrationNumber.textContent =
                    "NX-2027-" + randomNumber;

            }


            currentStep =
                formSteps.length - 1;


            showStep(currentStep);


            registrationForm.reset();

            resetUploadBoxes();

        }
    );


    const uploadInputs =
        document.querySelectorAll(
            ".upload-box input[type='file']"
        );


    uploadInputs.forEach(input => {

        input.addEventListener(
            "change",
            () => {

                const box =
                    input.parentElement;


                const small =
                    box.querySelector("small");


                if (input.files.length > 0) {

                    box.classList.add("filled");

                    if (small) {
                        small.textContent =
                            input.files[0].name;

                    }

                } else {

                    box.classList.remove("filled");

                    if (small) {
                        small.textContent =
                            "JPG, PNG atau PDF";

                    }

                }

            }
        );

    });


    function resetUploadBoxes() {

        document.querySelectorAll(
            ".upload-box input[type='file']"
        ).forEach(input => {

            const box =
                input.parentElement;

            box.classList.remove("filled");

            const small =
                box.querySelector("small");

            if (small) {
                small.textContent =
                    "JPG, PNG atau PDF";

            }

        });

    }

}


/* ================= CURRENT YEAR ================= */

const yearElements =
    document.querySelectorAll(
        ".current-year"
    );


yearElements.forEach(element => {

    element.textContent =
        new Date().getFullYear();

});


/* ================= ALUMNI & PARTNER FILTER ================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const alumniCards =
    document.querySelectorAll(".alumni-card");

const partnerCards =
    document.querySelectorAll(".partner-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.getAttribute("data-filter");

        const target =
            button.getAttribute("data-target") || "alumni";


        document.querySelectorAll(
            `.filter-btn[data-target="${target}"]`
        ).forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        const cards =
            target === "partner" ? partnerCards : alumniCards;

        cards.forEach(card => {

            const type =
                card.getAttribute("data-type");

            if (filter === "all" || type === filter) {
                card.style.display = "flex";
                card.style.animation =
                    "fadeUp 0.4s var(--ease)";
            } else {
                card.style.display = "none";
            }

        });

    });

});


/* ================= JURUSAN TABS ================= */

const jurusanTabs =
    document.querySelectorAll(".jurusan-tab");

const jurusanPanels =
    document.querySelectorAll(".jurusan-panel");


jurusanTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target =
            tab.getAttribute("data-jurusan");


        jurusanTabs.forEach(t => {
            t.classList.remove("active");
            t.setAttribute("aria-selected", "false");
        });

        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");


        jurusanPanels.forEach(panel => {

            if (panel.id === "jurusan-" + target) {
                panel.hidden = false;
                panel.classList.add("active");
            } else {
                panel.hidden = true;
                panel.classList.remove("active");
            }

        });

    });

});
