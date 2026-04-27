import { useEffect, useRef, useState } from "react";
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

const heroSlides = [
  { image: hero1, mobileImage: hero1Mobile },
  { image: hero2, mobileImage: hero2Mobile },
];

const parkingPolicy =
  "One car per room. Additional vehicles require extra parking fee.";

const rooms = [
  {
    name: "Single Bed Room",
    roomId: "-1",
    maxGuests: 2,
    estimatedRate: 89,
    images: [singleRoom, singleTwo, single3],
    details:
      "A clean and comfortable room designed for travelers who want a calm stay with essential in-room convenience.",
    amenities: [
      "2 Guests",
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
    roomId: "-1",
    maxGuests: 4,
    estimatedRate: 109,
    images: [double1, double2, double3],
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
    name: "Jacuzzi Room",
    roomId: "-1",
    maxGuests: 2,
    estimatedRate: 139,
    images: [jacuzziRoom, jacuzzi2, jacuzzi3],
    details:
      "A premium room experience with a private bath, Jacuzzi, added relaxation, and a refined atmosphere.",
    amenities: [
      "2 Guests",
      "One Cali King Bed and Sofa",
      "Jacuzzi",
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
      "No children allowed in Jacuzzi room",
      parkingPolicy,
    ],
  },
];

const amenities = [
  "Free Wi-Fi",
  "Cable TV",
  "Microwave",
  "Refrigerator",
  "Free Parking",
  "Non-Smoking Property",
  "Direct Booking",
  "24/7 Front Desk",
  "Daily Housekeeping",
  "Secure Key Card Access",
  "Air Conditioning",
  "Heater",
];

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "rooms", label: "Rooms" },
  { id: "amenities", label: "Amenities" },
  { id: "location", label: "Contact Us" },
];

const ASI_BOOKING_ACTION =
  "https://reservation.asiwebres.com/SearchAvailability.aspx?id=c8fd072abc2a4defa0056f09bc6fde7f&Operation=Date";

const TAX_RATE = 0.14;

/*
  Estimated rates only.
  Update these numbers later with your real Dream Inn rate ranges.
*/
const RATE_TABLE = {
  "Single Bed Room": {
    weekday: 89,
    weekend: 119,
  },
  "Double Bed Room": {
    weekday: 109,
    weekend: 149,
  },
  "Jacuzzi Room": {
    weekday: 139,
    weekend: 179,
  },
};

