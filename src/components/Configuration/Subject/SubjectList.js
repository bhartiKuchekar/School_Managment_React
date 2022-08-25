import React, { useEffect, useState } from "react";
//import "./font-awesome/css/font-awesome.min.css";
import { Button, CardBody, Card, CardHeader, Table } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function SubjectList() {
  const [dataList, setDataList] = useState([]);
  let history = useHistory();
  useEffect(() => {
    axios.get("/sub").then((res) => {
      if (res.status === 200) {
        setDataList(res.data);
      }
    });
  }, [dataList]);
  const handleEdit = (sub) => {
    history.push({
      pathname: "/editSubject",
      state: { sub },
    });
  };
  const handleDelete = (subId) => {
    var id = subId;
    axios.delete("/sub/delete_sub/" + id).then((res) => {
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
  const tabledata = dataList.map((sub) => {
    return (
      <tr
        key={sub.id}
        className="borderBottomTable"
        style={{ textAlign: "center" }}
      >
        <td>{sub.classId}</td>
        <td>{sub.subName}</td>
        <td>{sub.subTeacher}</td>
        <td>
          <span>
            <i
              className="fa fa-edit"
              style={{ fontSize: "x-large" }}
              onClick={() => handleEdit(sub)}
            />
          </span>
          <span>
            <i
              className="fa fa-trash"
              style={{ fontSize: "x-large", marginLeft: "15%" }}
              onClick={() => handleDelete(sub._id)}
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
        <b>Subject List</b>
        <span style={{ float: "right", width: "5%", fontSize: "x-large" }}>
          <i
            className="fa fa-plus"
            onClick={() => {
              history.push("/addSub");
            }}
          />
        </span>
      </CardHeader>

      <CardBody>
        <Table responsive striped style={{ marginTop: "2%" }}>
          <thead>
            <tr>
              <th style={{ width: "13%" }}>Class</th>
              <th style={{ width: "13%" }}>Subject</th>
              <th style={{ width: "10%" }}>Subject Teacher</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>{tabledata}</tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default SubjectList;
