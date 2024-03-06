import styles from "./styles.module.scss";
import logo from "../../../public/logo.svg";

import Image from "next/image";
import Link from "next/link";

import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export function Header() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image src={logo} alt="logotipo" width={190} height={60} />
        </Link>

        <nav className={styles.menuNav}>
          <Link href="/category">Categoria</Link>
          <Link href="/product">Cardápio</Link>

          <button onClick={signOut}>
            <FiLogOut size={25} color="#FFF" />
          </button>
        </nav>
      </div>
    </header>
  );
}
