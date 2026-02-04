let selectedCollege = "";
let slideIndex = 0;
let slides = [];
let autoSlide;

const collegeThemes = {
    ruparel: { header: "#abe137", footer: "#2a9d8f" },   // Deep blue & teal
    kelkar:  { header: "#f4a261", footer: "#e76f51" },   // Warm orange & coral
    dav:     { header: "#457b9d", footer: "#1d3557" },   // Blue shades
    mulund:  { header: "#6d597a", footer: "#355070" },   // Muted purple & navy
    somaiya: { header: "#b5179e", footer: "#720026" }    // Magenta & deep red
};



function handleInitialEntry(event) {
    event.preventDefault();
    const college = document.getElementById("collegeSelectInput").value;
    if (!college) {
        alert("Please select a college");
        return;
    }
    
    selectedCollege = college;
    
    // Get college name for welcome message
    const names = {
        ruparel: "D.G. Ruparel College",
        kelkar: "Kelkar College",
        dav: "DAV College",
        mulund: "Mulund College",
        somaiya: "Somaiya College"
    };
    
    document.getElementById("welcomeCollegeName").innerText = names[college];
    document.getElementById("selectionForm").style.display = "none";
    document.getElementById("collegeForm").classList.remove("hidden");
}

const allColleges = [
    { id: "ruparel", name: "D.G. Ruparel College" },
    { id: "kelkar", name: "Kelkar College" },
    { id: "dav", name: "Ramanand Arya D.A.V College" },
    { id: "mulund", name: "Mulund College of Commerce" },
    { id: "somaiya", name: "Somaiya College" }
];

function filterColleges() {
    const input = document.getElementById("collegeSearchInput");
    const results = document.getElementById("searchResults");
    const filter = input.value.toLowerCase();
    
    results.innerHTML = "";
    if (!filter) {
        results.style.display = "none";
        return;
    }

    const filtered = allColleges.filter(c => c.name.toLowerCase().includes(filter));
    
    if (filtered.length > 0) {
        filtered.forEach(college => {
            const div = document.createElement("div");
            div.className = "search-result-item";
            div.innerText = college.name;
            div.onclick = () => selectSearchResult(college.id, college.name);
            results.appendChild(div);
        });
        results.style.display = "flex";
    } else {
        results.style.display = "none";
    }
}

function selectSearchResult(id, name) {
    const mainSelect = document.getElementById("collegeSelectInput");
    const searchInput = document.getElementById("collegeSearchInput");
    const results = document.getElementById("searchResults");

    if (mainSelect) mainSelect.value = id;
    if (searchInput) searchInput.value = name;
    if (results) results.style.display = "none";
    
    // Feedback
    if (mainSelect) {
        mainSelect.style.borderColor = "#3b82f6";
        setTimeout(() => mainSelect.style.borderColor = "#e2e8f0", 2000);
    }
}

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    const results = document.getElementById("searchResults");
    const searchInput = document.getElementById("collegeSearchInput");
    if (results && !results.contains(e.target) && e.target !== searchInput) {
        results.style.display = "none";
    }
});

function selectCollege(key, el) {
    selectedCollege = key;
    const collegeSelect = document.getElementById("collegeSelect");
    if (collegeSelect) collegeSelect.value = key;

    document.querySelectorAll(".college-card").forEach(c =>
        c.classList.remove("active")
    );
    if (el) el.classList.add("active");
}

