import "./index.css";

import hero1 from "./assets/hero1.jpg";
import hero2 from "./assets/hero2.jpg";
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

const galleryImages = [
  { image: hero1, title: "Dream Inn Exterior" },
  { image: hero2, title: "Hotel Front View" },
  { image: about1, title: "Property View" },
  { image: about2, title: "Comfort Interior" },
  { image: singleRoom, title: "Single Bed Room" },
  { image: singleTwo, title: "Single Room Detail" },
  { image: single3, title: "Single Room Comfort" },
  { image: dream1, title: "Dream King Room" },
  { image: double1, title: "Double Bed Room" },
  { image: double2, title: "Double Room View" },
  { image: double3, title: "Double Room Detail" },
  { image: jacuzziRoom, title: "Jacuzzi Room" },
  { image: jacuzzi2, title: "Jacuzzi Tub" },
  { image: jacuzzi3, title: "Jacuzzi Room Detail" },
];

export default function Gallery() {
  return (
    <div className="galleryPage">
      <header className="galleryHeader">
        <a href="/" className="luxLogo galleryLogo">
          Dream<span>Inn</span>
        </a>

        <a href="/" className="galleryBackBtn">
          ← Back to Home
        </a>
      </header>

      <main className="galleryPageMain">
        <section className="galleryHero">
          <span className="sectionKicker">Gallery</span>
          <h1>Explore Dream Inn</h1>
          <p>
            View our rooms, exterior, and comfortable spaces before your stay.
          </p>
        </section>

        <section className="galleryLuxury galleryPageSection">
          <div className="galleryGrid">
            {galleryImages.map((item, index) => (
              <article
                className={`galleryCard galleryCard${index + 1}`}
                key={item.title}
              >
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}