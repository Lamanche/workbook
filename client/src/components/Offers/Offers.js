import React, { useEffect, useState } from 'react';
import styles from './Offer.module.css';
import Offer from './Offer';
import { fetchOffers } from '../../api/index.js';

const Offers = ({ creatorId }) => {
    const [offers, setOffers] = useState([])
    useEffect(() => {
        fetchOffers({ params: { id: creatorId }})
            .then(res => {
                console.log(res.data.offers)
                setOffers(res.data.offers)
            })
    },[creatorId])
    
    return (
        <div className={styles.offerContainer}>
            {offers.map(offer => (
                <Offer key={offer._id} data={offer}/>
            ))}
            
        </div>
    )
}

export default Offers
