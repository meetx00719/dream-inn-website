import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
import dream1 from "./assets/dream1.jpg";

const heroSlides = [
  { image: hero1, mobileImage: hero1Mobile },
  { image: hero2, mobileImage: hero2Mobile },
];

const amenities = [
  { icon: "wifi", label: "Free Wi-Fi" },
  { icon: "tv", label: "Cable TV" },
  { icon: "parking", label: "Free Parking" },
  { icon: "iron", label: "Iron & Ironing Board (on request)" },
  { icon: "nosmoke", label: "Non-Smoking Property" },
  { icon: "direct", label: "Direct Booking" },
  { icon: "desk", label: "24/7 Front Desk" },
  { icon: "clean", label: "Daily Housekeeping" },
  { icon: "ac", label: "Air Conditioning" },
  { icon: "heater", label: "Heater" },
  { icon: "atm", label: "ATM on-site" },
  { icon: "ice", label: "Ice Machine on-site" },
  { icon: "vending", label: "Vending Soda" },
];

const parkingPolicy =
  "One car per room. Additional vehicles require extra parking fee.";

const rooms = [
  {
    name: "Single Bed Room",
    roomId: "-1",
    maxGuests: 2,
    images: [singleRoom, singleTwo, single3],
    details:
      "A clean and comfortable room with essential in-room convenience for a simple stay.",
    amenities: [
      { icon: "👤", text: "2 Guests" },
      { icon: "🛏", text: "Cali King size bed" },
      { icon: "🛁", text: "Private bathroom" },
      { icon: "📶", text: "Free Wi-Fi" },
      { icon: "📺", text: "Cable TV" },
      { icon: "🍽", text: "Microwave" },
      { icon: "🧊", text: "Refrigerator" },
    ],
    policies: [
      { icon: "🪪", text: "Valid ID required at check-in" },
      { icon: "💳", text: "$100 security deposit required" },
      { icon: "🚭", text: "Non-smoking room" },
      { icon: "🚗", text: parkingPolicy },
    ],
  },
  {
    name: "Dream Room",
    roomId: "-1",
    maxGuests: 2,
    images: [dream1, singleTwo, single3],
    details:
      "A premium single king room designed for a relaxing stay with ambient dream lighting and modern comfort.",
    amenities: [
      { icon: "👤", text: "2 Guests" },
      { icon: "🛏", text: "California King Bed" },
      { icon: "🛁", text: "Private Bathroom" },
      { icon: "💡", text: "Dream Ambient Lighting" },
      { icon: "📶", text: "Free Wi-Fi" },
      { icon: "📺", text: "Cable TV" },
      { icon: "🧊", text: "Refrigerator" },
      { icon: "❄️", text: "Air Conditioning" },
    ],
    policies: [
      { icon: "🪪", text: "Valid ID required at check-in" },
      { icon: "💳", text: "$100 security deposit required" },
      { icon: "🚭", text: "Non-smoking room" },
      { icon: "🚗", text: parkingPolicy },
    ],
  },
  {
    name: "Double Bed Room",
    roomId: "-1",
    maxGuests: 4,
    images: [double1, double2, double3],
    details:
      "A practical room with two queen size beds for friends, families, or guests needing more space.",
    amenities: [
      { icon: "👤", text: "4 Guests" },
      { icon: "🛏", text: "Two Queen Size Beds" },
      { icon: "🛁", text: "Private bathroom" },
      { icon: "📶", text: "Free Wi-Fi" },
      { icon: "📺", text: "Cable TV" },
      { icon: "🍽", text: "Microwave" },
      { icon: "🧊", text: "Refrigerator" },
    ],
    policies: [
      { icon: "🪪", text: "Valid ID required at check-in" },
      { icon: "💳", text: "$100 security deposit required" },
      { icon: "🚭", text: "Non-smoking room" },
      { icon: "🚗", text: parkingPolicy },
    ],
  },
  {
    name: "Jacuzzi Room",
    roomId: "-1",
    maxGuests: 2,
    images: [jacuzziRoom, jacuzzi2, jacuzzi3],
    details:
      "A comfortable room with a private Jacuzzi for guests looking for a relaxing stay.",
    amenities: [
      { icon: "👤", text: "2 Guests" },
      { icon: "🛏", text: "King Size Bed" },
      { icon: "🛁", text: "Private bathroom" },
      { icon: "📶", text: "Free Wi-Fi" },
      { icon: "📺", text: "Cable TV" },
      { icon: "🍽", text: "Microwave" },
      { icon: "🧊", text: "Refrigerator" },
      { icon: "🛁", text: "Jacuzzi Tub" },
    ],
    policies: [
      { icon: "🪪", text: "Valid ID required at check-in" },
      { icon: "💳", text: "$100 security deposit required" },
      { icon: "🚭", text: "Non-smoking room" },
      { icon: "🚗", text: parkingPolicy },
    ],
  },
];

