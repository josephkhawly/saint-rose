import React, { useState, useEffect, useRef } from 'react'
import { TimelineMax as Timeline } from 'gsap'
import ScrollMagic from 'scrollmagic'

import Fade from 'react-reveal/Fade'

import MediaQuery from 'react-responsive'

import Nav from './Nav'
import MobileNav from './MobileNav'

import { MOBILEBP, DESKTOPTRANSITIONBP } from '../constants'

import Footer from './Footer'

import Axios from 'axios'

function Careers() {
  const [state, setState] = useState({
    submitting: false,
    submitError: false,
    submitSuccess: false,
    errorMessage: '',
    positionOptions: ['Salon Coordinator', 'Stylist', 'Apprentice'],
    licenseOptions: ['Yes', 'No'],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    resumeFile: '',
    startDate: '',
    instagramHandle: '',
    license: [],
    position: [],
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
  })
  const controllerRef = useRef(null)

  useEffect(() => {
    controllerRef.current = new ScrollMagic.Controller()
    new ScrollMagic.Scene({
      triggerElement: '.content',
      offset: 50,
      triggerHook: 'onLeave',
    })
      .setClassToggle('.nav-container', 'scrolled')
      .addTo(controllerRef.current)
    return () => {
      if (controllerRef.current) {
        controllerRef.current.destroy(true)
      }
    }
  }, [])

  const getMediaChangeTimeline = () => {
    const timeline = new Timeline({ paused: true })
    const nav = document.querySelector('.nav-container')
    timeline.to(nav, 0.7, {
      opacity: 1,
      delay: 0.25,
    })
    return timeline
  }

  const playMediaChange = () => {
    const timeline = getMediaChangeTimeline()
    window.loadPromise.then(() => requestAnimationFrame(() => timeline.play()))
    new ScrollMagic.Scene({
      triggerElement: '.content',
      offset: 50,
      triggerHook: 'onLeave',
    })
      .setClassToggle('.nav-container', 'scrolled')
      .addTo(controllerRef.current)
  }

  const handleInput = (field, value) => {
    setState((prev) => ({ ...prev, [field]: value }))
  }

  const updateCheckboxGroup = (parent, target, multipleAllowed) => {
    setState((prev) => {
      if (multipleAllowed) {
        const targetIndex = prev[parent].indexOf(target)
        let staging = {}
        if (targetIndex > -1) {
          staging = {
            [parent]: [
              ...prev[parent].slice(0, targetIndex),
              ...prev[parent].slice(targetIndex + 1),
            ],
          }
        } else {
          staging = {
            [parent]: [...prev[parent], ...[target]],
          }
        }
        return { ...prev, ...staging }
      } else {
        const targetIndex = prev[parent].indexOf(target)
        if (targetIndex > -1) {
          return { ...prev, [parent]: [] }
        } else {
          return { ...prev, [parent]: [target] }
        }
      }
    })
  }

  const handleSubmit = () => {
    document.getElementById('submit-button').disabled = true
    setState((prev) => ({ ...prev, submitting: true }))
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      startDate,
      instagramHandle,
      license,
      position,
      resumeFile,
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
    } = state
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    }
    const data = new FormData()
    data.append('firstName', firstName)
    data.append('lastName', lastName)
    data.append('email', email)
    data.append('phone', phone)
    data.append('address', address)
    data.append('resumeFile', resumeFile)
    data.append('startDate', startDate)
    data.append('instagramHandle', instagramHandle)
    data.append('position', position.join(', '))
    data.append('license', license.join(', '))
    data.append('question1', question1)
    data.append('question2', question2)
    data.append('question3', question3)
    data.append('question4', question4)
    data.append('question5', question5)
    data.append('question6', question6)
    Axios.post('/careers', data, config)
      .then((response) => {
        if (response.data.status === 'success') {
          setState((prev) => ({ ...prev, submitting: false, submitSuccess: true }))
        } else {
          setState((prev) => ({
            ...prev,
            submitting: false,
            submitError: true,
            errorMessage: response.data.message
              ? response.data.message
              : 'We had trouble submitting your request. Please give us a call.',
          }))
          document.getElementById('submit-button').disabled = false
        }
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          submitting: false,
          submitError: true,
          errorMessage: 'We had trouble submitting your request. Please give us a call.',
        }))
        document.getElementById('submit-button').disabled = false
      })
  }

  const renderCheckboxGroup = (parent, options, multipleAllowed) => {
    return (
      <div className='options-group'>
        {state[options].map((option) => {
          return (
            <label className='option-checkbox' key={`${parent}${option}`}>
              <input
                type='checkbox'
                name={option}
                checked={state[parent].includes(option)}
                onChange={(event) =>
                  updateCheckboxGroup(parent, event.target.name, multipleAllowed)
                }
              />
              <span className='checkbox'></span>
              <span className='text'>{option}</span>
            </label>
          )
        })}
      </div>
    )
  }

  const {
    submitting,
    submitError,
    submitSuccess,
    errorMessage,
    firstName,
    lastName,
    email,
    phone,
    address,
    resumeFile,
    startDate,
    instagramHandle,
    license,
    position,
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
  } = state

  return (
    <div className='book-now'>
      <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
        <Nav active={'careers'} />
      </MediaQuery>
      <MediaQuery maxWidth={MOBILEBP} onChange={playMediaChange}>
        <MobileNav expanded={false} />
      </MediaQuery>
      <div className='content-container'>
        <div className='content'>
          <Fade bottom delay={2000} distance='50px'>
            <div className='sub-nav'>Careers</div>
          </Fade>
          <Fade bottom delay={2000} distance='50px'>
            <div className='intro'>
              <h3>
                Thank you so much for your interest in Saint Rose. Please fill out the following
                form.
              </h3>
              <h6>
                If you have any specific questions or concerns please reach out to{' '}
                <a href=''>manager@hairbysaintrose.com</a>
              </h6>
            </div>
            <div className='form'>
              <div className='checkbox-group'>
                <div className='field-label'>What position are you applying for?*</div>
                {renderCheckboxGroup('position', 'positionOptions', false)}
              </div>
              <div className='form-row'>
                <div className='form-field'>
                  <label className='field-label'>
                    First Name*
                    <input
                      type='text'
                      value={firstName}
                      onChange={(event) => handleInput('firstName', event.target.value)}
                    />
                  </label>
                </div>
                <div className='form-field'>
                  <label className='field-label'>
                    Last Name*
                    <input
                      type='text'
                      value={lastName}
                      onChange={(event) => handleInput('lastName', event.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className='form-row'>
                <div className='form-field'>
                  <label className='field-label'>
                    Email*
                    <input
                      type='text'
                      value={email}
                      onChange={(event) => handleInput('email', event.target.value)}
                    />
                  </label>
                </div>
                <div className='form-field'>
                  <label className='field-label'>
                    Phone*
                    <input
                      type='text'
                      value={phone}
                      onChange={(event) => handleInput('phone', event.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className='form-row'>
                <div className='form-field'>
                  <label className='field-label'>
                    Address*
                    <input
                      type='text'
                      value={address}
                      onChange={(event) => handleInput('address', event.target.value)}
                    />
                  </label>
                </div>
                <div className='form-field'>
                  <label className='field-label'>
                    When can you start?*
                    <input
                      type='date'
                      value={startDate}
                      onChange={(event) => handleInput('startDate', event.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className='form-row'>
                <div className='form-field'>
                  <label className='field-label'>
                    Business Instagram handle
                    <input
                      type='text'
                      value={instagramHandle}
                      onChange={(event) => handleInput('instagramHandle', event.target.value)}
                    />
                  </label>
                </div>
                <div className='checkbox-group'>
                  <div className='field-label'>Do you have a valid Texas Cosmetology License?*</div>
                  {renderCheckboxGroup('license', 'licenseOptions', false)}
                </div>
              </div>
              <div className='form-row'>
                <div className='upload-file-container'>
                  <div className='field-label'>Resume*</div>
                  <div className='upload-file-wrapper'>
                    <button className='upload-file-button'>Choose File</button>
                    <input
                      type='file'
                      name='resumeFile'
                      onChange={(event) => handleInput('resumeFile', event.target.files[0])}
                    />
                    <div className='upload-status'>
                      {resumeFile ? resumeFile.name : 'No File Chosen'}
                    </div>
                  </div>
                </div>
              </div>
              <span className='form-section'></span>
              <div className='form-field'>
                <label className='field-label'>
                  What do you know about Saint Rose?
                  <textarea
                    value={question1}
                    onChange={(event) => handleInput('question1', event.target.value)}
                    maxLength='800'
                  />
                </label>
              </div>
              <div className='form-field'>
                <label className='field-label'>
                  What are you looking for in a salon?
                  <textarea
                    value={question2}
                    onChange={(event) => handleInput('question2', event.target.value)}
                    maxLength='800'
                  />
                </label>
              </div>
              <div className='form-field'>
                <label className='field-label'>
                  Give us an example of exceptional customer service.
                  <textarea
                    value={question3}
                    onChange={(event) => handleInput('question3', event.target.value)}
                    maxLength='800'
                  />
                </label>
              </div>
              <div className='form-field'>
                <label className='field-label'>
                  How do you want to improve yourself in the next year?
                  <textarea
                    value={question4}
                    onChange={(event) => handleInput('question4', event.target.value)}
                    maxLength='800'
                  />
                </label>
              </div>
              <div className='form-field'>
                <label className='field-label'>
                  Who has impacted you the most in your career and how?
                  <textarea
                    value={question5}
                    onChange={(event) => handleInput('question5', event.target.value)}
                    maxLength='800'
                  />
                </label>
              </div>
              <div className='form-field'>
                <label className='field-label'>
                  Is there anything else you would like us to know?
                  <textarea
                    value={question6}
                    onChange={(event) => handleInput('question6', event.target.value)}
                    maxLength='800'
                  />
                </label>
              </div>
              <div className='form-footer'>
                <button className='submit-button' id='submit-button' onClick={handleSubmit}>
                  {submitSuccess ? 'Sent!' : submitting ? 'Sending...' : 'Submit'}
                </button>
                {submitError && (
                  <span className='submit-error'>
                    {errorMessage
                      ? errorMessage
                      : 'We had trouble submitting your request. Please give us a call.'}
                  </span>
                )}
              </div>
            </div>
          </Fade>
          <Footer />
        </div>
      </div>
      <div className='entrance' />
      <div className='exit' />
      <div className='exit-2' />
    </div>
  )
}

export default Careers
