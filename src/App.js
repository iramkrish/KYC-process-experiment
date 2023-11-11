import {useState} from "react"
import Form from "./form";
import KYC from "./kyc"

export default function App() {
  const [ifscvalid,setIfscValid] = useState(false)
  const handleifsc = (value) => {
    setIfscValid(value)
  }
  return (
    <div className="App">{
      !ifscvalid ? <Form ifscvalid={ifscvalid} handleifsc={handleifsc} /> : <KYC ifscvalid={ifscvalid} handleifsc={handleifsc}/>
    }

    </div>
  );
}