function App() {
  const [activeHero, setActiveHero] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [selectedRoomName, setSelectedRoomName] = useState("");
  const [openCalendar, setOpenCalendar] = useState(null);
  const [activeDot, setActiveDot] = useState(0);

  const bookingRef = useRef(null);
  const today = formatDate(new Date());

  const availableRooms =
    Number(occupancy) > 2
      ? rooms.filter((room) => room.name === "Double Bed Room")
      : rooms;

  const selectedRoomObject =
    availableRooms.find((room) => room.name === selectedRoomName) || null;

  const estimate = calculateEstimatedRate(selectedRoomName, checkIn, checkOut);
  const nights = estimate.nights;
  const estimatedSubtotal = estimate.subtotal;
  const estimatedTaxes = estimate.taxes;
  const estimatedTotal = estimate.total;
  const averageNightlyRate = estimate.avgNightlyRate;
  const pricingType = estimate.pricingType;

  useEffect(() => {
    if (selectedRoomName && !availableRooms.some((room) => room.name === selectedRoomName)) {
      setSelectedRoomName("");
    }
  }, [availableRooms, selectedRoomName]);

  useEffect(() => {
    if (!selectedRoomName && availableRooms.length === 1) {
      setSelectedRoomName(availableRooms[0].name);
    }
  }, [availableRooms, selectedRoomName]);

  useEffect(() => {
    const closeCalendar = (event) => {
      if (bookingRef.current && !bookingRef.current.contains(event.target)) {
        setOpenCalendar(null);
      }
    };

    document.addEventListener("mousedown", closeCalendar);
    document.addEventListener("touchstart", closeCalendar);

    return () => {
      document.removeEventListener("mousedown", closeCalendar);
      document.removeEventListener("touchstart", closeCalendar);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 5400);

    return () => clearInterval(timer);
  }, []);

const getCenteredScrollPosition = (section) => {
    const isMobile = window.innerWidth <= 760;
    const headerOffset = isMobile ? 86 : 118;

    const rect = section.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const centeredPosition =
      rect.top + scrollTop - (window.innerHeight / 2 - rect.height / 2) - headerOffset;

    return Math.max(centeredPosition, 0);
  };

  const scrollToSection = (event, id) => {
    event?.preventDefault?.();

    const section = document.getElementById(id);
    if (!section) return;

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const y = getCenteredScrollPosition(section);

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  const scrollToRooms = (event) => {
    event?.preventDefault?.();

    const section = document.getElementById("rooms");
    if (!section) return;

    const y = getCenteredScrollPosition(section);

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

const openBookingEngine = () => {
    if (!checkIn || !checkOut || !occupancy) {
      alert("Please select Check In, Check Out, and Occupancy before booking.");
      return;
    }

    if (nights <= 0) {
      alert("Check Out date must be after Check In date.");
      return;
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = ASI_BOOKING_ACTION;
    form.target = "_blank";
    form.style.display = "none";

    const fields = {
      txtcheckindate: formatAsiDate(checkIn),
      txtcheckoutdate: formatAsiDate(checkOut),
      txtadult: occupancy,
      txtChildren: "0",
      txtPromocode: "",
      txtRoomId: selectedRoomObject?.roomId || "-1",
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.id = name;
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
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
        <a
          href="#home"
          className="luxLogo"
          onClick={(e) => scrollToSection(e, "home")}
        >
          Dream<span>Inn</span>
        </a>

        <nav className="desktopNav">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
            >
              {link.label}
            </a>
          ))}
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
            {heroSlides.map((slide, index) => (
              <article className="luxHeroSlide" key={slide.image}>
                <picture>
                  <source media="(max-width: 760px)" srcSet={slide.mobileImage} />
                  <img src={slide.image} alt="Dream Inn hotel" />
                </picture>

                <div className="luxHeroOverlay" />

                {index === 1 && (
                  <div className="luxHeroText centerHero">
                    <p className="heroSub">Near LAX &amp; SoFi Stadium</p>
                  </div>
                )}
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

        <section id="booking" className="bookingLuxury" ref={bookingRef}>
          <div className="bookingHeader">
            <span className="sectionKicker centerKicker">
              Reserve Your Stay
            </span>

            <h2 className="bookingTitle">
              <span>Dream Inn</span>
            </h2>

            <p className="bookingDirectText">
              No extra commission. No hidden charges. Book direct with us.
            </p>
          </div>

          <form className="bookingForm">
            <DatePicker
              id="checkin"
              value={checkIn}
              min={today}
              placeholder="Check In"
              onChange={handleCheckIn}
              openCalendar={openCalendar}
              setOpenCalendar={setOpenCalendar}
            />

            <DatePicker
              id="checkout"
              value={checkOut}
              min={checkIn ? getNextDay(checkIn) : getNextDay(today)}
              placeholder="Check Out"
              onChange={setCheckOut}
              openCalendar={openCalendar}
              setOpenCalendar={setOpenCalendar}
            />

            <div className="inputGroup" data-label="Occupancy">
              <select
                value={occupancy}
                onFocus={() => setOpenCalendar(null)}
                onClick={() => setOpenCalendar(null)}
                onChange={(event) => setOccupancy(event.target.value)}
                aria-label="Occupancy"
              >
                <option value="" disabled>
                  Occupancy
                </option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </div>

            <div className="inputGroup" data-label="Rooms">
              <select
                value={selectedRoomName}
                onFocus={() => setOpenCalendar(null)}
                onClick={() => setOpenCalendar(null)}
                onChange={(event) => setSelectedRoomName(event.target.value)}
                aria-label="Rooms"
              >
                <option value="" disabled>
                  Rooms
                </option>
                {availableRooms.map((room) => (
                  <option key={room.name} value={room.name}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="button" className="checkBtn" onClick={openBookingEngine}>
              Book Now
            </button>

            <BookingPreview
              checkIn={checkIn}
              checkOut={checkOut}
              occupancy={occupancy}
              selectedRoom={selectedRoomObject}
              availableRooms={availableRooms}
              nights={nights}
              estimatedSubtotal={estimatedSubtotal}
              estimatedTaxes={estimatedTaxes}
              estimatedTotal={estimatedTotal}
              averageNightlyRate={averageNightlyRate}
              pricingType={pricingType}
            />
          </form>
        </section>

        <section id="about" className="aboutLuxury">
          <div className="aboutCopy">
            <span className="sectionKicker">About Us</span>
            <h2>A Refined Stay Near LAX and SoFi Stadium</h2>

            <p className="aboutText">
              Dream Inn Inglewood is a comfortable and affordable hotel near Los
              Angeles International Airport (LAX) and SoFi Stadium. Located in
              Inglewood, our motel is ideal for travelers, business guests, and
              visitors attending events in Los Angeles.
            </p>

            <p className="aboutText">
              We offer clean rooms, free Wi-Fi, cable TV, microwave,
              refrigerator, and convenient access to LAX, SoFi Stadium, and
              nearby Los Angeles attractions. Dream Inn is located at 3201 W
              Imperial Hwy, Inglewood, CA 90303.
            </p>

            <a href="#rooms" className="learnBtn" onClick={scrollToRooms}>
              Explore Rooms
            </a>
          </div>

          <div className="aboutImages">
            <img src={about1} alt="Dream Inn hotel" />
            <img src={about2} alt="Dream Inn room" />
          </div>
        </section>

        <section id="rooms" className="roomsLuxury">
          <div className="sectionCenter">
            <span className="sectionKicker">Rooms & Suites</span>
            <h2>Comfortable Rooms for Every Stay</h2>
          </div>

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
            {availableRooms.map((room) => (
              <RoomCard
                key={room.name}
                room={room}
                onSeeMore={() => setSelectedRoom(room)}
              />
            ))}
          </div>

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
            <span className="sectionKicker">Hotel Amenities</span>
            <h2>Everything You Need for a Comfortable Stay</h2>
          </div>

          <div className="amenityGrid">
            {amenities.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </section>

        <section className="reviewsSection">
          <div className="sectionCenter">
            <span className="sectionKicker">Guest Experiences</span>
            <h2>What Our Guests Say</h2>
          </div>

          <div className="reviewGrid">
            <div className="reviewCard">
              <p>⭐⭐⭐⭐⭐</p>
              <p>“Very clean rooms and great location near LAX. Staff was friendly!”</p>
              <h4>— John D.</h4>
            </div>

            <div className="reviewCard">
              <p>⭐⭐⭐⭐⭐</p>
              <p>“Perfect stay for SoFi Stadium events. Will come again!”</p>
              <h4>— Maria S.</h4>
            </div>

            <div className="reviewCard">
              <p>⭐⭐⭐⭐⭐</p>
              <p>“Affordable and comfortable. Highly recommend Dream Inn.”</p>
              <h4>— Alex R.</h4>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/place/Dream+Inn/@33.9325371,-118.3337641,13z/data=!4m11!3m10!1s0x80c2b673d6ed0b35:0x45c5eda7d4518a14!5m2!4m1!1i2!8m2!3d33.9311254!4d-118.3285545!9m1!1b1!16s%2Fg%2F1tlc8b58?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="reviewBtn"
          >
            See All Reviews on Google
          </a>
        </section>

        <section id="location" className="locationLuxury">
          <div className="locationDetails">
            <span className="sectionKicker">Contact Us</span>
            <h2>Experience Dream Inn</h2>

            <p>
              📧{" "}
              <a href="mailto:dreaminn3201@gmail.com">
                dreaminn3201@gmail.com
              </a>
            </p>

            <p>
              ☎ <a href="tel:+13104120912">+1 (310) 412-0912</a>
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

            if (booking) {
              const y = getCenteredScrollPosition(booking);

              window.scrollTo({
                top: y,
                behavior: "smooth",
              });
            }

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

function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const diff = end.getTime() - start.getTime();

  return diff > 0 ? Math.round(diff / (1000 * 60 * 60 * 24)) : 0;
}

function calculateEstimatedRate(roomName, checkIn, checkOut) {
  if (!roomName || !checkIn || !checkOut || !RATE_TABLE[roomName]) {
    return {
      nights: 0,
      subtotal: 0,
      taxes: 0,
      total: 0,
      avgNightlyRate: 0,
      pricingType: "",
    };
  }

  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);

  if (end <= start) {
    return {
      nights: 0,
      subtotal: 0,
      taxes: 0,
      total: 0,
      avgNightlyRate: 0,
      pricingType: "",
    };
  }

  let nights = 0;
  let subtotal = 0;
  let weekdayNights = 0;
  let weekendNights = 0;

  const current = new Date(start);

  while (current < end) {
    const day = current.getDay();
    const isWeekend = day === 5 || day === 6;
    const nightlyRate = isWeekend
      ? RATE_TABLE[roomName].weekend
      : RATE_TABLE[roomName].weekday;

    subtotal += nightlyRate;
    nights += 1;

    if (isWeekend) {
      weekendNights += 1;
    } else {
      weekdayNights += 1;
    }

    current.setDate(current.getDate() + 1);
  }

  const taxes = Math.round(subtotal * TAX_RATE);
  const total = subtotal + taxes;
  const avgNightlyRate = nights ? Math.round(subtotal / nights) : 0;

  let pricingType = "Weekday pricing";
  if (weekdayNights && weekendNights) pricingType = "Weekday + weekend pricing";
  if (!weekdayNights && weekendNights) pricingType = "Weekend pricing";

  return {
    nights,
    subtotal,
    taxes,
    total,
    avgNightlyRate,
    pricingType,
  };
}

function formatAsiDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

function formatDisplayDate(dateString) {
  if (!dateString) return "Not selected";

  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function BookingPreview({
  checkIn,
  checkOut,
  occupancy,
  selectedRoom,
  availableRooms,
  nights,
  estimatedSubtotal,
  estimatedTaxes,
  estimatedTotal,
  averageNightlyRate,
  pricingType,
}) {
  const hasBasicSearch = checkIn && checkOut && occupancy;
  const roomsText =
    availableRooms.length === 1
      ? "Auto-selected based on occupancy"
      : "Choose your preferred room type";

  return (
    <div className="bookingPreview">
      <div className="previewTopLine">
        <span>Reservation Preview</span>
        <strong>{hasBasicSearch ? "Ready to Check" : "Complete Search Details"}</strong>
      </div>

      <div className="previewGrid">
        <div>
          <small>Check In</small>
          <strong>{formatDisplayDate(checkIn)}</strong>
        </div>

        <div>
          <small>Check Out</small>
          <strong>{formatDisplayDate(checkOut)}</strong>
        </div>

        <div>
          <small>Occupancy</small>
          <strong>
            {occupancy ? `${occupancy} Guest${occupancy === "1" ? "" : "s"}` : "Not selected"}
          </strong>
        </div>

        <div>
          <small>Room</small>
          <strong>{selectedRoom?.name || roomsText}</strong>
        </div>
      </div>

      <div className="previewPriceBox">
        <div>
          <span>Estimated Stay</span>
          <strong>
            {selectedRoom && nights > 0
              ? `$${estimatedTotal.toLocaleString()}`
              : "Select dates + room"}
          </strong>
        </div>

        <p>
          {selectedRoom && nights > 0
            ? `${nights} night${nights > 1 ? "s" : ""} • average $${averageNightlyRate}/night • ${pricingType}. Final live rates and availability are confirmed on the reservation page.`
            : "Live availability and final rates will be confirmed by ASI WebRes after clicking Book Now."}
        </p>
      </div>
    </div>
  );
}

function DatePicker({
  id,
  value,
  min,
  placeholder,
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
    <div className="inputGroup datePickerWrap" data-label={placeholder}>
      <button
        type="button"
        className="datePopupInput"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpenCalendar(open ? null : id);
        }}
        aria-label={placeholder}
      >
      <span>{value ? formatAsiDate(value) : placeholder}</span>
      </button>

      {open && (
        <div
          className="calendarPopup"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
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
    <article
      className="luxRoomCard"
      onClick={onSeeMore}
      tabIndex="0"
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter") onSeeMore();
      }}
    >
      <div className="cardImgWrap">
        <img src={room.images[0]} alt={room.name} />
      </div>

      <div className="cardInfo">
        <h3>{room.name}</h3>
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
    setActive(
      (current) => (current - 1 + room.images.length) % room.images.length
    );

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

          <button
            type="button"
            className="modalArrow modalArrowLeft"
            onClick={prevSlide}
          >
            ‹
          </button>

          <button
            type="button"
            className="modalArrow modalArrowRight"
            onClick={nextSlide}
          >
            ›
          </button>

          <div className="imageCounter">
            {active + 1}/{room.images.length}
          </div>
        </div>

        <div className="modalBody">
          <h2>{room.name}</h2>
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