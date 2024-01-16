import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

const PomodoroPage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/PomodoroPage');
  }

  return <div>PomodoroPage</div>;
};

export default PomodoroPage;
