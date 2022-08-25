import React, { useEffect, useState } from "react";
import { Button, CardBody, Card, CardHeader, Table } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../components/Modal.css";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function AddTeacher() {
  const [dataList, setDataList] = useState([]);
  let history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get("/cls").then((res) => {
      console.log(res);
      if (res.status === 200) {
        setDataList(res.data);
      }
    });
  }, []);
  const onSubmit = (data) => {
    if (
      data.firstName !== "" &&
      data.lastName !== "" &&
      //data.classId !== "" &&
      data.class !== "" &&
      data.sub !== "" &&
      data.age !== "" &&
      data.email !== "" &&
      data.address !== "" &&
      data.gender !== ""
    ) {
      const temp = {
        first_name: data.firstName,
        last_name: data.lastName,
        class: data.classId,
        sub: data.sub,
        age: data.age,
        gender: data.gender,
        address: data.address,
        email: data.email,
      };
      axios.post("/teacher/add_teacher", temp).then((res) => {
        if (res.data.status === 201) {
          console.log(res);
          history.push("/teacher");
          toast.success("Teacher Added Successfully..!", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
    } else {
      toast.error("Mandetory Fields are Required..!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
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
          <b>Add Teacher</b>
        </CardHeader>
        <div className="body">
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
                placeholder="First Name*"
              />
              <input
                type="text"
                {...register("lastName")}
                placeholder="Last Name*"
              />
              <input type="text" {...register("sub")} placeholder="Subject*" />
              <select {...register("classId")} name="classId">
                <option value="">Class*</option>
                {dataList.map((data) => {
                  return (
                    <option key={data._id} value={data.classId}>
                      {data.classId}
                    </option>
                  );
                })}
              </select>
              <input type="text" {...register("age")} placeholder="Age*" />
              <input
                type="email"
                {...register("email")}
                placeholder="E-mail*"
              />
              <select {...register("gender")}>
                <option value="other">other</option>{" "}
                <option value="female">female</option>
                <option value="male">male</option>
              </select>
              <input
                type="text"
                name="address"
                {...register("address")}
                placeholder="Address*"
              />
            </div>
            <div className="footer">
              <button>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTeacher;
