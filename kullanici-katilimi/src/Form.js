import React from "react";

function Form(props) {
  const { formData, handleChange, handleSubmit, disableButton } = props;

  return (
    <form onSubmit={(event) => handleSubmit(event)} data-cy="form-submit">
      <p>
        <label htmlFor="isimArea">İsim-Soyisim: </label>
        <input
          id="isimArea"
          name="isim"
          type="text"
          placeholder="İsim-Soyisim"
          value={formData.isim}
          onChange={(event) => handleChange(event)}
          data-cy="isim"
        />
      </p>
      <p>
        <label htmlFor="emailArea">E-mail: </label>
        <input
          id="emailArea"
          name="email"
          type="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={(event) => handleChange(event)}
          data-cy="email"
        />
      </p>
      <p>
        <label htmlFor="sifreArea">Şifre: </label>
        <input
          id="sifreArea"
          name="sifre"
          type="password"
          placeholder="Şifre"
          value={formData.sifre}
          onChange={(event) => handleChange(event)}
          data-cy="sifre"
        />
      </p>
      <p>
        <input
          id="kosulArea"
          name="kosul"
          type="checkbox"
          value={formData.kosul}
          onChange={(event) => handleChange(event)}
          data-cy="kosul"
        />
        <label htmlFor="kosulArea">Şartlar ve koşulları kabul ediyorum</label>
      </p>
      <p>
        <button type="submit" disabled={disableButton} data-cy="buton">
          Gönder
        </button>
      </p>
    </form>
  );
}
export default Form;
