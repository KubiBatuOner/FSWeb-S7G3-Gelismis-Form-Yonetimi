import { useState, useEffect } from "react";
import * as Yup from "yup";
import "./App.css";
import axios from "axios";
import Form from "./Form";

const formSchema = Yup.object().shape({
  isim: Yup.string().required("İsim-Soyisim alanını doldurmanız zorunlu"),
  email: Yup.string()
    .email("Geçerli bir e-mail adresi olmalı")
    .required("E-mail adresini içermelidir"),
  sifre: Yup.string()
    .required("Şifre gereklidir")
    .min(6, "Şifreler en az 6 karakter uzunluğunda olmalıdır"),
  kosul: Yup.boolean().oneOf([true], "Şartlar ve koşulları kabul etmelisiniz"),
});

function App() {
  const [formData, setFormData] = useState({
    isim: "",
    email: "",
    sifre: "",
    kosul: false,
  });

  const [errors, setErrors] = useState({
    isim: "",
    email: "",
    sifre: "",
    kosul: "",
  });

  const [newUser, setNewUser] = useState(null);
  const [disableButton, setDisableButton] = useState(true);

  function errorCheck(name, value) {
    Yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    let deger = value;
    if (event.target.type === "checkbox") {
      deger = event.target.checked;
    }
    errorCheck(name, deger);
    setFormData({
      ...formData,
      [name]: deger,
    });
  }

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setDisableButton(!valid));
  }, [formData]);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then((response) => {
        setNewUser(response.data);
        console.log("BAŞARILI", response);
        setFormData({
          isim: "",
          email: "",
          sifre: "",
          kosul: false,
        });
      })
      .catch((err) => console.log(err.response));
  }

  return (
    <div className="App">
      <Form
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        disableButton={disableButton}
      />
      <p style={{ color: "red", fontWeight: "bold" }}>{errors.isim}</p>
      <p style={{ color: "red", fontWeight: "bold" }}>{errors.email}</p>
      <p style={{ color: "red", fontWeight: "bold" }}>{errors.sifre}</p>
      <p style={{ color: "red", fontWeight: "bold" }}>{errors.kosul}</p>
      {newUser && (
        <div>
          <h2 style={{ color: "green" }}>KAYIT BAŞARILI</h2>
          <p style={{ color: "blue", fontWeight: "bold" }}>
            {newUser.isim} isimli kullanıcı kayıt edildi.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
