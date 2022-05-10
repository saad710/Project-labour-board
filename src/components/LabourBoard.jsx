import React, { useEffect, useState, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
// import "../../styles/JobCard.css"

const painters = ["Christine", "Alex", "Grey", "Hopper"];
const TableHeadRecord = [
  {
    field_name: "Date",
    api_name: "Es",
  },
  {
    field_name: "Job no",
    api_name: "Job_Book_Number",
  },
  {
    field_name: "Client",
    api_name: "Account_Name",
  },
  {
    field_name: "Project",
    api_name: "Name",
  },
  // {
  //   field_name: "Status",
  //   api_name: "Project_Status",
  // },
  {
    field_name: "Office Budget",
    api_name: "Budget_hours",
  },
  {
    field_name: "Assess",
    api_name: "Painter_Estimate",
  },
  {
    field_name: "WIP",
    api_name: "WIP",
  },
  {
    field_name: "To Complete",
    api_name: "To_Complete",
  },
  {
    field_name: "Status",
    api_name: "Project_status",
  },
];

// const LabourWorkData = [
//   {
//     Contact: "",
//     Date: "7/12/3",
//     Job: "34567",
//     Client: "furora International",
//     Project: "Library Management",
//     officeBudget: 0,
//     Assess: 0,
//     Wip: 0,
//     toComplete: 0,
//     painters: [
//       { name: "Christine", value: 0 },
//       { name: "Alex", value: 0 },
//       { name: "Grey", value: 0 },
//       { name: "Hopper", value: 0 },
//     ],
//   },
//   {
//     Contact: "",
//     Date: "7/12/3",
//     Job: "35067",
//     Client: "furora International",
//     Project: "Library Management",
//     officeBudget: 0,
//     Assess: 0,
//     Wip: 0,
//     toComplete: 0,
//     painters: [
//       { name: "Christine", value: 0 },
//       { name: "Alex", value: 0 },
//       { name: "Grey", value: 0 },
//       { name: "Hopper", value: 0 },
//     ],
//   },
//   {
//     Contact: "",
//     Date: "7/12/3",
//     Job: "35567",
//     Client: "furora International",
//     Project: "Library Management",
//     officeBudget: 0,
//     Assess: 0,
//     Wip: 0,
//     toComplete: 0,
//     painters: [
//       { name: "Christine", value: 0 },
//       { name: "Alex", value: 0 },
//       { name: "Grey", value: 0 },
//       { name: "Hopper", value: 0 },
//     ],
//   },
//   {
//     Contact: "",
//     Date: "7/12/3",
//     Job: "36067",
//     Client: "furora International",
//     Project: "Library Management",
//     officeBudget: 0,
//     Assess: 0,
//     Wip: 0,
//     toComplete: 0,
//     painters: [
//       { name: "Christine", value: 0 },
//       { name: "Alex", value: 0 },
//       { name: "Grey", value: 0 },
//       { name: "Hopper", value: 0 },
//     ],
//   },
// ];

// const submittedHour = [
//   {Contratctor:"Contr - 167",job:"P22088a",hours:2}
// ]

const LabourBoard = (props) => {
  const { projectData, painterData, hoursData } = props;
  console.log(hoursData);
  console.log(painterData);
  const { register, control, watch, handleSubmit, setValue } = useForm();

  console.log(projectData);

  const allfields = watch();
  console.log(allfields);
  const onSubmit = (data) => console.log(data);

 
  //add_contractors_data_in_fp_projects
  let LabourWorkData = {};
  projectData?.forEach(
    (project) =>
      (LabourWorkData[project.id] = {
        id: project.id,
        Contact: "",
        Job_Number: project.Job_Number,
        Job: project.Job_Book_Number,
        Wip: project.WIP,
        toComplete: project.To_Complete,
        officeBudget: project.Budget_hours,
        Assess: project.Painter_Estimate,
        Status: project.Project_Status,
        Date: project.Es,
        Client: project.Account_name,
        Project: project.Name,
        painters: painterData,
        // painters: updateHourData.filter(update => update.Project_id === project.id)
        // painters: updateHourData.map(update =>( update.Project_id === project.id ? {...update, hourSubmitted:update.hourSubmitted} : {...update, hourSubmitted:null}))
      })
  );
  

  //add_hour_submitted_data_with_matching_contractor_id
  hoursData.forEach((hour) => {
    const updatedPainterData = LabourWorkData[hour.Project.id].painters.map(
      (painter) => {
        if (painter.id === hour.Contractor.id) {
          return { ...painter, value: hour.Submitted_Hours };
        } else {
          return {...painter,value:null};
        }
      }
      );
      LabourWorkData[hour.Project.id].painters=updatedPainterData
    });
    console.log(LabourWorkData);





    //contractor_default_value_calculation
  useEffect(() => {
    Object.keys(LabourWorkData).map((xData,ind) => {
      const jobId = LabourWorkData[xData].Job;
      let wipValue = 0;
      LabourWorkData[xData].painters.forEach((painter) => {
        
          setValue(painter.First_Name + "__" + jobId, painter?.value !== null ? painter.value : 0);
          wipValue += painter?.value ? painter.value : 0;
        
        //  else{
        //   setValue(painter.painter_name + "__" + jobId,0)
        //  }
      });
      // console.log(LabourWorkData)
      setValue("wip" + "__" + jobId, wipValue);
      let assessValue = watch("assess" + "__" + jobId);
      if (/^\d+$/.test(assessValue)) {
        assessValue = parseInt(assessValue);
      } else {
        assessValue = 0;
      }
      let toCompleteValue = assessValue - wipValue;
      setValue("toComplete" + "__" + jobId, toCompleteValue);
    });
  }, []);



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TableContainer
        component={Paper}
        sx={{
          margin: 2,
          width: "100%",
          height: "80vh",
          boxShadow: "none",
          borderLeft: "1px solid black",
          borderRight: "1px solid black",
          borderTop: "1px solid black",
        }}
      >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan="4"
                style={{
                  backgroundColor: "#b19cd9",
                  "text-align": "center",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Project Labour Board
              </TableCell>
              <TableCell
                sx={{
                  borderLeft: "1px solid black",
                  backgroundColor: "#b19cd9",
                }}
              ></TableCell>
              <TableCell
                sx={{
                  borderLeft: "1px solid black",
                  backgroundColor: "#b19cd9",
                }}
              ></TableCell>
              <TableCell
                sx={{
                  borderLeft: "1px solid black",
                  backgroundColor: "#b19cd9",
                }}
              ></TableCell>
              <TableCell
                sx={{
                  borderLeft: "1px solid black",
                  backgroundColor: "#b19cd9",
                }}
              ></TableCell>
              <TableCell sx={{ borderLeft: "1px solid black" }}>
                Painters
              </TableCell>
              <TableCell sx={{ borderLeft: "1px solid black" }}>
                Status
              </TableCell>
              {painterData?.map((Labour, index) => (
                <TableCell
                  sx={{
                    borderLeft: "1px solid black",
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    fontWeight: "bold",
                  }}
                  key={index}
                >
                 {Labour.First_Name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell>Contact</TableCell>
              <TableCell sx={{ borderLeft: "1px solid black" }}>Date</TableCell>
              <TableCell sx={{ borderLeft: "1px solid black" }}>
                {" "}
                Job no
              </TableCell>
              <TableCell sx={{ borderLeft: "1px solid black" }}>
                Client
              </TableCell>
              <TableCell sx={{ borderLeft: "1px solid black" }}>
                Project
              </TableCell>
              <TableCell sx={{ borderLeft: "1px solid black" }}>
                Office Budget
              </TableCell>
              <TableCell sx={{ borderLeft: "1px solid black" }}>
                Asseses
              </TableCell>
              <TableCell
                sx={{
                  borderLeft: "1px solid black",
                  backgroundColor: "#addfad",
                }}
              >
                WIP
              </TableCell>
              <TableCell
                sx={{
                  borderLeft: "1px solid black",
                  backgroundColor: "#b19cd9",
                }}
              >
                To Compelte
              </TableCell>
              <TableCell sx={{ borderLeft: "1px solid black" }}></TableCell>
              {painterData?.map((name, index) => (
                <TableCell
                  sx={{ borderLeft: "1px solid black" }}
                  key={index}
                ></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {
            Object.keys(LabourWorkData).map((xData,ind) => (
              <TableRow key={ind}>
                <TableCell>
                  <Controller
                    name={"contact" + "__" + LabourWorkData[xData].Job}
                    defaultValue={LabourWorkData[xData].Contact}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        id="standard-basic"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell sx={{ borderLeft: "1px solid black" }}>
                  <Controller
                    name={"date" + "__" + LabourWorkData[xData].Job}
                    control={control}
                    defaultValue={LabourWorkData[xData].Date}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        id="standard-basic"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell sx={{ borderLeft: "1px solid black" }}>
                  <Controller
                    name={"job" + "__" + LabourWorkData[xData].Job}
                    control={control}
                    defaultValue={LabourWorkData[xData].Job}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        id="standard-basic"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell sx={{ borderLeft: "1px solid black" }}>
                  <Controller
                    name={"client" + "__" + LabourWorkData[xData].Job}
                    defaultValue={LabourWorkData[xData].Client}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        id="standard-basic"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell sx={{ borderLeft: "1px solid black" }}>
                  <Controller
                    name={"project" + "__" + LabourWorkData[xData].Job}
                    defaultValue={LabourWorkData[xData].Project}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        id="standard-basic"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell sx={{ borderLeft: "1px solid black" }}>
                  <Controller
                    name={"officeBudget" + "__" + LabourWorkData[xData].Job}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        id="standard-basic"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell sx={{ borderLeft: "1px solid black" }}>
                  <Controller
                    name={"assess" + "__" + LabourWorkData[xData].Job}
                    control={control}
                    defaultValue={LabourWorkData[xData].Assess}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        id="standard-basic"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          const grabId = field.name.split("__")[1];
                          const wipValue = watch("wip" + "__" + grabId) || 0;
                          let assessValue = watch("assess" + "__" + grabId);

                          // const regex = /^\d+$/;

                          if (/^\d+$/.test(assessValue)) {
                            assessValue = parseInt(assessValue);
                          } else {
                            assessValue = 0;
                          }
                          console.log(assessValue);

                          let toCompleteValue = assessValue - wipValue;

                          setValue("toComplete__" + grabId, toCompleteValue);
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    borderLeft: "1px solid black",
                    backgroundColor:
                      watch("toComplete__" + [LabourWorkData[xData].Job]) < 0
                        ? "red"
                        : "#addfad",
                  }}
                >
                  <Controller
                    name={"wip" + "__" + LabourWorkData[xData].Job}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        id="standard-basic"
                        variant="standard"
                        onChange={(e) => {
                          return;
                        }}
                        //  value={resultForWip[rowindex] !== 0 ? resultForWip[rowindex] : "" }
                        //  hidden={true}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    borderLeft: "1px solid black",
                    backgroundColor:
                      watch("toComplete__" + [LabourWorkData[xData].Job]) < 0
                        ? "red"
                        : "#addfad",
                  }}
                >
                  <Controller
                    name={"toComplete" + "__" + LabourWorkData[xData].Job}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        id="standard-basic"
                        variant="standard"
                        // value={afterSubtractComplete[rowindex] !== 0 ? afterSubtractComplete[rowindex] : ""}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell sx={{ borderLeft: "1px solid black" }}>
                  <Controller
                    name={"status" + "__" + LabourWorkData[xData].Job}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        id="standard-basic"
                        variant="standard"
                        // value={afterSubtractComplete[rowindex] !== 0 ? afterSubtractComplete[rowindex] : ""}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    )}
                  />
                </TableCell>
                {LabourWorkData[xData].painters?.map((info, index) => (
                  <TableCell sx={{ borderLeft: "1px solid black" }} key={index}>
                    <Controller
                      name={info.painter_name + "__" + LabourWorkData[xData].Job}
                      control={control}
            
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          {...field}
                          id="standard-basic"
                          variant="standard"
                          defaultValue={field.value}
                          onChange={(e) => {
                            console.log(field.name);
                           
                            field.onChange(e.target.value);
                            const grabId = field.name.split("__")[1];
                            console.log(grabId);
                            let assessValue =
                              watch("assess" + "__" + grabId) || 0;
                            if (/^\d+$/.test(assessValue)) {
                              assessValue = parseInt(assessValue);
                            } else {
                              assessValue = 0;
                            }
                            // console.log(assessValue)
                            console.log(watch());
                            const allPainters = LabourWorkData[xData].painters;
                            // console.log({allPainters})
                            let wipValue = 0;
                            let toCompleteValue;
                            allPainters.forEach((painter) => {
                              const value = watch(painter.First_Name + "__" + grabId);
                              const regex = /^\d+$/;
                              wipValue += regex.test(value)
                                ? parseInt(value)
                                : 0;
                            });
                            // console.log("assess",assessValue)
                            // console.log("wip",wipValue)
                            toCompleteValue = assessValue - wipValue;
                            console.log({ toCompleteValue });
                            setValue("toComplete__" + grabId, toCompleteValue);
                            setValue("wip__" + grabId, wipValue);
                            console.log({ wipValue });
                          }}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      )}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))
          }
           
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
};

export default LabourBoard;
