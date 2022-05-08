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
  
]

const LabourWorkData = [
  {
    Contact: "",
    Date: "7/12/3",
    Job: "34567",
    Client: "furora International",
    Project: "Library Management",
    officeBudget: 0,
    Assess: 0,
    Wip: 0,
    toComplete: 0,
    painters: [
      { name: "Christine", value: 0 },
      { name: "Alex", value: 0 },
      { name: "Grey", value: 0 },
      { name: "Hopper", value: 0 },
    ],
  },
  {
    Contact: "",
    Date: "7/12/3",
    Job: "35067",
    Client: "furora International",
    Project: "Library Management",
    officeBudget: 0,
    Assess: 0,
    Wip: 0,
    toComplete: 0,
    painters: [
      { name: "Christine", value: 0 },
      { name: "Alex", value: 0 },
      { name: "Grey", value: 0 },
      { name: "Hopper", value: 0 },
    ],
  },
  {
    Contact: "",
    Date: "7/12/3",
    Job: "35567",
    Client: "furora International",
    Project: "Library Management",
    officeBudget: 0,
    Assess: 0,
    Wip: 0,
    toComplete: 0,
    painters: [
      { name: "Christine", value: 0 },
      { name: "Alex", value: 0 },
      { name: "Grey", value: 0 },
      { name: "Hopper", value: 0 },
    ],
  },
  {
    Contact: "",
    Date: "7/12/3",
    Job: "36067",
    Client: "furora International",
    Project: "Library Management",
    officeBudget: 0,
    Assess: 0,
    Wip: 0,
    toComplete: 0,
    painters: [
      { name: "Christine", value: 0 },
      { name: "Alex", value: 0 },
      { name: "Grey", value: 0 },
      { name: "Hopper", value: 0 },
    ],
  },
];


const submittedHour = [
  {Contratctor:"Contr - 167",job:"P22088a",hours:2}
]

