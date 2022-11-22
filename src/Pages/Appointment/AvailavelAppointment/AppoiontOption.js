import { setDefaultOptions } from 'date-fns/esm';
import React from 'react';

const AppoiontOption = ({ appointmentOption, setTreatment }) => {
    const { slots, name } = appointmentOption;

    return (

        <div className="card   shadow-xl">
            <div className="card-body text-center   text-black">
                <h2 className="text-2xl text-center font-bold text-primary">{name}</h2>
                {/* <p>{slots.length > 0 ? slots[0] : 'Try Another day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'}</p> */}
                <p>{slots.length > 0 ? slots[0] : 'Try Another day'}</p>
                <p>{slots.length > 0 ? slots[0] : 'Try Another day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                < div className="card-actions justify-center">

                    <label disabled={slots.length === 0} onClick={() => setTreatment(appointmentOption)} htmlFor="booking-modal" className="btn btn-primary text-black">Book Appointment</label>
                </div>
            </div>
        </div>

    );
};

export default AppoiontOption;