import axios, { AxiosError } from "axios";

import { parseCookies } from "nookies";

import { AuthtokenError } from "./errors/AuthtokenError";
import { promises } from "dns";
import { signOut } from "@/contexts/AuthContext";

export function setupAPIClient(context = undefined) {
  let cookies = parseCookies(context);

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["@nextauth.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        // Qualquer erro 401 (nao autorizado) - devemos deslogar o usuario

        if (typeof window !== undefined) {
          signOut();

          // chamar a função para deslogar o usuario
        } else {
          return Promise.reject(new AuthtokenError());
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
