import React from 'react';

const InfoCard = ({ card }) => {
    const { name, description, icon, bgClass } = card;
    return (
        <div className={`card  shadow-xl px-6 mt-5 ${bgClass}`}>
            <figure className="p-10 pt-10">
                <img src={icon} alt="" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>

            </div>
        </div>
    );
};

export default InfoCard;