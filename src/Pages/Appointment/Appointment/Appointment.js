import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailavelAppointment from '../AvailavelAppointment/AvailavelAppointment';

const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div>
            <AppointmentBanner selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}></AppointmentBanner>
            <AvailavelAppointment selectedDate={selectedDate}
            ></AvailavelAppointment>
        </div>
    );
};

export default Appointment;