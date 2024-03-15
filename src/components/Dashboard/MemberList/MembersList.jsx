import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Context from '../../../context/Context'
import { API } from 'aws-amplify'
import Pagination from '@mui/material/Pagination'
import Swal from 'sweetalert2'
import BackImg from '../../../utils/Assets/Dashboard/images/PNG/Back.png'
import Bworkz from '../../../utils/Assets/Dashboard/images/SVG/Bworkz.svg'
import SearchIcon from '../../../utils/Assets/Dashboard/images/SVG/Search.svg'
import Arrow from '../../../utils/Assets/Dashboard/images/SVG/EnterArrow.svg'
import personIcon from '../../../utils/Assets/Dashboard/images/SVG/ProfilEdit.svg'
import AdminPic from '../../../utils/Assets/Dashboard/images/PNG/Adminuser.png'
import Select from '../../../utils/Assets/Dashboard/images/SVG/Thunder.svg'
import Add from '../../../utils/Assets/Dashboard/images/SVG/Add-Client.svg'
import CSV from '../../../utils/Assets/Dashboard/images/SVG/CSV.svg'
import Selections from '../../../utils/Assets/Dashboard/images/SVG/Selections.svg'
import Filter from '../../../utils/Assets/Dashboard/images/SVG/Filter.svg'
import Navbar from '../../Home/Navbar'
// import LeftBanner from "../LeftBanner/LeftBanner";
import './MembersList.css'

