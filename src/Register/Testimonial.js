import React, { useEffect, useState } from "react";

function Testimonial() {
  const testimonials = [
    {
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text
    ever since the 1500s.`,
      author: "Kamal Bisht",
    },
    {
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text
      ever since the 1500s.`,
      author: "Alok Patel",
    },
    {
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text
      ever since the 1500s.`,
      author: "Prabal Jain",
    },
  ];
  const [test, setTest] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      let l = testimonials.length;
      if (test === l - 1) {
        setTest(0);
      } else {
        setTest(test + 1);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [test,testimonials.length]);
  return (
    <div className="flexColumn registerImage">
      <div className="flexRow" />
      <div className="flexRow" />
      <div className="flexRow">
        <div className="flexRow" style={{ justifyContent: "space-around" }}>
          <button
            onClick={() =>
              !test ? setTest(testimonials.length - 1) : setTest(test - 1)
            }
          >
            {"<"}
          </button>
          <div id={test} className={`flexColumn testimonial`}>
            <q>{testimonials[test].text}</q>
            <p>--{testimonials[test].author}</p>
          </div>
          <button
            onClick={() =>
              test === testimonials.length - 1 ? setTest(0) : setTest(test + 1)
            }
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
