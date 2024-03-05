import Head from "next/head";
import styles from "../styles/home.module.scss";
import Image from "next/image";

import { toast } from "react-toastify";

import logoImg from "../../public/logo.svg";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { AuthContext } from "@/contexts/AuthContext";
import { FormEvent, useContext, useState } from "react";

import { canSSRGuest } from "../utils/canSSRGuest";

import Link from "next/link";

export default function Home() {
  const { isAuthenticated, signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.error("Preencha o email e senha");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    };

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>PizzaDEV - Area de login </title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              type="text"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              type="password"
            />
            <Button loading={loading} type="submit">
              Acessar
            </Button>
          </form>
        </div>
        <Link href="/signup" legacyBehavior>
          <a className={styles.text}> Não possui uma conta ? Cadastre-se</a>
        </Link>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
