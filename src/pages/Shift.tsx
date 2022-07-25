import React, { FunctionComponent, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { getErrorMessage } from "../helper/error/index";
import {
  checkPublish,
  deleteShiftById,
  getShifts,
  publish,
} from "../helper/api/shift";
import DataTable from "react-data-table-component";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import Alert from "@material-ui/lab/Alert";
import { Link as RouterLink } from "react-router-dom";
import DateSelected from "../components/DateSelected";
import { Button } from "@material-ui/core";
import "./Shift.css";
import PublishDialog from "../components/PublishDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 40,
    backgroundColor: "white",
    color: theme.color.turquoise,
  },
}));

interface ActionButtonProps {
  id: string;
  onDelete: () => void;
  isPublish: boolean;
}
const ActionButton: FunctionComponent<ActionButtonProps> = ({
  id,
  onDelete,
  isPublish,
}) => {
  return (
    <div>
      <IconButton
        size="small"
        aria-label="delete"
        component={RouterLink}
        to={`/shift/${id}/edit`}
        disabled={isPublish}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        aria-label="delete"
        onClick={() => onDelete()}
        disabled={isPublish}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

const Shift = () => {
  const classes = useStyles();
  const history = useHistory();

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("2022-08-01");
  const [endDate, setEndDate] = useState<string>("2022-08-07");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [isPublish, setIsPublish] = useState<boolean>(false);
  const [isPublishShift, setIsPublishShift] = useState<boolean>(false);

  const onPublishClick = () => {
    setShowPublishConfirm(true);
  };

  const onDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowDeleteConfirm(true);
  };

  const onCloseDeleteDialog = () => {
    setSelectedId(null);
    setShowDeleteConfirm(false);
  };

  const onClosePublishDialog = () => {
    setShowPublishConfirm(false);
  };

  const handleDateValue = async (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    const { results } = await checkPublish(start, end);
    if (results) {
      setIsPublish(true);
      setIsPublishShift(true);
    } else {
      setIsPublishShift(false);
      setIsPublish(false);
      return;
    }
  };

  const handlePublish = async () => {
    try {
      setDeleteLoading(true);
      setErrMsg("");

      await publish(startDate, endDate);
    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setShowPublishConfirm(false);
      onClosePublishDialog();
      handleDateValue(startDate, endDate);
    }
  };

  useEffect(() => {
    const getData = async (startDate: string, endDate: string) => {
      try {
        setIsLoading(true);
        setErrMsg("");
        const { results } = await getShifts(startDate, endDate);
        setRows(results);
        if (results.length <= 0) {
          setIsPublish(true);
        }
        handleDateValue(startDate, endDate);
      } catch (error) {
        const message = getErrorMessage(error);
        setErrMsg(message);
      } finally {
        setIsLoading(false);
      }
    };

    getData(startDate, endDate);
  }, [startDate, endDate]);

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Start Time",
      selector: "startTime",
      sortable: true,
    },
    {
      name: "End Time",
      selector: "endTime",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <ActionButton
          id={row.id}
          onDelete={() => onDeleteClick(row.id)}
          isPublish={isPublishShift}
        />
      ),
    },
  ];

  const deleteDataById = async () => {
    try {
      setDeleteLoading(true);
      setErrMsg("");

      if (selectedId === null) {
        throw new Error("ID is null");
      }

      console.log(deleteDataById);

      await deleteShiftById(selectedId);

      const tempRows = [...rows];
      const idx = tempRows.findIndex((v: any) => v.id === selectedId);
      tempRows.splice(idx, 1);
      setRows(tempRows);
    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setDeleteLoading(false);
      onCloseDeleteDialog();
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.root}>
          <CardContent>
            <div className="button-header">
              <DateSelected
                start={(start: string, end: string) =>
                  handleDateValue(start, end)
                }
                isPublish={isPublishShift}
              />
              <div className="button-shift">
                <Button
                  style={
                    isPublishShift
                      ? {
                          backgroundColor: "white",
                          color: "grey",
                          borderColor: "darkGrey",
                          marginRight: 10,
                        }
                      : {
                          backgroundColor: "white",
                          borderColor: "turquoise",
                          color: "turquoise",
                          marginRight: 10,
                        }
                  }
                  variant="outlined"
                  aria-label="add"
                  onClick={() => history.push("/shift/add")}
                  disabled={isPublishShift}
                >
                  ADD SHIFT
                </Button>
                <Button
                  variant="outlined"
                  style={
                    isPublish
                      ? {
                          backgroundColor: "darkGrey",
                          color: "grey",
                          borderColor: "darkGrey",
                          paddingRight: 19,
                          paddingLeft: 19,
                        }
                      : {
                          backgroundColor: "turquoise",
                          borderColor: "turquoise",
                          color: "white",
                          paddingRight: 19,
                          paddingLeft: 19,
                        }
                  }
                  disabled={isPublish}
                  onClick={() => onPublishClick()}
                >
                  PUBLISH
                </Button>
              </div>
            </div>
            {errMsg.length > 0 ? (
              <Alert severity="error">{errMsg}</Alert>
            ) : (
              <></>
            )}
            <DataTable
              noHeader
              columns={columns}
              data={rows}
              pagination
              progressPending={isLoading}
            />
          </CardContent>
        </Card>
      </Grid>
      <ConfirmDialog
        title="Delete Confirmation"
        description={`Do you want to delete this data ?`}
        onClose={onCloseDeleteDialog}
        open={showDeleteConfirm}
        onYes={deleteDataById}
        loading={deleteLoading}
      />
      <PublishDialog
        onClose={onClosePublishDialog}
        open={showPublishConfirm}
        onYes={handlePublish}
        loading={deleteLoading}
      />
    </Grid>
  );
};

export default Shift;
