import Modal from "react-modal";
import styles from "./style.module.scss";

import { FiX } from "react-icons/fi";
import { OrderItemProps } from "@/pages/dashboard";

interface ModalOrderProps {
  isOpen: boolean;
  onRequestclose: () => void;
  order: OrderItemProps[];
}

export function ModalOrder({ isOpen, onRequestclose, order }: ModalOrderProps) {
  const customStyle = {
    content: {
      top: "50%",
      bottom: "Auto",
      left: "50%",
      rigth: "auto",
      padding: "30px",
      backgroundColor: "#1d1d2e",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
    },
  };

  return (
    <Modal style={customStyle} isOpen={isOpen} onRequestClose={onRequestclose}>
      <div className={styles.closeButton}>
        <button
          onClick={onRequestclose}
          type="button"
          className="react-modal-close"
          style={{ backgroundColor: "transparent", border: 0 }}
        >
          <FiX size={45} color="#f34748" />
        </button>
      </div>

      <div className={styles.container}>
        <h1> Detalhes do pedido</h1>
        <span>
          Mesa: <strong> {order[0].order.table}</strong>
        </span>

        {order.map((item) => (
          <section key={item.id} className={styles.containerItem}>
            <span>
              {item.amount} - {item.product.name} - R$ {item.product.price}
            </span>
            <span className={styles.description}>
              {item.product.description}{" "}
            </span>
            <h2>Total</h2>
            <span> R$ {Number(item.amount) * Number(item.product.price)} </span>
            <button onClick={() => {}} className={styles.buttonOrder}>
              Concluir pedido
            </button>
          </section>
        ))}
      </div>
    </Modal>
  );
}
