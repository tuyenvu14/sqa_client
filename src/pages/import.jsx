import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Grid from "@material-ui/core/Grid";
import callApi from "../common/apiCaller";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { green, purple } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

export default function Import() {
  const classes = useRowStyles();
  const [dataRow, setDataRow] = useState([]);
  const [saleShow, setSaleShow] = useState([]);
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");
  const [billAdd, setBillAdd] = useState(({
    date: "",
    supplier: {
      id: ""
    },
    itemInImportBillList: [
      {
        quantity: "",
        inputPrice: "",
        item: {
          id: ""
        }
      },
    ],
  }));
  const [x, setX] = useState(0);
  const [endDate, setEndDate] = React.useState(new Date());
  const [startDate, setStartDate] = React.useState(new Date((new Date().getTime())-2629743000));


  useEffect(() => {
    convertItemsList();
    initPage();
    setX("");
  }, [x, startDate, endDate]);

  const initPage = () => {
    callApi("import_bill", "GET", null).then((res) => {
      if (res.status === 200) {
        var list = [];
        var x = 0;
        res.data.map((sale) => {
          if (converTimeToTimestamp(sale.date) <= converTimeToTimestamp(endDate) && converTimeToTimestamp(sale.date) >= converTimeToTimestamp(startDate)) {
            list.push({
              id: sale.id,
              date: converTimeToTimestamp(sale.date),
              supplierName: sale.supplier.name,
              totalMoney: handleMoney(sale.itemInImportBillList),
              itemsList: sale.itemInImportBillList,
            });
            x = x + handleMoney(sale.itemInImportBillList);
          }
        });
        setDataRow(list);
        setMoney(x);
      }
    });
  };

  const handleMoney = (x) => {
    var money = 0;
    x.map((y) => {
      money = money + y.quantity * y.inputPrice;
    });
    return money;
  };

  const converTimeToTimestamp = (value) => {
    return new Date(value).getTime();
  };

  const onFormAdd = () => {
    setBillAdd({
      date: "",
      supplier: {
        id: ""
      },
      itemInImportBillList: [
        {
          quantity: "",
          inputPrice: "",
          item: {
            id: ""
          }
        },
      ],
    });
  };

  const onSave = () => {
    console.log(billAdd);
    callApi(`import_bill`, "POST", billAdd);
    setX(3);
  };

  const convertItemsList = () =>  {
    var result = [];
    var object = {};
    var test1 = ["1", "2"];
    var test2 = ["1", "2"];
    var test3 = ["1", "2"];

    for(let i = 0; i < test1.length; i++) {
      object = {
        item: test1[0],
        quantity: test2[0],
        outputPrice: test3[0]
      }
      result.push(object)
    }
    // console.log(result);
  }

  const convertObject = (string) => {
    var list = [];
    list = string.split(",")
    return list;
  }

  const onSearch = () => {
    if (name) {
      var list = [];
      dataRow?.map((item) => {
        if (item.supplierName.indexOf(name) !== -1) {
          list.push(item);
        }
      });

      setSaleShow(list);
    }
  };

  const changed = (e) => {
    setName(e.target.value);
    console.log(name);
    var list = [];
    var x = 0;
    dataRow?.map((item) => {
      if (item.supplierName.indexOf(name) !== -1) {
        list.push(item);
        // x = x + item.totalMoney;
      }
    });
    setSaleShow(list);
    // setMoney(x);
  };

  const onFilter = () => {
    console.log(converTimeToTimestamp(startDate));
    console.log(converTimeToTimestamp(endDate));
  }

  const formatPrice = (x) => {
    return x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  };
  
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [y, setY] = React.useState("");
    const classes = useRowStyles();
    const [cusEdit, setCusEdit] = useState({});
    const [id, setId] = useState("");

    const onDelete = (id) => {
      callApi(`import_bill/${id}`, "DELETE", null);
      setX(-1);
    };

    const formatPrice = (x) => {
      return x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
    };

    const formatDate = (x) => {
      var year = new Date(x).getFullYear();
      var month = new Date(x).getMonth() + 1;
      var day = new Date(x).getDate();
      return day + "-" + month + "-" + year;
    };


    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell align="right">{formatDate(row.date)}</TableCell>
          <TableCell>{row.supplierName}</TableCell>
          <TableCell align="right"> {formatPrice(row.totalMoney)}</TableCell>
          <TableCell align="right">
            <ColorButton
              variant="contained"
              color="primary"
              size="small"
              // onClick={() => onEdit(row.id)}
              data-toggle="modal"
              data-target="#myModal"
            >
              <EditIcon />
            </ColorButton>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => onDelete(row.id)}
            >
              <DeleteIcon />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Item In Bill
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ minWidth: "150px" }}>Name</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right" style={{ minWidth: "150px" }}>
                        Price
                      </TableCell>
                      <TableCell align="right" style={{ minWidth: "150px" }}>
                        Total Price ($)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.itemsList.map((historyRow) => (
                      <TableRow key={historyRow.id}>
                        <TableCell component="th" scope="row">
                          {historyRow.item.name}
                        </TableCell>
                        <TableCell>{historyRow.quantity}</TableCell>
                        <TableCell align="right">
                          {formatPrice(historyRow.inputPrice)}
                        </TableCell>
                        <TableCell align="right">
                          {formatPrice(
                            Math.round(
                              historyRow.quantity * historyRow.inputPrice * 100
                            ) / 100
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  console.log(billAdd);
  // console.log(money);
  // console.log(dataRow);

  // console.log(converObject("1,2,3"));

  return (
    <Layout>
      <Grid coitainer style={{ padding: "74px 240px 0px 0px" }}>
        <Grid container>
          <Grid item xs={12}>
            <h1 className="text-center">Import Manager</h1>
          </Grid>
        </Grid>

        <Grid container>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onFormAdd()}
            data-toggle="modal"
            data-target="#3"
            className="mb-2"
          >
            <AddIcon />
            <span>Create Bill</span>
          </Button>
          {/* --form add-- */}
          <div
            style={{ margin: "74px 0px 0px 0px" }}
            className="modal fade"
            id="3"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Please enter bill information !
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <from>
                    <div className="mb-1">
                      <label for="recipient-name" className="col-form-label">
                        Date:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="billAdd.date"
                        value={billAdd.date}
                        onChange={(e) => {
                          setBillAdd({
                            date: e.target.value,
                            supplier: billAdd.supplier,
                            itemInImportBillList: [
                              {
                                quantity: billAdd.itemInImportBillList[0].quantity,
                                inputPrice: billAdd.itemInImportBillList[0].inputPrice,
                                item: billAdd.itemInImportBillList[0].item,
                              },
                            ],
                          });
                        }}
                      ></input>
                    </div>
                    <div className="mb-1">
                      <label for="recipient-name" className="col-form-label">
                        Supplier ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="billAdd.supplier.id"
                        value={billAdd.supplier.id}
                        onChange={(e) => {
                          setBillAdd({
                            date: billAdd.date,
                            supplier: {
                              id: e.target.value
                            },
                            itemInImportBillList: [
                              {
                                quantity: billAdd.itemInImportBillList[0].quantity,
                                inputPrice: billAdd.itemInImportBillList[0].inputPrice,
                                item: billAdd.itemInImportBillList[0].item,
                              },
                            ],
                          });
                        }}
                      ></input>
                    </div>
                    <div className="mb-1">
                      <label for="recipient-name" className="col-form-label">
                        Item:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="billAdd.itemInImportBillList[0].item.id"
                        value={billAdd.itemInImportBillList[0].item.id}
                        onChange={(e) => {
                          setBillAdd({
                            date: billAdd.date,
                            supplier: billAdd.supplier,
                            itemInImportBillList: [
                              {
                                quantity: billAdd.itemInImportBillList[0].quantity,
                                inputPrice: billAdd.itemInImportBillList[0].inputPrice,
                                item: {
                                  id: e.target.value
                                }
                              },
                            ],
                          });
                        }}
                      ></input>
                    </div>
                    <div className="mb-1">
                      <label for="recipient-name" className="col-form-label">
                        Amount
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="billAdd.itemInImportBillList.quantity"
                        value={billAdd.itemInImportBillList[0].quantity}
                        onChange={(e) => {
                          setBillAdd({
                            date: billAdd.date,
                            supplier: billAdd.supplier,
                            itemInImportBillList: [
                              {
                                quantity: e.target.value,
                                inputPrice: billAdd.itemInImportBillList[0].inputPrice,
                                item: billAdd.itemInImportBillList[0].item
                              },
                            ],
                          });
                        }}
                      ></input>
                    </div>
                    <div className="mb-1">
                      <label for="recipient-name" className="col-form-label">
                        Price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="billAdd.itemInImportBillList.inputPrice"
                        value={billAdd.itemInImportBillList[0].inputPrice}
                        onChange={(e) => {
                          setBillAdd({
                            date: billAdd.date,
                            supplier: billAdd.supplier,
                            itemInImportBillList: [
                              {
                                quantity: billAdd.itemInImportBillList[0].quantity,
                                inputPrice: e.target.value,
                                item: billAdd.itemInImportBillList[0].item
                              },
                            ],
                          });
                        }}
                      ></input>
                    </div>
                  </from>
                </div>
                <div className="modal-footer">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                    data-dismiss="modal"
                    onClick={() => onSave()}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="default"
                    size="small"
                    startIcon={<CancelIcon />}
                    data-dismiss="modal"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* --end form-- */}

          <Grid container>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                className="mb-2"
                onClick={() => onSearch()}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={5}>
              <input
                style={{width: "237px"}}
                type="text"
                name="name"
                onChange={changed}
              ></input>
            </Grid>
            <Grid item xs={2}>
              Total money:  <span>{formatPrice(money)}</span>
            </Grid>
          </Grid>
        </Grid>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className="mb-2" >
            <Grid item xs={2} style={{marginTop: "42px"}}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onFilter()}
                  >
                    Filter
                  </Button>
            </Grid>
            <Grid item xs={5}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Start-Date"
                format="MM/dd/yyyy"
                value={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Grid> 
            <Grid item xs={5}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="End-Date"
                format="MM/dd/yyyy"
                value={endDate}
                onChange={(date) => setEndDate(date)}
              />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: "70px" }} />
                <TableCell align="right" style={{ minWidth: "70px" }}>
                  Id
                </TableCell>
                <TableCell align="right" style={{ minWidth: "160px" }}>
                  Date
                </TableCell>
                <TableCell style={{ minWidth: "220px" }}>Supplier</TableCell>
                <TableCell align="right" style={{ minWidth: "160px" }}>
                  Total Price ($)
                </TableCell>
                <TableCell align="right" style={{ minWidth: "190px" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!name && dataRow?.map((row) => (
                <Row key={row.name} row={row} />
              ))}
              {name && saleShow?.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      
      </Grid>
    </Layout>
  );
}
