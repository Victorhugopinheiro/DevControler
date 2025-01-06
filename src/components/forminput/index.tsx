"use client"

import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps {
    placeholder: string
    type: string
    name: string
    register: UseFormRegister<any>
    rules?: RegisterOptions
    error?: string
}

export function InputComponent({ error, name, placeholder, register, rules, type }: InputProps) {
    return (
        <>
            <input className="w-full px-2 h-10 border-2 border-gray-200 rounded" placeholder={placeholder} type={type} id={name}
                {...register(name, rules)}
            />
            {error && <p className="text-red-500">{error}</p>}
        </>
    )

}