const LabourBoard = (props) => {
  const {projectData,painterData,hoursData} = props;
  console.log(painterData)
  const { register, control, watch, handleSubmit, setValue } = useForm();
 
  console.log(projectData)

  const allfields = watch();
  console.log(allfields);
  const onSubmit = (data) => console.log(data);


  const updatedPaintersInfo = painterData?.map(painter => (
      {id:painter.id,painter_name:painter.First_Name,painter_match_name:painter.Name,value:0}
  ))
  console.log(updatedPaintersInfo)

  let workData = {}
  projectData?.forEach(project => {
    workData[project.id] = {
      id: project.id,
      Job_Number : project.Job_Number,
      WIP : project.WIP,
      To_Complete : project.To_Complete,
      Office_Budget: project.Budget_hours,
      Assess : project.Painter_Estimate,
      Status: project.Project_Status,
      Date:project.Es,
      Account_name:project.Account_name,
      Project_Name : project.Name,
      painters: updatedPaintersInfo
    }
  })
  console.log(workData)

  const updateHourData = hoursData.map(hour => ( 
    {id:hour.id,contractor_name:hour.Contractor.name,contractor_id:hour.Contractor.id,project:hour.Project.name,hourSubmitted:hour.Submitted_Hours,Project_id:hour.Project.id}
  ))
  console.log(updateHourData)

  let updateWorkData;
  updateHourData?.forEach(itemData => {
    updateWorkData = workData[itemData.Project_id].painters.map(painter => {
      if(painter.id === itemData.Project_id){
        return {...painter,value:painter.value}
      }
    })
  })
  console.log(updateWorkData)

  // let PaintersInfo;
  // updateHourData?.forEach(updateData => {
  //     PaintersInfo = workData[updateData.Project_id].painters.map(painter => {
  //         if(updateData.contractor_id === painter.id){
  //            return painter.value = updateData.hourSubmitted
  //         }
  //     })
  // })
  // console.log(PaintersInfo)



  // //hours submitter
// data.forEach(itm=>{

//   updatedPaintersInfo=workdata[itm.Projects.id].painters.map(painter=>{
 // if(itm.id===painter.id){




 

  useEffect(() => {
    // LabourWorkData.forEach(LabourInfo => {
    //  const jobId = LabourInfo.Job
    //  let wipValue = 0
    //  LabourInfo.painters.forEach(painter => {
    //    setValue(painter.name + "__" + jobId,painter.value )
    //    wipValue += painter.value
    //  })
    //  setValue("wip" + "__" + jobId,wipValue)
    //  let assessValue = watch("assess" + "__" + jobId);
    //  if (/^\d+$/.test(assessValue)) {
    //   assessValue = parseInt(assessValue);
    // } else {
    //   assessValue = 0;
    // }
    // let toCompleteValue = assessValue - wipValue
    //  setValue("toComplete" + "__" + jobId, toCompleteValue)
    // })
    projectData?.forEach(project => {
      // let projectName = project.Name
      painterData?.forEach(painter => {
        updateHourData.forEach(update => {
          if(project?.Name === update?.project && painter?.Name === update?.contractor){
            console.log("matched")
              setValue(painter.First_Name + "__" + project.Job_Number,update?.hourSubmitted)
            
          }
        })
      })
      
    })
  },[])

  // useEffect(() => {

  // })

  // useEffect(() => {
  //   LabourWorkData.forEach(LabourInfo => {
  //    const jobId = LabourInfo.Job
  //    let wipValue = 0
  //    LabourInfo.painters.forEach(painter => {
  //      setValue(painter.name + "__" + jobId,4 )
  //      wipValue += painter.value
  //    })
  //    setValue("wip" + "__" + jobId,wipValue)
  //    let assessValue = watch("assess" + "__" + jobId);
  //    if (/^\d+$/.test(assessValue)) {
  //     assessValue = parseInt(assessValue);
  //   } else {
  //     assessValue = 0;
  //   }
  //   let toCompleteValue = assessValue - wipValue
  //    setValue("toComplete" + "__" + jobId, toCompleteValue)
  //   })
  // },[])



  const handlePainterVal = (e,field,data,info) => {
    // setValue(info.First_Name + "__" + data.Job_Number,3)]\
    console.log(e.target.value)
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
    // const allPainters = data.painters;
    // console.log({allPainters})

    let wipValue = 0;
    let toCompleteValue;

    painterData.forEach((painter) => {
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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{width:"98%"}}>
      <TableContainer
        component={Paper}
        sx={{
          margin: 2,
          // width: "100%",
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
                  "textAlign": "center",
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
              {painterData?.map((painterInfo, index) => (
                <TableCell
                  sx={{
                    borderLeft: "1px solid black",
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    fontWeight: "bold",
                  }}
                  key={index}
                >
                  {painterInfo.First_Name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableHead>
           
                <TableRow >
              <TableCell>Contact</TableCell>
              {
              TableHeadRecord?.map((headInfo,index) => (
              <TableCell key={index} sx={{ borderLeft: "1px solid black",backgroundColor:`${headInfo.field_name === "WIP" ? "#addfad" : headInfo.field_name === "To Complete" ? "#b19cd9" : ""  }` }}>{headInfo.field_name}</TableCell>
          
              ) )
              }
              {/* <TableCell
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
              <TableCell sx={{ borderLeft: "1px solid black" }}></TableCell> */}
              {painterData?.map((name, index) => (
                <TableCell
                  sx={{ borderLeft: "1px solid black" }}
                  key={index}
                ></TableCell>
              ))}
            </TableRow>
            
          </TableHead>
          <TableBody>
            {projectData?.map((data, rowindex) => (
              <TableRow key={rowindex}>
                <TableCell>
                  <Controller
                    name={"contact" + "__" + data.Job_Number}
                    // defaultValue={data.Contact}
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
                    name={"date" + "__" + data.Job_Number}
                    control={control}
                    defaultValue={data.Es || ""}
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
                    name={"job" + "__" + data.Job_Number}
                    control={control}
                    defaultValue={data.Job_Number || ""}
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
                    name={"client" + "__" + data.Job_Number}
                    defaultValue={data.Account_name || ""}
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
                    name={"project" + "__" + data.Job_Number}
                    defaultValue={data.Name || ""}
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
                    name={"officeBudget" + "__" + data.Job_Number}
                    defaultValue={data.Budget_hours ||""}
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
                    name={"assess" + "__" + data.Job_Number}
                    defaultValue={data.Painter_Estimate || ""}
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
                      watch("toComplete__" + [data.Job_Number]) < 0
                        ? "red"
                        : "#addfad",
                  }}
                >
                  <Controller
                    name={"wip" + "__" + data.Job_Number}
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
                      watch("toComplete__" + [data.Job_Number]) < 0
                        ? "red"
                        : "#addfad",
                  }}
                >
                  <Controller
                    name={"toComplete" + "__" + data.Job_Number}
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
                    name={"status" + "__" + data.Job_Number}
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
                {painterData?.map((info, index) => (
                  <TableCell sx={{ borderLeft: "1px solid black" }} key={index}>
                    <Controller
                      name={info.First_Name + "__" + data.Job_Number}
                      control={control}
                      // defaultValue={4}
                      render={({ field }) => (
                        
                        <TextField
                          fullWidth
                          {...field}
                          id="standard-basic"
                          variant="standard"
                          defaultValue={field.value}
                        
                      //     value= {hoursData?.map(sub => (
                      //     sub.Contratctor?.name === info.Name && data.Name === sub.Project?.name ?  sub.Submitted_Hours : ""
                      // ))}
                      
                          onChange={(e) => handlePainterVal(e,field,data,info)}
                          InputProps={{
                            disableUnderline: true,
                          }}
                        />
                      )}
                    />
                  </TableCell>
                ))}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
};

export default LabourBoard;