const LOCAL_ROOMS = [
  {
    id: "single",
    name: "Single Bed Room",
    roomId: "-1",
    bed: "Cali King size bed",
    maxAdults: 2,
    maxChildren: 1,
    weekday: 89,
    weekend: 119,
  },
  {
    id: "dream",
    name: "Dream Room",
    roomId: "-1",
    bed: "California King Bed · Dream Ambient Lighting",
    maxAdults: 2,
    maxChildren: 1,
    weekday: 99,
    weekend: 129,
  },
  {
    id: "double",
    name: "Double Bed Room",
    roomId: "-1",
    bed: "Two Queen Size Beds",
    maxAdults: 4,
    maxChildren: 5,
    weekday: 109,
    weekend: 149,
  },
  {
    id: "jacuzzi",
    name: "Jacuzzi Room",
    roomId: "-1",
    bed: "King Size Bed · Jacuzzi Tub",
    maxAdults: 2,
    maxChildren: 0,
    weekday: 139,
    weekend: 179,
  },
];

const reviews = [
  {
    name: "Raylen P.",
    rating: 5,
    text: "Clean room, friendly front desk, and very convenient location near LAX. Great value for the price.",
  },
  {
    name: "Maria G.",
    rating: 5,
    text: "The room was comfortable and the check-in process was smooth. I would stay here again.",
  },
  {
    name: "James R.",
    rating: 4,
    text: "Good location near SoFi Stadium. Parking was convenient and the room had everything I needed.",
  },
  {
    name: "David L.",
    rating: 5,
    text: "Very clean and quiet place. Staff was helpful and the check-in was quick. Perfect for short stays.",
  },
  {
    name: "Sophia M.",
    rating: 4,
    text: "Nice budget-friendly hotel. Rooms were neat and Wi-Fi worked well. Close to airport which is a plus.",
  },
  {
    name: "Carlos T.",
    rating: 4,
    text: "Great experience overall. Comfortable bed, clean bathroom, and good customer service. Will come again.",
  },
];

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "amenities", label: "Amenities" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Contact us" },
];

const ASI_BOOKING_ACTION =
  "https://reservation.asiwebres.com/SearchAvailability.aspx?id=c8fd072abc2a4defa0056f09bc6fde7f&Operation=Date";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Dream+Inn/@33.9311298,-118.3311294,17z/data=!4m22!1m10!3m9!1s0x80c2b673d6ed0b35:0x45c5eda7d4518a14!2sDream+Inn!5m2!4m1!1i2!8m2!3d33.9311254!4d-118.3285545!16s%2Fg%2F1tlc8b58!3m10!1s0x80c2b673d6ed0b35:0x45c5eda7d4518a14!5m2!4m1!1i2!8m2!3d33.9311254!4d-118.3285545!9m1!1b1!16s%2Fg%2F1tlc8b58?entry=ttu&g_ep=EgoyMDI2MDQyNi4wIKXMDSoASAFQAw%3D%3D";

const TAX_RATE = 0.155;

const INITIAL_BOOKING = {
  checkIn: "",
  checkOut: "",
  adults: 1,
  children: 0,
  rooms: 1,
  selectedRoomId: "",
};

