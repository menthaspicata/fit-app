// app/invite/[token]/page.tsx
import { AcceptInviteForm } from '@/components/forms/accept-invite';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const invite = await prisma.invite.findUnique({
    where: { token },
  });

  if (!invite || invite.status !== 'PENDING' || invite.expiresAt < new Date()) {
    notFound();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 grid gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {invite.name}!</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Your trainer has invited you. Fill in your details to get started.
          </p>
        </div>
        <AcceptInviteForm token={token} />
      </div>
    </main>
  );
}
