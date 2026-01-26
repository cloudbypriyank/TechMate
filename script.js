let selectedCollege = "";
let slideIndex = 0;
let slides = [];
let autoSlide;

const collegeThemes = {
    ruparel: { header: "#4a6bec", footer: "rgba(8, 227, 243, 1)" },
    kelkar: { header: "rgb(239, 136, 10)", footer: "#13255a" },
    dav: { header: "rgb(12, 147, 226)", footer: "rgba(100, 214, 246, 1)" },
    mulund: { header: "#8a4b08", footer: "#5c3205" },
    somaiya: { header: "#ed1f11ff", footer: "#faf8fcff" }
};



function selectCollege(key, el) {
    selectedCollege = key;
    document.getElementById("collegeSelect").value = key;

    document.querySelectorAll(".college-card").forEach(c =>
        c.classList.remove("active")
    );
    el.classList.add("active");
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
            ["images/ruparel/c2.jpeg", "images/ruparel/c3.jpeg", "images/ruparel/c4.jpeg"]],
        kelkar: ["Kelkar College", "Vinayak Ganesh Vaze College of Arts, Science and Commerce (Autonomous) is a Mumbai University affiliated college located in Mulund, Mumbai. The college was established in 1984 by the Kelkar Education Trust.", "images/kelkar/c1.png", "images/kelkar/c2.png",
            ["images/kelkar/c2.png", "images/kelkar/c3.jpg"]],
        dav: ["DAV College", "D.A.V. College is a prestigious educational institution dedicated to providing quality education. It offers various undergraduate and postgraduate courses in Arts, Science, and Commerce streams.", "images/dav/logo.jpg", "images/dav/c2.jpeg",
            ["images/dav/c2.jpeg", "images/dav/c3.jpeg"]],
        mulund: ["Mulund College of Commerce", "Mulund College of Commerce (MCC) is a premier educational institution in Mumbai, known for its excellence in commerce education and holistic development of students.", "images/mulund/c1.jpeg", "images/mulund/c2.jpeg",
            ["images/mulund/c2.jpeg", "images/mulund/c3.jpeg"]],
        somaiya: ["SK Somaiya College", "S. K. Somaiya College is part of the Somaiya Vidyavihar University, offering a wide range of undergraduate and postgraduate programs with a focus on academic excellence and research.", "images/somaiya/c1.jpeg", "images/somaiya/c2.jpeg",
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
    autoSlide = setInterval(nextSlide, 3000);
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
document.querySelector('.admission-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page from refreshing

    // Send to WhatsApp
    sendtoWhatsapp();

    const popup = document.getElementById('successTick');
    
    // Show the tick
    if (popup) {
        popup.classList.add('show');

        // Hide it again after 3 seconds
        setTimeout(() => {
            popup.classList.remove('show');
        }, 3000);
    }

    // Reset the form
    this.reset();
});

function openTab(tabId) {
  let tabs = document.querySelectorAll(".tab-box");
  let btns = document.querySelectorAll(".tab-btn");

  tabs.forEach(tab => tab.classList.remove("active"));
  btns.forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  event.target.classList.add("active");
}
let selectedId = null;
function selectCollege(key, el) {
    selectedCollege = key;
    // Update hidden select if it exists
    const hiddenSelect = document.getElementById("collegeSelect");
    if(hiddenSelect) hiddenSelect.value = key;

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
    if(popup) popup.classList.add('show');

    // Wait 1.5 seconds then load
    setTimeout(() => {
        popup.classList.remove('show');
        loadCollege();
    }, 600);
}

function toggleContact() {
    const options = document.getElementById("contactOptions");
    options.style.display = options.style.display === "flex" ? "none" : "flex";
}

function sendtoWhatsapp() {
    let number = "919594662086";
    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let dateofbirth = document.getElementById("dateofbirth").value;
    let course = document.getElementById("course").value;
    let category = document.getElementById("category").value;
    let message = `*Admission Application*\n\n` +
                  `*Full Name:* ${fullname}\n` +
                  `*Email:* ${email}\n` +
                  `*Mobile:* ${mobile}\n` +
                  `*Date of Birth:* ${dateofbirth}\n` +
                  `*Course:* ${course}\n` +
                  `*Category:* ${category}`;
    
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
}


    


