import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export async function getSession() {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/About');
  }

  return session;
}
