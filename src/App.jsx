import { useEffect, useState } from "react";
import "./index.css";

/* ================= HERO SLIDES ================= */
const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=2000&q=90",
    title: "Surround Yourself With Refined Comfort",
    subtitle: "Welcome to Dream Inn",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=90",
    title: "A Calm Boutique Stay in Inglewood",
    subtitle: "Near LAX & SoFi Stadium",
  },
  {
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=2000&q=90",
    title: "Designed for Comfort, Ease, and Value",
    subtitle: "Book Direct With Dream Inn",
  },
];

const parkingPolicy =
  "One car per room. Additional vehicles require extra parking fee.";

/* ================= ROOMS ================= */
const rooms = [
  {
    name: "Single Bed Room",
   
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=90",
    ],
    
    details:
      "A clean and comfortable room designed for travelers who want a calm stay with essential in-room convenience.",
    amenities: ["2 Guests",
      "Cali King size bed",
      "Private bathroom",
      "Free Wi-Fi",
      "Cable TV",
      "Microwave",
      "Refrigerator",
    ],
    policies: [
      "Valid ID required at check-in",
      "$100 security deposit required",
      "Non-smoking room",
      parkingPolicy,
    ],
  },
  {
    name: "Double Bed Room",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=90",
    ],
    details:
      "A practical room option with two queen size beds for friends, families, or guests who prefer additional sleeping space.",
    amenities: [
      "4 Guests",
      "Two Queen Size beds",
      "Private bathroom",
      "Free Wi-Fi",
      "Cable TV",
      "Microwave",
      "Refrigerator",
    ],
    policies: [
      "Valid ID required at check-in",
      "$100 security deposit required",
      "Non-smoking room",
      parkingPolicy,
    ],
  },
  {
    name: "Jaccuzzi Room",
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=1200&q=90",
    ],
    details:
      "A premium room experience with a private bath, Jaccuzzi, added relaxation, and a refined atmosphere.",
    amenities: [
      "2 Guests",
      "One Cali King Bed and Sofa",
      "Jaccuzzi",
      "Private bathroom",
      "Free Wi-Fi",
      "Cable TV",
      "Microwave",
      "Refrigerator",
    ],
    policies: [
      "Valid ID required at check-in",
      "$100 security deposit required",
      "Non-smoking room",
      "No children allowed in Jaccuzzi room",
      parkingPolicy,
    ],
  },
];

/* ================= AMENITIES ================= */
const amenities = [
  "Free Wi-Fi",
  "Private Bathrooms",
  "Cable TV",
  "Microwave",
  "Refrigerator",
  "Free Parking",
  "Non-Smoking Property",
  "Direct Booking",
];

