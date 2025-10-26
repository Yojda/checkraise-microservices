export const metadata = {
  title: "Demo App",
  description: "Next.js + OpenTelemetry demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
