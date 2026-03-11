document.addEventListener('DOMContentLoaded', () => {
    const quizRoot = document.getElementById('quiz-root');
    let currentStep = 1;
    const totalSteps = 4;
    const leadData = {};

    const steps = {
        1: {
            title: "What niche is your business in?",
            options: [
                { label: "Land Clearing", value: "land-clearing" },
                { label: "Excavation", value: "excavation" },
                { label: "Forestry Mulching", value: "forestry-mulching" },
                { label: "Site Prep", value: "site-prep" }
            ]
        },
        2: {
            title: "Do you currently have crews available to take on more work?",
            options: [
                { label: "Yes, we are ready to grow", value: "yes" },
                { label: "No, we are at capacity", value: "no" }
            ]
        },
        3: {
            title: "What was your approximate business revenue in 2025?",
            options: [
                { label: "Under $100K", value: "under-100k" },
                { label: "$250K–$500K", value: "250k-500k" },
                { label: "$500K–$1M", value: "500k-1m" },
                { label: "$1M+", value: "1m-plus" }
            ]
        },
        4: {
            title: "Where should we send your results?",
            type: "form"
        }
    };

    function renderStep(stepNum) {
        const step = steps[stepNum];
        let html = `<div id="quiz-step-${stepNum}" class="quiz-step active">
            <h2>${step.title}</h2>`;

        if (step.type === "form") {
            html += `
                <form id="lead-form">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" required placeholder="Enter your full name">
                    </div>
                    <div class="form-group">
                        <label>Business Name</label>
                        <input type="text" name="business" required placeholder="Enter your business name">
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" required placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" required placeholder="Enter your phone number">
                    </div>
                    <button type="submit" class="submit-btn">Get My Results</button>
                </form>
            `;
        } else {
            html += `<div class="options-grid">`;
            step.options.forEach(opt => {
                html += `<button class="option-btn" data-value="${opt.value}">${opt.label}</button>`;
            });
            html += `</div>`;
        }

        html += `</div>`;
        quizRoot.innerHTML = html;

        // Attach listeners
        if (step.type === "form") {
            document.getElementById('lead-form').addEventListener('submit', handleFinalSubmit);
        } else {
            const btns = quizRoot.querySelectorAll('.option-btn');
            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const value = btn.getAttribute('data-value');
                    leadData[`step${stepNum}`] = value;
                    nextStep();
                });
            });
        }
    }

    function nextStep() {
        if (currentStep < totalSteps) {
            currentStep++;
            renderStep(currentStep);
        }
    }

    function handleFinalSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.forEach((value, key) => {
            leadData[key] = value;
        });

        console.log("Final Lead Data Collected:", leadData);
        
        quizRoot.innerHTML = `
            <div class="quiz-step active">
                <h2>Thank You!</h2>
                <p>We've received your information. A specialist from Black Oaks Land Clearing will reach out to you within 24 hours.</p>
            </div>
        `;
    }

    // Initialize
    renderStep(1);
});