function loadCollege() {
    if (!selectedCollege) {
        alert("Please select a college");
        return;
    }

    document.getElementById("collegeForm").style.display = "none";
    document.getElementById("website").classList.remove("hidden");
    window.location.hash = "#top";

    const data = {
        ruparel: ["D.G. Ruparel College", "Doongasree Gangji Ruparel College of Arts, Science and Commerce, known as Ruparel College, is an undergraduate college in Matunga, Mumbai, Maharashtra, India. It is run by the Modern Education Society, Pune and is affiliated with the University of Mumbai.[1]", "images/ruparel/c1.jpeg", "images/ruparel/c2.jpeg",
            ["images/ruparel/c4.jpeg", "images/ruparel/c2.jpeg", "images/ruparel/c3.jpeg", "images/ruparel/c4.jpeg"]],
        kelkar: ["V.G. Vaze College of Arts, Science and Commerce", "Vinayak Ganesh Vaze College of Arts, Science and Commerce (Autonomous) is a Mumbai University affiliated college located in Mulund, Mumbai. The college was established in 1984 by the Kelkar Education Trust.", "./images/kelkar/new1.jfif", "images/kelkar/c2.png",
            ["images/kelkar/c2.png", "images/kelkar/c3.jpg"]],
        dav: ["Ramanand Arya D.A.V College", "D.A.V. College is a prestigious educational institution dedicated to providing quality education. It offers various undergraduate and postgraduate courses in Arts, Science, and Commerce streams.", "images/dav/logo.jpg", "images/dav/c2.jpeg",
            ["images/dav/c2.jpeg", "images/dav/c3.jpeg", "images/dav/c4.jpeg", "images/dav/c8.jpg"]],
        mulund: ["Mulund College of Commerce", "Mulund College of Commerce (MCC) is a premier educational institution in Mumbai, known for its excellence in commerce education and holistic development of students.", "images/mulund/c1.jpeg", "images/mulund/c2.jpeg",
            ["images/mulund/c2.jpeg", "images/mulund/c3.jpeg"]],
        somaiya: ["S. K. Somaiya Degree College of Arts, Science And Commerce", "S. K. Somaiya College is part of the Somaiya Vidyavihar University, offering a wide range of undergraduate and postgraduate programs with a focus on academic excellence and research.", "images/somaiya/c1.jpeg", "images/somaiya/c2.jpeg",
            ["images/somaiya/c2.jpeg", "images/somaiya/c3.jpeg"]]
    };



    setCollege(selectedCollege, ...data[selectedCollege]);
}

function setCollege(key, name, paragraph, logo, hero, images) {
    document.getElementById("collegeName").innerText = name;
    document.getElementById("paragraph").innerText = paragraph;
    document.getElementById("headerCollegeName").innerText = name;
    document.getElementById("collegeLogo").src = logo;
    document.getElementById("hero").style.backgroundImage = `url(${hero})`;
    localStorage.setItem("collegeLogo", logo);
    localStorage.setItem("collegeName", name);

    document.getElementById("siteHeader").style.backgroundColor = collegeThemes[key].header;
    localStorage.setItem("collegeHeaderColor", collegeThemes[key].header);



    document.querySelector("footer").style.backgroundColor = collegeThemes[key].footer;

    loadSlider(images);
    loadReviews(key);
}

function loadSlider(images) {
    slides = images;
    slideIndex = 0;

    for (let i = 1; i <= 5; i++) {
        const img = document.getElementById(`slide${i}`);
        img.style.display = images[i - 1] ? "block" : "none";
        if (images[i - 1]) img.src = images[i - 1];
    }

    updateSlide();
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
}

function updateSlide() {
    document.getElementById("sliderWrapper").style.transform =
        `translateX(-${slideIndex * 100}%)`;
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    updateSlide();
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    updateSlide();
}

