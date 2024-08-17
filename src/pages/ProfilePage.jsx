import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import BASE_URL from "../hooks/baseURL";
import { Spinner } from "react-bootstrap";

const ProfilePage = () => {
  const { user, updateProfile, lan } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

  const profile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const inputData = {
      name: name,
      phone: phone,
    };
    // console.log(inputData);
    // return;
    try {
      const response = await fetch(BASE_URL + "/profile", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        setLoading(false);
        let errorData = await response.json().catch(() => ({}));

        if (response.status === 422) {
          setErrMsg("");
          setError(errorData.errors || "Unknown error");
        } else if (response.status === 401) {
          setError("");
          setErrMsg(errorData.message || "Unauthorized");
        } else {
          throw new Error("Change Password Failed");
        }

        throw new Error("Change Password Failed");
      }

      const data = await response.json();
      updateProfile(data.data)
      setLoading(false);

      toast.success("Profile updated successfully.", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
      });
      // setIsEditProfileModalOpen(false);
    } catch (error) {
      // console.error('Error during fetch:', error);
      setLoading(false);
    }
  };

  return (
    <div className="p-2 pt-5 p-sm-4 text-white">
      <ToastContainer />
      <div className="d-flex align-items-center justify-content-center gap-2 text-center w-semibold mb-4">
        <FaUser size={30} color="#DFA041" />
        <h4 className="mt-2 title-text">{lan === "en" ? "My Profile" : "ကျွန်ုပ် ပရိုဖိုင်"}</h4>
      </div>
      <form onSubmit={profile}>
        <div className="customFormContainer p-3 rounded-4 ">
          <div className="row">
            <div className="col-6 px-2">
              <div className="mb-3">
                <p>{lan === "en" ? "Name" : "အမည်"}</p>
                <input
                  className="w-full customInput"
                  type="text"
                  onChange={handleNameChange}
                  value={name || ""}
                />
              </div>
            </div>
            <div className="col-6 px-2">
              <div className="mb-3">
              <p>{lan === "en" ? "Username" : "ဂိမ်းနာမည်"}</p>
                <input
                  className="w-full customInput"
                  type="text"
                  value={user?.user_name}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6 px-2">
              <div className="mb-3">
                <p>{lan === "en" ? "Phone" : "ဖုန်း"}</p>
                <input
                  className="w-full customInput"
                  type="text"
                  onChange={handlePhoneChange}
                  value={phone || ""}
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              className="mt-4 w-max loginBtn py-2 px-5 mx-auto text-white rounded-5 text-center"
              type="submit"
            >
                {loading && <Spinner size="sm" />}
              <small className="mx-sm-3">{lan === "en" ? "Update Profile" : "ပရိုဖိုင် ပြင်သည်"}</small>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
