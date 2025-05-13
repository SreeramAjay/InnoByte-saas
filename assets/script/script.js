//Header Section
document.addEventListener("DOMContentLoaded", function () {
            const serviceDropdown = document.querySelector(".service-dropdown");
            const industryDropdown = document.querySelector(".industry-dropdown");
            const aboutusDropdown = document.querySelector(".aboutus-dropdown");

            // Data for dropdowns
            const services = [
                { title1: "IT and Engineering Solutions", description1: "We deliver cutting-edge IT and engineering services, offering tailored solutions in software development, consulting, and infrastructure to help businesses optimize performance and embrace digital transformation.", link: "it-engineering.html" },
                { title1: "Consulting and Staffing", description1: "We provide expert consulting and staffing services, connecting businesses with top talent and strategic solutions to drive growth, efficiency, and success.", link: "consulting.html" },
                { title1: "Digital Marketing", description1: "We help businesses grow with data-driven digital marketing strategies, including SEO, social media, content marketing, and paid advertising to maximize online reach and engagement.", link: "digitalmarketing.html" }
            ];

            const industries = [
                { title1: "Recent Projects", description1: "Showcasing our latest successful projects across various industries, highlighting our expertise in delivering innovative solutions, exceptional results, and client satisfaction.", link: "recentproject.html" },
                { title1: "Case Study", description1: "We provide in-depth case studies showcasing real-world success stories, highlighting challenges, strategies, and results to demonstrate the impact of our solutions across various industries.", link: "case-study.html" },
                { title1: "Client Testimonials", description1: "Hear from our satisfied clients about their experiences with our services. Their feedback showcases our commitment to quality, innovation, and customer success.", link: "testimonial.html" }
            ];

            const aboutus = [
                { title1: "Our Team", description1: "A dedicated group of experts committed to innovation, collaboration, and excellence, bringing diverse skills and experience to drive success for our clients.", link: "our-team.html" },
                { title1: "Our Story", description1: "Founded with a vision to innovate and excel, our journey is built on a passion for delivering cutting-edge solutions, fostering strong partnerships, and making a lasting impact across industries.", link: "our-story.html" }
            ];

            // Update right panel content
            function updateRightPanel(dropdown, type, index) {
                const items = type === "service" ? services : type === "industry" ? industries : aboutus;
                const rightPanelHeading = dropdown.querySelector(".service-heading2");
                const rightPanelDescription = dropdown.querySelector(".service-description1");
                const rightPanelLink = dropdown.querySelector(".learn-more");

                rightPanelHeading.textContent = items[index].title1;
                rightPanelDescription.textContent = items[index].description1;
                rightPanelLink.href = items[index].link;
            }

            // Toggle dropdowns
            function toggleDropdown(dropdown, others) {
                dropdown.classList.toggle("show");
                others.forEach(other => other.classList.remove("show"));
            }

            document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
                toggle.addEventListener("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const dropdown = this.nextElementSibling;
                    const otherDropdowns = [serviceDropdown, industryDropdown, aboutusDropdown].filter(d => d !== dropdown);
                    toggleDropdown(dropdown, otherDropdowns);
                });
            });

            // Close dropdowns when clicking outside
            document.addEventListener("click", function () {
                [serviceDropdown, industryDropdown, aboutusDropdown].forEach(d => d.classList.remove("show"));
            });

            // Prevent dropdowns from closing when clicking inside
            [serviceDropdown, industryDropdown, aboutusDropdown].forEach(dropdown => {
                dropdown.addEventListener("click", e => e.stopPropagation());
            });

            // Handle item selection in dropdowns
            [serviceDropdown, industryDropdown, aboutusDropdown].forEach(dropdown => {
                const items = dropdown.querySelectorAll(".service-title1");
                items.forEach(item => {
                    item.addEventListener("click", function () {
                        items.forEach(i => i.classList.remove("selected"));
                        item.classList.add("selected");
                        const type = item.dataset.type;
                        const index = item.dataset.index;
                        updateRightPanel(dropdown, type, index);
                    });
                });
            });
        });

//About Us Section
const wrapper = document.querySelector(".wrapper");
        const dots = document.querySelectorAll(".dot");
        let currentIndex = 0;
        let isDragging = false;
        let startX, currentTranslate, prevTranslate, animationID;
    
        function showContent(index) {
            wrapper.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === index);
            });
        }
    
        function nextSlide() {
            currentIndex = (currentIndex + 1) % dots.length;
            showContent(currentIndex);
        }
    
        let slideInterval = setInterval(nextSlide, 5000);
    
        function goToSlide(index) {
            clearInterval(slideInterval);
            currentIndex = index;
            showContent(index);
            slideInterval = setInterval(nextSlide, 5000);
        }
    
        function touchStart(e) {
            isDragging = true;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            prevTranslate = currentIndex * -100;
            cancelAnimationFrame(animationID);
        }
    
        function touchMove(e) {
            if (!isDragging) return;
            const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            const diff = (currentX - startX) / wrapper.clientWidth * 100;
            wrapper.style.transform = `translateX(${prevTranslate + diff}%)`;
        }
    
        function touchEnd() {
            isDragging = false;
            const moveBy = (parseFloat(wrapper.style.transform.replace("translateX(", "").replace("%)", "")) - prevTranslate);
            if (moveBy < -10 && currentIndex < dots.length - 1) {
                currentIndex++;
            } else if (moveBy > 10 && currentIndex > 0) {
                currentIndex--;
            }
            showContent(currentIndex);
        }
    
        wrapper.addEventListener("mousedown", touchStart);
        wrapper.addEventListener("mousemove", touchMove);
        wrapper.addEventListener("mouseup", touchEnd);
        wrapper.addEventListener("mouseleave", touchEnd);
        wrapper.addEventListener("touchstart", touchStart);
        wrapper.addEventListener("touchmove", touchMove);
        wrapper.addEventListener("touchend", touchEnd);
    
        showContent(currentIndex);


// About section
document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData
        });

        if (response.ok) {
            document.getElementById("successMessage").style.display = "block";
            form.reset(); // Reset form after submission
        } else {
            alert("❌ Something went wrong. Please try again.");
        }
    } catch (error) {
        alert("❌ Failed to send. Please check your internet connection.");
    }
});
