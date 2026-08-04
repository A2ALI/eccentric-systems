/**
 * Eccentric Systems - Multi-Step Interactive Form UX
 * One question per screen, progress dots, back button, smooth transitions, Formspree AJAX submission.
 */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.interactive-form');
  if (!form) return;

  const steps = Array.from(form.querySelectorAll('.form-step'));
  const progressContainer = form.querySelector('.form-progress');
  const completionScreen = document.getElementById('form-completion');
  const submittedMessage = document.getElementById('form-submitted-message');
  const declineBtn = document.getElementById('form-decline-call');
  const bookCallBtn = document.getElementById('form-book-call');

  let currentStep = 0;
  let hasStarted = false;

  // Build progress dots
  if (progressContainer) {
    progressContainer.innerHTML = '';
    steps.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'progress-dot' + (index === 0 ? ' active' : '');
      progressContainer.appendChild(dot);
    });
  }

  const dots = progressContainer ? Array.from(progressContainer.querySelectorAll('.progress-dot')) : [];

  function updateStep(newIndex, shouldFocus = true) {
    if (newIndex < 0 || newIndex >= steps.length) return;

    steps[currentStep].classList.remove('active');
    currentStep = newIndex;
    steps[currentStep].classList.add('active');

    // Update dots
    dots.forEach((dot, idx) => {
      dot.className = 'progress-dot';
      if (idx === currentStep) {
        dot.classList.add('active');
      } else if (idx < currentStep) {
        dot.classList.add('completed');
      }
    });

    // Only focus when explicitly requested (e.g. on user clicking next/back, not on load)
    if (shouldFocus) {
      const input = steps[currentStep].querySelector('input, textarea');
      if (input) {
        setTimeout(() => input.focus(), 150);
      }
    }
  }

  function validateCurrentStep() {
    const activeStep = steps[currentStep];
    const input = activeStep.querySelector('input, textarea');
    if (!input) return true;

    if (input.required && !input.value.trim()) {
      input.focus();
      input.style.borderColor = '#e53e3e';
      setTimeout(() => {
        input.style.borderColor = '';
      }, 1500);
      return false;
    }

    if (input.type === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value.trim())) {
        input.focus();
        input.style.borderColor = '#e53e3e';
        setTimeout(() => {
          input.style.borderColor = '';
        }, 1500);
        return false;
      }
    }

    return true;
  }

  // Handle first input / form_start event
  form.addEventListener('input', function () {
    if (!hasStarted) {
      hasStarted = true;
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('form_start', { form_id: form.id });
      }
    }
  });

  // Next / Submit buttons on steps
  steps.forEach((step, index) => {
    const nextBtn = step.querySelector('.form-next-btn');
    const backBtn = step.querySelector('.form-nav-back');
    const input = step.querySelector('input, textarea');

    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (!validateCurrentStep()) return;

        if (index < steps.length - 1) {
          updateStep(index + 1, true);
        } else {
          submitForm();
        }
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (index > 0) {
          updateStep(index - 1, true);
        }
      });
    }

    if (input && input.tagName === 'INPUT') {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (nextBtn) nextBtn.click();
        }
      });
    }
  });

  function submitForm() {
    const endpoint = form.getAttribute('action');
    const formData = new FormData(form);
    const submitBtn = steps[currentStep].querySelector('.form-next-btn');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'Submitting...';
    }

    fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          handleSuccess();
        } else {
          return response.json().then(data => {
            alert(data?.errors?.map(err => err.message).join(", ") || 'Submission failed. Please try again.');
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerText = 'Submit';
            }
          });
        }
      })
      .catch(error => {
        handleSuccess();
      });
  }

  function handleSuccess() {
    if (typeof window.trackEvent === 'function') {
      window.trackEvent('form_complete', { form_id: form.id });
    }

    form.style.display = 'none';
    if (completionScreen) {
      completionScreen.style.display = 'block';
    }
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', function (e) {
      e.preventDefault();
      declineBtn.style.display = 'none';
      if (bookCallBtn) bookCallBtn.style.display = 'none';
      const heading = completionScreen?.querySelector('h2');
      if (heading) heading.style.display = 'none';
      if (submittedMessage) {
        submittedMessage.style.display = 'block';
      }
    });
  }

  if (bookCallBtn) {
    bookCallBtn.addEventListener('click', function () {
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('calendar_click', { link: 'cal.com' });
      }
    });
  }
});
