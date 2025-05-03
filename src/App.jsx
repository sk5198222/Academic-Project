import React from 'react'
import HomePage from './Components/HomePage'
import LoginPage from './Components/LoginPage'
import SignUpPage from './Components/SignUpPage'
import AddPetPage from './Components/AddPetPage'
import MyPetsPage from './Components/MyPetsPage'
import PetDetailsCard from './Components/PetDetailsCard'
import ProfilePage from './Components/ProfilePage'
import PetAdoptList from './Components/PetAdoptList'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import { AuthProvider } from './Auth/AuthContext'
import { ProtectedLayout } from './Auth/ProtectedLayout'
import BackgroundVideo from './Components/BackgroundVideo'
import EditUser from './Components/EditUser'
import AdminPage from './Components/AdminPage'
import EditPet from './Components/EditPet'

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<BackgroundVideo/>} />
          <Route path='/continue' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<SignUpPage/>} />
        <Route element={<ProtectedLayout/>}>
          <Route path='/add-pet' element={<AddPetPage/>} />
          <Route path='/my-pets' element={<MyPetsPage/>} />
          <Route path='/pet/:id' element={<PetDetailsCard/>} />
          <Route path='/pet/edit/:id' element={<EditPet/>} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/dashboard' element={<PetAdoptList/>} />
          <Route path='/user/edit/:id' element={<EditUser/>} />
          <Route path='/admin' element={<AdminPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
