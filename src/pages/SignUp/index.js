import React, { useEffect, useState } from "react";
import TextField from "../../components/Controls/TextField";

const SignUp = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => props.setBackground && props.setBackground(''));

  return (
    <div className={"dialog"}>
      <h1>Registrieren</h1>
      <form>
        <TextField label={"Name"} autoComplete={"username"} value={name} onChange={({ target }) => setName(target.value)} />
        <TextField label={"Email Adresse"} value={email} onChange={({ target }) => setEmail(target.value)} type={"email"} />
        <TextField label={"Passwort"} autoComplete={"new-password"} value={password} onChange={({ target }) => setPassword(target.value)} type={"password"} />
        <button type={"button"}>Registrieren</button>
      </form>
    </div>
  );
};

export default SignUp;
