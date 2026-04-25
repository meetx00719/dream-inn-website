import { useMemo, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { CalendarDays, MapPin, Phone, Wifi, Car, Tv, Refrigerator, Microwave, ShieldCheck, Star, Bath, CigaretteOff } from 'lucide-react'
import { db } from '../firebase/firebase.js'

const hotel = {
  name: 'Dream Inn',
  address: '3201 W Imperial Hwy, Inglewood, CA 90303',
  phone: '+1 310 412 0912',
  phoneHref: 'tel:+13104120912',
  mapUrl: 'https://www.google.com/maps?q=3201%20W%20Imperial%20Hwy%2C%20Inglewood%2C%20CA%2090303&output=embed',
}

const rooms = [
  {
    title: 'Single Bed Room',
    desc: 'A clean, calm and comfortable choice for solo travelers or short stays near LA.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=85',
    tags: ['Private Bathroom', 'Free Internet', 'TV'],
  },
  {
    title: 'Double Bed Room',
    desc: 'Perfect for couples, friends or small families who want comfort at a budget-friendly rate.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
    tags: ['Microwave', 'Refrigerator', 'Private Bath'],
  },
  {
    title: 'Jacuzzi Room',
    desc: 'Upgrade your stay with a more relaxing room experience and extra comfort.',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85',
    tags: ['Jacuzzi', 'Free Internet', 'TV'],
  },
]

const amenities = [
  { icon: Wifi, title: 'Free Internet', desc: 'Stay connected throughout your stay.' },
  { icon: Bath, title: 'Private Bathroom', desc: 'Clean private bathroom in every room.' },
  { icon: Tv, title: 'TV', desc: 'Relax with in-room entertainment.' },
  { icon: Refrigerator, title: 'Refrigerator', desc: 'Keep drinks and snacks fresh.' },
  { icon: Microwave, title: 'Microwave', desc: 'Convenient for quick meals.' },
  { icon: Car, title: 'Parking', desc: 'Free and paid parking options available.' },
  { icon: CigaretteOff, title: 'Non-Smoking', desc: 'Whole property is non-smoking.' },
  { icon: ShieldCheck, title: '$100 Deposit', desc: 'Security deposit required at check-in.' },
]

export default function Home() {
  const [form, setForm] = useState({ checkIn: '', checkOut: '', guests: '1 Guest', roomType: 'Any Room', name: '', phone: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submitInquiry = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      await addDoc(collection(db, 'bookingInquiries'), {
        ...form,
        createdAt: serverTimestamp(),
        source: 'Dream Inn Website',
      })
      setStatus('Thank you. Your booking inquiry has been received.')
      setForm({ checkIn: '', checkOut: '', guests: '1 Guest', roomType: 'Any Room', name: '', phone: '' })
    } catch (error) {
      console.error(error)
      setStatus('Firebase is not configured yet. Add your .env values, or use the Call Now button.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f4ec] text-slate-900">
      <div className="hidden md:flex justify-between items-center bg-[#080f1f] text-white/75 px-10 py-2 text-sm">
        <p><span className="text-[#f1d28a] font-semibold">Dream Inn</span> · {hotel.address}</p>
        <a href={hotel.phoneHref} className="text-[#f1d28a] font-semibold">Call Direct: {hotel.phone}</a>
      </div>

      <header className="sticky top-0 z-50 bg-[#f8f4ec]/90 backdrop-blur-xl border-b border-slate-900/10">
        <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">
          <a href="#home" className="leading-none">
            <div className="font-serif text-3xl font-bold tracking-wide text-[#0b1220]">Dream Inn</div>
            <div className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#c89b3c]">Inglewood CA</div>
          </a>
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a href="#rooms" className="hover:text-[#c89b3c]">Rooms</a>
            <a href="#amenities" className="hover:text-[#c89b3c]">Amenities</a>
            <a href="#location" className="hover:text-[#c89b3c]">Location</a>
            <a href="#policies" className="hover:text-[#c89b3c]">Policies</a>
          </div>
          <a href="#booking" className="rounded-full px-5 py-3 bg-gradient-to-r from-[#c89b3c] to-[#efcf7b] text-slate-950 font-extrabold shadow-xl shadow-yellow-900/20">Book Direct</a>
        </nav>
      </header>

      <section id="home" className="relative overflow-hidden min-h-[760px] flex items-center bg-[#0b1220]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=85')] bg-cover bg-center opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050914] via-[#050914]/75 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 py-24 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[#f1d28a] text-xs font-extrabold tracking-[0.18em] uppercase backdrop-blur-md mb-6">
              <Star size={15} /> Clean · Calm · Budget Friendly
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-7">A premium stay near SoFi Stadium & LAX.</h1>
            <p className="text-white/78 text-lg md:text-xl max-w-2xl mb-9">Dream Inn offers clean private rooms, free internet, comfortable amenities, and direct booking with no extra commission once your booking engine is connected.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#booking" className="rounded-full px-7 py-4 bg-gradient-to-r from-[#c89b3c] to-[#f1d28a] text-slate-950 font-extrabold shadow-2xl shadow-yellow-900/30">Check Availability</a>
              <a href={hotel.phoneHref} className="rounded-full px-7 py-4 border border-white/35 text-white font-extrabold hover:bg-white/10">Call {hotel.phone}</a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="booking" className="relative z-20 max-w-6xl mx-auto px-5 -mt-24">
        <form onSubmit={submitInquiry} className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white p-5 md:p-7 grid md:grid-cols-6 gap-4 items-end">
          <Field label="Check-in"><input min={today} name="checkIn" type="date" value={form.checkIn} onChange={update} className="input" /></Field>
          <Field label="Check-out"><input min={today} name="checkOut" type="date" value={form.checkOut} onChange={update} className="input" /></Field>
          <Field label="Guests"><select name="guests" value={form.guests} onChange={update} className="input"><option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4 Guests</option></select></Field>
          <Field label="Room"><select name="roomType" value={form.roomType} onChange={update} className="input"><option>Any Room</option><option>Single Bed Room</option><option>Double Bed Room</option><option>Jacuzzi Room</option></select></Field>
          <Field label="Phone"><input name="phone" value={form.phone} onChange={update} placeholder="Your phone" className="input" /></Field>
          <button disabled={loading} className="h-[54px] rounded-2xl bg-[#0b1220] text-white font-extrabold hover:opacity-95 disabled:opacity-60">{loading ? 'Sending...' : 'Send Inquiry'}</button>
          <Field label="Name"><input name="name" value={form.name} onChange={update} placeholder="Your name" className="input" /></Field>
          {status && <p className="md:col-span-5 text-sm font-semibold text-emerald-700">{status}</p>}
        </form>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-900/5">
          <p className="text-[#c89b3c] text-sm font-black tracking-[0.18em] uppercase mb-3">About Dream Inn</p>
          <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-5">Simple comfort with a polished hotel feel.</h2>
          <p className="text-slate-600 text-lg">Located in Inglewood, Dream Inn is built for travelers who want a clean, calm, budget-friendly stay near SoFi Stadium, LAX Airport and Los Angeles attractions.</p>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <Stat value="3★" label="Budget Friendly" />
            <Stat value="100%" label="Non-Smoking" />
            <Stat value="Direct" label="No Commission" />
          </div>
        </div>
        <div className="min-h-[480px] rounded-[2rem] bg-[url('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85')] bg-cover bg-center shadow-2xl" />
      </section>

      <section id="rooms" className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        <SectionHeader kicker="Rooms & Comfort" title="Choose the room that fits your trip." text="All rooms include a private bathroom, free internet, TV, refrigerator and microwave." center />
        <div className="grid lg:grid-cols-3 gap-7 mt-10">
          {rooms.map((room) => <RoomCard key={room.title} room={room} />)}
        </div>
      </section>

      <section id="amenities" className="max-w-7xl mx-auto px-5 lg:px-8 py-24">
        <SectionHeader kicker="Amenities" title="Everything you need for an easy stay." text="Essential in-room features and guest conveniences for a comfortable visit." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {amenities.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-3xl p-6 shadow-lg border border-slate-900/5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fff3cd] to-[#e8c15a] grid place-items-center mb-4"><Icon size={23} /></div>
              <h3 className="font-extrabold text-lg mb-1">{title}</h3>
              <p className="text-slate-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="location" className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
        <div className="bg-[#0b1220] text-white rounded-[2.3rem] p-7 md:p-12 grid lg:grid-cols-2 gap-8 items-center shadow-2xl">
          <div>
            <p className="text-[#f1d28a] text-sm font-black tracking-[0.18em] uppercase mb-3">Location</p>
            <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-5">Close to LA travel and entertainment.</h2>
            <p className="text-white/70 text-lg mb-6">Stay near SoFi Stadium, LAX Airport and key Los Angeles destinations.</p>
            <div className="space-y-3">
              <Info icon={MapPin} text={hotel.address} />
              <Info icon={CalendarDays} text="Near SoFi Stadium and LAX Airport" />
              <Info icon={Phone} text={hotel.phone} />
            </div>
          </div>
          <div className="h-[420px] overflow-hidden rounded-3xl border border-white/15">
            <iframe title="Dream Inn Map" src={hotel.mapUrl} className="w-full h-full border-0" loading="lazy" />
          </div>
        </div>
      </section>

      <section id="policies" className="max-w-7xl mx-auto px-5 lg:px-8 py-24">
        <SectionHeader kicker="Guest Information" title="Clear policies before arrival." center />
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          <Policy title="$100 Security Deposit" text="A $100 security deposit is required upon check-in." />
          <Policy title="Non-Smoking Property" text="The whole property is non-smoking for all guests." />
          <Policy title="Direct Booking" text="Customers can book directly from the website with no extra commission after the booking engine is connected." />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-24">
        <div className="rounded-[2.3rem] p-8 md:p-14 bg-[#0b1220] text-white shadow-2xl flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center">
          <div>
            <p className="text-[#f1d28a] text-sm font-black tracking-[0.18em] uppercase mb-3">Book Direct</p>
            <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-4">Ready to stay at Dream Inn?</h2>
            <p className="text-white/70 text-lg max-w-2xl">Call the property now or connect your booking engine later for real-time direct reservations.</p>
          </div>
          <a href={hotel.phoneHref} className="rounded-full px-8 py-4 bg-gradient-to-r from-[#c89b3c] to-[#f1d28a] text-slate-950 font-extrabold">Call Now</a>
        </div>
      </section>

      <footer className="bg-[#070c16] text-white/70 px-5 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-serif text-3xl text-white mb-3">Dream Inn</h3>
            <p>Clean, calm and budget-friendly hotel/motel stay near SoFi Stadium and LAX Airport.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Contact</h4>
            <a href={hotel.phoneHref} className="block hover:text-[#f1d28a]">{hotel.phone}</a>
            <p>{hotel.address}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Website</h4>
            <a href="#rooms" className="block hover:text-[#f1d28a]">Rooms</a>
            <a href="#amenities" className="block hover:text-[#f1d28a]">Amenities</a>
            <a href="#booking" className="block hover:text-[#f1d28a]">Book Direct</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Field({ label, children }) {
  return <label className="block"><span className="block text-[11px] font-black tracking-[0.16em] uppercase text-slate-500 mb-2">{label}</span>{children}</label>
}

function SectionHeader({ kicker, title, text, center }) {
  return (
    <div className={center ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}>
      <p className="text-[#c89b3c] text-sm font-black tracking-[0.18em] uppercase mb-3">{kicker}</p>
      <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-4">{title}</h2>
      {text && <p className="text-slate-600 text-lg">{text}</p>}
    </div>
  )
}

function RoomCard({ room }) {
  return (
    <motion.article whileHover={{ y: -8 }} className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-900/5">
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${room.image})` }} />
      <div className="p-7">
        <h3 className="text-2xl font-extrabold mb-2">{room.title}</h3>
        <p className="text-slate-600 mb-5">{room.desc}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {room.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-700">{tag}</span>)}
        </div>
        <a href={hotel.phoneHref} className="inline-flex rounded-full bg-[#0b1220] text-white px-5 py-3 font-extrabold">Call to Book</a>
      </div>
    </motion.article>
  )
}

function Stat({ value, label }) {
  return <div className="rounded-2xl bg-slate-50 border border-slate-900/5 p-5"><div className="text-3xl font-black">{value}</div><div className="text-sm font-bold text-slate-500">{label}</div></div>
}

function Info({ icon: Icon, text }) {
  return <div className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/10 p-4"><Icon size={20} className="text-[#f1d28a]" /><span>{text}</span></div>
}

function Policy({ title, text }) {
  return <div className="bg-white rounded-3xl p-7 shadow-lg border border-slate-900/5"><h3 className="text-xl font-extrabold mb-2">{title}</h3><p className="text-slate-600">{text}</p></div>
}