function loadReviews(key) {
    const container = document.getElementById("reviewContainer");
    container.innerHTML = "";

    collegeReviews[key].forEach(r => {
        container.innerHTML += `
        <div class="review-card">
            <img src="${r.photo}">
            <h4>${r.name}</h4>
            <p>${r.text}</p>
        </div>`;
    });
}
function setCollegeKey(key) {
    localStorage.setItem("collegeKey", key);
}
function loadAcademics(type) {

    const data = {
        pre: {
            title: "Pre-Primary (Nursery / Jr.Kg / Sr.Kg)",
            desc: "Early childhood education focusing on social and cognitive skills.",
            time: "School Timing: 08:30 AM to 11:30 AM",
            features: [
                "Play way learning",
                "Language development",
                "Social skills",
                "Cognitive growth"
            ],
            facilities: [
                "Colourful classrooms",
                "Trained teachers",
                "Toys and games",
                "Safe playground"
            ]
        },

        primary: {
            title: "Primary Section",
            desc: "Strong foundation in academics and moral values.",
            time: "School Timing: 08:30 AM to 01:00 PM",
            features: [
                "Concept clarity",
                "Activity based learning",
                "Reading skills",
                "Logical thinking"
            ],
            facilities: [
                "Smart classrooms",
                "Library",
                "Computer lab",
                "Sports facilities"
            ]
        },

        upper: {
            title: "Upper Primary",
            desc: "Preparing students for advanced academics.",
            time: "School Timing: 08:30 AM to 01:30 PM",
            features: [
                "Critical thinking",
                "Project based learning",
                "Science exposure"
            ],
            facilities: [
                "Science lab",
                "Digital learning",
                "Library access"
            ]
        },

        secondary: {
            title: "Secondary Section",
            desc: "Board exam preparation with career guidance.",
            time: "School Timing: 08:30 AM to 02:00 PM",
            features: [
                "Exam focused teaching",
                "Career counseling",
                "Practical learning"
            ],
            facilities: [
                "Physics/Chemistry labs",
                "Counseling sessions",
                "Mock tests"
            ]
        },

        junior: {
            title: "Junior College",
            desc: "Specialized streams for higher education.",
            time: "School Timing: 09:00 AM to 03:00 PM",
            features: [
                "Commerce / Science streams",
                "Career guidance",
                "Industry exposure"
            ],
            facilities: [
                "Experienced faculty",
                "Seminars",
                "Library & labs"
            ]
        }
    };

    document.getElementById("academicTitle").innerText = data[type].title;
    document.getElementById("academicDesc").innerText = data[type].desc;
    document.getElementById("academicTime").innerText = data[type].time;

    document.getElementById("featureList").innerHTML =
        data[type].features.map(f => `<li>${f}</li>`).join("");

    document.getElementById("facilityList").innerHTML =
        data[type].facilities.map(f => `<li>${f}</li>`).join("");
}

document.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop &&
            pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {

    const courseSelect = document.getElementById("course");
    const courseFees = document.getElementById("courseFees");

    if (!courseSelect || !courseFees) {
        console.warn("Course select or fees input not found on this page");
        return;
    }

    const feesMap = {
        "B.Sc Information Technology": "₹ 35,000",
        "B.Com": "₹ 25,000",
        "BMS": "₹ 30,000",
        "BA": "₹ 20,000",
        "Junior Science": "₹ 18,000",
        "Junior Commerce": "₹ 15,000"
    };

    courseSelect.addEventListener("change", function () {
        courseFees.value = feesMap[this.value] || "₹ 0";
    });

});
// Admission Form Handling
document.addEventListener("DOMContentLoaded", function () {
    const admissionForm = document.querySelector('.admission-form');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const fullname = document.getElementById("fullname").value;
            const email = document.getElementById("email").value;
            const mobile = document.getElementById("mobile").value;
            const dob = document.getElementById("dateofbirth").value;
            const course = document.getElementById("course").value;
            const category = document.getElementById("category").value;

            // Construct WhatsApp Message
            const message = `*NEW ADMISSION APPLICATION*\n\n` +
                `*Name:* ${fullname}\n` +
                `*Email:* ${email}\n` +
                `*Mobile:* ${mobile}\n` +
                `*DOB:* ${dob}\n` +
                `*Course:* ${course}\n` +
                `*Category:* ${category}`;

            const wpNumber = "919594662086";
            const wpUrl = `https://wa.me/${wpNumber}?text=${encodeURIComponent(message)}`;

            // Open WhatsApp
            window.open(wpUrl, "_blank");

            // Show success popup
            const popup = document.getElementById('successTick');
            if (popup) {
                popup.classList.add('show');
                setTimeout(() => {
                    popup.classList.remove('show');
                }, 3000);
            }

            // Reset form
            admissionForm.reset();
        });
    }
});

