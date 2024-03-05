import Head from "next/head";
import styles from "@/styles/home.module.scss";
import Image from "next/image";

import logoImg from "../../../public/logo.svg";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import Link from "next/link";
import { useState, FormEvent, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

export default function signUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "" || email === "") {
      toast.error("Preencha todos os campos");
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password,
    };
    await signUp(data);
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro </title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              type="text"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu Email"
              type="email"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              type="password"
            />
            <Button loading={loading} type="submit">
              Cadastrar
            </Button>
          </form>
        </div>
        <Link href="/" legacyBehavior>
          <a className={styles.text}> Já possui uma conta ? Fazer login</a>
        </Link>
      </div>
    </>
  );
}
