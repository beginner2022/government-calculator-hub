/* ==========================================================
   GOVCALC INDIA
   SCRIPT.JS
   STEP 8.1
   CORE ENGINE
==========================================================*/


/*==========================================================
GLOBAL APP STATE
==========================================================*/

const GovCalc = {

    currentTool: null,

    init() {
        this.bindUI();
        this.setActiveNav();
    },

    bindUI() {

        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute("href"));
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            });
        });

    },

    setActiveNav() {

        const links = document.querySelectorAll(".nav-link");

        links.forEach(link => {
            if (link.href === window.location.href) {
                link.classList.add("active");
            }
        });

    }

};


/*==========================================================
TOOL ROUTER SYSTEM (IMPORTANT FOR SCALE)
==========================================================*/

function openTool(toolName) {

    GovCalc.currentTool = toolName;

    console.log("Opening tool:", toolName);

    // Future: load tool dynamically
    const toolSections = document.querySelectorAll(".tool-section");

    toolSections.forEach(sec => sec.style.display = "none");

    const target = document.getElementById(toolName);

    if (target) {
        target.style.display = "block";
        target.scrollIntoView({ behavior: "smooth" });
    }

}


/*==========================================================
UI HELPERS
==========================================================*/

function toggleClass(element, className) {

    if (!element) return;

    element.classList.toggle(className);

}


/*==========================================================
INITIALIZE APP
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    GovCalc.init();

});

/* ==========================================================
   GOVCALC INDIA
   SCRIPT.JS
   STEP 8.2
   SALARY CALCULATOR ENGINE
==========================================================*/


/*==========================================================
SALARY CALCULATOR CONFIG
==========================================================*/

const SalaryConfig = {

    // Default government-style assumptions (editable later)
    daRate: 0.46,   // 46% DA (example current range)
    hraRate: 0.24   // 24% HRA (varies by city class)
};


/*==========================================================
SALARY CALCULATOR CORE FUNCTION
==========================================================*/

function calculateSalary() {

    const basicInput = document.getElementById("basicPay");
    const cityType = document.getElementById("cityType");

    if (!basicInput) return;

    const basic = parseFloat(basicInput.value) || 0;

    const city = cityType ? cityType.value : "metro";

    // Adjust HRA based on city type
    let hraRate = SalaryConfig.hraRate;

    if (city === "metro") hraRate = 0.24;
    if (city === "tier2") hraRate = 0.16;
    if (city === "rural") hraRate = 0.08;

    // Calculations
    const da = basic * SalaryConfig.daRate;
    const hra = basic * hraRate;

    const grossSalary = basic + da + hra;

    // Simplified deduction model (PF approx 12%)
    const pf = basic * 0.12;

    const netSalary = grossSalary - pf;

    // Output results
    updateSalaryUI({
        basic,
        da,
        hra,
        pf,
        grossSalary,
        netSalary
    });
}


/*==========================================================
UPDATE UI FUNCTION
==========================================================*/

function updateSalaryUI(data) {

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = Math.round(value).toLocaleString("en-IN");
    };

    setText("basicOutput", data.basic);
    setText("daOutput", data.da);
    setText("hraOutput", data.hra);
    setText("pfOutput", data.pf);
    setText("grossOutput", data.grossSalary);
    setText("netOutput", data.netSalary);
}


/*==========================================================
LIVE INPUT BINDING
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const basicInput = document.getElementById("basicPay");
    const cityType = document.getElementById("cityType");

    if (basicInput) {
        basicInput.addEventListener("input", calculateSalary);
    }

    if (cityType) {
        cityType.addEventListener("change", calculateSalary);
    }

});
/* ==========================================================
   DA CALCULATOR (STEP 8.3)
==========================================================*/

function calculateDA() {

    const basic = parseFloat(document.getElementById("daBasicPay")?.value) || 0;
    const rate = parseFloat(document.getElementById("daRate")?.value) || 0;

    const daAmount = basic * rate;

    const monthlyDA = daAmount;
    const yearlyDA = daAmount * 12;

    updateDAUI({
        basic,
        daAmount,
        monthlyDA,
        yearlyDA
    });
}


/* UPDATE DA UI */
function updateDAUI(data) {

    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = Math.round(val).toLocaleString("en-IN");
    };

    set("daBasicOutput", data.basic);
    set("daAmountOutput", data.daAmount);
    set("monthlyDA", data.monthlyDA);
    set("yearlyDA", data.yearlyDA);
}


/* LIVE BINDING */
document.addEventListener("DOMContentLoaded", () => {

    const basic = document.getElementById("daBasicPay");
    const rate = document.getElementById("daRate");

    if (basic) basic.addEventListener("input", calculateDA);
    if (rate) rate.addEventListener("change", calculateDA);

});
