import React, { useState, useEffect, useContext } from 'react'
import { API } from 'aws-amplify'
import Context from '../context/Context'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom' // Import useNavigate from react-router-dom

const Timer = () => {
  const { userData, setUserData } = useContext(Context)
  const [seconds, setSeconds] = useState(48 * 60 * 60)
  const [submissionTime, setSubmissionTime] = useState(Date.now())
  const totalTime = 48 * 60 * 60
  const [timerEnded, setTimerEnded] = useState(false)
  const navigate = useNavigate() // Get navigate function from useNavigate

  useEffect(() => {
    const onLoad = async () => {
      try {
        const res = await API.get(
          'clients',
          '/user/development-form/get-time/awsaiapp',
        )
        setSubmissionTime(res.submissiontime)
      } catch (e) {
        console.error(e)
      }
    }
    onLoad()
  }, [])

  useEffect(() => {
    const usedTime = (Date.now() - submissionTime) / 1000
    const leftTime = totalTime - usedTime

    if (Math.floor(leftTime) < 0) {
      setSeconds(0)
      setTimerEnded(true)
    } else {
      setSeconds(Math.floor(leftTime))
    }
  }, [submissionTime, totalTime])

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1
        } else {
          setTimerEnded(true)
          clearInterval(interval)
          return 0
        }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (timerEnded) {
      setUserData((userData) => ({ ...userData, isVerified: true }))
      if (userData.isDelivered) {
        // Display SweetAlert message
        Swal.fire({
          title: '🎉 Congratulations!',
          html: `
            <p>Your website is Ready.</p>
            <p>We will send the domain name to your registered Phone number or email ID.</p>
          `,
          icon: 'success',
          confirmButtonText: 'OK',
          onClose: () => {
            // Redirect to /Dashboard using navigate function
            navigate('/Dashboard')
          },
        })
      } else {
        // Display apology message
        Swal.fire({
          title: 'Apology!',
          html: `
            <p>The delivery of your website is delayed.</p>
            <p>Please contact us for further assistance.</p>
          `,
          icon: 'error',
          confirmButtonText: 'OK',
          onClose: () => {
            // Redirect to home page using navigate function
            navigate('/')
          },
        })
      }
    }
    // eslint-disable-next-line
  }, [timerEnded, navigate, userData.isDelivered])

  const formatTime = () => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const seconds2 = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds2.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col justify-center p-12 gap-5">
      <div className="countdown-timer px-3">
        <div className="timer-display">
          {formatTime()
            .split(':')
            .map((timePart, index) => (
              <span key={index} className="time-part">
                {timePart}
              </span>
            ))}
        </div>
      </div>
      <div className="px-4 ml-3 text-white">
        <p className="text-center max450:w-[20rem]">
          Get ready for an enhanced online presence your website's
          transformation is underway! Need changes or more info? Reach out
          anytime!
        </p>
      </div>
    </div>
  )
}

export default Timer
