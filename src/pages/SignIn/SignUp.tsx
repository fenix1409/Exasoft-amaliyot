import React, { useState } from 'react'
import { instance } from '../../hook/useAxios';
import { Input } from 'antd';

const Register = () => {
    // const { setToken } = useContext(Context);
    const [, setIsLoading] = useState<boolean>(false)

    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [fullName, setFullName] = useState<string>("")


    const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const registerData = {
            fullName: fullName,
            login: userName,
            password: password
        }

        try {
            const response = await instance().post(`/auths/sign-up`, registerData)
            console.log(response);
            if (response.status === 200) {
                const token = response.data
                // setToken(token)
                localStorage.setItem("authToken", token)
                location.pathname = '/'
            } else {
                alert("Login yoki parol xato!")
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='Sign-in pt-36'>
            <form onSubmit={loginSubmit} className='w-[462px] p-[24px] text-start bg-white rounded-xl mx-auto'>
                <h2 className='text-[36px] leading-[22px] font-bold mb-[21px]'>Registration</h2>
                <label className='mb-[21px] block'>
                    <span className='text-[14px] leading-[22px]'>Full name</span>
                    <Input placeholder='Enter login' onChange={(e) => setFullName(e.target.value)} size='large' autoComplete='off'/>
                </label>
                <label className='mb-[21px] block'>
                    <span className='text-[14px] leading-[22px]'>Login</span>
                    <Input placeholder='Enter login' onChange={(e) => setUserName(e.target.value)} size='large' autoComplete='off'/>
                </label>
                <label className='mb-[21px] block'>
                    <span className='text-[14px] leading-[22px]'>Password</span>
                    <Input.Password placeholder='Enter login' onChange={(e) => setPassword(e.target.value)} size='large' autoComplete='off'/>
                </label>
                <div className="flex flex-col space-y-[21px]">
                    <button className='w-[120px] block p-3 bg-green-400 text-[14px] leading-[22px] text-white rounded-md cursor-pointer mx-auto'>Sign in</button>
                </div>
            </form>
        </div>
    )
}

export default Register