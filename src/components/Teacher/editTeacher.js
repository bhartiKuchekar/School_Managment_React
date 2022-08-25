import React, { useEffect, useState } from "react";
import { Button, CardBody, Card, CardHeader, Table } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../components/Modal.css";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function EditTeacher() {
  const [dataList, setDataList] = useState([]);
  let history = useHistory();
  let location = useLocation();
  const [user, setUser] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setUser({
      firstName: location.state.teach.first_name,
      lastName: location.state.teach.last_name,
      class: location.state.teach.class,
      sub: location.state.teach.sub,
      email: location.state.teach.email,
      age: location.state.teach.age,
      gender: location.state.teach.gender,
      address: location.state.teach.address,
    });
    axios.get("/cls").then((res) => {
      if (res.status === 200) {
        setDataList(res.data);
      }
    });
  }, []);
  const onSubmit = (data) => {
    const id = location.state.teach._id;
    console.log(id);
    const temp = {
      first_name: data.firstName,
      last_name: data.lastName,
      class: data.class,
      sub: data.sub,
      email: data.email,
      age: data.age,
      gender: data.gender,
      address: data.address,
    };
    axios.patch("/teachent/update_teachent/" + id, temp).then((res) => {
      if (res.status === 200) {
        console.log(res);
        history.push("/teachent");
        toast.success("Updated Successfully..!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    });
  };
  const handleChangeFname = (e) => {
    setUser({ firstName: e?.target?.value });
  };
  const handleChangeLname = (e) => {
    setUser({ lastName: e?.target?.value });
  };

  const handleChangeSub = (e) => {
    setUser({ sub: e?.target?.value });
  };
  const handleChangeEmail = (e) => {
    setUser({ email: e?.target?.value });
  };
  const handleChangeAge = (e) => {
    setUser({ age: e?.target?.value });
  };
  const handleChangeAddress = (e) => {
    setUser({ address: e?.target?.value });
  };
  // const handleChangeFname = (e) => {
  //   setUser({ firstName: e?.target?.value });
  // };
  return (
    <div>
      <div className="modalContainer">
        <CardHeader
          style={{
            color: "white",
            padding: "1%",
            backgroundColor: "#5864ed",
            textAlign: "center",
          }}
        >
          <b>Edit teachent</b>
        </CardHeader>
        <div className="body">
          {user && (
            <form
              id="form"
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div
                id="form"
                className="flex flex-col"
                style={{ overflowY: "scroll", height: "350px" }}
              >
                <input
                  type="text"
                  {...register("firstName")}
                  value={user.firstName}
                  onChange={handleChangeFname}
                />

                <input
                  type="text"
                  {...register("lastName")}
                  value={user.lastName}
                  onChange={handleChangeLname}
                />
                <select {...register("class")} name="class" value={user.class}>
                  <option value="">Class</option>
                  {dataList.map((data) => {
                    return (
                      <option key={data._id} value={data.classId}>
                        {data.classId}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="text"
                  name="sub"
                  {...register("sub")}
                  placeholder="Subject"
                  value={user.sub}
                  onChange={handleChangeSub}
                />
                <input
                  type="text"
                  {...register("email")}
                  value={user.email}
                  onChange={handleChangeEmail}
                />
                <input
                  type="text"
                  {...register("age")}
                  placeholder="Age"
                  value={user.age}
                  onChange={handleChangeAge}
                />
                {/* <input
                  type="text"
                  {...register("mobile", { required: true, maxLength: 10 })}
                  placeholder="Mobile number"
                  value={user.mobile}
                  // onChange={handleChangeMobile}
                /> */}
                <select {...register("gender")} value={user.gender}>
                  <option value="other">other</option>{" "}
                  <option value="female">female</option>
                  <option value="male">male</option>
                </select>

                <input
                  type="text"
                  name="address"
                  {...register("address")}
                  placeholder="Address"
                  value={user.address}
                  onChange={handleChangeAddress}
                />
              </div>
              {/* {errors.mobile?.type === "required" &&
                "Mobile Number is required"}
              {errors.mobile?.type === "maxLength" && "Max Length Exceed"} */}
              <div className="footer">
                <button>Update</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditTeacher;
