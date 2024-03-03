import Head from "next/head";
import styles from "@/styles/home.module.scss";
import Image from "next/image";

import logoImg from "../../../public/logo.svg";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

export default function signUp() {
  return (
    <>
      <Head>
        <title>Faça seu cadastro </title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form>
            <Input placeholder="Digite seu nome" type="text" />
            <Input placeholder="Digite sua senha" type="password" />
            <Input placeholder="Digite sua senha" type="password" />
            <Button loading={false} type="submit">
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
