import React, { useEffect, useState } from "react";
import { Button, CardBody, Card, CardHeader, Table } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../../components/Modal.css";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function EditCls(props) {
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
      classId: location.state.cls.classId,
      classSec: location.state.cls.classSec,
      classTeacher: location.state.cls.classTeacher,
    });
  }, []);
  const onSubmit = (data) => {
    const id = location.state.cls._id;
    console.log(id);
    const temp = {
      classId: data.classId,
      classSec: data.classSec,
      classTeacher: data.classTeacher,
    };
    axios.patch("/cls/update_class/" + id, temp).then((res) => {
      if (res.status === 200) {
        history.push("/classList");
        toast.success("Updated Successfully..!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    });
  };
  const handleChangeClass = (e) => {
    setUser({ classId: e?.target?.value });
  };
  const handleChangeSection = (e) => {
    setUser({ classSec: e?.target?.value });
  };
  const handleChangeClassTeacher = (e) => {
    setUser({ classTeacher: e?.target?.value });
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
                  {...register("classSec")}
                  value={user.classSec}
                  onChange={handleChangeSection}
                />
                <input
                  type="text"
                  {...register("classTeacher")}
                  value={user.classTeacher}
                  onChange={handleChangeClassTeacher}
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

export default EditCls;
