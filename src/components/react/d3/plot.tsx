import { useEffect, useRef, useState } from "react";
import * as Plot from "@observablehq/plot";

export default () => {
  const div = useRef<HTMLDivElement | null>(null);
  const states = [
    "Alaska",
    "Ala.",
    "Ark.",
    "Ariz.",
    "Calif.",
    "Colo.",
    "Conn.",
    "D.C.",
    "Del.",
    "Fla.",
    "Ga.",
    "Hawaii",
    "Iowa",
    "Idaho",
    "Ill.",
    "Ind.",
    "Kan.",
    "Ky.",
    "La.",
    "Mass.",
    "Md.",
    "Maine",
    "Mich.",
    "Minn.",
    "Mo.",
    "Miss.",
    "Mont.",
    "N.C.",
    "N.D.",
    "Neb.",
    "N.H.",
    "N.J.",
    "N.M",
    "Nev.",
    "N.Y.",
    "Ohio",
    "Okla.",
    "Ore.",
    "Pa.",
    "R.I.",
    "S.C.",
    "S.D.",
    "Tenn.",
    "Texas",
    "Utah",
    "Va.",
    "Vt.",
    "Wash.",
    "Wis.",
    "W.Va.",
    "Wyo.",
  ];
  const [disease, setDisease] = useState("Measles");

  const initPot = async () => {
    let url = `/assets/vaccines.json`;
    let data: any = await fetch(url);
    data = await data.json();

    let vaccines = data.flatMap(
      ({
        title: disease,
        data: {
          values: { data },
        },
      }) =>
        data.map(([date, stateIndex, cases]) => ({
          disease,
          date: new Date(`${date}-01-01`),
          state: states[stateIndex],
          cases,
        }))
    );
    let introductions = data.map(
      ({
        title: disease,
        data: {
          chart_options: { vaccine_year },
        },
      }) => ({
        disease,
        date: new Date(Date.UTC(vaccine_year, (vaccine_year % 1) * 12, 1)),
      })
    );

    const plot = Plot.plot({
      // width: 900,
      // height: 930,
      marginBottom: 30,
      padding: 0,
      round: false,
      label: null,
      x: { axis: "top" },
      color: {
        scheme: "purd",
        legend: true,
        type: "sqrt",
        label: "每10万人中的病例",
      },
      marks: [
        Plot.barX(
          vaccines.filter(d => d.disease === disease),
          {
            x: "date",
            y: "state",
            interval: "year",
            inset: 0.5,
            fill: "cases",
            title: "cases",
          }
        ),
        Plot.ruleX([introductions.find(d => d.disease === disease)], {
          x: "date",
        }),
        Plot.text([introductions.find(d => d.disease === disease)], {
          x: "date",
          dy: 4,
          lineAnchor: "top",
          frameAnchor: "bottom",
          text: d => `${d.date.getUTCFullYear()}\nVaccine introduced`,
        }),
      ],
      document,
    });
    return plot;
  };
  useEffect(() => {
    initPot().then(plot => {
      div.current?.appendChild(plot);
    });
    return () => {
      div.current.innerHTML = "";
    };
  });

  return (
    <>
      <h2>{disease}</h2>
      <select
        data-te-select-init
        value={disease}
        onChange={e => {
          setDisease(e.target.value);
        }}
      >
        <option value="Measles">Measles</option>
        <option value="Hepatitis A">Hepatitis A</option>
        <option value="Mumps">Mumps</option>
        <option value="Pertussis (Whooping Cough)">
          Pertussis (Whooping Cough)
        </option>
        <option value="Polio">Polio</option>
        <option value="Rubella">Rubella</option>
        <option value="Smallpox">Smallpox</option>
      </select>
      <div ref={div}></div>
    </>
  );
};
