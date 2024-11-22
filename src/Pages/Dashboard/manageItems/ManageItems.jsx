import { RiDeleteBin2Line } from "react-icons/ri";
import SectionTitle from "../../../Compunents/SectionTitle/SectionTitle";
import { MdOutlineModeEditOutline } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useMenu from "../../../hooks/useManue";
import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

const ManageItems = () => {
  const axiosSecure = useAxiosSecure();
  const [menu, loading, refetch] = useMenu();
  //   const {
  //     data: menu = [],
  //     refetch,
  //     loading,
  //   } = useQuery({
  //     queryKey: ["menu"],
  //     queryFn: async () => {
  //       const res = await axiosSecure.get("/menu");
  //       return res.data;
  //     },
  //   });

  if (loading) {
    return (
      <span className="loading loading-infinity loading-lg text-warning"></span>
    );
  }

  const handelDeleteItems = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/menu/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            console.log("deleted");
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
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
                    <Link to={`/dashboard/updateItm/${item._id}`}>
                      <button className="text-3xl text-orange-500 btn btn-ghost">
                        <MdOutlineModeEditOutline />
                      </button>
                    </Link>
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
