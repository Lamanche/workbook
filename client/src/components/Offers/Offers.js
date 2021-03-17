import React, { useEffect, useState } from 'react';
import styles from './Offer.module.css';
import Offer from './Offer';
import { fetchOffers } from '../../api/index.js';
import { useSelector, useDispatch } from 'react-redux';
import { tokenExpired } from '../../actions/auth.js';

const Offers = ({ postId }) => {
    const update = useSelector(state => state.update);
    const dispatch = useDispatch();

    const [offers, setOffers] = useState([]);
    
    useEffect(() => {
        fetchOffers({ params: { postId: postId }})
            .then(res => {
                const data = res.data?.offers;
                const sortedData = data.sort((a, b) => new Date(a) < new Date(b) ? 1 : -1);
                setOffers(sortedData)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(tokenExpired());
                };
            });      
    },[postId, update])
    
    return (
        <div className={styles.offerContainer}>
            {offers.map(offer => (
                <Offer key={offer._id} data={offer}/>
            ))}
            
        </div>
    )
}

export default Offers
