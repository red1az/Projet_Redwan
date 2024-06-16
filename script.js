document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        console.log(bar);  
        bar.style.width = bar.getAttribute('data-progress');
    });
});

document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    var form = event.target;
    var data = new FormData(form);
    var formMessages = document.getElementById('form-messages');

    try {
        let response = await fetch(form.action, {
            method: form.method,
            headers: {
                'Accept': 'application/json'
            },
            body: data
        });

        if (response.ok) {
            formMessages.innerHTML = '<div class="alert alert-success">Message envoyé avec succès!</div>';
            form.reset(); 
        } else {
            let errorData = await response.json();
            formMessages.innerHTML = `<div class="alert alert-danger">Une erreur s'est produite: ${errorData.error || 'Veuillez réessayer plus tard.'}</div>`;
        }
    } catch (error) {
        formMessages.innerHTML = `<div class="alert alert-danger">Une erreur s'est produite: ${error.message}</div>`;
    }
});