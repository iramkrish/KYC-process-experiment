import { useState, forwardRef, useRef, useImperativeHandle, useCallback } from "react";
import {XCircleIcon} from "@heroicons/react/24/outline"
import SBI from "../images/sbi-account-number.jpeg"
import Canara from "../images/canara-bank-account-number.jpeg"
import Indianbank from "../images/bank-account-number-Indian-Bank.jpeg"
import "../dist/output.css";

const Images = {
    'sbi':SBI,
    'canara':Canara,
    'indianbank': Indianbank
}

const BankAccountNumber = forwardRef(function MyInput(props, ref) {
    const [showBankAccountNumberSnippet,setshowBankAccountNumberSnippet] = useState(false)
    const [Bank,setBank] = useState('sbi')

    const showBankAccountNumber = useCallback(() => {
        setshowBankAccountNumberSnippet(!showBankAccountNumberSnippet)
    }, [showBankAccountNumberSnippet]);

    const viewRef = useRef(null);

    useImperativeHandle(ref, () => {
        return {
        toggle() {
            showBankAccountNumber()
        },
        close() {
            setshowBankAccountNumberSnippet(false)
        }
        };
    }, [showBankAccountNumber]);

    const selectedOption = (event) => {
        setBank(event.target.value)
    }


  return (
    <div className={`absolute w-full bottom-0 ${showBankAccountNumberSnippet ? 'block bg-gray-50' : 'hidden'}`} ref={viewRef} >
        <div className="shadow-inner rounded px-8 pt-6 pb-8 flex flex-col items-center">
        <select className="p-2 bg-gray-100 rounded shadow font-bold text-sm outline-none" onChange={(event)=>selectedOption(event)}>
            <option value="sbi">SBI</option>
            <option value="canara">Canara</option>
            <option value="indianbank">Indian Bank</option>
        </select>
        <p className="my-2 font-bold"><span className=" text-red-500 font-normal">Sample Image</span> - Bank Account Number</p>
        <img src={Images[Bank]} alt="Aadhaar sample for Name" className="h-100 max-w-sm my-2" />
        <div className="cursor-pointer inline-flex flex-row justify-center items-center p-2 px-4 bg-green-500 text-white xl:w-auto w-full rounded" onClick={showBankAccountNumber} >
            <span className="font-bold mr-2">CLOSE</span>
            <XCircleIcon className="h-5 w-5"/>
        </div>
        </div>
    </div>)
});

export default BankAccountNumber;
