import React, { useEffect, useState } from "react";
import { Button, CardBody, Card, CardHeader, Table } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../components/Modal.css";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function EditStudent(props) {
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
      firstName: location.state.stud.name,
      middleName: location.state.stud.middle_name,
      lastName: location.state.stud.last_name,
      classId: location.state.stud.classId,
      classSec: location.state.stud.classSec,
      rollNo: location.state.stud.roll_no,
      age: location.state.stud.age,
      gender: location.state.stud.gender,
      address: location.state.stud.address,
    });
    axios.get("/cls").then((res) => {
      if (res.status === 200) {
        setDataList(res.data);
      }
    });
  }, []);
  const onSubmit = (data) => {
    const id = location.state.stud._id;
    console.log(id);
    const temp = {
      name: data.firstName,
      middle_name: data.middleName,
      last_name: data.lastName,
      classId: data.classId,
      classSec: data.classSec,
      roll_no: data.rollNo,
      age: data.age,
      gender: data.gender,
      address: data.address,
    };
    axios.patch("/student/update_student/" + id, temp).then((res) => {
      if (res.status === 200) {
        history.push("/student");
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
  const handleChangeMname = (e) => {
    setUser({ middleName: e?.target?.value });
  };
  const handleChangeClassSec = (e) => {
    setUser({ classSec: e?.target?.value });
  };
  const handleChangeRollNo = (e) => {
    setUser({ rollNo: e?.target?.value });
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
          <b>Edit Student</b>
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
                  {...register("middleName")}
                  value={user.middleName}
                  onChange={handleChangeMname}
                />
                <input
                  type="text"
                  {...register("lastName")}
                  value={user.lastName}
                  onChange={handleChangeLname}
                />
                <select
                  {...register("classId")}
                  name="classId"
                  defaultValue={user.classId}
                >
                  <option>Class</option>
                  {dataList.map((data) => {
                    return (
                      <option
                        key={data._id}
                        value={data.classId}
                        // defaultValue={user.classId}
                      >
                        {data.classId}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="text"
                  name="classSec"
                  {...register("classSec")}
                  placeholder="Section"
                  value={user.classSec}
                  onChange={handleChangeClassSec}
                />
                <input
                  type="text"
                  name="rollNo"
                  {...register("rollNo")}
                  placeholder="Roll Number"
                  value={user.rollNo}
                  onChange={handleChangeRollNo}
                />

                <input
                  type="text"
                  {...register("age")}
                  placeholder="Age"
                  value={user.age}
                  onChange={handleChangeAge}
                />
                <input
                  type="text"
                  {...register("mobile", { required: true, maxLength: 10 })}
                  placeholder="Mobile number"
                  value={user.mobile}
                  // onChange={handleChangeMobile}
                />
                <select {...register("gender")} defaultValue={user.gender}>
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

export default EditStudent;
