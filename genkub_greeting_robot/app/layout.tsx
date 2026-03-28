import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GenKub — AI Greeting Robot',
  description: 'AI 기반 인사 로봇 GenKub. 자연스러운 대화와 3D 인터랙션으로 방문객을 맞이합니다.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
