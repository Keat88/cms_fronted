(function () {
  'use strict';

  function icon(name) {
    return '<i class="bi bi-' + name + '"></i>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-password-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        var input = document.querySelector(button.getAttribute('data-password-toggle'));
        if (!input) return;

        var willShow = input.type === 'password';
        input.type = willShow ? 'text' : 'password';
        button.innerHTML = icon(willShow ? 'eye-slash' : 'eye');
        button.setAttribute('aria-label', willShow ? 'Hide password' : 'Show password');
        button.setAttribute('title', willShow ? 'Hide password' : 'Show password');
      });
    });

    var confirm = document.getElementById('confirmPassword');
    if (confirm) {
      confirm.addEventListener('input', function () {
        confirm.setCustomValidity('');
      });
    }

    document.querySelectorAll('[data-auth-form]').forEach(function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();

        var status = document.querySelector('[data-auth-status]');
        form.classList.add('was-validated');

        if (!form.checkValidity()) {
          if (status) {
            status.textContent = 'Please check the highlighted fields and try again.';
            status.className = 'auth-status is-visible is-error';
          }
          return;
        }

        if (confirm && confirm.value !== document.getElementById('password').value) {
          confirm.setCustomValidity('Passwords do not match.');
          confirm.reportValidity();
          return;
        }

        if (status) {
          status.textContent = 'Design preview: connect your authentication API to continue.';
          status.className = 'auth-status is-visible';
        }
      });
    });
  });
})();
