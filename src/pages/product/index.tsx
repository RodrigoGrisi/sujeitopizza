import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "@/components/Header";

import { setupAPIClient } from "@/services/api";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { ChangeEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";

type itemProps = {
  id: string;
  name: string;
};

interface categoryProps {
  categoryList: itemProps[];
}

export default function Product({ categoryList }: categoryProps) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);
  const [categories, setCategories] = useState([]);

  setCategories(categoryList);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    console.log(event.target.files[0]);
    const image = event.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      // setAvatarUrl(URL.createObjectURL(image));
      setAvatarUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <>
      <Head>
        <title>DevPizza - Novo produto</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1> Adicionar um novo produto</h1>

          <form className={styles.form}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={35} color="#fff" />
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto_produto"
                  width={250}
                  height={250}
                />
              )}
            </label>
            <select>
              <option> Bebida</option>
              <option> Pizzas</option>
            </select>
            <input placeholder="Nome do produto" type="text" />
            <input placeholder="Valor" type="text" />
            <textarea placeholder="Descrição do produto" />
            <button>Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/category");

  console.log(response.data);

  return {
    props: {
      categoryList: response,
    },
  };
});
