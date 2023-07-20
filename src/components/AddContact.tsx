import { Link } from "react-router-dom";

interface Props {
  name: string;
}

function AddContact(props: Props) {
  return (
    <div>
      {props.name === "add contact" ? (
        <button className=" flex h-[48px] items-center  rounded-full border p-2.5 px-6 font-FutuLight text-[25px] text-white">
          {props.name}
        </button>
      ) : (
        <Link to="/contacts/new">
          <button className=" flex h-[48px] items-center  rounded-full border p-2.5 px-6 font-FutuLight text-[25px] text-white">
            {props.name}
          </button>
        </Link>
      )}
    </div>
  );
}

export default AddContact;
