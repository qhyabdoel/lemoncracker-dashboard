const LeftCardsItem: React.FC<{ title: string; value: string | number }> = ({
  title,
  value,
}) => {
  return (
    <div className="bg-white rounded-md p-2 ml-2 my-4">
      <p className="text-sm mb-2">{title}</p>
      <p className="text-gray-950">{value}</p>
    </div>
  );
};

export default LeftCardsItem;
