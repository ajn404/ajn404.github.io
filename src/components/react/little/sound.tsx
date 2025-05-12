import { useSound } from "react-sounds";

function Button() {
  const { play } = useSound("ambient/heartbeat");

  return (
    <button
      onClick={() => play()}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Click Me
    </button>
  );
}

export default Button;
