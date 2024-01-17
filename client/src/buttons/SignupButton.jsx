import { useNavigate } from "react-router"

const SignupButton = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center shadow-lg text-sm gap-2 border-2 border-teal-700/70 w-20 justify-center px-2.5 py-1.5 rounded-md '>
    <span onClick={()=>navigate('/signup')} className='generalButton text-shadow-soft font-medium text-zinc-900 font-sans'>Signup</span>
    </div>
  )
}

export default SignupButton
