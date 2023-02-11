import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import defaultValues from '../utils/defaultValues'

export const FormUser = ({ createNewUser, updateInfo, setUpdateInfo, updateUserById, Modal, setModal }) => {

    const { register, handleSubmit, reset } = useForm()

    useEffect(() => {
        reset(updateInfo)
    }, [updateInfo])

    const submit = data => {
        if(updateInfo){
            updateUserById(updateInfo.id, data)
        }
        else {
            createNewUser(data)
        }
        reset(defaultValues)
    }

    const handleOpenModal = () => {
        setModal(true)
        setUpdateInfo()
        reset(defaultValues)
    }

    const handleCloseModal = () => {
        setModal(false)
    }

    return (
        <>
            <button className='btn btn-success' onClick={handleOpenModal}><i className="fal fa-plus-circle"></i> Create user</button>
            <form className={Modal ? 'app__form Modal__active' : 'app__form'} onSubmit={handleSubmit(submit)}>
                <div className='app__formContainer'>
                    <div className='app_formTitle'>
                        <h2>{ updateInfo ? 'Update' : 'New'} User</h2>
                        <i className="fal fa-times" onClick={handleCloseModal}></i>
                    </div>
                    <div className='app__formItems'>
                        <div className='app__formFieldCouple'>
                            <i className="fal fa-user"></i>
                            <input {...register('first_name')} type="text" id='firstName' placeholder='First name' />
                            <input {...register('last_name')} type="text" id='lastName' placeholder='Last name' />
                        </div>
                        <div className='app__formField'>
                            <i className="fal fa-envelope"></i>
                            <input {...register('email')} type="email" id='email' placeholder='Email' />
                        </div>
                        <div className='app__formField'>
                            <i className="fal fa-lock"></i>
                            <input {...register('password')} type="password" id='password' placeholder='Password' />
                        </div>
                        <div className='app__formField'>
                            <i className="fal fa-birthday-cake"></i>
                            <input {...register('birthday')} type="date" id='birthday' />
                        </div>
                        <button className='btn btn-success' onClick={handleCloseModal}>{ updateInfo ? 'Update' : 'Create'} user</button>
                    </div>
                </div>
            </form>
        </>
    )
}
