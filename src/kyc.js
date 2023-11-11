import {useState, useEffect} from 'react'

export default function KYC({ifscvalid, handleifsc}){
    const user_name = localStorage.getItem('user_name');
    const bank_account_number = localStorage.getItem('bank_account_number')
    const bank_ifsc_number = localStorage.getItem('bank_ifsc_number')

    const [KYCvalidated, setKYCValidated] = useState(false);
    const [KYCtry, setKYCtry] = useState(false);
    const [validateKYC, setvalidateKYC] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitkyc = () => {
        setvalidateKYC(true)
    }

    useEffect(() => {
        if (validateKYC) {
          setLoading(true)
          const body = {
            "receiver":bank_account_number,
            "name":user_name,
            "IFSC_Code":bank_ifsc_number,
          }
          const url = "http://localhost:8080/api";

          const response = fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
          });

          response
            .then((data) => data.json())
            .then((data) => {
            console.log(data)
            if(data?.error){
                console.log('error')
                setLoading(false);
                setKYCtry(true)
                setError(true)
            }else{
                setLoading(false)
                setKYCtry(true)
            }

            })
            .catch((error) => {

              console.log(error)
            });
        }
      }, [validateKYC,bank_account_number,user_name,bank_ifsc_number])

    return (
    <div className="flex flex-col justify-start px-8 pt-6 pb-8 mb-4">
        <p className="mb-4">KYC screen</p>
        <div className="flex flex-row">
            <p>Name :</p>
            <p><b>{user_name}</b></p>
        </div>
        <div className="flex flex-row">
            <p>Bank Account Number :</p>
            <p><b>{bank_account_number}</b></p>
        </div>
        <div className="flex flex-row">
            <p>IFSC Code :</p>
            <p><b>{bank_ifsc_number}</b></p>
        </div>
        <button type="button" className={`${ KYCtry ? 'hidden' : 'block' } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} onClick={()=>submitkyc()}>SUBMIT KYC</button>

        <div className={`${ KYCtry && !KYCvalidated && !error ? 'flex' : 'hidden' } flex-col shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4`}>
            <p className="mb-4">Did you recieve Re.1 in your bank account</p>
            <button type="button" className={` bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4`}
            onClick={()=>setKYCValidated(true)}>YES</button>
            <button type="button" className={` bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            onClick={()=>handleifsc(false)}>NO</button>
        </div>

        <div className={`${ KYCvalidated ? 'flex' : 'hidden' } flex-col shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4`}>
            <p className="mb-4">{user_name}'s KYC is Done Successfully</p>
        </div>

        <div className={`${ error ? 'flex' : 'hidden' } flex-col shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4`}>
            <p className="mb-4">KYC process failed , please try again</p>
                        <button type="button" className={` bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            onClick={()=>handleifsc(false)}>TRY AGAIN</button>
        </div>

    </div>
    )
}
