function nextStep() {
    // Basic validation check before moving
    const step1Inputs = document.querySelectorAll('#step1 input[required], #step1 select[required]');
    let valid = true;
    step1Inputs.forEach(input => { if(!input.value) valid = false; });

    if (valid) {
        document.getElementById('step1').classList.add('hidden');
        document.getElementById('step2').classList.remove('hidden');
        document.getElementById('stepIndicator').innerText = "Step 2 of 2";
        document.getElementById('stepTitle').innerText = "Your Information";
    } else {
        alert("Please fill in all required fields.");
    }
}

function prevStep() {
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
    document.getElementById('stepIndicator').innerText = "Step 1 of 2";
    document.getElementById('stepTitle').innerText = "Booking Information";
}
