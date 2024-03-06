import { Header } from "@/components/Header";
import Head from "next/head";
import styles from "./styles.module.scss";
import { useState, FormEvent } from "react";

export default function Category() {
  const [name, setName] = useState("");

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    alert("Categoria:\n" + name);

    setName("");
  }

  return (
    <>
      <Head>
        <title> Nova categoria </title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1> Cadastrar categoria</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
            />

            <button type="submit">Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  );
}
