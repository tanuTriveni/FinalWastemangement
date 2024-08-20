import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table,message } from "antd";

const Collector = () => {
  const [Collector, setCollector] = useState([]);
  //getUsers
  const getCollector = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllCollectors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setCollector(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
const handleAccountStatus=async(record, status)=>{
  try{ console.log(record)
const res =await axios.post('/api/v1/admin/changeAccountStatus',{collectorId:record._id, userId:record.userId, status:status},{
  headers: {

    Authorization:  `Bearer ${localStorage.getItem("token")}`
  }
})


if(res.data.success){
  console.log(record)
  message.success(res.data.message);
  window.location.reload();
 
}
  }
  catch(error){
    message.error('something went wrong')
  }
}

  useEffect(() => {
    getCollector();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button className="btn btn-success" onClick={()=> handleAccountStatus(record, 'approved')}>Approve</button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">All Collector</h1>
      <Table columns={columns} dataSource={Collector} />
    </Layout>
  );
};

export default Collector;