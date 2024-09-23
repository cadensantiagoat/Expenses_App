import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="h-full grid items-center justify-items-center">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
