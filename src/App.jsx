import React, { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const elts = {
    text1: useRef(null),
    text2: useRef(null),
  };

  const texts = ["Web Developer", "Graphic designer", "Freelancer"];

  let textIndex = texts.length - 1;
  let time = new Date();
  let morph = 0;
  let cooldown = 0.25;

  const doMorph = () => {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / 1;

    if (fraction > 1) {
      cooldown = 1;
      fraction = 1;
    }

    setMorph(fraction);
  };

  const setMorph = (fraction) => {
    elts.text2.current.style.filter = `blur(${Math.min(
      8 / fraction - 8,
      100
    )}px)`;
    elts.text2.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.current.style.filter = `blur(${Math.min(
      8 / fraction - 8,
      100
    )}px)`;
    elts.text1.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.current.textContent = texts[textIndex % texts.length];
    elts.text2.current.textContent = texts[(textIndex + 1) % texts.length];
  };

  const doCooldown = () => {
    morph = 0;

    elts.text2.current.style.filter = "";
    elts.text2.current.style.opacity = "100%";

    elts.text1.current.style.filter = "";
    elts.text1.current.style.opacity = "0%";
  };

  const animate = () => {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Hey, I'm Santhosh</h1>
        <h2 className="position">
          <span id="text1" ref={elts.text1}></span>
          <span id="text2" ref={elts.text2}></span>
        </h2>
        <svg
          id="filters"
          width="100%"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="threshold">
              <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 255 -140"
              />
            </filter>
          </defs>
        </svg>

        <p>
          Hi, I am Santhosh, Experienced full-stack developer from India, with 2
          years of expertise in React, Node.js, and MongoDB. Ready to create
          innovative web solutions!
        </p>
        <hr />
        <div className="social-icons">
          <a target="_blank" href="https://linkedin.com/in/santhoshsj">
            LinkedIn
          </a>
          <a target="_blank" href="https://github.com/santhoshsj-dev">
            GitHub
          </a>
          <a target="_blank" href="https://www.instagram.com/sandy___sj/">
            Instagram
          </a>
          <a target="_blank" href="https://www.behance.net/sandy___sj">
            Behance
          </a>
          <a target="_blank" href="mailto:santhoshsekar2903@gmail.com">
            Contact Me
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
