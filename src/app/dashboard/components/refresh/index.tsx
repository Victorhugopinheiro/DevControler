"use client"

import { useRouter } from "next/navigation";
import { FiRefreshCw } from "react-icons/fi";



export function ButtonRefresh(){

    const router = useRouter()

    return(
        <button onClick={() => router.refresh()} className="bg-blue-500 px-3 py-1 rounded"><FiRefreshCw size={26}/></button>
    )
}