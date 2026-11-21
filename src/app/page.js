import Image from "next/image";
import Header from "@/components/Header";
import Counter from "@/components/Counter";
import ProductTabs from "@/components/ProductTabs";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { contactDetails, features, navLinks, socialLinks, testimonials } from "@/components/data";

function IconBox({ icon, title, lines, className = "" }) {
  return (
    <div className={`icon-box ${className}`}>
      <div className="icon-box-wrapper">
        <div className="icon-box-icon">
          <Icon name={icon} className="icon-badge" />
        </div>
        <div className="icon-box-content">
          <h3 className="icon-box-title">{title}</h3>
          <p className="icon-box-description">
            {lines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div id="main-container">
      <Header />

      <main id="main">
        {/* Hero */}
        <section className="hero" style={{ backgroundImage: "url(/maaxcy-web-banner.jpg-1.jpeg)" }}>
          <div className="text-block">
            <p className="eyebrow hero-eyebrow">PREMIUM WAX MANUFACTURER</p>
          </div>
          <div className="text-block">
            <p className="hero-title">
              Advanced Waxing,
              <br />
              <span className="hero-accent">
                <em>Professional</em>
              </span>{" "}
              Results
            </p>
          </div>
          <div className="text-block">
            <p className="hero-text">
              Delivering high-performance waxing solutions crafted for professionals.
              <br />
              From Liposoluble to Brazilian and Gel Wax, experience superior quality,
              <br />
              skin-friendly formulas, and flawless results every time.
            </p>
          </div>
          <div className="hero-btn-wrap">
            <a href="#products" className="gold-btn">
              <span className="gold-btn-inner">
                <span className="gold-btn-text">Explore Our Range</span>
              </span>
            </a>
          </div>
        </section>

        {/* About */}
        <section className="about" id="about">
          <div className="about-media">
            <div className="about-image">
              <Image
                src="/ChatGPT-Image-Apr-8-2026-01_19_15-PM.png"
                alt=""
                width={1024}
                height={1536}
                sizes="(min-width: 1025px) 50vw, 100vw"
              />
            </div>
          </div>
          <div className="about-content">
            <div className="text-block">
              <p className="eyebrow about-center">About Us</p>
            </div>
            <div className="text-block">
              <p className="heading about-heading about-center">
                Redefining the Art of{" "}
                <em>
                  <span style={{ color: "#c48931" }}>Waxing</span>
                </em>
              </p>
            </div>
            <div className="text-block">
              <p className="lato about-text about-center">
                At <strong>Maaxcy International</strong>, we bring over two decades of excellence in crafting premium
                waxing solutions designed for modern beauty professionals. Backed by innovation and precision, our
                products are developed to deliver superior performance while ensuring maximum skin comfort.
              </p>
            </div>
            <div className="text-block">
              <p className="lato about-text about-center">
                With a strong foundation in research and quality manufacturing, we offer a diverse range of
                liposoluble, hydrosoluble, and Brazilian waxes that cater to every skin type and requirement. Our
                commitment lies in creating salon-grade products that combine effectiveness, safety, and a luxurious
                experience.
              </p>
            </div>
            <div className="text-block">
              <p className="about-text about-center">
                Driven by quality and trusted by professionals, Maaxcy continues to redefine hair removal with
                products that deliver smooth, flawless results—every time.
              </p>
            </div>
            <div className="about-stats">
              <Counter title="Years of Experience" to={20} />
              <Counter title="Salon Partners" to={1000} />
              <Counter title="Premium Products" to={25} />
              <div className="iso-box">
                <div className="text-block">
                  <p className="iso-title">ISO</p>
                </div>
                <div className="text-block">
                  <p className="iso-text">Certified Quality</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why" style={{ backgroundImage: "url(/ChatGPT-Image-Apr-8-2026-01_27_34-PM.png)" }}>
          <div className="text-block">
            <p className="eyebrow center">Why Choose Us</p>
          </div>
          <div className="text-block">
            <p className="heading center">
              Experience the{" "}
              <em>
                <span style={{ color: "#c48931" }}>Maaxcy </span>
              </em>
              <span style={{ color: "#000000" }}>Standard</span>
            </p>
          </div>
          <div className="text-block">
            <p className="lato center">
              Crafted with precision and backed by expertise, our waxing solutions are designed to deliver smooth,
              radiant results with every application.
              <br />
              We combine innovation, quality, and care to redefine the waxing experience.
            </p>
          </div>
          <div className="features">
            {features.map((f) => (
              <IconBox
                key={f.title}
                icon={f.icon}
                title={f.title}
                lines={[f.text]}
                className={`feature${f.large ? " feature-large" : ""}`}
              />
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="products" id="products">
          <div className="text-block">
            <p className="eyebrow center">Our Products</p>
          </div>
          <div className="text-block">
            <p className="heading center">
              Elevate{" "}
              <em>
                <span style={{ color: "#a97d38" }}>Every</span> <span style={{ color: "#000000" }}>Experience</span>
              </em>
            </p>
          </div>
          <div className="text-block">
            <p className="lato center">
              Indulge in premium pre and post-wax care designed to calm, hydrate, and enhance skin comfort,
              <br />
              delivering a truly refined waxing experience.
            </p>
          </div>
          <ProductTabs />
        </section>

        {/* Testimonials */}
        <section className="testimonials" id="testimonials">
          <div className="text-block">
            <p className="eyebrow center testimonials-eyebrow">Testimonials</p>
          </div>
          <div className="text-block">
            <p className="heading center testimonials-heading">
              What Our{" "}
              <span style={{ color: "#caa555" }}>
                <em>Clients</em>
              </span>{" "}
              Say
            </p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((t) => (
              <div className="testimonial" key={t.name}>
                <Icon name="quote" className="quote-icon" />
                <div className="text-block">
                  <p className="testimonial-text">{t.text}</p>
                </div>
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icon key={i} name="star" className="star" />
                  ))}
                </div>
                <div className="text-block">
                  <p className="testimonial-name">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="contact-head" id="contact">
          <div className="text-block">
            <p className="eyebrow center">Get In Touch</p>
          </div>
          <div className="text-block">
            <p className="heading center">
              Connect With{" "}
              <em>
                <span style={{ color: "#a97d38" }}>Maaxcy</span>
              </em>
            </p>
          </div>
          <div className="text-block">
            <p className="lato center">
              For product inquiries, orders, or support, get in touch with our team
              <br />
              we’re always ready to help.
            </p>
          </div>
        </section>

        <section className="contact-body">
          <div className="contact-info">
            {contactDetails.map((c) => (
              <IconBox key={c.title} icon={c.icon} title={c.title} lines={c.lines} className="info-box" />
            ))}
          </div>
          <div className="contact-form-card">
            <ContactForm />
          </div>
        </section>

        {/* Footer */}
        <footer className="footer" style={{ backgroundImage: "url(/footer.png)" }}>
          <div className="footer-grid">
            <div className="footer-brand">
              <Image src="/logo.png" alt="" width={704} height={734} className="footer-logo" />
              <div className="text-block">
                <p className="footer-about">
                  <strong>Maaxcy International</strong> delivers premium waxing solutions crafted for professionals
                  who demand quality, performance, and skin care excellence. Trusted for innovation and consistency,
                  we redefine smoothness with every product.
                </p>
              </div>
            </div>

            <div className="footer-links-col">
              <div className="text-block">
                <p className="footer-heading">Quick Links</p>
              </div>
              <ul className="quick-links">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
              <div className="social">
                {socialLinks.map((s) => (
                  <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <Icon name={s.icon} className="social-icon" />
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-contact">
              <div className="text-block">
                <p className="footer-heading">Contact Us</p>
              </div>
              {contactDetails.map((c) => (
                <IconBox key={c.title} icon={c.icon} title={c.title} lines={c.lines} className="footer-box" />
              ))}
            </div>
          </div>
          <div className="text-block copyright">
            <p>
              Copyright © 2026
              <strong>
                <span style={{ color: "#3e2f25" }}> Maaxcy International</span>
              </strong>{" "}
              All Right Reserved | Powered by <a href="https://www.cybertricksmedia.com/" target="_blank"><strong>Cybertricksmedia Pvt Ltd</strong></a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
