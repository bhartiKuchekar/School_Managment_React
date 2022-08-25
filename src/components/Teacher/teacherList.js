import React, { useEffect, useState } from "react";
import "../../components/font-awesome/css/font-awesome.min.css";
import { Button, CardBody, Card, CardHeader, Table } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function Teacher() {
  const [dataList, setDataList] = useState([]);
  let history = useHistory();
  useEffect(() => {
    axios.get("/teacher").then((res) => {
      if (res.status === 200) {
        setDataList(res.data);
      }
    });
  }, [dataList]);

  const handleDelete = (teachId) => {
    var id = teachId;
    axios.delete("/teacher/delete_teacher/" + id).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        toast.success("Deleted Successfully..!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.error("Something went wrong..!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    });
  };
  const handleEdit = (teach) => {
    console.log(teach);
    history.push({
      pathname: "/editTeacher",
      state: { teach },
    });
    // history.push("teachent/editteachent", teach);
  };

  const tabledata = dataList.map((teach) => {
    return (
      <tr
        key={teach.id}
        className="borderBottomTable"
        style={{ textAlign: "center" }}
      >
        <td>{teach.first_name}</td>
        <td>{teach.sub}</td>
        <td>{teach.class}</td>
        <td>{teach.gender}</td>
        <td>{teach.email}</td>
        <td>{teach.address}</td>
        <td>
          <span>
            <i
              className="fa fa-edit"
              style={{ fontSize: "x-large" }}
              onClick={() => handleEdit(teach)}
            />
          </span>
          <span>
            <i
              className="fa fa-trash"
              style={{ fontSize: "x-large", marginLeft: "15%" }}
              onClick={() => handleDelete(teach._id)}
            />
          </span>
        </td>
      </tr>
    );
  });
  return (
    <Card
      style={{
        maxWidth: "1120px",
        height: "560px",
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "12px",
      }}
    >
      <CardHeader
        style={{
          color: "white",
          padding: "1%",
          backgroundColor: "#5864ed",
          textAlign: "center",
        }}
      >
        <b>Teacher List</b>
        <span style={{ float: "right", width: "5%", fontSize: "x-large" }}>
          <i
            className="fa fa-plus"
            onClick={() => {
              history.push("/addTeacher");
            }}
          />
        </span>
      </CardHeader>

      <CardBody>
        <Table responsive striped style={{ marginTop: "2%" }}>
          <thead>
            <tr>
              <th style={{ width: "13%" }}>First Name</th>
              <th style={{ width: "13%" }}>Subject</th>
              <th style={{ width: "10%" }}>Class</th>
              <th style={{ width: "10%" }}>Gender</th>
              <th style={{ width: "20%" }}>E-mail</th>
              <th style={{ width: "11%" }}>Address</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>{tabledata}</tbody>
        </Table>
        {/* {modalOpen && <Addteachent setOpenModal={setModalOpen} />} */}
      </CardBody>
    </Card>
  );
}

export default Teacher;
