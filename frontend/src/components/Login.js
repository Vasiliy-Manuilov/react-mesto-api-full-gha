import React from 'react';
function Login(props) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = formValue;
    props.onLogin(email, password);
  }

  return (
    <main>
      <section className="authorization">
        <h2 className="authorization__title">Вход</h2>
        <form
          className="authorization__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            id="email"
            name="email"
            className="authorization__input"
            type="email"
            value={formValue.email}
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            id="password"
            name="password"
            className="authorization__input"
            type="password"
            value={formValue.password}
            placeholder="Пароль"
            onChange={handleChange}
            required
          />
          <button className="authorization__btn" type="submit" title="Войти">
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
