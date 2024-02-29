import Head from "next/head";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>PizzaDEV - Area de login </title>
      </Head>
      <div className={styles.container}>
        <h1> Sujeito Pizza</h1>
      </div>
    </>
  );
}