function App() {
  const [activeHero, setActiveHero] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeDot, setActiveDot] = useState(0);
  const [hideFloatingBookBtn, setHideFloatingBookBtn] = useState(true);
  const [isHeroTop, setIsHeroTop] = useState(true);
  const [booking, setBooking] = useState(INITIAL_BOOKING);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [occupancyOpen, setOccupancyOpen] = useState(false);

  const scrollAnimationRef = useRef(null);
  const heroBookingRef = useRef(null);
  const calendarRef = useRef(null);
  const occupancyRef = useRef(null);

  const today = useMemo(() => formatDate(new Date()), []);
  const totalGuests = booking.adults + booking.children;

  const visibleRooms = useMemo(() => {
    const adults = Number(booking.adults);
    const children = Number(booking.children);
    const requestedRooms = Number(booking.rooms);

    if (children > 2) {
      return LOCAL_ROOMS.filter((room) => room.id === "double");
    }

    if (requestedRooms === 2 && adults <= 4) {
      return LOCAL_ROOMS.filter(
        (room) =>
          room.id === "single" || room.id === "dream" || room.id === "double"
      );
    }

    return LOCAL_ROOMS.filter(
      (room) => room.maxAdults >= adults && room.maxChildren >= children
    );
  }, [booking.adults, booking.children, booking.rooms]);

  const selectedBookingRoom =
    visibleRooms.find((room) => room.id === booking.selectedRoomId) || null;

  const previewRoom = selectedBookingRoom || visibleRooms[0] || LOCAL_ROOMS[0];

  const livePreview = useMemo(() => {
    return calculateStay(previewRoom, booking.checkIn, booking.checkOut);
  }, [previewRoom, booking.checkIn, booking.checkOut]);

  useEffect(() => {
    if (
      booking.selectedRoomId &&
      !visibleRooms.some((room) => room.id === booking.selectedRoomId)
    ) {
      setBooking((prev) => ({ ...prev, selectedRoomId: "" }));
    }

    if (!booking.selectedRoomId && visibleRooms.length === 1) {
      setBooking((prev) => ({ ...prev, selectedRoomId: visibleRooms[0].id }));
    }
  }, [booking.selectedRoomId, visibleRooms]);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeroTop(window.scrollY < 45);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveDot(0);
  }, [rooms.length]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarOpen(false);
      }

      if (occupancyRef.current && !occupancyRef.current.contains(event.target)) {
        setOccupancyOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("touchstart", closeOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("touchstart", closeOnOutsideClick);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 5400);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleFloatingButton = () => {
      const hero = document.getElementById("home");
      if (!hero) return;

      const viewportMiddle = window.scrollY + window.innerHeight / 2;
      const heroTop = hero.offsetTop;
      const heroBottom = heroTop + hero.offsetHeight;
      const isOnHero = viewportMiddle >= heroTop && viewportMiddle <= heroBottom;

      setHideFloatingBookBtn(isOnHero);
    };

    handleFloatingButton();

    window.addEventListener("scroll", handleFloatingButton, { passive: true });
    window.addEventListener("resize", handleFloatingButton);

    return () => {
      window.removeEventListener("scroll", handleFloatingButton);
      window.removeEventListener("resize", handleFloatingButton);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  const updateBooking = (key, value) => {
    setBooking((prev) => ({ ...prev, [key]: value }));
  };

  const updateAdults = (change) => {
    setBooking((prev) => ({
      ...prev,
      adults: Math.min(6, Math.max(1, prev.adults + change)),
      selectedRoomId: "",
    }));
  };

  const updateChildren = (change) => {
    setBooking((prev) => ({
      ...prev,
      children: Math.min(5, Math.max(0, prev.children + change)),
      selectedRoomId: "",
    }));
  };

  const updateRooms = (change) => {
    setBooking((prev) => ({
      ...prev,
      rooms: Math.min(3, Math.max(1, prev.rooms + change)),
      selectedRoomId: "",
    }));
  };

  const handleCalendarDateSelect = (dateValue) => {
    setBooking((prev) => {
      if (!prev.checkIn || prev.checkOut) {
        return { ...prev, checkIn: dateValue, checkOut: "" };
      }

      if (dateValue <= prev.checkIn) {
        return { ...prev, checkIn: dateValue, checkOut: "" };
      }

      return { ...prev, checkOut: dateValue };
    });
  };

  const premiumScrollTo = (targetY, duration = 850) => {
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
    }

    const startY = window.scrollY || document.documentElement.scrollTop;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        scrollAnimationRef.current = requestAnimationFrame(animate);
      } else {
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(animate);
  };

  const getHeaderOffset = () => {
    const header = document.querySelector(".mainHeader");
    const topBar = document.querySelector(".topInfoBar");

    const headerHeight = header?.getBoundingClientRect().height || 0;

    const topBarHeight =
      topBar &&
      ["fixed", "sticky"].includes(getComputedStyle(topBar).position) &&
      getComputedStyle(topBar).display !== "none"
        ? topBar.getBoundingClientRect().height
        : 0;

    return Math.max(0, headerHeight + topBarHeight - 180);
  };

  const scrollToSectionById = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    setCalendarOpen(false);
    setOccupancyOpen(false);

    if (id === "home") {
      premiumScrollTo(0, 900);
      return;
    }

    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
    const target = sectionTop - getHeaderOffset();

    premiumScrollTo(Math.max(0, target), 900);
  };

  const scrollToSection = (event, id) => {
    event?.preventDefault?.();
    scrollToSectionById(id);
  };

  const scrollToRooms = (event) => {
    event?.preventDefault?.();
    scrollToSectionById("rooms");
  };

  const scrollToHeroBooking = () => {
    heroBookingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const openBookingEngine = () => {
    if (!booking.checkIn || !booking.checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    if (livePreview.nights < 1) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    const roomForSubmit = selectedBookingRoom || previewRoom;

    const form = document.createElement("form");
    form.method = "POST";
    form.action = ASI_BOOKING_ACTION;
    form.target = "_blank";
    form.style.display = "none";

    const fields = {
      txtcheckindate: formatAsiDate(booking.checkIn),
      txtcheckoutdate: formatAsiDate(booking.checkOut),
      txtadult: String(booking.adults),
      txtChildren: String(booking.children),
      txtPromocode: "",
      txtRoomId: roomForSubmit?.roomId || "-1",
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

  return (
    <div className="luxHotelSite">
      <div className="topInfoBar">
        <div className="topContact">
          <span>📍 3201 W Imperial Hwy, Inglewood, CA 90303</span>
          <span>☎ +1 310 412 0912</span>
        </div>

        <div className="topSocials">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            f
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            ◎
          </a>
        </div>
      </div>

      <header
        className={`mainHeader ${isHeroTop ? "heroLogoHeader" : "blurHeader"}`}
      >
        <a
          href="#home"
          className={`luxLogo ${isHeroTop ? "centerLogo" : "smallLogo"}`}
          onClick={(event) => scrollToSection(event, "home")}
          aria-label="Dream Inn Home"
        >
          Dream<span>Inn</span>
        </a>

        <nav className="desktopNav" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.id === "gallery" ? (
              <Link key={link.id} to="/gallery">
                {link.label}
              </Link>
            ) : (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) => scrollToSection(event, link.id)}
              >
                {link.label}
              </a>
            )
          )}
        </nav>
      </header>

      <main>
        <section id="home" className="luxHero">
          <div
            className="luxHeroTrack"
            style={{ transform: `translateX(-${activeHero * 100}%)` }}
          >
            {heroSlides.map((slide, index) => (
              <article className="luxHeroSlide" key={index}>
                <picture>
                  <source
                    media="(max-width: 760px)"
                    srcSet={slide.mobileImage}
                  />
                  <img src={slide.image} alt="Dream Inn hotel exterior" />
                </picture>
              </article>
            ))}
          </div>

          <div className="luxHeroContent">
            <span className="sectionKicker">Dream Inn Inglewood</span>

            <h1>
              Comfortable Stay <br />
              Near LAX &amp; SoFi
            </h1>

            <p>
              Clean rooms, convenient location, free Wi-Fi, and direct booking
              with no hidden charges.
            </p>

            <div className="heroButtons">
              <button type="button" onClick={scrollToHeroBooking}>
                Check Availability
              </button>

              <button type="button" onClick={() => scrollToSectionById("rooms")}>
                View Rooms
              </button>
            </div>
          </div>

          <HeroBookingPanel
            bookingRef={heroBookingRef}
            calendarRef={calendarRef}
            occupancyRef={occupancyRef}
            booking={booking}
            updateBooking={updateBooking}
            updateAdults={updateAdults}
            updateChildren={updateChildren}
            updateRooms={updateRooms}
            today={today}
            visibleRooms={visibleRooms}
            previewRoom={previewRoom}
            livePreview={livePreview}
            totalGuests={totalGuests}
            calendarOpen={calendarOpen}
            setCalendarOpen={setCalendarOpen}
            occupancyOpen={occupancyOpen}
            setOccupancyOpen={setOccupancyOpen}
            handleCalendarDateSelect={handleCalendarDateSelect}
            openBookingEngine={openBookingEngine}
          />

          <div className="heroPager" aria-label="Hero slider controls">
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

        <section id="about" className="aboutLuxury">
          <div className="aboutCopy">
            <span className="sectionKicker">About Us</span>

            <h2>Simple, Comfortable Stay in Inglewood</h2>

            <p className="aboutText">
              Dream Inn Inglewood is located near Los Angeles International
              Airport and SoFi Stadium. Our hotel is ideal for travelers,
              business guests, and visitors attending events in Los Angeles.
            </p>

            <p className="aboutText">
              We offer clean rooms, free Wi-Fi, cable TV, microwave,
              refrigerator, and convenient access to nearby Los Angeles
              attractions.
            </p>

            <a href="#rooms" className="learnBtn" onClick={scrollToRooms}>
              Explore Rooms
            </a>
          </div>

          <div className="aboutImages">
            <img src={about1} alt="Dream Inn hotel exterior" />
            <img src={about2} alt="Dream Inn room interior" />
          </div>
        </section>

        <section id="rooms" className="roomsLuxury">
          <div className="sectionCenter">
            <span className="sectionKicker">Rooms</span>
            <h2>Choose Your Room</h2>
          </div>

          <div
            className="roomGridLuxury"
            onScroll={(event) => {
              const container = event.currentTarget;
              const firstCard = container.querySelector(".luxRoomCard");
              if (!firstCard) return;

              const cardWidth = firstCard.getBoundingClientRect().width;
              const gap =
                parseFloat(window.getComputedStyle(container).gap || "0") || 0;

              const index = Math.round(
                container.scrollLeft / Math.max(cardWidth + gap, 1)
              );

              setActiveDot(Math.min(Math.max(index, 0), rooms.length - 1));
            }}
          >
            {rooms.map((room) => (
              <RoomCard
                key={room.name}
                room={room}
                onSeeMore={() => setSelectedRoom(room)}
              />
            ))}
          </div>

          <div className="roomDots">
            {rooms.map((_, index) => (
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
            <h2>Hotel Amenities</h2>
          </div>

          <ul className="amenityList">
            {amenities.map((item) => (
              <li key={item.label}>
                <i className={`icon ${item.icon}`}></i>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="reviews" className="reviewsLuxury">
          <div className="sectionCenter">
            <span className="sectionKicker">Guest Reviews</span>
            <h2>What our Guests Say</h2>
          </div>

          <div className="reviewGrid">
            {reviews.map((review) => (
              <article className="reviewCard" key={review.name}>
                <div className="reviewStars">
                  {"★".repeat(review.rating)}
                  <span>{"★".repeat(5 - review.rating)}</span>
                </div>

                <p>“{review.text}”</p>

                <h4>{review.name}</h4>
              </article>
            ))}
          </div>

          <div className="googleReviewBtnWrap">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="googleReviewBtn"
            >
              See More Reviews on Google
            </a>
          </div>
        </section>

        <section id="location" className="locationLuxury">
          <div className="locationDetails">
            <span className="sectionKicker">Contact Us</span>
            <h2>Dream Inn</h2>

            <p>📍 3201 W Imperial Hwy, Inglewood, CA 90303</p>

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
            const relatedRoom = LOCAL_ROOMS.find(
              (item) => item.name === selectedRoom.name
            );

            setBooking((prev) => ({
              ...prev,
              selectedRoomId: relatedRoom?.id || prev.selectedRoomId,
            }));

            setSelectedRoom(null);

            setTimeout(scrollToHeroBooking, 120);
          }}
        />
      )}

      <button
        type="button"
        className={`floatingBookBtn ${
          hideFloatingBookBtn ? "hideFloatingBtn" : ""
        }`}
        onClick={scrollToHeroBooking}
        aria-label="Book now"
      >
        Book Now
      </button>

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

function HeroBookingPanel({
  bookingRef,
  calendarRef,
  occupancyRef,
  booking,
  updateBooking,
  updateAdults,
  updateChildren,
  updateRooms,
  today,
  visibleRooms,
  previewRoom,
  livePreview,
  totalGuests,
  calendarOpen,
  setCalendarOpen,
  occupancyOpen,
  setOccupancyOpen,
  handleCalendarDateSelect,
  openBookingEngine,
}) {
  return (
    <aside className="heroBookingPanel" ref={bookingRef}>
      <div className="heroBookingHeader">
        <span>Book Direct</span>
        <h2>Reserve Your Stay</h2>
        <p>No extra commission. No hidden charges.</p>
      </div>

      <form
        className="heroBookingForm"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="singleDatePicker" ref={calendarRef}>
          <button
            type="button"
            className={`bookingFieldBox bookingDateRangeBox ${
              calendarOpen ? "active" : ""
            }`}
            onClick={() => {
              setCalendarOpen((prev) => !prev);
              setOccupancyOpen(false);
            }}
          >
            <small>Check-in — Check-out</small>
            <strong>
              {booking.checkIn && booking.checkOut
                ? `${formatDisplayDate(booking.checkIn)} → ${formatDisplayDate(
                    booking.checkOut
                  )}`
                : booking.checkIn
                ? `${formatDisplayDate(booking.checkIn)} → Select check-out`
                : "Select stay dates"}
            </strong>
          </button>

          {calendarOpen && (
            <RangeCalendar
              checkIn={booking.checkIn}
              checkOut={booking.checkOut}
              today={today}
              previewRoom={previewRoom}
              onSelectDate={handleCalendarDateSelect}
              onClose={() => setCalendarOpen(false)}
            />
          )}
        </div>

        <div className="occupancyWrapper" ref={occupancyRef}>
          <button
            type="button"
            className={`bookingFieldBox bookingOccupancyBox ${
              occupancyOpen ? "active" : ""
            }`}
            onClick={() => {
              setOccupancyOpen((prev) => !prev);
              setCalendarOpen(false);
            }}
          >
            <small>Occupancy</small>
            <strong>
              {booking.adults} Adult{booking.adults > 1 ? "s" : ""}
              {booking.children > 0
                ? ` · ${booking.children} Child${
                    booking.children > 1 ? "ren" : ""
                  }`
                : ""}
              {` · ${booking.rooms} Room${booking.rooms > 1 ? "s" : ""}`}
            </strong>
          </button>

          {occupancyOpen && (
            <div className="occupancyDropdown">
              <div className="occupancyRow">
                <div>
                  <strong>Adults</strong>
                  <span>Max 6 adults</span>
                </div>

                <div className="counterControl">
                  <button type="button" onClick={() => updateAdults(-1)}>
                    −
                  </button>
                  <b>{booking.adults}</b>
                  <button type="button" onClick={() => updateAdults(1)}>
                    +
                  </button>
                </div>
              </div>

              <div className="occupancyRow">
                <div>
                  <strong>Children</strong>
                  <span>Max 5 children · age 0–17</span>
                </div>

                <div className="counterControl">
                  <button type="button" onClick={() => updateChildren(-1)}>
                    −
                  </button>
                  <b>{booking.children}</b>
                  <button type="button" onClick={() => updateChildren(1)}>
                    +
                  </button>
                </div>
              </div>

              <div className="occupancyRow">
                <div>
                  <strong>Rooms</strong>
                  <span>Max 3 rooms</span>
                </div>

                <div className="counterControl">
                  <button type="button" onClick={() => updateRooms(-1)}>
                    −
                  </button>
                  <b>{booking.rooms}</b>
                  <button type="button" onClick={() => updateRooms(1)}>
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="inputGroup heroRoomSelect" data-label="Rooms">
          <select
            value={booking.selectedRoomId}
            onFocus={() => {
              setCalendarOpen(false);
              setOccupancyOpen(false);
            }}
            onClick={() => {
              setCalendarOpen(false);
              setOccupancyOpen(false);
            }}
            onChange={(event) => updateBooking("selectedRoomId", event.target.value)}
            aria-label="Select room type"
          >
            <option value="">Rooms</option>

            {visibleRooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bookingFieldBox bookingEstimateBox">
          <small>Live Estimate</small>

          <strong>
            {booking.checkIn && booking.checkOut
              ? formatPrice(livePreview.total)
              : "Live Estimate"}
          </strong>

          <span>
            {booking.checkIn && booking.checkOut
              ? `${livePreview.nights} night${
                  livePreview.nights === 1 ? "" : "s"
                } · ${totalGuests} guest${totalGuests === 1 ? "" : "s"}`
              : "Auto price"}
          </span>
        </div>

        <button type="button" className="checkBtn" onClick={openBookingEngine}>
          Check Availability
        </button>
      </form>
    </aside>
  );
}

function RangeCalendar({
  checkIn,
  checkOut,
  today,
  onSelectDate,
  onClose,
  previewRoom,
}) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [slideDirection, setSlideDirection] = useState("next");

  const [viewDate, setViewDate] = useState(() => {
    const base = checkIn ? parseDate(checkIn) : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const changeMonth = (direction) => {
    setSlideDirection(direction);
    setViewDate(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() + (direction === "next" ? 1 : -1),
          1
        )
    );
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) < 55) return;
    changeMonth(distance > 0 ? "next" : "prev");
  };

  const minDate = parseDate(today);
  const previewStay = calculateStay(previewRoom, checkIn, checkOut);

  const months = [
    new Date(viewDate.getFullYear(), viewDate.getMonth(), 1),
    new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1),
  ];

  return (
    <div
      className="rangeCalendar premiumRangeCalendar"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="rangeCalendarHead">
        <button type="button" onClick={() => changeMonth("prev")}>
          ‹
        </button>

        <strong>Select Your Stay</strong>

        <button type="button" onClick={() => changeMonth("next")}>
          ›
        </button>
      </div>

      <div
        key={`${viewDate.getFullYear()}-${viewDate.getMonth()}`}
        className={`twoMonthCalendar ${
          slideDirection === "next" ? "slideNext" : "slidePrev"
        }`}
      >
        {months.map((monthDate) => {
          const calendarDays = buildCalendarDays(monthDate);
          const monthName = monthDate.toLocaleString("en-US", {
            month: "long",
          });
          const year = monthDate.getFullYear();

          return (
            <div className="singleMonth" key={`${monthName}-${year}`}>
              <h4>
                {monthName} {year}
              </h4>

              <div className="rangeCalendarWeek">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              <div className="rangeCalendarGrid">
                {calendarDays.map((date, index) => {
                  if (!date) {
                    return <span key={`blank-${monthName}-${index}`} />;
                  }

                  const dateValue = formatDate(date);
                  const dateOnly = new Date(date);
                  dateOnly.setHours(0, 0, 0, 0);

                  const disabled = dateOnly < minDate;
                  const isCheckIn =
                    checkIn && isSameDate(date, parseDate(checkIn));
                  const isCheckOut =
                    checkOut && isSameDate(date, parseDate(checkOut));
                  const inRange = isBetween(date, checkIn, checkOut);

                  return (
                    <button
                      type="button"
                      key={dateValue}
                      disabled={disabled}
                      className={[
                        isCheckIn ? "isCheckIn" : "",
                        isCheckOut ? "isCheckOut" : "",
                        inRange ? "inRange" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => onSelectDate(dateValue)}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rangeCalendarFooter">
        <div>
          <small>Selected Stay</small>
          <strong>
            {checkIn && checkOut
              ? `${previewStay.nights} night${
                  previewStay.nights === 1 ? "" : "s"
                } · ${formatPrice(previewStay.total)}`
              : checkIn
              ? "Now select check-out date"
              : "Select check-in date"}
          </strong>
        </div>

        <button type="button" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}

function RoomCard({ room, onSeeMore }) {
  return (
    <article
      className="luxRoomCard"
      onClick={onSeeMore}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSeeMore();
        }
      }}
      tabIndex="0"
      role="button"
      aria-label={`View details for ${room.name}`}
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
    const previousOverflow = document.body.style.overflow;

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % room.images.length);
    }, 5000);

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [room.images.length, onClose]);

  const nextSlide = () => {
    setActive((current) => (current + 1) % room.images.length);
  };

  const prevSlide = () => {
    setActive(
      (current) => (current - 1 + room.images.length) % room.images.length
    );
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div
        className="roomModal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${room.name} details`}
      >
        <button
          type="button"
          className="modalClose"
          onClick={onClose}
          aria-label="Close room details"
        >
          ×
        </button>

        <div className="modalHeaderImg">
          {room.images.map((image, index) => (
            <img
              key={`${room.name}-${index}`}
              src={image}
              alt={room.name}
              className={index === active ? "active" : ""}
            />
          ))}

          <button
            type="button"
            className="modalArrow modalArrowLeft"
            onClick={prevSlide}
            aria-label="Previous room image"
          >
            ‹
          </button>

          <button
            type="button"
            className="modalArrow modalArrowRight"
            onClick={nextSlide}
            aria-label="Next room image"
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

              <ul className="modalList">
                {room.amenities.map((item) => (
                  <li key={item.text}>
                    <span>{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="modalFeature">
              <h4>Room Policies</h4>

              <ul className="modalList">
                {room.policies.map((item) => (
                  <li key={item.text}>
                    <span>{item.icon}</span>
                    {item.text}
                  </li>
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

function formatPrice(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseDate(dateString) {
  return new Date(`${dateString}T00:00:00`);
}

function formatDisplayDate(dateString) {
  if (!dateString) return "Select date";

  return parseDate(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatAsiDate(dateString) {
  if (!dateString) return "";

  const date = parseDate(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

function calculateStay(room, checkIn, checkOut) {
  if (!room || !checkIn || !checkOut) {
    return { nights: 0, subtotal: 0, taxes: 0, total: 0, averageRate: 0 };
  }

  const start = parseDate(checkIn);
  const end = parseDate(checkOut);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end <= start
  ) {
    return { nights: 0, subtotal: 0, taxes: 0, total: 0, averageRate: 0 };
  }

  let nights = 0;
  let subtotal = 0;
  const current = new Date(start);

  while (current < end) {
    const day = current.getDay();
    subtotal += day === 5 || day === 6 ? room.weekend : room.weekday;
    nights += 1;
    current.setDate(current.getDate() + 1);
  }

  const taxes = subtotal * TAX_RATE;
  const total = subtotal + taxes;

  return {
    nights,
    subtotal,
    taxes,
    total,
    averageRate: nights ? subtotal / nights : 0,
  };
}

function buildCalendarDays(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: firstDayIndex + daysInMonth }, (_, index) => {
    if (index < firstDayIndex) return null;
    return new Date(year, month, index - firstDayIndex + 1);
  });
}

function isSameDate(a, b) {
  if (!a || !b) return false;
  return formatDate(a) === formatDate(b);
}

function isBetween(date, start, end) {
  if (!date || !start || !end) return false;

  const current = new Date(date);
  current.setHours(0, 0, 0, 0);

  return current > parseDate(start) && current < parseDate(end);
}

export default App;