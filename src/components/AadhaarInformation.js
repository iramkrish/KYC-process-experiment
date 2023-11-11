import { useState, forwardRef, useRef, useImperativeHandle, useCallback } from "react";
import {XCircleIcon} from "@heroicons/react/24/outline"
import AadhaarImage from "../images/aadhaar-name.png"
import "../dist/output.css";

const AadhaarInformation = forwardRef(function MyInput(props, ref) {
    const [showAadhaarInformationSnippet,setshowAadhaarInformationSnippet] = useState(false)

    const showAadhaarInformation = useCallback(() => {
        setshowAadhaarInformationSnippet(!showAadhaarInformationSnippet)
    }, [showAadhaarInformationSnippet]);

    const viewRef = useRef(null);

    useImperativeHandle(ref, () => {
        return {
        toggle() {
            showAadhaarInformation()
        },
        close() {
            setshowAadhaarInformationSnippet(false)
        }
        };
    }, [showAadhaarInformation]);




  return (
    <div className={`absolute w-full bottom-0 ${showAadhaarInformationSnippet ? 'block bg-gray-50' : 'hidden'}`} ref={viewRef} >
        <div className="shadow-inner rounded px-8 pt-6 pb-8 flex flex-col items-center">
        <img src={AadhaarImage} alt="Aadhaar sample for Name" className="h-100 max-w-sm" />
        <div className="cursor-pointer inline-flex flex-row justify-center items-center p-2 px-4 bg-green-500 text-white xl:w-auto w-full rounded" onClick={showAadhaarInformation} >
            <span className="font-bold mr-2">CLOSE</span>
            <XCircleIcon className="h-5 w-5"/>
        </div>
        </div>
    </div>)
});

export default AadhaarInformation;
