import useMessageStore from "../../../store/messageStore";

function MessageItem({ msg }) {
  const removeMessage = useMessageStore((state) => state.removeMessage);

  const handleClick = (id) => {
    return () => {
      removeMessage(id);
    };
  };

  return (
    <div className="w-full justify-between items-center flex px-5 ">
      <span className="text-white">{msg.text}</span>
      <button
        onClick={handleClick(msg.id)}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none font-medium"
      >
        <span className="cursor-pointer">✕</span>
      </button>
    </div>
  );
}

export default MessageItem;