function openTab(tabId) {
    let tabs = document.querySelectorAll(".tab-box");
    let btns = document.querySelectorAll(".tab-btn");

    tabs.forEach(tab => tab.classList.remove("active"));
    btns.forEach(btn => btn.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
    if (event && event.target) {
        event.target.classList.add("active");
    }
}

let selectedId = null;
function selectCollege(key, el) {
    selectedCollege = key;
    // Update hidden select if it exists
    const hiddenSelect = document.getElementById("collegeSelect");
    if (hiddenSelect) hiddenSelect.value = key;

    document.querySelectorAll(".college-card").forEach(c =>
        c.classList.remove("active") // Using 'active' to match your JS
    );
    el.classList.add("active");
}

// Ensure the button calls the right function
function handleEntry() {
    if (!selectedCollege) {
        alert("Please select a college");
        return;
    }

    // Show the tick
    const popup = document.getElementById('successTick');
    if (popup) popup.classList.add('show');

    // Wait 1.5 seconds then load
    setTimeout(() => {
        if (popup) popup.classList.remove('show');
        loadCollege();
    }, 600);
}

function toggleContact() {
    const options = document.getElementById("contactOptions");
    if (options) {
        options.style.display = options.style.display === "flex" ? "none" : "flex";
    }
}

// Global function alias for convenience
function sendtoWhatsapp() {
    const form = document.querySelector('.admission-form');
    if (form) {
        form.requestSubmit(); // This triggers the submit event listener above
    }
}

// Payment Form Interactivity
document.addEventListener("DOMContentLoaded", function () {
    const cardInput = document.getElementById('cardNum');
    const expiryInput = document.getElementById('expiryDate');
    const payForm = document.getElementById('payForm');

    if (cardInput) {
        cardInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
            e.target.value = formatted;
        });
    }

    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length > 2) {
                e.target.value = val.substring(0, 2) + '/' + val.substring(2, 4);
            } else {
                e.target.value = val;
            }
        });
    }

    if (payForm) {
        payForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.innerText = "Verifying...";
            btn.disabled = true;

            setTimeout(() => {
                const popup = document.getElementById('successTick');
                if (popup) popup.classList.add('show');

                setTimeout(() => {
                    if (popup) popup.classList.remove('show');
                    window.location.href = "index.html";
                }, 2500);
            }, 1500);
        });
    }
});
document.querySelectorAll('.header-right a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.header-right a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});

function toggleMenu() {
    const nav = document.querySelector('.header-right');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    nav.classList.toggle('active');
    menuBtn.classList.toggle('active');

    // Close menu when clicking outside
    if (nav.classList.contains('active')) {
        document.addEventListener('click', closeMenuOnOutsideClick);
    } else {
        document.removeEventListener('click', closeMenuOnOutsideClick);
    }
}

function closeMenuOnOutsideClick(e) {
    const nav = document.querySelector('.header-right');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove('active');
        menuBtn.classList.remove('active');
        document.removeEventListener('click', closeMenuOnOutsideClick);
    }
}

// Close mobile menu when clicking a link
document.querySelectorAll('.header-right a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.header-right').classList.remove('active');
        document.querySelector('.mobile-menu-btn').classList.remove('active');
    });
});

// ===== RANDOM QUOTE POPUP API =====
async function showQuote() {
    const popup = document.getElementById('announcementPopup');
    const textEl = document.getElementById('announcementText');
    const authorEl = document.getElementById('quoteAuthor');
    
    if (!popup || !textEl) return;

    try {
        // Fetching from a reliable public quote API
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        
        // Set content
        textEl.innerText = `"${data.content || data.quote || 'Stay inspired!'}"`;
        if (authorEl) authorEl.innerText = `- ${data.author || 'Anonymous'}`;

        // Show popup
        popup.classList.add('show');

        // Auto-hide after 10 seconds
        setTimeout(hideAnnouncement, 10000);
    } catch (error) {
        console.error("Error fetching quote:", error);
    }
}

function hideAnnouncement() {
    const popup = document.getElementById('announcementPopup');
    if (popup) popup.classList.remove('show');
}

// Start the popup cycle after page loads
window.addEventListener('load', () => {
    // Show first quote after 3 seconds
    setTimeout(showQuote, 3000);

    // Show another one every 30 seconds
    setInterval(showQuote, 30000);
});






