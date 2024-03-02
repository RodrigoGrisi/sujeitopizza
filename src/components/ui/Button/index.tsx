import styles from "./style.module.scss";
import { ReactNode, ButtonHTMLAttributes } from "react";

import { FaSpinner } from "react-icons/fa";

interface ButtonPros extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

export function Button({ loading, children, ...rest }: ButtonPros) {
  return (
    <button disabled={loading} className={styles.button} {...rest}>
      {loading ? (
        <FaSpinner size={16} color="#fff" />
      ) : (
        <a className={styles.buttonText}> {children}</a>
      )}
    </button>
  );
}
