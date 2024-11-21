import { RiDeleteBin2Line } from "react-icons/ri";
import SectionTitle from "../../../Compunents/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useManue";
import { MdOutlineModeEditOutline } from "react-icons/md";

const ManageItems = () => {
  const [menu, loading] = useMenu();
  if (loading) {
    return (
      <span className="loading loading-infinity loading-lg text-warning"></span>
    );
  }
  const handelUpdateItems = (id) => {
    console.log("handel update clicked", id);
  };
  const handelDeleteItems = (id) => {
    console.log("handel delete clicked", id);
  };
  return (
    <div>
      <SectionTitle
        heading="Manage all items"
        subHeading="Hurry up"
      ></SectionTitle>

      <div className="overflow-x-auto">
        <table className="table table-zebra text-xl">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Update</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-16 w-16">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>
                  {
                    <button
                      onClick={() => handelUpdateItems(item._id)}
                      className="text-3xl text-orange-500 btn btn-ghost"
                    >
                      <MdOutlineModeEditOutline />
                    </button>
                  }
                </td>
                <td>
                  <button
                    onClick={() => handelDeleteItems(item._id)}
                    className="text-3xl text-red-500 btn btn-ghost"
                  >
                    <RiDeleteBin2Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
