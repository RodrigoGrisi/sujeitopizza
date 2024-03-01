import Head from "next/head";
import styles from "../styles/home.module.scss";
import Image from "next/image";

import logoImg from "../../public/logo.svg";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <>
      <Head>
        <title>PizzaDEV - Area de login </title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo Sujeito Pizzaria" />
        <div className={styles.login}>
          <form className="formLogin">
            <Input placeholder="Digite seu email" type="text"/>
            <Input placeholder="Digite sua senha" type="password"/>
          </form>
        </div>
      </div>
    </>
  );
}
