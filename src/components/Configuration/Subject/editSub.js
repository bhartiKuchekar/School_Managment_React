import React, { useEffect, useState } from "react";
import { Button, CardBody, Card, CardHeader, Table } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../../components/Modal.css";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function EditSub(props) {
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
      classId: location.state.sub.classId,
      subName: location.state.sub.subName,
      subTeacher: location.state.sub.subTeacher,
    });
  }, []);
  const onSubmit = (data) => {
    const id = location.state.sub._id;
    console.log(id);
    const temp = {
      classId: data.classId,
      subName: data.subName,
      subTeacher: data.subTeacher,
    };
    axios.patch("/sub/update_sub/" + id, temp).then((res) => {
      if (res.status === 200) {
        history.push("/subjectList");
        toast.success("Updated Successfully..!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    });
  };
  const handleChangeClass = (e) => {
    setUser({ classId: e?.target?.value });
  };
  const handleChangeSubName = (e) => {
    setUser({ subName: e?.target?.value });
  };
  const handleChangeSubTeacher = (e) => {
    setUser({ subTeacher: e?.target?.value });
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
          <b>Edit Class</b>
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
                  {...register("classId")}
                  value={user.classId}
                  onChange={handleChangeClass}
                />
                <input
                  type="text"
                  {...register("subName")}
                  value={user.subName}
                  onChange={handleChangeSubName}
                />
                <input
                  type="text"
                  {...register("subTeacher")}
                  value={user.subTeacher}
                  onChange={handleChangeSubTeacher}
                />
              </div>
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

export default EditSub;
