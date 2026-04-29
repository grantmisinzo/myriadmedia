const WHATSAPP_LINK = 'https://wa.me/message/C4VHC5LC3PQZE1';

function openModal() {
  document.getElementById('modal').classList.add('active');
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const city = form.city.value;
    const phone = form.phone.value;
    const source = form.source.value;
    const referral = form.referral.value;

    let message = `Hi! I'd like to sign up for Spotify Premium.\n\nName: ${name}\nCity: ${city}\nPhone: ${phone}\nHow did you hear about us: ${source}`;
    if (referral) message += `\nReferral Code: ${referral}`;

    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`, '_blank');
    closeModal();
    form.reset();
  });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const emailInput = contactForm.querySelector('input[name="email"]');
  const nameInput = contactForm.querySelector('input[name="name"]');
  const messageInput = contactForm.querySelector('textarea[name="message"]');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  [nameInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('focus', () => input.classList.add('focused'));
      input.addEventListener('blur', () => input.classList.remove('focused'));
    }
  });

  if (emailInput) {
    emailInput.addEventListener('focus', () => {
      emailInput.classList.remove('error', 'valid');
      emailInput.classList.add('focused');
    });
    emailInput.addEventListener('blur', () => {
      emailInput.classList.remove('focused');
      if (emailInput.value && !validateEmail(emailInput.value)) {
        emailInput.classList.add('error');
      } else if (emailInput.value) {
        emailInput.classList.add('valid');
      }
    });
    emailInput.addEventListener('input', () => {
      emailInput.classList.remove('error', 'valid', 'focused');
      if (emailInput.value && validateEmail(emailInput.value)) {
        emailInput.classList.add('valid');
      } else if (emailInput.value) {
        emailInput.classList.add('error');
      }
    });
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const text = `Contact Form Message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    window.location.href = `${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`;
  });
}