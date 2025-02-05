import { Fragment, useEffect, useState } from "react";
import useFetch from "../../../Hooks/useFetch";
import { Button, Grid, Typography, Alert, AlertTitle, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Icon } from "@mui/material";
import { Tile } from "../../../components/card/Tile";
import { useTheme } from "@emotion/react";
import * as assets from '../../../assets'
import CompanyCard from "../../../components/InternProcess/CompanyCard";
import { useParams } from "react-router-dom";
import InternDataGridMini from "../../../components/InternProcess/ViewTable/InternDataGridMini";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';


const InternProcessCompany = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [company, setCompany] = useState({})
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState();
  const { companyId } = useParams();

  const { data } = useFetch('GET', `http://localhost:5000/api/v1/company/intern-process/company/${companyId}`)

  console.log('dattaaa', data.users);

  const theme = useTheme();


  useEffect(() => {
    if (data && data.company && data.users) {
      setCompany(data.company);

      const updatedApplicationList = data.company.internApplications.applicationList.map(item => ({
        ...item.candidate
      }));

      const filteredStudents = data.users.filter(student => !updatedApplicationList.some(selected => selected.regNo === student.regNo));
      const filteredSelectedStudents = data.users.filter(student => updatedApplicationList.some(selected => selected.regNo === student.regNo));

      setSelectedStudents(filteredSelectedStudents);
      setStudents(filteredStudents);
    }
  }, [data, selectedStudents && data]);
  console.log(students);

  const handleAddStudent = (student) => {
    if (selectedStudents.length < 10) {
      const user = data.users.find((user) => user.regNo === student.regNo);
      if (user) {
        setSelectedStudents([...selectedStudents, user]);
      }
      setStudents(students.filter(s => s.regNo !== student.regNo));
    }
    else {
      setAlertOpen(true);
    }
  };

  const handleRemoveStudent = (student) => {
    console.log(students);
    console.log(student);
    const user = data.users.find((user) => user.regNo === student.regNo);
    if (user) {
      setStudents([...students, user]);
    }
    console.log(students);
    setSelectedStudents(selectedStudents.filter(s => s.regNo !== student.regNo));
  };

  const handleSave = async () => {
    console.log('save', company, selectedStudents);
    const res = await axios.post("http://localhost:5000/api/v1/company/intern-process/company", { companyId: company._id, candidateList: selectedStudents }, { withCredentials: true })
    if (res) {
      setDialogData(res.data);
      setDialogOpen(true);
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  const demo = {
    name: 'Creative Software',
    image: assets.Creative
  }

  const columnsLeft = [
    {
      field: 'action',
      headerName: 'Action',
      width: 60,
      headerClassName: 'data-grid-header',
      // renderCell: (params) => (<Button onClick={() => handleAddStudent(params.row)} startIcon={<AddIcon />}>Add</Button>)
      renderCell: (params) => (<Button onClick={() => handleAddStudent(params.row)} startIcon={<AddIcon />} />)

    },
    { field: 'regNo', headerName: 'Registration No.', width: 130, headerClassName: 'data-grid-header' },
    { field: 'name', headerName: 'Name', width: 180, headerClassName: 'data-grid-header' },
    {
      field: 'choice',
      headerName: 'Choice',
      width: 70,
      headerClassName: 'data-grid-header',
      renderCell: (params) => (
        <Typography
          variant="body1"
          style={{
            color: params.row.choice === 'Yes' ? theme.palette.success.main : theme.palette.error.main
          }}
        >
          {params.row.choice}
        </Typography>
      ),
    },
    { field: 'choiceNo', headerName: 'Priority', width: 70, headerClassName: 'data-grid-header' },
    {
      field: 'recommend',
      headerName: 'Recommend',
      width: 70,
      headerClassName: 'data-grid-header',
      renderCell: (params) => (
        <Typography variant="body1">
          {params.row.recommend === 'Yes' ? (
            <Typography variant="body1" color={'#FFD700'}>
              <StarIcon color="#FFD700" />
            </Typography>
          ) : (
            <Typography variant="body1">-</Typography>
          )}
        </Typography>
      ),
    },
    { field: 'gpa', headerName: 'GPA', type: 'number', width: 50, headerClassName: 'data-grid-header' },
    { field: 'weightedGPA', headerName: 'WGPA', type: 'number', width: 60, headerClassName: 'data-grid-header' },
    // { field: 'selection', headerName: 'Choice', width: 70, headerClassName: 'data-grid-header' },
  ];

  const rowsLeft =
    data &&
    students.map((user) => {
      return {
        id: user._id,
        _id: user._id,
        regNo: user.regNo,
        name: user.name,
        gpa: user.gpa,
        weightedGPA: user.weightedGPA,
        choice: user.isListed.choice.isSelected ? 'Yes' : 'No',
        choiceNo: user.isListed.choice.choiceNumber || '-',
        recommend: user.isRecommend ? 'Yes' : 'No',
      };
    });

  const columnsRight = [
    {
      field: 'action',
      headerName: 'Action',
      width: 60,
      headerClassName: 'data-grid-header',
      // renderCell: (params) => (<Button type='close' onClick={() => handleRemoveStudent(params.row)} startIcon={<DeleteIcon />}>Remove</Button>)
      renderCell: (params) => (<Button type='close' onClick={() => handleRemoveStudent(params.row)} startIcon={<DeleteIcon />} />)

    },
    { field: 'regNo', headerName: 'Registration No.', width: 130, headerClassName: 'data-grid-header' },
    { field: 'name', headerName: 'Name', width: 180, headerClassName: 'data-grid-header' },
    {
      field: 'choice',
      headerName: 'Choice',
      width: 70,
      headerClassName: 'data-grid-header',
      renderCell: (params) => (
        <Typography
          variant="body1"
          style={{
            color: params.row.choice === 'Yes' ? theme.palette.success.main : theme.palette.error.main
          }}
        >
          {params.row.choice}
        </Typography>
      ),
    },
    { field: 'choiceNo', headerName: 'Priority', width: 70, headerClassName: 'data-grid-header' },
    {
      field: 'recommend',
      headerName: 'Recommend',
      width: 70,
      headerClassName: 'data-grid-header',
      renderCell: (params) => (
        <Typography variant="body1">
          {params.row.recommend === 'Yes' ? (
            <Typography variant="body1" color={'#FFD700'}>
              <StarIcon color="#FFD700" />
            </Typography>
          ) : (
            <Typography variant="body1">-</Typography>
          )}
        </Typography>
      ),
    },
    { field: 'gpa', headerName: 'GPA', type: 'number', width: 50, headerClassName: 'data-grid-header' },
    { field: 'weightedGPA', headerName: 'WGPA', type: 'number', width: 60, headerClassName: 'data-grid-header' },
  ];

  const rowsRight =
    data &&
    selectedStudents.map((user) => {
      return {
        id: user._id,
        _id: user._id,
        regNo: user.regNo,
        name: user.name,
        gpa: user.gpa,
        weightedGPA: user.weightedGPA,
        choice: user.isListed && user.isListed.choice.isSelected ? 'Yes' : 'No',
        choiceNo: user.isListed && user.isListed.choice.choiceNumber || '-',
        recommend: user.isRecommend ? 'Yes' : 'No',
      };
    });

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item>
        <Typography variant="pageTitle" sx={{ marginBottom: 1 }}>Intern Selection For Company</Typography>
      </Grid>
      <Grid item>
        <Tile>
          <Grid container direction='row'>
            <Grid item xs={8}>
              <Typography variant="h6" color="secondary">Instructions</Typography>
              <Tile padding='10px'>
                <Typography variant="body1" color="secondary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, illum?</Typography>
                <Typography variant="body1" color="secondary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, illum?</Typography>
              </Tile>
            </Grid>
            <Grid item xs={4}>
              <CompanyCard company={company} />
            </Grid>
          </Grid>
        </Tile>
      </Grid>
      <Grid item>
        <Grid container spacing={1}>
          <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"List Saved!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                List Saved Successfully. <br />
                Company Name: {dialogData && dialogData.company.name} <br />
                Saved candidates count: {dialogData && dialogData.company.internApplicationList}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Back to Company Page</Button>
              <Button onClick={() => setDialogOpen(false)} autoFocus type="close">Close</Button>
            </DialogActions>
          </Dialog>

          <Grid item xs={6}>
            <Tile>
              <Typography variant="h5" color="">Undergraduate List</Typography><br />

              <InternDataGridMini
                users={students && students}
                rows={rowsLeft}
                columns={columnsLeft}
              />
            </Tile>
          </Grid>

          <Grid item xs={6}>
            <Tile>
              <Typography variant="h5" color="">Selected Intern List</Typography><br />
              {alertOpen && <Fragment>
                <Alert severity="warning">
                  <AlertTitle>Warning</AlertTitle>
                  Company Intern List is Full — <strong>save list or !</strong>
                </Alert>
                <br />
              </Fragment>}

              <InternDataGridMini
                users={selectedStudents && selectedStudents}
                rows={rowsRight}
                columns={columnsRight}
              />
              <br />
              <Button variant="contained" size="large" onClick={handleSave}>Save List</Button>
            </Tile>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default InternProcessCompany