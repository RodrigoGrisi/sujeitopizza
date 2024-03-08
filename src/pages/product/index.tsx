import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "@/components/Header";

import { setupAPIClient } from "@/services/api";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { ChangeEvent, FormEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";

type itemProps = {
  id: string;
  name: string;
};

interface categoryProps {
  categoryList: itemProps[];
}

export default function Product({ categoryList }: categoryProps) {
  // usestates da imagem
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  // usestates da categoria
  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategoryselected] = useState(0);

  // useState do nome do produto, preço e descrição
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

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

  // ITEM RESPONSAVEL PARA SELECIONAR A CATEGORIA DO PRODUTO
  function handleChangeSelectCategories(event) {
    setCategoryselected(event.target.value);
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new FormData();

      if (
        name === "" ||
        price === "" ||
        description === "" ||
        imageAvatar === null
      ) {
        toast.error("Preencha todos os campos incluindo a foto");
        return;
      }

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", categories[categorySelected].id);
      data.append("file", imageAvatar);

      const apiClient = setupAPIClient();

      await apiClient.post("/product", data);

      toast.success("Produto cadastrado com sucesso.");
    } catch (error) {
      toast.error("Erro ao cadastrar o produto!");
    }

    setName("");
    setPrice("");
    setDescription("");
    setImageAvatar(null);
    setAvatarUrl("");
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

          <form className={styles.form} onSubmit={handleRegister}>
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
            <select
              value={categorySelected}
              onChange={handleChangeSelectCategories}
            >
              {categories.map((item, index) => {
                return (
                  <option value={index} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do produto"
              type="text"
            />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Valor"
              type="text"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do produto"
            />

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

  return {
    props: {
      categoryList: response.data,
    },
  };
});
