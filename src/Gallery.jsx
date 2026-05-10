/* =========================
   GALLERY LIGHTBOX
========================= */

.galleryLightbox {
  position: fixed;
  inset: 0;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.galleryLightboxImage {
  width: auto;
  max-width: min(1200px, 92vw);
  max-height: 88vh;
  object-fit: contain;
  border-radius: 24px;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.45);
}

.galleryClose {
  position: absolute;
  top: 22px;
  right: 22px;
  width: 52px;
  height: 52px;
  border-radius: 999px;
  border: 0;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  font-size: 36px;
  cursor: pointer;
  z-index: 10;
  backdrop-filter: blur(12px);
}

.galleryArrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 58px;
  height: 58px;
  border-radius: 999px;
  border: 0;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 42px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  z-index: 10;
}

.galleryArrowLeft {
  left: 28px;
}

.galleryArrowRight {
  right: 28px;
}

.galleryCaption {
  position: absolute;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 24px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-family: "Playfair Display", serif;
  font-size: 20px;
  font-weight: 700;
  backdrop-filter: blur(12px);
}

@media (max-width: 760px) {
  .galleryArrow {
    width: 46px;
    height: 46px;
    font-size: 34px;
  }

  .galleryArrowLeft {
    left: 10px;
  }

  .galleryArrowRight {
    right: 10px;
  }

  .galleryClose {
    width: 46px;
    height: 46px;
    top: 14px;
    right: 14px;
    font-size: 30px;
  }

  .galleryCaption {
    width: calc(100% - 24px);
    text-align: center;
    font-size: 17px;
    padding: 12px 18px;
  }
}