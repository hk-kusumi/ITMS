import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Grid, Typography, Stack, IconButton, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Tile } from "../../components/card/Tile";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { EnglishProficiency } from "../../components/user/Undergraduate/studentCV/EnglishProficiency";
import { PopUpDialog } from "../../components/user/Undergraduate/studentCV/PopUpDialog";
import { ProgrammingLanguages } from "../../components/user/Undergraduate/studentCV/ProgrammingLanguages";
import axios from "axios";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { SoftSkills } from "../../components/user/Undergraduate/studentCV/SoftSkills";

export const StudentCvUpdate = () => {
  //state for fetched data
  const [englishProficiency, setEnglishProficiency] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  //state for backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);
  //End of State

  //useState for PopUpDialog
  const [openForm, setOpenForm] = useState({
    englishProficiency: false,
    programmingLanguages: false,
    otherSkills: false,
    projects: false,
  });
  //End of useState for PopUpDialog

  //fetching data
  const getData = async () => {
    setOpenBackdrop(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/undergraduate/info"
      );
      if (res.status === 200) {
        setEnglishProficiency(res.data.additionalInformation.englishSkill);
        console.log(res.data.additionalInformation.technologies);
        setTechnologies(res.data.additionalInformation.technologies);
        setSoftSkills(res.data.additionalInformation.softSkills);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    setOpenBackdrop(false);
  };

  useEffect(() => {
    getData();
  }, []);
  //End of fetching data

  //Handling state for PopUpDialog
  const togglePopup = (key) => {
    setOpenForm((prevState) => {
      let newState = { ...prevState };
      newState[key] = !newState[key];
      // console.log(newState);
      return newState;
    });
  };
  //End of handling state for PopUpDialog

  return (
    <Box sx={{ height: "88vh" }}>
      <Box>
        <Typography
          variant="h6"
          color="primary"
          marginBottom={"5px"}
          paddingLeft={"15px"}
        >
          Additional Information
        </Typography>
      </Box>
      <Box sx={{ height: "100%" }}>
        <Grid container spacing={1} sx={{ height: "100%" }}>
          <Grid item xs={12}>
            {/* content here */}
            <Stack
              height={"100%"}
              spacing={1}
              display={"flex"}
              direction={"column"}
              justifyContent={"space-around"}
            >
              <Tile sx={{ height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Typography varient="h2" fontWeight="bold">
                    English Proficiency
                  </Typography>
                  <IconButton
                    name="addEnglishProficiency"
                    onClick={() => {
                      togglePopup("englishProficiency");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <PopUpDialog
                    open={openForm.englishProficiency}
                    setOpen={() => {
                      togglePopup("englishProficiency");
                    }}
                    id={"EnglishProficiency"}
                  >
                    <EnglishProficiency />
                  </PopUpDialog>
                </Stack>
                <Stack mt={1} direction={"row"} spacing={0.5}>
                  {(englishProficiency.odinaryLevel !== "" ||
                    englishProficiency.odinaryLevel != "undefined") && (
                    <>
                      <Chip
                        label={`Ordinary Level result : ${englishProficiency.odinaryLevel}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                  {englishProficiency.advancedLevel !== "" && (
                    <>
                      <Chip
                        label={`Advance Level result : ${englishProficiency.advancedLevel}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                  {englishProficiency.level01 !== "" && (
                    <>
                      <Chip
                        label={`English level one : ${englishProficiency.level01}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                  {englishProficiency.level02 !== "" && (
                    <>
                      <Chip
                        label={`English level two : ${englishProficiency.level02}`}
                        variant="outlined"
                        color="primary"
                      />
                    </>
                  )}
                </Stack>
              </Tile>
              <Tile sx={{ height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Typography varient="h2" fontWeight="bold">
                    Programming languages
                  </Typography>
                  <IconButton
                    name="addProgrammingLanguages"
                    onClick={() => {
                      togglePopup("programmingLanguages");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <PopUpDialog
                    open={openForm.programmingLanguages}
                    setOpen={() => {
                      togglePopup("programmingLanguages");
                    }}
                    id={"ProgrammingLanguages"}
                  >
                    <ProgrammingLanguages />
                  </PopUpDialog>
                </Stack>
                <Stack mt={1} direction={"row"} spacing={0.5}>
                  {technologies.map((item, index) => (
                    <Box key={index}>
                      {item.name !== "" && item.name !== "" && (
                        <Stack>
                          <Chip
                            label={`Language : ${item.name} - Level : ${item.level}`}
                            variant="outlined"
                            color="primary"
                          />
                        </Stack>
                      )}
                    </Box>
                  ))}
                </Stack>
              </Tile>

              <Tile sx={{ height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Typography varient="h2" fontWeight="bold">
                    Soft Skills
                  </Typography>
                  <IconButton
                    name="addOtherSkills"
                    onClick={() => {
                      togglePopup("otherSkills");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <PopUpDialog
                    open={openForm.otherSkills}
                    setOpen={() => {
                      togglePopup("otherSkills");
                    }}
                    id={"OtherSkills"}
                  >
                    <SoftSkills />
                  </PopUpDialog>
                </Stack>
                <Stack mt={1} direction={"row"} spacing={0.5}>
                  {softSkills.map((skill, index) => (
                    <Box key={index}>
                      {skill !== "" && (
                        <>
                          <Chip
                            label={`Soft Skill : ${skill}`}
                            variant="outlined"
                            color="primary"
                          />
                        </>
                      )}
                    </Box>
                  ))}
                </Stack>
              </Tile>

              <Tile sx={{ height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Typography varient="h2" fontWeight="bold">
                    Projects
                  </Typography>
                  <IconButton
                    name="addProjects"
                    onClick={() => {
                      togglePopup("projects");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <PopUpDialog
                    open={openForm.projects}
                    setOpen={() => {
                      togglePopup("projects");
                    }}
                    id={"projects"}
                  ></PopUpDialog>
                </Stack>
                {/* <Stack mt={1} direction={"row"} spacing={0.5}> */}
                {/* {data.projects !== "" && (
                  <>
                    <Chip
                      label={`project Name : ${data.projects}`}
                      variant="outlined"
                      color="primary"
                    />
                  </>
                )}
                {data.projectDescription !== "" && (
                  <>
                    <Chip
                      label={`Project Description : ${data.projectDescription}`}
                      variant="outlined"
                      color="primary"
                    />
                  </>
                )}
                {data.projectTechnologies !== "" && (
                  <>
                    <Chip
                      label={`Used Technologies : ${data.projectTechnologies}`}
                      variant="outlined"
                      color="primary"
                    />
                  </>
                )}
                {data.projectRepoLink !== "" && (
                  <>
                    <Chip
                      label={`Project Repositary : ${data.projectRepoLink}`}
                      variant="outlined"
                      color="primary"
                    />
                  </>
                )}
                {data.projectLiveLink !== "" && (
                  <>
                    <Chip
                      label={`Project URL : ${data.projectLiveLink}`}
                      variant="outlined"
                      color="primary"
                    />
                  </>
                )} */}
                {/* </Stack> */}
              </Tile>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {openBackdrop && <CustomBackdrop />}
    </Box>
  );
};
