import logo from "./logo.svg";
import "./App.css";
import LabourBoard from "../src/components/LabourBoard";
import { useEffect, useState } from "react";
const ZOHO = window.ZOHO;

function App() {
  const [projectData, setProjectData] = useState(null);
  const [painterData, setPainterData] = useState(null);
  const [hoursData, setHoursData] = useState(null);
  const [zohoLoaded, setZohoLoaded] = useState(false);

  useEffect(() => {
    ZOHO.embeddedApp.on("PageLoad", function (data) {
      //Custom Bussiness logic goes here
      console.log(data)
    });
    /*
     * initializing the widget.
     */
    ZOHO.embeddedApp.init().then(() => {
      setZohoLoaded(true);
    });
  }, []);

  useEffect(() => {
    async function getData(){
      if (zohoLoaded) {
        await ZOHO.CRM.API.searchRecord({
          Entity: "FP_Projects",
          Type: "criteria",
          Query:
            "(((Project_Status:equals:Requested)or(Project_Status:equals:In Progress)))",
        }).then(function (data) {
          console.log("Project Data ", data);
          setProjectData(data?.data);
        });
        await ZOHO.CRM.API.searchRecord({
          Entity: "Contractors",
          Type: "criteria",
          Query: "(Contractor_Status:equals:Active)",
        }).then(function (data) {
          console.log("Painter Data ", data);
          setPainterData(data?.data);
        });
  
        await ZOHO.CRM.API.getAllRecords({
          Entity: "Hours_Submitted",
          sort_order: "asc",
        }).then(function (data) {
          console.log(data);
          setHoursData(data?.data);
        });
      }
    }
    getData()
  }, [zohoLoaded]);

  // {/* <>{JSON.stringify(projectData)}{JSON.stringify(painterData)}</> */}

  if (!projectData || !painterData || !hoursData) {
    return <h2>Loading....</h2>;
  }

  return (
    <div className="App" style={{ padding: "2vh" }}>
      <LabourBoard
        projectData={projectData}
        painterData={painterData}
        hoursData={hoursData}
      />
    </div>
  );
}

export default App;