function App() {
  const [activeHero, setActiveHero] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [occupancy, setOccupancy] = useState("1");
  const [openCalendar, setOpenCalendar] = useState(null);
  const [activeDot, setActiveDot] = useState(0);

  const today = formatDate(new Date());

  const availableRooms =
    Number(occupancy) > 2
      ? rooms.filter((room) => room.name === "Double Bed Room")
      : rooms;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 5400);

    return () => clearInterval(timer);
  }, []);

  const scrollToRooms = (event) => {
    event?.preventDefault?.();

    document.getElementById("rooms")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const openBookingEngine = () => {
    window.open("https://your-booking-engine-link.com", "_blank");
  };

  const getNextDay = (dateString) => {
    const date = dateString ? new Date(`${dateString}T00:00:00`) : new Date();
    date.setDate(date.getDate() + 1);
    return formatDate(date);
  };

  const handleCheckIn = (value) => {
    setCheckIn(value);

    const minimumCheckout = getNextDay(value);

    if (!checkOut || checkOut < minimumCheckout) {
      setCheckOut("");
    }
  };

  return (
    <div className="luxHotelSite">
      <div className="topInfoBar">
        <div className="topContact">
          <span>📍 3201 W Imperial Hwy, Inglewood, CA 90303</span>
          <span>☎ +1 310 412 0912</span>
        </div>

        <div className="topSocials">
          <a
            className="facebookIcon"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            f
          </a>
          <a
            className="instagramIcon"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            ◎
          </a>
        </div>
      </div>

      <header className="mainHeader">
        <a href="#home" className="luxLogo">
          Dream<span>Inn</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#amenities">Amenities</a>
          <a href="#location">Contact Us</a>
        </nav>

        <a href="#rooms" className="bookRoomBtn" onClick={scrollToRooms}>
          Explore Rooms
        </a>
      </header>

      <main>
        <section id="home" className="luxHero">
          <div
            className="luxHeroTrack"
            style={{ transform: `translateX(-${activeHero * 100}%)` }}
          >
            {heroSlides.map((slide) => (
              <article className="luxHeroSlide" key={slide.image}>
                <img src={slide.image} alt="Dream Inn hotel" />
                <div className="luxHeroOverlay" />

                <div className="luxHeroText">
                  <span>{slide.subtitle}</span>
                  <h1>{slide.title}</h1>
                </div>
              </article>
            ))}
          </div>

          <div className="heroPager">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={index === activeHero ? "active" : ""}
                onClick={() => setActiveHero(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section id="booking" className="bookingLuxury">
          <div className="bookingHeader">
            <span className="sectionKicker">Check Availability</span>
            <h2>Plan Your Stay at Dream Inn</h2>
            <p>Book directly with Dream Inn and avoid third-party commission.</p>
          </div>

          <form className="bookingForm">
            <DatePicker
              id="checkin"
              label="Arrival Date"
              value={checkIn}
              min={today}
              onChange={handleCheckIn}
              openCalendar={openCalendar}
              setOpenCalendar={setOpenCalendar}
            />

            <DatePicker
              id="checkout"
              label="Departure Date"
              value={checkOut}
              min={checkIn ? getNextDay(checkIn) : getNextDay(today)}
              onChange={setCheckOut}
              openCalendar={openCalendar}
              setOpenCalendar={setOpenCalendar}
            />

            <div className="inputGroup">
              <label>Occupancy</label>
              <select
                value={occupancy}
                onChange={(event) => setOccupancy(event.target.value)}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </div>

            <div className="inputGroup">
              <label>Room</label>
              <select>
                {availableRooms.map((room) => (
                  <option key={room.name}>{room.name}</option>
                ))}
              </select>
            </div>

            <button type="button" className="checkBtn" onClick={openBookingEngine}>
              Book Now
            </button>
          </form>
        </section>

        <section id="about" className="aboutLuxury">
          <div className="aboutCopy">
            <span className="sectionKicker">About Us</span>
            <h2>A Refined Stay Near LAX and SoFi Stadium</h2>
            <p>
              Dream Inn offers guests a comfortable stay in Inglewood with clean rooms,
              warm service, and a polished hotel experience designed for travelers visiting
              the Los Angeles area.
            </p>
            <p>
              Our property provides a practical and welcoming base for short stays,
              business travel, event visits, and guests looking for comfort with direct
              booking convenience.
            </p>
            <a href="#rooms" className="learnBtn" onClick={scrollToRooms}>
              Explore Rooms
            </a>
          </div>

          <div className="aboutImages">
            <img
              src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=90"
              alt="Hotel room"
            />
            <img
              src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=900&q=90"
              alt="Hotel bedroom"
            />
          </div>
        </section>

        <section id="rooms" className="roomsLuxury">
  <div className="sectionCenter">
    <span className="sectionKicker">Rooms</span>
    <h2>Comfortable Rooms for Every Stay</h2>
  </div>

  {/* SCROLL CONTAINER */}
  <div
    className="roomGridLuxury"
    onScroll={(e) => {
      const container = e.target;
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActiveDot(index);
    }}
  >
    {availableRooms.map((room, index) => (
      <RoomCard
        key={room.name}
        room={room}
        onSeeMore={() => setSelectedRoom(room)}
      />
    ))}
  </div>

  {/* DOTS INDICATOR */}
  <div className="roomDots">
    {availableRooms.map((_, index) => (
      <span
        key={index}
        className={activeDot === index ? "dot active" : "dot"}
      />
    ))}
  </div>
</section>

        <section id="amenities" className="amenitiesLuxury">
          <div className="sectionCenter">
            <span className="sectionKicker">Amenities</span>
            <h2>Everything You Need for a Comfortable Stay</h2>
          </div>

          <div className="amenityGrid">
            {amenities.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </section>

        <section id="location" className="locationLuxury">
          <div className="locationDetails">
            <span className="sectionKicker">Contact Us</span>
            <h2>Experience Dream Inn</h2>
            <p>
              📧 <a href="mailto:dreaminn3201@gmail.com">dreaminn3201@gmail.com</a>
            </p>
            <p>
              ☎ <a href="tel:+13104120912">+1(310)412-0912</a>
            </p>
          </div>

          <div className="mapBox">
            <iframe
              title="Dream Inn Map"
              src="https://www.google.com/maps?q=3201%20W%20Imperial%20Hwy%2C%20Inglewood%2C%20CA%2090303&output=embed"
              loading="lazy"
            />
          </div>
        </section>
      </main>

      {selectedRoom && (
        <RoomDetailsModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onCheckAvailability={() => {
            const booking = document.getElementById("booking");

            booking?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });

            setSelectedRoom(null);
          }}
        />
      )}

      <footer className="luxFooter">
        <div className="footerContent">
          <h3>Dream Inn</h3>
          <p>3201 W Imperial Hwy, Inglewood, CA 90303</p>
          <p>© 2026 Dream Inn Inglewood. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function DatePicker({
  id,
  label,
  value,
  min,
  onChange,
  openCalendar,
  setOpenCalendar,
}) {
  const open = openCalendar === id;

  const [viewDate, setViewDate] = useState(() => {
    const base = min ? new Date(`${min}T00:00:00`) : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  useEffect(() => {
    if (min) {
      const base = new Date(`${min}T00:00:00`);
      setViewDate(new Date(base.getFullYear(), base.getMonth(), 1));
    }
  }, [min]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = viewDate.toLocaleString("default", { month: "long" });

  const minDate = min ? new Date(`${min}T00:00:00`) : new Date();
  minDate.setHours(0, 0, 0, 0);

  const days = Array.from({ length: firstDay + daysInMonth }, (_, index) =>
    index < firstDay ? null : index - firstDay + 1
  );

  const selectDate = (day) => {
    const selectedDate = new Date(year, month, day);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < minDate) return;

    onChange(formatDate(selectedDate));
    setOpenCalendar(null);
  };

  return (
    <div className="inputGroup datePickerWrap">
      <label>{label}</label>

      <button
        type="button"
        className="datePopupInput"
        onClick={() => setOpenCalendar(open ? null : id)}
      >
        {value || "Select date"}
      </button>

      {open && (
        <div className="calendarPopup">
          <div className="calendarHead">
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
            >
              ‹
            </button>

            <strong>
              {monthName} {year}
            </strong>

            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
            >
              ›
            </button>
          </div>

          <div className="calendarWeek">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          <div className="calendarGrid">
            {days.map((day, index) =>
              day ? (
                <button
                  type="button"
                  key={`${month}-${day}`}
                  onClick={() => selectDate(day)}
                  disabled={new Date(year, month, day) < minDate}
                  className={
                    value === formatDate(new Date(year, month, day))
                      ? "selected"
                      : ""
                  }
                >
                  {day}
                </button>
              ) : (
                <span key={`blank-${index}`} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function RoomCard({ room, onSeeMore }) {
  return (
    <article className="luxRoomCard" onClick={onSeeMore} tabIndex="0" role="button">
      <div className="cardImgWrap">
        <img src={room.images[0]} alt={room.name} />
      </div>

      <div className="cardInfo">
        <h3>{room.name}</h3>
        <p className="bedPreview">{room.bedDetails}</p>
        <p>{room.details}</p>

        <span className="viewDetails">View Details ↗</span>
      </div>
    </article>
  );
}

function RoomDetailsModal({ room, onClose, onCheckAvailability }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % room.images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [room.images.length]);

  const nextSlide = () =>
    setActive((current) => (current + 1) % room.images.length);

  const prevSlide = () =>
    setActive((current) => (current - 1 + room.images.length) % room.images.length);

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="roomModal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modalClose" onClick={onClose}>
          ×
        </button>

        <div className="modalHeaderImg">
          {room.images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={room.name}
              className={index === active ? "active" : ""}
            />
          ))}

          <button type="button" className="modalArrow modalArrowLeft" onClick={prevSlide}>
            ‹
          </button>
          <button type="button" className="modalArrow modalArrowRight" onClick={nextSlide}>
            ›
          </button>

          <div className="imageCounter">
            {active + 1}/{room.images.length}
          </div>
        </div>

        <div className="modalBody">
          <h2>{room.name}</h2>
          <p className="modalBedDetail">{room.bedDetails}</p>
          <p>{room.details}</p>

          <div className="modalGrid">
            <div className="modalFeature">
              <h4>Room Amenities</h4>
              <ul>
                {room.amenities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="modalFeature">
              <h4>Room Policies</h4>
              <ul>
                {room.policies.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <button
            type="button"
            className="modalBookBtn"
            onClick={onCheckAvailability}
          >
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;