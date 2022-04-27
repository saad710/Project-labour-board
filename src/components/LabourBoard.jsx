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
// const LabourWorkData = [
//     {Contact : "",Date : "7/12/3",Job:"34567",Client:"furora International",Project:"Library Management"},
//     {Contact : "",Date : "7/12/3",Job:"35067",Client:"furora International",Project:"Library Management"},
//     {Contact : "",Date : "7/12/3",Job:"35567",Client:"furora International",Project:"Library Management"},
//     {Contact : "",Date : "7/12/3",Job:"36067",Client:"furora International",Project:"Library Management"},
// ]

// let myObj = {
//     foo0_hour_0: 'test',
//     foo1_hour_0: 'test',
//     foo2: 'test',
//     foo3: 'test',
//   };

//   const res = Object.keys(myObj).filter(([c]) => c == "[a-zA-Z]+_0-9");
//   console.log(res);
// let filtered_keys = (obj, filter) => {
//     let key, keys = []
//     for (key in obj)
//       if (obj.hasOwnProperty(key) && filter.test(key))
//         keys.push(key)
//     return keys
//   }

//   // example:
//   let filteredNames = filtered_keys(myObj, /hour_1/)

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

const LabourBoard = () => {
  const { register, control, watch, handleSubmit, setValue } = useForm();

  const allfields = watch();
  console.log(allfields);
  const onSubmit = (data) => console.log(data);

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
              {painters?.map((name, index) => (
                <TableCell
                  sx={{
                    borderLeft: "1px solid black",
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    fontWeight: "bold",
                  }}
                  key={index}
                >
                  {name}
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
              {painters?.map((name, index) => (
                <TableCell
                  sx={{ borderLeft: "1px solid black" }}
                  key={index}
                ></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {LabourWorkData?.map((data, rowindex) => (
              <TableRow key={rowindex}>
                <TableCell>
                  <Controller
                    name={"contact" + "__" + data.Job}
                    defaultValue={data.Contact}
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
                    name={"date" + "__" + data.Job}
                    control={control}
                    defaultValue={data.Date}
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
                    name={"job" + "__" + data.Job}
                    control={control}
                    defaultValue={data.Job}
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
                    name={"client" + "__" + data.Job}
                    defaultValue={data.Client}
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
                    name={"project" + "__" + data.Job}
                    defaultValue={data.Project}
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
                    name={"officeBudget" + "__" + data.Job}
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
                    name={"assess" + "__" + data.Job}
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
                      watch("toComplete__" + [data.Job]) < 0
                        ? "red"
                        : "#addfad",
                  }}
                >
                  <Controller
                    name={"wip" + "__" + data.Job}
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
                      watch("toComplete__" + [data.Job]) < 0
                        ? "red"
                        : "#addfad",
                  }}
                >
                  <Controller
                    name={"toComplete" + "__" + data.Job}
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
                    name={"status" + "__" + data.Job}
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
                {data.painters?.map((info, index) => (
                  <TableCell sx={{ borderLeft: "1px solid black" }} key={index}>
                    <Controller
                      name={info.name + "__" + data.Job}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          {...field}
                          id="standard-basic"
                          variant="standard"
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
                            const allPainters = data.painters;
                            // console.log({allPainters})

                            let wipValue = 0;
                            let toCompleteValue;

                            allPainters.forEach((painter) => {
                              const value = watch(painter.name + "__" + grabId);

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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
};

export default LabourBoard;