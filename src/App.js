import logo from "./logo.svg";
import "./App.css";
import LabourBoard from "../src/components/LabourBoard";
import { useEffect, useState } from "react";
const ZOHO = window.ZOHO;

function App() {
  const [projectData,setProjectData] = useState(null)
  const [painterData,setPainterData] = useState(null)
  const [zohoLoaded,setZohoLoaded] = useState(false)
   
  useEffect(() => {
    ZOHO.embeddedApp.on("PageLoad", function (data) {
      //Custom Bussiness logic goes here
    });
    /*
     * initializing the widget.
     */
    ZOHO.embeddedApp.init().then(() => {
     setZohoLoaded(true);
    });
  }, []);

  useEffect(()=> {
 if(zohoLoaded){
  ZOHO.CRM.API.searchRecord({
    Entity: "FP_Projects",
    Type: "criteria",
    Query:
      "(((Project_Status:equals:Requested)or(Project_Status:equals:In Progress)))",
  }).then(function (data) {
    console.log("Project Data ", data);
    setProjectData(data?.data)
    
  });
  ZOHO.CRM.API.searchRecord({
    Entity: "Contractors",
    Type: "criteria",
    Query:"(Contractor_Status:equals:Active)",
  }).then(function (data) {
    console.log("Painter Data ", data);
    setPainterData(data?.data)
  });
 }
  }, [zohoLoaded])

      // {/* <>{JSON.stringify(projectData)}{JSON.stringify(painterData)}</> */}

  return (
    <div className="App" style={{ padding: "2vh" }}>
    
        <LabourBoard projectData={projectData} painterData={painterData} />
      
    </div>
  );
}

export default App;
