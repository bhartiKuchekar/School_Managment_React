import React, { useEffect, useState } from "react";
import { Button, CardBody, Card, CardHeader, Table } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../../components/Modal.css";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function AddSubject() {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.classId !== "" && data.subName !== "" && data.subTeacher !== "") {
      const temp = {
        classId: data.classId,
        subName: data.subName,
        subTeacher: data.subTeacher,
      };
      axios.post("/sub/add_sub", temp).then((res) => {
        if (res.data.status === 200) {
          console.log(res);
          history.push("/subjectList");
          toast.success(res.data.msg, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error(res.data.msg, {
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
          <b>Add Subject</b>
        </CardHeader>
        <div className="body">
          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input type="text" {...register("classId")} placeholder="Class*" />
            <input
              type="text"
              {...register("subName")}
              placeholder="Subject*"
            />
            <input
              type="text"
              {...register("subTeacher")}
              placeholder="Subject Teacher*"
            />

            <div className="footer">
              <button>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSubject;
