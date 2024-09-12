import "./globals.css";

export const metadata = {
  title: "차량 운행 기록 프로젝트",
  description: "차량 운행 기록",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
