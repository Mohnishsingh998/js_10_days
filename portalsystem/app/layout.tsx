import "./globals.css";
import { ModalProvider } from "./components/ModalContext";
import Modal from "./components/Modal";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ModalProvider>
          {children}
          <Modal /> {/* Global Modal */}
        </ModalProvider>
      </body>
    </html>
  );
}
