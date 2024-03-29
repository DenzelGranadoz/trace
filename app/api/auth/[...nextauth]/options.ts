import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/lib/models/User';
import bcrypt from 'bcrypt';

export const options = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      name: 'Github',
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log('Google Profile: ', profile);

        let userRole = 'Google User';

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email:',
          type: 'text',
        },
        password: {
          label: 'password:',
          type: 'password',
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials.email });

          if (foundUser) {
            console.log('User Exists');
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              console.log('Good pass');
              delete foundUser.password;

              foundUser['role'] = 'Unverified Email';
              return foundUser;
            } else {
              throw new Error('Wrong password');
            }
          } else {
            throw new Error('User not found');
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/Login',
    signOut: '/Logout',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider == 'credentials') {
        if (!user.emailVerified) {
          return false;
        }
        return true;
      }

      if (account?.provider == 'github' || account?.provider == 'google') {
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            await User.create(user);
          }
          return true;
        } catch (error) {
          return false;
        }
      }
    },
  },
};
