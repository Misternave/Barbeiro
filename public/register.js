const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');
const nameError = document.querySelector('.name.error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  //get values
  const email = form.email.value;
  const password = form.password.value;
  const passwordrepeat = form.passwordrepeat;
  const name = form.name.value;

  // reset errors
  emailError.textContent = '';
  passwordError.textContent = '';
  nameError.textContent = '';

  try {
    const res = await fetch('/register', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        passwordrepeat: passwordrepeat,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
    }

    if (data.user) {
      location.assign('/');
    }
  } catch (err) {
    console.log(err);
  }
});
