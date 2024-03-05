import {
  GetServerSideProps,
  GetServerSidePropsResult,
  GetServerSidePropsContext,
} from "next";

import { parseCookies, destroyCookie } from "nookies";

import { AuthtokenError } from "@/services/errors/AuthtokenError";

// FUNÇÃO PARA USERS LOGADOS

export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {


    const cookies = parseCookies(ctx);
    const token = cookies["@nextauth.token"];

    // não tem token ativo, volta para a página de login
    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    // possui token ativo
    try {
      return await fn(ctx);
    } catch (err) {
      // CASO DE ERRO ELIMINA O TOKEN E VOLTA PARA PÁGINA DE LOGIN
      if (err instanceof AuthtokenError) {
        destroyCookie(ctx, "@nextauth.token");

        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }
  };
}
