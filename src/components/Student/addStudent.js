import React, { useEffect, useState } from "react";
import { Button, CardBody, Card, CardHeader, Table } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../components/Modal.css";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function AddStudent() {
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
      data.middleName !== "" &&
      data.lastName !== "" &&
      data.classId !== "" &&
      data.classSec !== "" &&
      data.rollNo !== "" &&
      data.age !== "" &&
      data.gender !== "" &&
      data.address !== ""
    ) {
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
      axios.post("/student/add_student", temp).then((res) => {
        if (res.status === 200) {
          history.push("/student");
          toast.success("Student Added Successfully..!", {
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
          <b>Add Student</b>
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
                placeholder="Firstname*"
              />
              <input
                type="text"
                {...register("middleName")}
                placeholder="Middle Name*"
              />
              <input
                type="text"
                {...register("lastName")}
                placeholder="Last Name*"
              />
              {/* <input
                type="text"
                {...register("classId")}
                name="classId"
                placeholder="Class"
              /> */}
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
              <input
                type="text"
                name="classSec"
                {...register("classSec")}
                placeholder="Section*"
              />
              <input
                type="text"
                name="rollNo"
                {...register("rollNo")}
                placeholder="Roll Number*"
              />

              <input type="text" {...register("age")} placeholder="Age*" />
              <input
                type="text"
                {...register("mobile", {
                  required: true,
                  maxLength: 10,
                  minLength: 10,
                })}
                placeholder="Mobile number*"
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
            {errors.mobile?.type === "required" && "Mobile Number is required"}
            {errors.mobile?.type === "maxLength" && "Max Length Exceed"}
            {errors.mobile?.type === "minLength" && "Minimum Length required"}
            <div className="footer">
              {/* <button
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancel
              </button> */}
              <button>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
