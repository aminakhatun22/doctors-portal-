import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
// import { format } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppoiontOption from './AppoiontOption';

const AvailavelAppointment = ({ selectedDate }) => {



    // const [appointmentOptions, setappointmentOptions] = useState([]);

    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP');


    const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: () => fetch(`http://localhost:7000/appointmentOptions?date=${date}`)
            .then(res => res.json())
    })

    // Another way to fetch data using query-----------
    // const { data: appointmentOptions } = useQuery({
    //     queryKey: ['appointmentOptions = [],
    //     queryFn: async () => {
    //         const res = await fetch('http://localhost:8000/appointmentOptions');
    //         const data = await res.json();
    //         return data
    //     }
    // })





    // ----------------------

    // useEffect(() => {
    //     fetch('http://localhost:8000/appointmentOptions')
    //         .then(res => res.json())
    //         .then(data => setappointmentOptions(data))
    // }, [])
    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section>
            <p className="text-center font-bold  text-secondary">Availavel Appointment on {format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    appointmentOptions.map((option, index) => <AppoiontOption
                        key={index}
                        appointmentOption={option}
                        setTreatment={setTreatment}></AppoiontOption>)
                }
            </div>
            {treatment &&
                <BookingModal
                    treatment={treatment}
                    selectedDate={selectedDate}
                    setTreatment={setTreatment}
                    refetch={refetch}></BookingModal>
            }
        </section>
    );
};

export default AvailavelAppointment;