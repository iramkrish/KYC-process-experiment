import { useEffect, useState, useRef } from "react";
import "./dist/output.css";
import {InformationCircleIcon} from "@heroicons/react/24/outline"
import AadhaarInformation from "./components/AadhaarInformation"
import BankAccountNumber from "./components/BankAccountNumber"
import IFSCCode from "./components/IfscCode"
import lottie from "lottie-web";
import doneAnimation from "./lottie/loading-Animation.json"

export default function Form({ifscvalid, handleifsc}) {
  const expected_ifsc_code_length = 11;
  const [ifsc, setIfsc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState(false);
  const [IfscCodeError,setIFSCcodeError] = useState(false)

  const BankAccountNumberref = useRef(null);
  const AadhaarInformationref = useRef(null);
  const IFSCCoderef = useRef(null)

  const animation = lottie.loadAnimation({
    name:'ifsccheck',
    container: document.querySelector("#doneAnimation"),
    animationData: doneAnimation,
    loop: true,
    autoplay: false
  });

  useEffect(() => {
    if(loading){
      animation.play('ifsccheck')
    }else{
      animation.destroy('ifsccheck');
    }
  }, [loading,animation]);

  const showAadhaarInformation = () => {
    closeAll()
    AadhaarInformationref.current.toggle();
  }

  const showBankAccountNumber = () => {
    closeAll()
    BankAccountNumberref.current.toggle();
  }

  const showIFSCCode = () => {
    closeAll()
    IFSCCoderef.current.toggle();
  }

  const closeAll = () => {
    AadhaarInformationref.current.close();
    BankAccountNumberref.current.close();
    IFSCCoderef.current.close();
  }

  const check_ifsc = (event) => {
    const ifsc_code = event.target.value
    if( ifsc_code.length === expected_ifsc_code_length ){
        setIFSCcodeError(false)
    }else{
        if(ifsc_code.length===0){
          setIFSCcodeError(false)
        }else{
          setIFSCcodeError(true)
        }
    }
  }

  const formSubmission = (event) => {
    event.preventDefault();

    const user_name = event.target.user_name.value ?? null;
    const bank_account_number = event.target.bank_account_number.value ?? null;
    const bank_ifsc_number = event.target.bank_ifsc_number.value ?? null;

    if (bank_ifsc_number.length !== expected_ifsc_code_length) {
        return false;
    }

    if (user_name && bank_account_number && bank_ifsc_number) {
      localStorage.setItem("user_name", user_name);
      localStorage.setItem("bank_account_number", bank_account_number);
      localStorage.setItem("bank_ifsc_number", bank_ifsc_number);

      setIfsc(bank_ifsc_number);
      setValidate(true);
    }else{
      return false;
    }
  };

  useEffect(() => {
    if (validate) {
      closeAll()
      setLoading(true)
      const url = "https://ifsc.razorpay.com/" + ifsc;
      const response = fetch(url, {
        mode: "cors",
      });
      response
        .then((data) => data.json())
        .then((data) => {
          handleifsc(data?.IFSC ? true : false);
          setLoading(false)
          setValidate(false);
        })
        .catch((error) => {
          setLoading(false);
          setValidate(false);
          console.log(error)
        });
    }
  }, [validate,ifsc,handleifsc]);
  return (
    <div>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(event) => formSubmission(event)}
      >
        <div className={`h-full w-full absolute left-0 top-0 bg-white/80 flex-col justify-center items-center ${loading ? 'flex' : 'hidden'}`}>
        <div id="doneAnimation" className="h-10 w-10"></div>

        </div>
        <div className="mb-4">
          <div className={`flex flex-row align-center mb-2`}>
            <label
                htmlFor="user_name"
                className="block text-gray-700 text-sm font-bold mb-0 mr-2"
              >
            Name
            </label>
            <InformationCircleIcon onClick={()=>showAadhaarInformation()} className="h-5 w-5 text-green-500"/>
          </div>
          <input
            id="user_name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            onFocus={()=>showAadhaarInformation()}

          />
        </div>
        <div className="mb-4">
          <div className={`flex flex-row align-center mb-2`}>
            <label
                htmlFor="bank_account_number"
                className="block text-gray-700 text-sm font-bold mb-0 mr-2"
              >
            Bank Account Number
            </label>
            <InformationCircleIcon onClick={()=>showBankAccountNumber()} className="h-5 w-5 text-green-500"/>
          </div>
          <input
            id="bank_account_number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            onFocus={()=>showBankAccountNumber()}
          />
        </div>
        <div className="mb-4">
          <div className={`flex flex-row align-center mb-2`}>
            <label
                htmlFor="bank_ifsc_number"
                className="block text-gray-700 text-sm font-bold mb-0 mr-2"
              >
                IFSC Code
            </label>
            <InformationCircleIcon onClick={()=>showIFSCCode()} className="h-5 w-5 text-green-500"/>
          </div>
          <input
          onChange={(event)=>check_ifsc(event)}
            id="bank_ifsc_number"
            className={`shadow appearance-none border ${IfscCodeError ? ' border-red-600' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            required
            onFocus={()=>showIFSCCode()}
            maxLength={expected_ifsc_code_length}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          SUBMIT
        </button>
      </form>
      <AadhaarInformation ref={AadhaarInformationref}/>
      <BankAccountNumber ref={BankAccountNumberref}/>
      <IFSCCode ref={IFSCCoderef}/>

    </div>
  );
}
