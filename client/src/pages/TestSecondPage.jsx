import { useNavigate } from 'react-router-dom'
const TestSecondPage = () => {
    const navigate = useNavigate();

  return (
    <div className='p-5'>
    <p className='text-4xl font-bold'>
    This is another page
    </p>
    <button 
      onClick={()=>navigate('/')}
      className="border-2 border-blue-500/70 p-2 rounded-lg text-zinc-900/70">
        Go to HomePage
      </button>
    </div>
  )
}

export default TestSecondPage
