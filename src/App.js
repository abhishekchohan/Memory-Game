import React from "react";

const DynamicSize = (n) => {
  const cards = {};
  const arr = [...Array(n * n).keys()]
    .map((num) => {
      num = num + 1;
      if (num > n / 2) {
        num = num - n / 2;
      }
      return num;
    })
    .sort(() => Math.random() - 0.5);

  arr.forEach((el, index) => {
    cards[index + 1] = {
      value: el,
      show: false
    };
  });
  return cards;
};

export default function App() {
  // assign initial catd state to setState
  const n = 8;
  const cards = DynamicSize(n);
  const [state, setState] = React.useState(cards);
  const [ops, setOps] = React.useState({
    count: 0,
    show: [],
    permanent: []
  });
  const { count, show, permanent } = ops;
  const styles = {
    container: {
      fontFamily: "sans-serif",
      display: "grid",
      gridTemplateColumns: `repeat(${n}, 2fr)`,
      gridGap: "5px"
    },
    item: {
      width: "100%",
      height: "100px",
      backgroundColor: "gray",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    hide: {
      visibility: "hidden"
    },
    show: {
      width: "100%",
      height: "100px",
      backgroundColor: "tomato",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  };

  const HandleClick = (e, value) => {
    e.stopPropagation();
    const cardId = e.target.dataset.id;
    const showVal = e.target.dataset.show;
    if (!permanent.includes(cardId)) {
      if (!showVal) {
        setOps((prev) => {
          return {
            ...prev,
            count: prev.count + 1,
            show: [...prev.show, { value, id: cardId }]
          };
        });
      }
      setState((prev) => {
        return {
          ...prev,
          [cardId]: {
            value,
            show: !prev[cardId].show
          }
        };
      });
    }
  };
  React.useEffect(() => {
    if (count === 2) {
      if (show[0].value === show[1].value) {
        setOps((prev) => {
          return {
            ...prev,
            count: 0,
            show: [],
            permanent: [...prev.permanent, show[0].id, show[1].id]
          };
        });
      } else {
        setTimeout(() => {
          setState((prev) => {
            return {
              ...prev,
              [show[0].id]: {
                ...prev[show[0].id],
                show: false
              },
              [show[1].id]: {
                ...prev[show[1].id],
                show: false
              }
            };
          });
        }, 2000);
        setOps((prev) => {
          return {
            ...prev,
            count: 0,
            show: []
          };
        });
      }
    }
    //eslint-disable-next-line
  }, [count]);
  return (
    <div style={styles.container}>
      {[...Object.values(state)].map((el, index) => (
        <div
          key={index + 1}
          data-id={index + 1}
          onClick={(e) => HandleClick(e, el.value)}
          show={`${el.show}`}
          style={styles.item}
        >
          <b
            data-id={index + 1}
            onClick={(e) => HandleClick(e, el.value)}
            style={
              permanent.includes(index + 1)
                ? styles.show
                : el.show
                ? styles.show
                : styles.hide
            }
          >
            {el.value}
          </b>
        </div>
      ))}
    </div>
  );
}
