import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className="h-full grid items-center justify-items-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
