import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export async function getSession() {
  return await getServerSession(options);
}
