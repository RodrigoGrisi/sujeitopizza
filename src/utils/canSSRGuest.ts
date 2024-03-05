import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { parseCookies } from "nookies";

// função para páginas que só podem ser acessadas por visitantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    /* CASO O USUARIO JA ESTEJA LOGADO E TENTE ACESSAR 
A AREA DE LOGIN OU SIGNUP ELE SERÁ REDIRECIONADO PARA O 
DASHBOARD
*/
    const cookies = parseCookies(ctx);

    if (cookies["@nextauth.token"]) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
