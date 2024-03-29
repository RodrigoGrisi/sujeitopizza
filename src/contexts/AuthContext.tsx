import { createContext, ReactNode, useState, useEffect } from "react";

import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";

import { api } from "../services/apiClient";
import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    Router.push("/");
  } catch (error) {
    console.log("Erro ao deslogar", error);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get("me")
        .then((response) => {
          const { id, name, email } = response.data;

          setUser({
            id,
            name,
            email,
          });
        })
        .catch((err) => {
          signOut();
          console.log("Erro ao executar a requisição");
          return;
        });
    }
  }, []);

  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // expira em um mês
        path: "/",
      });

      setUser({
        id,
        name,
        email,
      });
      // passar para as proximas requisições o token
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Logado com sucesso!");

      // redirecionar o usuario para o dashboard
      Router.push("/dashboard");

      // console.log(response.data);
    } catch (error) {
      toast.error("Erro ao tentar logar!");
      console.log("Usuario não encontrado");
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });

      toast.success("Usuario criado com sucesso");

      Router.push("/");
    } catch (error) {
      toast.error("Erro ao criar usuario");
      console.log("Houve um erro na hora do cadastro");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
