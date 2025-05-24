'use client';

import React from 'react';
import Image from 'next/image';
import styles from './index.module.css';

// Import icons
import SearchIcon from '/public/icons/search.svg';
import StarIcon from '/public/icons/star.svg';
import MapPinIcon from '/public/icons/map-pin.svg';
import HomeIcon from '/public/icons/home.svg';
import CalendarIcon from '/public/icons/calendar.svg';
import HeartIcon from '/public/icons/heart.svg';
import PersonIcon from '/public/icons/person.svg';

const Booking = () => {
    return (
        <div className={styles.container}>
            {/* Status Bar */}
            <div className={styles.statusBar}>
                <div className={styles.time}>9:41</div>
            </div>

            {/* Search Section */}
            <div className={styles.searchSection}>
                <div className={styles.searchBar}>
                    <Image src={SearchIcon} alt="Search" width={24} height={24} />
                    <div className={styles.searchContent}>
                        <div className={styles.searchLocation}>San Francisco</div>
                        <div className={styles.searchDetails}>
                            <span>Sep 12 – 15</span>
                            <span className={styles.dot}>•</span>
                            <span>1 room</span>
                            <span className={styles.dot}>•</span>
                            <span>2 guests</span>
                        </div>
                    </div>
                </div>
                <div className={styles.searchResults}>99 results</div>
                <div className={styles.filterSort}>
                    <button className={styles.filterButton}>
                        Filter
                        <span className={styles.chevron}>▼</span>
                    </button>
                    <button className={styles.sortButton}>
                        Sort
                        <span className={styles.chevron}>▼</span>
                    </button>
                </div>
            </div>

            {/* Map Section */}
            <div className={styles.mapSection}>
                <div className={styles.map}>
                    {/* Map placeholder */}
                    <div className={styles.mapPlaceholder} />
                    {/* Price chips */}
                    <div className={styles.priceChips}>
                        {['$199', '$123', '$234', '$567', '$345', '$299', '$176'].map((price, index) => (
                            <div key={index} className={`${styles.priceChip} ${price === '$123' ? styles.selected : ''}`}>
                                {price}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Listings Section */}
            <div className={styles.listingsSection}>
                <div className={styles.handle} />
                <div className={styles.listings}>
                    {[1, 2].map((item) => (
                        <div key={item} className={styles.listingCard}>
                            <div className={styles.imageCarousel}>
                                {/* Placeholder image */}
                                <div className={styles.image} />
                                <div className={styles.pagination}>
                                    {[1, 2, 3, 4, 5].map((dot) => (
                                        <div key={dot} className={`${styles.dot} ${dot === 1 ? styles.active : ''}`} />
                                    ))}
                                </div>
                            </div>
                            <div className={styles.listingInfo}>
                                <div className={styles.infoText}>
                                    <h3 className={styles.locationName}>Location name</h3>
                                    <div className={styles.details}>
                                        <div className={styles.rating}>
                                            <Image src={StarIcon} alt="Rating" width={16} height={16} />
                                            <span>{item === 1 ? '4.8 (500 reviews)' : '4.7 (800 reviews)'}</span>
                                        </div>
                                        <div className={styles.distance}>
                                            <Image src={MapPinIcon} alt="Location" width={16} height={16} />
                                            <span>{item === 1 ? '1.2 miles' : '1.5 miles'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.priceAction}>
                                    <div className={styles.price}>
                                        <span className={styles.amount}>${item === 1 ? '123' : '178'}</span>
                                        <span className={styles.night}>/ night</span>
                                    </div>
                                    <button className={styles.selectButton}>Select</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tab Bar */}
            <div className={styles.tabBar}>
                <div className={styles.tabs}>
                    <div className={`${styles.tab} ${styles.inactive}`}>
                        <Image src={HomeIcon} alt="Home" width={24} height={24} />
                    </div>
                    <div className={styles.tab}>
                        <Image src={CalendarIcon} alt="Calendar" width={24} height={24} />
                    </div>
                    <div className={`${styles.tab} ${styles.inactive}`}>
                        <div className={styles.tripsIcon} />
                    </div>
                    <div className={`${styles.tab} ${styles.inactive}`}>
                        <Image src={HeartIcon} alt="Favorites" width={24} height={24} />
                    </div>
                    <div className={`${styles.tab} ${styles.inactive}`}>
                        <Image src={PersonIcon} alt="Profile" width={24} height={24} />
                    </div>
                </div>
                <div className={styles.homeIndicator} />
            </div>
        </div>
    );
};

export default Booking;
