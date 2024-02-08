import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

const LoginButton: React.FC = (): ReactElement => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/signin');
  };

  return (
    <div
      onClick={handleLoginClick}
      className='generalButton text-shadow-soft flex items-center justify-center text-sm text-zinc-900/90 w-20 font-semibold gap-2 border hover:border-2 border-zinc-900/30 px-2 py-1.5 rounded-md shadow-md'
    >
      Login
    </div>
  );
};

export default LoginButton;
