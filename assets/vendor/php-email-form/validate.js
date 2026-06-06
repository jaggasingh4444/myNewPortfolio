/**
* Contact Form Submitter
* Sends portfolio messages to Jagdish Pandey through FormSubmit.
*/
(function () {
  "use strict";

  const emailEndpoint = 'https://formsubmit.co/ajax/jagdishpandey4444@gmail.com';
  const forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(form) {
    form.setAttribute('action', emailEndpoint);

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const loading = form.querySelector('.loading');
      const errorMessage = form.querySelector('.error-message');
      const sentMessage = form.querySelector('.sent-message');
      const formData = new FormData(form);

      loading.classList.add('d-block');
      errorMessage.classList.remove('d-block');
      errorMessage.innerHTML = '';
      sentMessage.classList.remove('d-block');

      formData.set('_subject', 'New message from Jagdish Pandey portfolio');
      formData.set('_template', 'table');
      formData.set('_captcha', 'false');

      fetch(emailEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Message could not be sent. Please try again or email me directly at jagdishpandey4444@gmail.com.');
        }
        return response.json();
      })
      .then(function(data) {
        if (data.success === true || data.success === 'true') {
          loading.classList.remove('d-block');
          sentMessage.classList.add('d-block');
          alert(sentMessage.textContent.trim());
          form.reset();
          return;
        }

        throw new Error('Message could not be sent. Please email me directly at jagdishpandey4444@gmail.com.');
      })
      .catch(function(error) {
        loading.classList.remove('d-block');
        errorMessage.innerHTML = error.message || 'Message could not be sent. Please email me directly at jagdishpandey4444@gmail.com.';
        errorMessage.classList.add('d-block');
      });
    });
  });
})();
