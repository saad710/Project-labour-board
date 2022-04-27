import logo from './logo.svg';
import './App.css';
import LabourBoard from "../src/components/LabourBoard"
import { useEffect } from 'react';
const ZOHO = window.ZOHO

function App() {

  useEffect(() => {
    ZOHO.embeddedApp.on("PageLoad", function (data) {
      console.log(data);
      //Custom Bussiness logic goes here
    });
    /*
     * initializing the widget.
     */
        ZOHO.embeddedApp.init().then(() => {
        ZOHO.CRM.API.searchRecord({Entity:"FP_Projects",Type:"criteria",Query:"(((Project_Status:equals:Requested)or(Project_Status:equals:In Progress)))"})
        .then(function(data){
        console.log(data)
       
     

})
        });



  }, []);



  return (
    <div className="App" style={{padding:"2vh"}} >
        <LabourBoard/>
    </div>
  );
}

export default App;