const MemberList = ({ institution: tempInstitution }) => {
  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [userStatus, setUserStatus] = useState('all')
  const [selectedRow, setSelectedRow] = useState([])
  const [isUserAdd, setIsUserAdd] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [balance, setbalance] = useState('')
  const [Country, setCountry] = useState('')
  const [cognitoId, setcognitoId] = useState('')
  const [userCheck, setUserCheck] = useState(0)
  const [JoiningDate, setJoiningDate] = useState('')
  const [activeUserList, setActiveUserList] = useState([])
  const [inactiveUserList, setInactiveUserList] = useState([])
  const [isEditUser, setIsEditUser] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [memberData, setMemberData] = useState([])
  // eslint-disable-next-line
  const [IsDashboard, setIsDashboard] = useState(false)
  const Navigate = useNavigate()
  const location = useLocation()
  const { util, user, userData, setUserData } = useContext(Context)
  // const searchParams = new URLSearchParams(window.location.search);
  let institution
  if (user.profile.institutionName === 'awsaiapp') {
    institution = userData.institutionName
  } else {
    institution = userData.institutionName || tempInstitution
  }
  console.log(userCheck)
  console.log(institution)
  useEffect(() => {
    if (location.pathname.includes('dashboard')) {
      setIsDashboard(true)
    } else {
      setIsDashboard(false)
    }
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      util.setLoader(true)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      util.setLoader(false)
    }
    // eslint-disable-next-line
  }, [location.pathname])

  const handleNavigationAndUserDataUpdate = () => {
    // Navigate to "/dashboard"
    Navigate('/dashboard')

    // Update userData with the new institution name
    const updatedUserData = { ...userData, institutionName: 'awsaiapp' }
    setUserData(updatedUserData)
  }

  const renderButton = () => {
    if (userData.institutionName !== 'awsaiapp') {
      return null
    } else {
      return (
        <button
          onClick={handleNavigationAndUserDataUpdate}
          className="relative z-10 left-[2.5%] bg-[#ffffff] text-black px-4 py-2 rounded-md"
          style={{
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          <img className="w-[1rem] ml-[1rem]" src={BackImg} alt="" />
        </button>
      )
    }
  }

  const fetchMembersForInstitution = async (institution) => {
    try {
      const response = await API.get(
        'clients',
        `/user/list-members/${institution}`,
      )
      console.log(response)
      const activeUsers = response.filter(
        (memberData) => memberData.status === 'Active',
      )
      const inactiveUsers = response.filter(
        (memberData) => memberData.status === 'InActive',
      )

      setActiveUserList(activeUsers)
      setInactiveUserList(inactiveUsers)
      setMemberData(response)
    } catch (error) {
      console.error('Error fetching members:', error)
      console.error('Error details:', error.response)
    } finally {
      util.setLoader(false)
    }
  }

  useEffect(() => {
    fetchMembersForInstitution(institution)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institution])

  const filtermember = () => {
    if (!searchQuery) {
      if (userStatus === 'active') {
        return memberData.filter((member) => member.status === 'Active')
      } else if (userStatus === 'inactive') {
        return memberData.filter((member) => member.status === 'InActive')
      }
      return memberData
    }

    const query = searchQuery.toLowerCase()

    const filtered = memberData?.filter((member) => {
      const matches =
        member.userName.toLowerCase().includes(query) ||
        member.emailId.toLowerCase().includes(query) ||
        member.phoneNumber.toLowerCase().includes(query)
      return matches
    })
    return filtered
  }

  const filteredmember = filtermember()
  const totalPages = Math.ceil(filteredmember.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const MembersData = filteredmember.slice(startIndex, endIndex)

  const handleCheckboxChange = (cognitoId) => {
    if (selectedRow.includes(cognitoId)) {
      setSelectedRow(selectedRow.filter((id) => id !== cognitoId))
    } else {
      setSelectedRow([...selectedRow, cognitoId])
    }
  }

  const isRowSelected = (cognitoId) => {
    return selectedRow.includes(cognitoId)
  }

  const selectedRowCount = selectedRow.length
  const AllUserCount = memberData.length
  const inactiveUserCount = inactiveUserList.length
  const activeUserCount = activeUserList.length

  function formatEpochToReadableDate(epochDate) {
    const date = isNaN(epochDate)
      ? new Date(parseFloat(epochDate))
      : new Date(epochDate)
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const formattedDate = `${year}-${month}-${day}`
      return formattedDate
    }
    return ''
  }

  const handleAddMember = async (e) => {
    e.preventDefault()
    const apiName = 'clients'
    const path = '/user/create-member'
    const myInit = {
      body: {
        institution: institution,
        userName: name,
        emailId: email,
        phoneNumber: phoneNumber,
        country: Country,
        status: userStatus,
        balance: balance,
        joiningDate: JoiningDate,
      },
    }

    try {
      const create = await API.post(apiName, path, myInit)
      setMemberData([
        ...memberData,
        {
          userName: name,
          emailId: email,
          phoneNumber: phoneNumber,
          country: Country,
          status: userStatus,
          balance: balance,
          joiningDate: JoiningDate,
        },
      ])
      console.log('User created successfully:', create)
      Swal.fire({
        icon: 'success',
        title: 'User Added',
      })
      await fetchMembersForInstitution(institution)
      setIsUserAdd(false)
      setName('')
      setEmail('')
      setPhoneNumber('')
      setUserStatus('')
      setbalance('')
      util.setLoader(false)
    } catch (e) {
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating the user.',
      })
      util.setLoader(false)
    }
  }

  useEffect(() => {
    if (editUser) {
      setcognitoId(editUser.cognitoId || '')
      setName(editUser.userName || '')
      setEmail(editUser.emailId || '')
      setPhoneNumber(editUser.phoneNumber || '')
      setCountry(editUser.country || '')
      setUserStatus(editUser.status || 'Active')
      setbalance(editUser.balance || '')
      setJoiningDate(formatEpochToReadableDate(editUser.joiningDate) || '')
    }
  }, [editUser])

  const handleEditUser = (user) => {
    setEditUser(user)
    setIsEditUser(true)
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault()
    const apiName = 'clients'
    const path = `/user/update-member`
    const myInit = {
      body: {
        cognitoId: cognitoId,
        institution: institution,
        userName: name,
        emailId: email,
        phoneNumber: phoneNumber,
        country: Country,
        status: userStatus,
        balance: balance,
        joiningDate: new Date(JoiningDate).getTime(),
      },
    }

    try {
      const update = await API.put(apiName, path, myInit)
      await fetchMembersForInstitution(institution)
      console.log(update)
      Swal.fire({
        icon: 'success',
        title: 'User Updated',
      })
      setIsEditUser(false)
      setEditUser(null)
      util.setLoader(false)
    } catch (e) {
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the user.',
      })
      util.setLoader(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditUser(false)
    setEditUser(null)
  }

  const handleDeleteMember = async (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Delete User',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const apiName = 'clients'
        const path = '/user/delete-member'
        const myInit = {
          body: {
            institution: institution,
            cognitoId: cognitoId,
          },
        }

        API.del(apiName, path, myInit)
          .then(() => {
            const updatedMemberData = memberData.filter(
              (member) => member.cognitoId !== cognitoId,
            )
            setMemberData(updatedMemberData)
            Swal.fire({
              icon: 'success',
              title: 'User Deleted',
            })
            util.setLoader(false)
            setIsEditUser(false)
          })
          .catch((error) => {
            console.error('Error deleting member:', error)
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while deleting the member.',
            })
          })
      }
    })
  }

  const handleDeleteSelected = async () => {
    if (selectedRow.length === 0) {
      return
    }

    const apiName = 'clients'
    const path = '/user/delete-member'

    try {
      util.setLoader(true)

      for (const cognitoId of selectedRow) {
        const myInit = {
          body: {
            institution: institution,
            cognitoId: cognitoId,
          },
        }
        await API.del(apiName, path, myInit)
      }
      const updatedMemberData = memberData.filter(
        (member) => !selectedRow.includes(member.cognitoId),
      )
      setMemberData(updatedMemberData)
      Swal.fire({
        icon: 'success',
        title: 'Selected Users Deleted',
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting selected users.',
      })
      console.error('Error deleting selected users:', error)
    } finally {
      util.setLoader(false)
      setSelectedRow([])
    }
  }

  return (
    <div className="w-[93vw] flex flex-col items-center gap-10">
      <Navbar />
      <div className="flex w-full flex-start">{renderButton()}</div>
      <div className="flex justify-center mt-[-5rem]">
        <div className={`w-[90%] rounded-3xl p-3 max850:ml-[5rem] `}>
          <div className="flex flex-row justify-between pb-2 max850:hidden">
            <h1 className="text-[1.4rem] K2D font-[600] pl-5 drop">
              Welcome, Boss👋
            </h1>
            <div className="relative">
              <img src={AdminPic} alt="" />
              <div className="absolute w-[9px] h-[8px] top-[0.45rem] right-[-0.3rem] bg-black rounded-[4px]" />
            </div>
          </div>
          {/* {isSuperAdmin && <LeftBanner />} */}

          <div className=" w-[102%] bg-[#96969680] h-[0.095rem] mb-2 max850:hidden"></div>
          <h2 className=" w-[22rem] pl-5 text-[2.3125rem] K2D mb-[-1rem] font-[600] max850:text-[2rem] moveRight max850:mt-0">
            Memberlists
          </h2>

          <div className="flex flex-row justify-evenly mr-[4rem] mt-[1rem] max600:flex-col max600:justify-center max600:items-center max600:mb-[-1rem] max600:mt-0">
            {/* searchBar */}
            <div className="flex justify-center items-center max600:w-[80vw]">
              <div className="flex w-[28.25rem] border-2 border-solid border-[#000] border-opacity-20 rounded-[0.1875rem] p-[0.1rem] mb-8 mt-6 max850:mb-4 ">
                <img
                  className="w-[1.9rem] h-[1.9rem] opacity-60 ml-2"
                  src={SearchIcon}
                  alt=""
                />
                <input
                  className="flex-1 outline-none rounded-md K2D text-[#000] text-[0.9rem] tracking-[1px] font-[600] max600:text-[0.8rem] "
                  type="text"
                  placeholder={'Search “Name, Email, Number”'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img
                  className="w-[1rem] h-[1.5rem] mt-1 mr-[0.8rem] opacity-50"
                  src={Arrow}
                  alt=""
                />
              </div>
            </div>
            {selectedRowCount > 1 && ( // Only show the delete button if multiple users are selected
              <button
                className="K2D font-[600] tracking-[1.2px] w-[6rem] h-[2.4rem] rounded-[4px] border-[2px] border-[#222222] bg-[#ffffff] text-[#222222] mt-6 max600:mt-[-0.5rem]"
                onClick={handleDeleteSelected}
              >
                Delete
              </button>
            )}
            {/* functionalities */}
            <div className=" relative border border-black min-w-[9rem] rounded-[1.3125rem] h-8 mt-[1.56rem] ml-[4rem] bg-white max600:mb-[3rem] max600:ml-0 ">
              <div className="flex flex-row justify-center gap-3 p-[0.3rem] px-5">
                <button>
                  <img className="w-[1.2rem]" src={CSV} alt="" />
                </button>
                <button onClick={() => setIsUserAdd(true)}>
                  <img className="w-[1rem]" src={Add} alt="" />
                </button>
                <button>
                  <img className="w-[1.2rem]" src={Filter} alt="" />
                </button>
                <button>
                  <img className="w-[1.1rem]" src={Selections} alt="" />
                </button>
              </div>
              <div className=" absolute right-[4px] bottom-[-7px] border border-[#989898b8] w-[9rem] rounded-[1.3125rem] h-8 mt-6 z-[-1]"></div>
            </div>
          </div>

          {/* form of creating new members */}
          {isUserAdd && (
            <div className=" absolute top-[21%] flex w-[78vw] h-[75vh] bg-[#ffffff60] backdrop-blur-sm z-50 max1050:w-[85vw]">
              <form className="relative m-auto flex flex-col gap-8 p-6 border-[0.118rem] border-x-[#404040] border-y-[1.2rem] border-[#2297a7] items-center justify-center w-[22rem] h-[35rem] max900:w-[auto] Poppins bg-[#ffffff] z-[1]">
                <input
                  required
                  placeholder="Name"
                  className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20 border border-[#acacac]  "
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
                <input
                  required
                  placeholder="Email Address"
                  className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20 border border-[#acacac]  "
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
                <input
                  required
                  placeholder="Phone Number"
                  className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20 border border-[#acacac]  "
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value)
                  }}
                />
                <input
                  required
                  placeholder="Joining date"
                  className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20 border border-[#acacac]  "
                  type="date"
                  value={JoiningDate}
                  onChange={(e) => {
                    setJoiningDate(e.target.value)
                  }}
                />
                <div className="flex gap-2">
                  <input
                    required
                    placeholder="Country"
                    className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20 border border-[#acacac]  "
                    type="text"
                    value={Country}
                    onChange={(e) => {
                      setCountry(e.target.value)
                    }}
                  />
                  <input
                    required
                    placeholder="Due ?"
                    className="bg-[#f7f7f7] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20 border border-[#acacac]  "
                    type="number"
                    value={balance}
                    onChange={(e) => {
                      setbalance(e.target.value)
                    }}
                  />
                </div>
                <div className="flex mt-[-1.5rem] mb-[-1rem] ml-[-4rem]">
                  <label>Status:</label>
                  <input
                    type="radio"
                    name="memberStatus"
                    value="Active"
                    className="ml-3"
                    checked={userStatus === 'Active'}
                    onChange={() => setUserStatus('Active')}
                  />{' '}
                  <p className="ml-1"> Active</p>
                  <input
                    type="radio"
                    name="memberStatus"
                    value="InActive"
                    className="ml-3"
                    checked={userStatus === 'InActive'}
                    onChange={() => setUserStatus('InActive')}
                  />{' '}
                  <p className="ml-1">InActive</p>
                </div>
                <div className="flex flex-col  gap-3 w-full justify-center items-center">
                  <button
                    className="K2D font-[600] tracking-[1.2px] bg-[#2297a7] text-white w-full rounded-[4px] py-[7px] border-[2px] border-[#2297a7] hover:bg-[#ffffff] hover:text-[#2297a7]"
                    onClick={handleAddMember}
                  >
                    Create
                  </button>
                  <button
                    className="K2D font-[600] tracking-[1.2px] bg-[#333333] text-white w-full rounded-[4px] py-[7px] border-[2px] border-[#222222] hover:bg-[#ffffff] hover:text-[#222222]"
                    onClick={() => {
                      setIsUserAdd(false)
                      setUserCheck(0)
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* filter */}
          <div className="flex flex-row gap-6 ml-[3rem] relative mb-3 w-[18rem]">
            <div
              className={`Poppins tracking-[0.4px] font-[600] text-[0.9rem] cursor-pointer max850:ml-[-1.5rem] ${
                userStatus === 'all'
                  ? 'text-[#30afbc] border-b-2 border-[#30AFBC]'
                  : 'text-[#000] hover:text-[#30afbc]'
              }`}
              onClick={() => {
                setUserStatus('all')
              }}
            >
              All ({AllUserCount})
            </div>
            <div
              className={`Poppins tracking-[0.4px] font-[600] text-[0.9rem] cursor-pointer ${
                userStatus === 'active'
                  ? 'text-[#30afbc] border-b-2 border-[#30AFBC]'
                  : 'text-[#000] hover:text-[#30afbc]'
              }`}
              onClick={() => {
                setUserStatus('active')
              }}
            >
              Active ({activeUserCount})
            </div>
            <div
              className={`Poppins tracking-[0.4px] font-[600] text-[0.9rem] cursor-pointer ${
                userStatus === 'inactive'
                  ? 'text-[#30afbc] border-b-2 border-[#30AFBC]'
                  : 'text-[#000] hover:text-[#30afbc]'
              }`}
              onClick={() => {
                setUserStatus('inactive')
              }}
            >
              Inactive ({inactiveUserCount})
            </div>
            <div className=" absolute w-[74vw] bg-[#30afbc4d] h-[0.2rem] mb-4 left-[-2.5rem] top-[1.33rem]"></div>
          </div>

          {/* Headings */}
          <div className=" w-[75vw] items-center relative text-[0.9rem] border-2 border-solid border-[#757575] gap-[0] mb-2 ml-[0.5rem] max1050:w-[83vw]">
            <div className="absolute w-[8px] h-[8px] top-[0.45rem] left-3 bg-black rounded-[4px]" />
            <div className="flex flex-row justify-between">
              <div className="col-span-3 font-[700] pl-[5rem]">
                Name, Phone, Email
              </div>
              <div className="font-[700] max850:hidden">Country</div>
              <div className="font-[700] max850:hidden">Joining Date</div>
              <div className="font-[700] max850:hidden">Attendance</div>
              <div className="font-[700] max850:hidden">Status</div>
              <div className="font-[700] pr-[7rem] max850:hidden">Due</div>
              <div className="font-[700] pr-[7rem] max850:hidden">Product</div>
              <div className="absolute w-[8px] h-[8px] top-[0.45rem] right-3 bg-black rounded-[4px]" />
            </div>
          </div>
          <div className=" w-[75vw] bg-[#757575] h-[0.095rem] mb-4 max850:hidden"></div>

          {/* member data starts from here */}
          <div className="w-[76vw] relative overflow-y-auto min-h-[48vh] scroll-container pl-[7px] max1050:w-[90vw]">
            {MembersData.map((memberData, index) => (
              <div
                key={memberData.cognitoId}
                className={`w-[75vw] mb-3 p-2 border-2 border-solid rounded-[0.5rem] item-center relative max1050:w-[83vw] ${
                  isRowSelected(memberData.cognitoId)
                    ? 'my-2 border-[#30AFBC] transform scale-y-[1.18] transition-transform duration-500 ease-in-out'
                    : 'border-[#a2a2a280]'
                }`}
                style={{
                  margin: isRowSelected(memberData.cognitoId)
                    ? '1rem 0'
                    : '0.5rem 0',
                  boxShadow: isRowSelected(memberData.cognitoId)
                    ? '0px -7px 9px rgba(0, 0, 0, 0.2), 0px 7px 9px rgba(0, 0, 0, 0.2)' // Spread shadow both above and below
                    : 'none',
                }}
              >
                {/* checkbox */}
                <label className="relative">
                  <input
                    type="checkbox"
                    className="hidden"
                    onChange={() => handleCheckboxChange(memberData.cognitoId)}
                    checked={isRowSelected(memberData.cognitoId)}
                  />
                  <div className="absolute mt-5 w-[1rem] h-[1rem] border-2 border-[#757575] cursor-pointer">
                    {isRowSelected(memberData.cognitoId) && (
                      <img
                        src={Select}
                        alt="Selected"
                        className="w-full h-full"
                      />
                    )}
                  </div>
                </label>

                <div
                  className="absolute right-2 mt-5"
                  onClick={() => handleEditUser(memberData)}
                >
                  <img src={personIcon} alt="" />
                </div>
                <div className="flex flex-row K2D items-center">
                  <div className=" flex gap-[1rem] pl-[2rem] items-center">
                    <div className="rounded-[50%] overflow-hidden w-[3.7rem] h-[3.4rem] max600:w-[12rem]">
                      <img
                        src={Bworkz}
                        alt="Avishek"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-12 items-center">
                      <div className="col-span-2 w-[11vw] max850:w-[8rem] flex flex-col">
                        <div
                          className="font-[900] email-hover cursor-pointer"
                          title={memberData.userName}
                        >
                          {memberData.userName.split(' ')[0]}
                        </div>
                        <div
                          className="overflow-auto text-[0.8rem] font-[600] email-hover cursor-pointer"
                          title={memberData.emailId}
                        >
                          {memberData.emailId.split('@ ')[0]}
                        </div>
                        <div className="overflow-auto text-[0.8rem] font-[600]">
                          ({memberData.phoneNumber})
                        </div>
                      </div>
                      <div className="col-span-2 ml-[4rem] font-semibold text-sm max850:hidden">
                        {memberData.country}
                      </div>
                      <div className="col-span-3 ml-[4rem] font-semibold text-sm max850:hidden">
                        {memberData.joiningDate
                          ? formatEpochToReadableDate(memberData.joiningDate)
                          : ''}
                      </div>
                      <div className="col-span-2 font-semibold text-sm max850:hidden">
                        {memberData.zPoints}
                      </div>
                      <div className="col-span-2 relative max850:hidden">
                        <div
                          className={`border-2 flex flex-row gap-[0.5rem] text-center rounded-[1.5rem] w-[6rem] pl-2 K2D ${
                            memberData.status === 'Active'
                              ? 'border-[#99EF72] text-[#99EF72]'
                              : 'border-[#FF4343AB] text-[#FF4343AB]'
                          }`}
                        >
                          <div
                            className={`w-3 h-3 mt-[0.4rem] ${
                              memberData.status === 'Active'
                                ? 'bg-[#99EF72]'
                                : 'bg-[#FF4343AB]'
                            } rounded-full transform K2D`}
                          ></div>
                          <div>
                            {memberData.status === 'Active'
                              ? 'Active'
                              : 'Inactive'}
                          </div>
                        </div>
                      </div>
                      <div className="font-[600] text-[0.9rem] max850:hidden">
                        {memberData.balance}
                      </div>{' '}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* form to update member */}
          {isEditUser && (
            <div className=" absolute top-[21%] flex w-[78vw] h-[75vh] bg-[#ffffff60] backdrop-blur-sm z-[1] max1050:w-[85vw]">
              <form className="relative m-auto flex flex-col gap-8 p-6 border-[0.118rem] border-x-[#404040] border-y-[1.2rem] border-[#2297a7] items-center justify-center w-[22rem] h-[35rem] max900:w-[auto] Poppins bg-[#ffffff] z-[1]">
                <input
                  required
                  placeholder="Name"
                  className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
                <input
                  required
                  placeholder="Email Address"
                  className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
                <input
                  required
                  placeholder="Phone Number"
                  className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value)
                  }}
                />
                {/* <input
                  required
                  placeholder="Joining date"
                  className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                  type="date"
                  value={JoiningDate}
                  onChange={(e) => {
                    setJoiningDate(e.target.value);
                  }}
                /> */}
                <div className="flex gap-2">
                  <input
                    required
                    placeholder="Country"
                    className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                    type="text"
                    value={Country}
                    onChange={(e) => {
                      setCountry(e.target.value)
                    }}
                  />
                  <input
                    required
                    placeholder="Due ?"
                    className="bg-[#f0f0f0] text-[#000] K2D px-4 py-2 rounded-[6px] w-full focus:border-opacity-20  "
                    type="number"
                    value={balance}
                    onChange={(e) => {
                      setbalance(e.target.value)
                    }}
                  />
                </div>
                <div className="flex mt-[-1.5rem] mb-[-1rem]">
                  <label>Status:</label>
                  <input
                    type="radio"
                    name="memberStatus"
                    value="Active"
                    className="ml-3"
                    checked={userStatus === 'Active'}
                    onChange={() => setUserStatus('Active')}
                  />{' '}
                  <p className="ml-1"> Active</p>
                  <input
                    type="radio"
                    name="memberStatus"
                    value="InActive"
                    className="ml-3"
                    checked={userStatus === 'InActive'}
                    onChange={() => setUserStatus('InActive')}
                  />{' '}
                  <p className="ml-1">InActive</p>
                </div>
                <div className="flex flex-col  gap-3 w-full justify-center items-center">
                  <button
                    className="K2D font-[600] tracking-[1.2px] bg-[#2297a7] text-white w-full rounded-[4px] py-[7px] border-[2px] border-[#2297a7] hover:bg-[#ffffff] hover:text-[#2297a7]"
                    onClick={handleUpdateUser}
                  >
                    Update
                  </button>
                  {institution && institution !== tempInstitution && (
                    <button
                      className="K2D font-[600] tracking-[1.2px] w-full rounded-[4px] py-2 border-[2px] border-[#222222] bg-[#ffffff] text-[#222222] hover:bg-[#ff3333] "
                      onClick={handleDeleteMember}
                    >
                      Delete
                    </button>
                  )}
                  <button
                    className="K2D font-[600] tracking-[1.2px] w-full rounded-[4px] py-2 border-[2px] border-[#222222] bg-[#ffffff] text-[#222222]"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="flex flex-row gap-2">
            {selectedRowCount > 0 && (
              <div className="text-[0.8rem] font-[600] K2D pt-5">
                {selectedRowCount} Items selected
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-start pt-4 ml--[2rem]">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                className="custom-pagination"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberList
