document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let emailInput = document.getElementById("email");
    let emailError = document.getElementById("emailError");
    let phoneError = document.getElementById("phoneError");
    let phoneInput = document.getElementById("phone");

    let emailPattern = /^[a-zA-Z0-9._%+-]+@marmeto\.com$/;
    let phonePattern = /^\+91\s[6-9]\d{9}$/; 

    let isValid = true;

  
    if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid Marmeto email (e.g., name@marmeto.com)";
        isValid = false;
    } else {
        emailError.textContent = "";
        let emailName = emailInput.value.split("@")[0];
        sessionStorage.setItem("userName", emailName);
    }

   
    if (!phonePattern.test(phoneInput.value)) {
        phoneError.textContent = "Enter a valid Indian mobile number (e.g., +91 9876543210)";
        isValid = false;
    } else {
        phoneError.textContent = "";
    }

    
    if (isValid) {
        document.getElementById("myForm").style.display = "none";
        document.getElementById("page2").style.display = "block";
    }
});


function editEmail() {
    let emailInput = document.getElementById("email");
    emailInput.removeAttribute("readonly"); 
    emailInput.focus(); 

    let length = emailInput.value.length;
    emailInput.setSelectionRange(length, length);
}

const otpInputs = document.querySelectorAll(".otp-input");
const otpError = document.getElementById("otpError");

otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
        let value = e.target.value;

        // Allow only numbers
        e.target.value = value.replace(/\D/g, "");

        if (e.target.value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && index > 0 && !e.target.value) {
            otpInputs[index - 1].focus();
        }
    });
});

document.getElementById("confirmBtn").addEventListener("click", function () {
    let otpValue = "";
    otpInputs.forEach(input => {
        otpValue += input.value;
    });

    if (otpValue === "2025") {
        document.getElementById("page2").style.display = "none";
        document.getElementById("page3").style.display = "block";

        let userName = sessionStorage.getItem("userName");
        if (userName) {
            document.getElementById("userEmailDisplay").textContent = userName;
        }
    } else {
        otpError.textContent = "Invalid OTP. Please try again.";
    }
});



document.getElementById("backbtn").addEventListener("click", function() {
    document.getElementById("page2").style.display = "none";
    document.getElementById("myForm").style.display = "block";
});

function redirectToHome() {
    sessionStorage.clear(); 
    window.location.href = "index.html"; 
}