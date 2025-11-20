import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { TaskProvider } from "../context/TaskContext";
import { ModalProvider } from "../context/ModalContext";
import Modal from "../components/Modal";

export const metadata = {
  title: "Productivity Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <TaskProvider>
            <ModalProvider>
              {children}
              <Modal />
            </ModalProvider>
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
