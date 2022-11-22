import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { name: treatmentName, slots, } = treatment;
    const date = format(selectedDate, 'PP')

    const { user } = useContext(AuthContext);

    // [3, 4, 5].map((value, i) => console.log(value))

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        // console.log(slot, email, name, phone);

        const booking = {
            selectedDate: date,
            treatment: treatmentName,
            patient: name,
            slot,
            email,
            phone
        }
        console.log(booking);
        // TODO: send data to the server
        // and once data is saved then close the modal
        //  and display success toast

        fetch('http://localhost:7000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking confirmed')
                    refetch();
                }
                else {
                    toast.error(data.message)
                }
            })

    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatmentName}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" value={date} className="input w-full " disabled />
                        <select name="slot" className="select select-bordered w-full ">

                            {
                                slots.map((slot, i) => <option
                                    value={slot}
                                    key={i}
                                >{slot}</option>)
                            }

                        </select>
                        <input type="name" name="name" defaultValue={user?.displayName} disabled placeholder="Type Your Name" className="input w-full input-bordered " />
                        <input type="email" name="email" defaultValue={user?.email} placeholder="Type Email Address" disabled className="input w-full input-bordered " />
                        <input type="text" name="phone" placeholder="Type Phone Numbers" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;