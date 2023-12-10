import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const patientAuthApi = createApi({
    reducerPath: 'patientAuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/patient/' }),
    endpoints: (builder) => ({
        loginPatient: builder.mutation({
            query: (user) => {
                return {
                    url: 'otpaccess/',
                    method: 'POST',
                    body: user,
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            },
        }),

        otpCheck: builder.mutation({
            query: (user) => {
                return {
                    url: 'otpcheck/',
                    method: 'PUT',
                    body: user,
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            },
        }),

        profileAccess: builder.query({
            query: (access_token) => {
                return {
                    url: 'profile/',
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${access_token}`,
                    },
                }
            },
        }),

        doctorSearch: builder.mutation({
            query: (data) => {
                return {
                    url: 'doctor-list/',
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            },
        }),

        doctorProfile: builder.query({
            query: ({ access_token, id }) => {
                return {
                    url: `doctor-profile/${id}`,
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${access_token}`,
                    },
                }
            },
        }),

        appointmentBook: builder.mutation({
            query: ({ actualData, access_token }) => {
                return {
                    url: 'appointment/',
                    method: 'POST',
                    body: actualData,
                    headers: {
                        'Content-type': 'application/json',
                        authorization: `Bearer ${access_token}`,
                    },
                }
            },
        }),
    }),
})

export const {
    useLoginPatientMutation,
    useOtpCheckMutation,
    useProfileAccessQuery,
    useDoctorSearchMutation,
    useDoctorProfileQuery,
    useAppointmentBookMutation,
} = patientAuthApi
