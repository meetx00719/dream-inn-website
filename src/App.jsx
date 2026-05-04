import { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";

import hero1 from "./assets/hero1.jpg";
import hero2 from "./assets/hero2.jpg";
import hero1Mobile from "./assets/hero1-mobile.jpg";
import hero2Mobile from "./assets/hero2-mobile.jpg";

import about1 from "./assets/about1.jpg";
import about2 from "./assets/about2.jpg";

import singleRoom from "./assets/single.jpg";
import singleTwo from "./assets/singleTwo.jpg";
import single3 from "./assets/single3.jpg";

import double1 from "./assets/double1.jpg";
import double2 from "./assets/double2.jpg";
import double3 from "./assets/double3.jpg";

import jacuzziRoom from "./assets/jacuzzi.jpg";
import jacuzzi2 from "./assets/jacuzzi2.jpg";
import jacuzzi3 from "./assets/jacuzzi3.jpg";

const ASI_URL =
  "https://live.ipms247.com/booking/book-rooms-dreaminn?";

const rooms = [
  {
    id: "single",
    name: "Single Bed Room",
    label: "Single Bed Room",
    guests: 2,
    weekday: 89,
    weekend: 119,
    images: [singleRoom, singleTwo, single3],
    desc: "A comfortable room with a California King bed, private bathroom, microwave, refrigerator, cable TV, and free Wi-Fi.",
    features: ["Cali King size bed", "Up to 2 guests", "Microwave", "Refrigerator", "Cable TV", "Free Wi-Fi"],
  },
  {
    id: "double",
    name: "Double Bed Room",
    label: "Double Bed Room",
    guests: 4,
    weekday: 109,
    weekend: 149,
    images: [double1, double2, double3],
    desc: "A spacious room with two Queen beds, ideal for families or groups visiting Inglewood, LAX, and SoFi Stadium.",
    features: ["Two Queen size beds", "Up to 4 guests", "Microwave", "Refrigerator", "Cable TV", "Free Wi-Fi"],
  },
  {
    id: "jacuzzi",
    name: "Jacuzzi Room",
    label: "Jacuzzi Room",
    guests: 2,
    weekday: 139,
    weekend: 179,
    images: [jacuzziRoom, jacuzzi2, jacuzzi3],
    desc: "A premium room with a California King bed, sofa, and private Jacuzzi for a more relaxing stay.",
    features: ["Cali King bed", "Private Jacuzzi", "Sofa", "Up to 2 guests", "No children allowed", "Free Wi-Fi"],
  },
];

const heroSlides = [
  {
    desktop: hero1,
    mobile: hero1Mobile,
  },
  {
    desktop: hero2,
    mobile: hero2Mobile,
  },
];

const pad = (n) => String(n).padStart(2, "0");

const toISODate = (date) => {
  if (!date) return "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const displayDate = (date) => {
  if (!date) return "Select Date";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const sameDay = (a, b) => {
  if (!a || !b) return false;
  return a.toDateString() === b.toDateString();
};

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const getMonthDays = (year, month) => {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const blanks = first.getDay();

  const days = [];

  for (let i = 0; i < blanks; i++) {
    days.push(null);
  }

  for (let day = 1; day <= last.getDate(); day++) {
    days.push(new Date(year, month, day));
  }

  return days;
};

function App() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [occupancyOpen, setOccupancyOpen] = useState(false);

  const today = useMemo(() => startOfDay(new Date()), []);
  const tomorrow = useMemo(() => addDays(today, 1), [today]);

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState("single");

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const bookingRef = useRef(null);

  const selectedRoomData = useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId) || rooms[0];
  }, [selectedRoomId]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = startOfDay(checkOut) - startOfDay(checkIn);
    return Math.max(0, Math.round(diff / 86400000));
  }, [checkIn, checkOut]);

  const estimate = useMemo(() => {
    if (!checkIn || !checkOut || nights <= 0) return 0;

    let total = 0;
    let d = new Date(checkIn);

    for (let i = 0; i < nights; i++) {
      const day = d.getDay();
      const isWeekend = day === 5 || day === 6;
      total += isWeekend ? selectedRoomData.weekend : selectedRoomData.weekday;
      d = addDays(d, 1);
    }

    const tax = total * 0.14;
    return Math.round(total + tax);
  }, [checkIn, checkOut, nights, selectedRoomData]);

  const averageRate = nights > 0 ? Math.round(estimate / nights) : selectedRoomData.weekday;

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5500);

    return () => clearInterval(heroTimer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setHeaderScrolled(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (!bookingRef.current) return;
      if (!bookingRef.current.contains(e.target)) {
        setCalendarOpen(false);
        setOccupancyOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (!el) return;

    const offset = window.innerWidth <= 760 ? 78 : 88;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const handleDateClick = (date) => {
    if (!date) return;
    const clicked = startOfDay(date);

    if (clicked < today) return;

    if (!checkIn || checkOut) {
      setCheckIn(clicked);
      setCheckOut(null);
      return;
    }

    if (clicked <= checkIn) {
      setCheckIn(clicked);
      setCheckOut(null);
      return;
    }

    setCheckOut(clicked);
  };

  const isInRange = (date) => {
    if (!date || !checkIn || !checkOut) return false;
    const d = startOfDay(date);
    return d > startOfDay(checkIn) && d < startOfDay(checkOut);
  };

  const monthTitle = (date) =>
    date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  const renderMonth = (monthDate) => {
    const days = getMonthDays(monthDate.getFullYear(), monthDate.getMonth());

    return (
      <div className="singleMonth">
        <h4>{monthTitle(monthDate)}</h4>

        <div className="rangeCalendarWeek">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="rangeCalendarGrid">
          {days.map((date, index) => {
            if (!date) return <span key={`blank-${index}`} />;

            const disabled = startOfDay(date) < today;
            const checkInClass = sameDay(date, checkIn) ? "isCheckIn" : "";
            const checkOutClass = sameDay(date, checkOut) ? "isCheckOut" : "";
            const rangeClass = isInRange(date) ? "inRange" : "";

            return (
              <button
                key={toISODate(date)}
                type="button"
                disabled={disabled}
                className={`${checkInClass} ${checkOutClass} ${rangeClass}`}
                onClick={() => handleDateClick(date)}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const openCalendar = () => {
    setCalendarOpen(true);
    setOccupancyOpen(false);

    setTimeout(() => {
      if (window.innerWidth <= 980) {
        bookingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 80);
  };

  const handleCheckAvailability = () => {
    if (!checkIn || !checkOut) {
      setCalendarOpen(true);
      return;
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = ASI_URL;
    form.target = "_blank";

    const fields = {
      txtcheckindate: toISODate(checkIn),
      txtcheckoutdate: toISODate(checkOut),
      txtadult: adults,
      txtChildren: children,
      txtPromocode: "",
      txtRoomId: selectedRoomData.name,
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  const openRoomModal = (room) => {
    setSelectedRoom(room);
    setModalImageIndex(0);
  };

  const closeRoomModal = () => {
    setSelectedRoom(null);
    setModalImageIndex(0);
  };

  const nextModalImage = () => {
    if (!selectedRoom) return;
    setModalImageIndex((prev) => (prev + 1) % selectedRoom.images.length);
  };

  const prevModalImage = () => {
    if (!selectedRoom) return;
    setModalImageIndex((prev) =>
      prev === 0 ? selectedRoom.images.length - 1 : prev - 1
    );
  };

  const nextMonth = addDays(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1), 0);

  return (
    <main className="luxHotelSite">
      <div className="topInfoBar">
        <div className="topContact">
          <span>Near LAX & SoFi Stadium</span>
          <span>24/7 Front Desk</span>
          <span>Book Direct & Save</span>
        </div>

        <div className="topSocials">
          <a href="tel:+10000000000">☎</a>
          <a href="#location" onClick={(e) => { e.preventDefault(); scrollToSection("#location"); }}>⌖</a>
        </div>
      </div>

      <header
        className={`mainHeader ${
          headerScrolled ? "blurHeader" : "heroLogoHeader"
        }`}
      >
        <button
          className={`luxLogo ${headerScrolled ? "smallLogo" : "centerLogo"}`}
          type="button"
          onClick={() => scrollToSection("#home")}
        >
          Dream<span>Inn</span>
        </button>

        <nav className="desktopNav">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}>Home</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("#about"); }}>About</a>
          <a href="#rooms" onClick={(e) => { e.preventDefault(); scrollToSection("#rooms"); }}>Rooms</a>
          <a href="#amenities" onClick={(e) => { e.preventDefault(); scrollToSection("#amenities"); }}>Amenities</a>
          <a href="#reviews" onClick={(e) => { e.preventDefault(); scrollToSection("#reviews"); }}>Reviews</a>
          <a href="#location" onClick={(e) => { e.preventDefault(); scrollToSection("#location"); }}>Location</a>
        </nav>
      </header>

      <section className="luxHero" id="home">
        <div
          className="luxHeroTrack"
          style={{ transform: `translateX(-${heroIndex * 100}%)` }}
        >
          {heroSlides.map((slide, index) => (
            <div className="luxHeroSlide" key={index}>
              <picture>
                <source media="(max-width: 760px)" srcSet={slide.mobile} />
                <img src={slide.desktop} alt="Dream Inn Los Angeles" />
              </picture>
            </div>
          ))}
        </div>

        <div className="luxHeroContent">
          <span className="sectionKicker">Dream Inn</span>
          <h1>Comfortable Stay Near LAX & SoFi Stadium</h1>
          <p>
            Enjoy a clean, comfortable, and budget-friendly stay in Inglewood
            with free Wi-Fi, free parking, and easy access to Los Angeles.
          </p>

          <div className="heroButtons">
            <button type="button" onClick={() => scrollToSection("#booking")}>
              Check Availability
            </button>
            <button type="button" onClick={() => scrollToSection("#rooms")}>
              Explore Rooms
            </button>
          </div>
        </div>

        <section className="heroBookingPanel" id="booking" ref={bookingRef}>
          <div className="heroBookingHeader">
            <span>Book Direct</span>
            <h2>Reserve Your Stay</h2>
            <p>No extra commission. No hidden charges.</p>
          </div>

          <div className="heroBookingForm">
            <div className="singleDatePicker">
              <button
                type="button"
                className={`bookingFieldBox ${calendarOpen ? "active" : ""}`}
                onClick={openCalendar}
              >
                <small>Check In</small>
                <strong>{displayDate(checkIn)}</strong>
                <span>Tap to select arrival date</span>
              </button>

              {calendarOpen && (
                <div className="rangeCalendar">
                  <div className="rangeCalendarHead">
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleMonth(
                          new Date(
                            visibleMonth.getFullYear(),
                            visibleMonth.getMonth() - 1,
                            1
                          )
                        )
                      }
                    >
                      ‹
                    </button>

                    <strong>Select Your Dates</strong>

                    <button
                      type="button"
                      onClick={() =>
                        setVisibleMonth(
                          new Date(
                            visibleMonth.getFullYear(),
                            visibleMonth.getMonth() + 1,
                            1
                          )
                        )
                      }
                    >
                      ›
                    </button>
                  </div>

                  <div className="twoMonthCalendar">
                    {renderMonth(visibleMonth)}
                    {renderMonth(nextMonth)}
                  </div>

                  <div className="rangeCalendarFooter">
                    <div>
                      <small>Selected Stay</small>
                      <strong>
                        {checkIn ? displayDate(checkIn) : "Check in"} —{" "}
                        {checkOut ? displayDate(checkOut) : "Check out"}
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (!checkOut && checkIn) {
                          setCheckOut(addDays(checkIn, 1));
                        }
                        setCalendarOpen(false);
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className="bookingFieldBox"
              onClick={openCalendar}
            >
              <small>Check Out</small>
              <strong>{displayDate(checkOut)}</strong>
              <span>{nights > 0 ? `${nights} night stay` : "Select departure"}</span>
            </button>

            <div className="occupancyWrapper">
              <button
                type="button"
                className="bookingFieldBox bookingOccupancyBox"
                onClick={() => {
                  setOccupancyOpen((prev) => !prev);
                  setCalendarOpen(false);
                }}
              >
                <small>Occupancy</small>
                <strong>
                  {adults} Adult{adults > 1 ? "s" : ""}
                  {children > 0 ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""}
                </strong>
                <span>Guests per room</span>
              </button>

              {occupancyOpen && (
                <div className="occupancyDropdown">
                  <div className="occupancyRow">
                    <div>
                      <strong>Adults</strong>
                      <span>Age 18+</span>
                    </div>

                    <div className="counterControl">
                      <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))}>−</button>
                      <b>{adults}</b>
                      <button type="button" onClick={() => setAdults(Math.min(4, adults + 1))}>+</button>
                    </div>
                  </div>

                  <div className="occupancyRow">
                    <div>
                      <strong>Children</strong>
                      <span>Under 18</span>
                    </div>

                    <div className="counterControl">
                      <button type="button" onClick={() => setChildren(Math.max(0, children - 1))}>−</button>
                      <b>{children}</b>
                      <button type="button" onClick={() => setChildren(Math.min(3, children + 1))}>+</button>
                    </div>
                  </div>

                  <button
                    className="occupancyDoneBtn"
                    type="button"
                    onClick={() => setOccupancyOpen(false)}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            <div className="bookingFieldBox roomSelectBox">
              <small>Rooms</small>
              <strong>{selectedRoomData.name}</strong>
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
              >
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="priceCompareBox">
              <div>
                <small>OTA Price</small>
                <del>${averageRate + 18}</del>
              </div>
              <div>
                <small>Direct Price</small>
                <strong>${averageRate}</strong>
              </div>
              <span>Book direct and save on your stay.</span>
            </div>

            <div className="bookingFieldBox bookingEstimateBox">
              <small>Live Estimate</small>
              <strong>{nights > 0 ? `$${estimate}` : `$${selectedRoomData.weekday}+`}</strong>
              <span>
                {nights > 0
                  ? `${nights} night${nights > 1 ? "s" : ""}, taxes estimated`
                  : "Select dates to calculate total"}
              </span>
            </div>

            <button className="checkBtn" type="button" onClick={handleCheckAvailability}>
              Check Availability
            </button>

            <a className="bookingCallLink" href="tel:+10000000000">
              Prefer to book by phone? Call the front desk
            </a>
          </div>
        </section>

        <div className="heroPager">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={heroIndex === index ? "active" : ""}
              onClick={() => setHeroIndex(index)}
              aria-label={`Hero slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="conversionSection">
        <div className="conversionGrid">
          <article>
            <span>Best Value</span>
            <h3>Book Direct</h3>
            <p>No hidden commission fees when booking directly with Dream Inn.</p>
            <p className="savePrice">Save more</p>
            <a href="#booking" onClick={(e) => { e.preventDefault(); scrollToSection("#booking"); }}>Reserve Now</a>
          </article>

          <article>
            <span>Location</span>
            <h3>Near LAX</h3>
            <p>Convenient access to LAX, SoFi Stadium, and Los Angeles attractions.</p>
            <p className="savePrice">Easy travel</p>
            <a href="#location" onClick={(e) => { e.preventDefault(); scrollToSection("#location"); }}>View Map</a>
          </article>

          <article>
            <span>Comfort</span>
            <h3>Clean Rooms</h3>
            <p>Comfortable rooms with Wi-Fi, parking, microwave, and refrigerator.</p>
            <p className="savePrice">Simple stay</p>
            <a href="#rooms" onClick={(e) => { e.preventDefault(); scrollToSection("#rooms"); }}>View Rooms</a>
          </article>
        </div>

        <div className="bookingTrustStrip">
          <span>Free Wi-Fi</span>
          <span>Free Parking</span>
          <span>24/7 Front Desk</span>
        </div>
      </section>

      <section className="aboutLuxury" id="about">
        <div className="aboutCopy">
          <span className="sectionKicker">About Us</span>
          <h2>A Comfortable Stay in Inglewood</h2>
          <p className="aboutText">
            Dream Inn offers a clean, convenient, and affordable hotel experience
            near LAX and SoFi Stadium. Whether you are visiting for a game,
            airport travel, work, or a short Los Angeles getaway, our goal is to
            make your stay smooth and comfortable.
          </p>
          <button className="learnBtn" type="button" onClick={() => scrollToSection("#rooms")}>
            Explore Rooms
          </button>
        </div>

        <div className="aboutImages">
          <img src={about1} alt="Dream Inn exterior" />
          <img src={about2} alt="Dream Inn room" />
        </div>
      </section>

      <section className="roomsLuxury" id="rooms">
        <div className="sectionCenter">
          <span className="sectionKicker">Rooms</span>
          <h2>Rooms & Suites</h2>
          <p className="reviewTrustLine">Comfortable rooms for every stay.</p>
        </div>

        <div className="roomGridLuxury">
          {rooms.map((room) => (
            <article
              className="luxRoomCard"
              key={room.id}
              onClick={() => openRoomModal(room)}
            >
              <div className="cardImgWrap">
                <img src={room.images[0]} alt={room.name} />
              </div>
              <div className="cardInfo">
                <h3>{room.name}</h3>
                <p>{room.desc}</p>
                <span className="viewDetails">View Details</span>
              </div>
            </article>
          ))}
        </div>

        <div className="roomDots">
          <span className="dot active" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </section>

      <section className="amenitiesLuxury" id="amenities">
        <div className="sectionCenter">
          <span className="sectionKicker">Amenities</span>
          <h2>Everything You Need</h2>
        </div>

        <ul className="amenityList">
          <li><span className="icon wifi" />Free Wi-Fi</li>
          <li><span className="icon parking" />Free Parking</li>
          <li><span className="icon tv" />Cable TV</li>
          <li><span className="icon clean" />Daily Housekeeping</li>
          <li><span className="icon desk" />24/7 Front Desk</li>
          <li><span className="icon ac" />Air Conditioning</li>
          <li><span className="icon heater" />Heater</li>
          <li><span className="icon nosmoke" />Non-Smoking Property</li>
          <li><span className="icon direct" />Book Direct</li>
        </ul>
      </section>

      <section className="reviewsLuxury" id="reviews">
        <div className="sectionCenter">
          <span className="sectionKicker">Reviews</span>
          <h2>Guest Experiences</h2>
          <p className="reviewTrustLine">What our guests say.</p>
        </div>

        <div className="reviewGrid">
          <article className="reviewCard">
            <div className="reviewStars">★★★★★</div>
            <p>Clean room, good location, and easy check-in. Great option near LAX and SoFi Stadium.</p>
            <h4>Dream Inn Guest</h4>
          </article>

          <article className="reviewCard">
            <div className="reviewStars">★★★★★</div>
            <p>The staff was helpful and the room had everything I needed for a short stay.</p>
            <h4>Verified Guest</h4>
          </article>

          <article className="reviewCard">
            <div className="reviewStars">★★★★<span>★</span></div>
            <p>Good value, free parking, and convenient location in Inglewood.</p>
            <h4>Recent Guest</h4>
          </article>
        </div>

        <div className="googleReviewBtnWrap">
          <a className="googleReviewBtn" href="#location" onClick={(e) => { e.preventDefault(); scrollToSection("#location"); }}>
            View Location
          </a>
        </div>
      </section>

      <section className="locationLuxury" id="location">
        <div className="locationDetails">
          <span className="sectionKicker">Location</span>
          <h2>Stay Near LAX & SoFi Stadium</h2>
          <p>
            Dream Inn is located in the Inglewood / Los Angeles area with easy
            access to the airport, stadium, restaurants, and local attractions.
          </p>

          <div className="locationMiniBenefits">
            <span>Near LAX</span>
            <span>Near SoFi Stadium</span>
            <span>Free Parking</span>
          </div>
        </div>

        <div className="mapBox">
          <iframe
            title="Dream Inn Location"
            loading="lazy"
            src="https://www.google.com/maps?q=Inglewood%20CA&output=embed"
          />
        </div>
      </section>

      <footer className="luxFooter">
        <div className="footerContent">
          <h3>Dream Inn</h3>
          <p>Comfortable stay near LAX and SoFi Stadium.</p>
          <p>© {new Date().getFullYear()} Dream Inn. All rights reserved.</p>
        </div>
      </footer>

      <div className={`floatingCtas ${headerScrolled ? "" : "hideFloatingCtas"}`}>
        <a className="floatingCallBtn" href="tel:+10000000000">Call Now</a>
        <button className="floatingBookBtn" type="button" onClick={() => scrollToSection("#booking")}>
          Book Now
        </button>
      </div>

      {selectedRoom && (
        <div className="modalOverlay" onClick={closeRoomModal}>
          <div className="roomModal" onClick={(e) => e.stopPropagation()}>
            <button className="modalClose" type="button" onClick={closeRoomModal}>
              ×
            </button>

            <div className="modalHeaderImg">
              {selectedRoom.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={selectedRoom.name}
                  className={index === modalImageIndex ? "active" : ""}
                />
              ))}

              <button className="modalArrow modalArrowLeft" type="button" onClick={prevModalImage}>
                ‹
              </button>
              <button className="modalArrow modalArrowRight" type="button" onClick={nextModalImage}>
                ›
              </button>

              <span className="imageCounter">
                {modalImageIndex + 1} / {selectedRoom.images.length}
              </span>
            </div>

            <div className="modalBody">
              <h2>{selectedRoom.name}</h2>
              <p>{selectedRoom.desc}</p>

              <div className="modalGrid">
                <div className="modalFeature">
                  <h4>Room Features</h4>
                  <ul>
                    {selectedRoom.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="modalFeature">
                  <h4>Policies</h4>
                  <ul>
                    <li>$100 security deposit required</li>
                    <li>One car per room</li>
                    <li>Non-smoking property</li>
                    <li>Valid ID required at check-in</li>
                  </ul>
                </div>
              </div>

              <button
                className="modalBookBtn"
                type="button"
                onClick={() => {
                  setSelectedRoomId(selectedRoom.id);
                  closeRoomModal();
                  scrollToSection("#booking");
                }}
              >
                Book This Room
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;