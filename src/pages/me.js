import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { green, purple } from "@material-ui/core/colors";
import Avatar from '@material-ui/core/Avatar';


const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

export default function Me() {
  const [roles, setRoles] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");




  useEffect(() => {
    setRoles(window.localStorage.getItem("role").split(","));
    setEmail(window.localStorage.getItem("email"));
    setName(window.localStorage.getItem("name"));
    setSalary(window.localStorage.getItem("salary"));
  }, []);

  const formatPrice = (x) => {
    return x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  };

  console.log(roles);
  return (
    <Layout>
      <Grid coitainer style={{ padding: "74px 240px 0px 0px" }}>
        <Grid container >
          <Grid item xs={12} className="mb-4">
            <h1 className="text-center">Information Staff</h1>
          </Grid>
          
          <Grid container className="mb-4">
            <Grid item xs={2}>
              <Avatar src="/broken-image.jpg" />
            </Grid>
            <Grid item style={{alignItems: "center", display: "flex", fontSize: "130%"}}> 
                {name}
            </Grid>
          </Grid>
          <Grid container className="mb-2">
            <Grid item xs={2}>
              Email:
            </Grid>
            <Grid item> 
                {email}
            </Grid>
          </Grid>
          <Grid container className="mb-2">
            <Grid item xs={2}>
              Position:
            </Grid>
            <Grid item> 
                {roles[0] === "ROLE_USER" && <Grid>Employee</Grid> }
                {roles[0] === "ROLE_ADMIN" && <Grid>Manager</Grid> }
            </Grid>
          </Grid>
          <Grid container className="mb-2">
            <Grid item xs={2}>
              Salary: 
            </Grid>
            <Grid item> 
                {formatPrice(parseInt(salary))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
