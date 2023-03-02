import React, { useState, useEffect } from "react";
import { Container, Title, Ul, Cursor } from "./StyledAnimation";


 const fakeData = [
    {
      id: 1,
      name: "Palov",
      img: "https://i.ibb.co/5j8yQ3L/pilaf-sm.jpg",
    },
    {
      id: 2,
      name: "Beshbarmok",
      img: "https://i.ibb.co/K0Q78Dy/beshbarmak-sm.jpg",
    },
    {
      id: 4,
      name: "Qozon kabob",
      img: "https://i.ibb.co/9pVmMxr/kazan-kabob.jpg",
    },
    {
      id: 5,
      name: "Koʻza shoʻrva",
      img: "https://i.ibb.co/7Q8K8T1/kuza-shurpa-sm.jpg",
    },
    {
      id: 6,
      name: "Lagʻmon",
      img: "https://i.ibb.co/wrvQ7gf/lagman-sm.jpg",
    },
    {
      id: 7,
      name: "Manti",
      img: "https://i.ibb.co/FsD3Lgc/manti.jpg",
    },
    {
      id: 8,
      name: "Moshxoʻrda",
      img: "https://i.ibb.co/RNnFWvZ/moshkhurda-sm.jpg",
    },
    {
      id: 9,
      name: "Noʻhat Shorak",
      img: "https://i.ibb.co/8B2wzQz/nohat-shorak.jpg",
    },
    {
      id: 10,
      name: "Norin",
      img: "https://i.ibb.co/z719sZr/norin.jpg",
    },
    {
      id: 11,
      name: "Shashlik",
      img: "https://i.ibb.co/fSvtzFg/shashlik-sm.jpg",
    },
    {
      id: 12,
      name: "Tuxum Barak",
      img: "https://i.ibb.co/qjVrmMQ/tukhum-barak-sm.jpg",
    },
    {
      id: 13,
      name: "Somsa",
      img: "https://i.ibb.co/rQCBMcS/samosa-sm.jpg",
    },
  ];
const Animation = () => {
  const [position, setPosition] = useState({
    x: "",
    y: "",
  });

  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Container>
      <Title>National dishes of Uzbekistan</Title>
      <Ul>
        {fakeData.map((elem, i) => (
          <li key={i}>
            <span>{elem.name}</span>
            <div className='img-cont'>
              <img src={elem.img} alt={elem.name} />
            </div>
          </li>
        ))}
      </Ul>

      <div
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        className="cursor"
      ></div>
    </Container>
  );
};

export default Animation;
